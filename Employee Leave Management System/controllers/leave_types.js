const { pool } = require('../db');

// Fetch all leave types
const getAllLeaveTypes = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const query = 'SELECT * FROM leavetypes';
        connection.query(query, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error fetching leave types:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json(results);
        });
    });
};

// Add new leave type
const addLeaveType = (req, res) => {
    const { leaveType, description } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const query = 'INSERT INTO leavetypes (leave_type, description, created_date) VALUES (?, ?, NOW())';
        connection.query(query, [leaveType, description], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error adding leave type:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Leave type added successfully' });
        });
    });
};


// Update existing leave type
const updateLeaveType = (req, res) => {
    const { leaveTypeId } = req.params;
    const { leaveType, description } = req.body;

    // Validate leaveTypeId
    if (!leaveTypeId || isNaN(parseInt(leaveTypeId))) {
        return res.status(400).json({ message: 'Invalid leave type ID' });
    }

    // Continue with the update operation...
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const query = 'UPDATE leavetypes SET leave_type=?, description=? WHERE leave_type_id=?';
        connection.query(query, [leaveType, description, leaveTypeId], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error updating leave type:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Leave type updated successfully' });
        });
    });
}



// Delete existing leave type
const deleteLeaveType = (req, res) => {
    const { leaveTypeId } = req.params;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const query = 'DELETE FROM leavetypes WHERE leave_type_id=?';
        connection.query(query, [leaveTypeId], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error deleting leave type:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Leave type deleted successfully' });
        });
    });
};

// Fetch leave type by ID
const getLeaveTypeById = (leaveTypeId) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                reject('Server error');
            }

            const query = 'SELECT * FROM leavetypes WHERE leave_type_id = ?';
            console.log('Executing query:', query, 'with parameters:', [leaveTypeId]);
            connection.query(query, [leaveTypeId], (err, results) => {
                connection.release();
                if (err) {
                    console.error('Error fetching leave type:', err);
                    reject('Server error');
                }
                console.log('Query results:', results);
                if (results.length === 0) {
                    reject('Leave type not found');
                }
                resolve(results[0]);
            });
        });
    });
};

// Fetch leave type by ID controller function
const getLeaveTypeByIdController = (req, res) => {
    const leaveTypeId = req.params.leaveTypeId;

    getLeaveTypeById(leaveTypeId)
        .then((leaveType) => {
            res.json(leaveType);
        })
        .catch((error) => {
            console.error('Error fetching leave type details:', error);
            res.status(404).json({ message: error });
        });
};



module.exports = {
    getAllLeaveTypes,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    getLeaveTypeByIdController,
};
