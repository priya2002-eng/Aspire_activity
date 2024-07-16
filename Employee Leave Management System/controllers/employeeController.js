const bcrypt = require('bcryptjs');
const { pool } = require('../db'); // Assuming you have a db.js file with connection pooling configured

// Fetch all employees
const getAllEmployees = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        const query = 'SELECT * FROM employees';
        connection.query(query, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error fetching employees:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json(results);
        });
    });
};

// Fetch a single employee by ID
const getEmployeeById = (req, res) => {
    const { employeeId } = req.params;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const query = 'SELECT * FROM employees WHERE employee_id_number = ?';
        connection.query(query, [employeeId], (err, results) => {
            connection.release();
            if (err) {
                console.error('Error fetching employee:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.json(results[0]);
        });
    });
};


const addEmployee = (req, res) => {
    const {
        fullName, email, employeeId, department, phoneNumber, birthDate, gender,
        streetAddress, country, city, region, postalCode, password
    } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            const query = 'INSERT INTO employees (full_name, email, employee_id_number, username, department, phone_number, birth_date, gender, street_address, country, city, region, postal_code, password, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
            connection.query(query, [fullName, email, employeeId, email, department, phoneNumber, birthDate, gender, streetAddress, country, city, region, postalCode, hashedPassword], (err, result) => {
                connection.release();
                if (err) {
                    console.error('Error adding employee:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.json({ message: 'Employee added successfully' });
            });
        });
    });
};

const updateEmployee = (req, res) => {
    const employeeId = req.params.id;
    const {
        full_name, email, username, department, phone_number, birth_date,
        gender, street_address, country, city, region, postal_code, password
    } = req.body;

    // Hash password if it's being updated
    let query = 'UPDATE employees SET full_name = ?, email = ?, username = ?, department = ?, phone_number = ?, birth_date = ?, gender = ?, street_address = ?, country = ?, city = ?, region = ?, postal_code = ?';
    const queryParams = [full_name, email, username, department, phone_number, birth_date, gender, street_address, country, city, region, postal_code];

    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            query += ', password = ? WHERE employee_id_number = ?';
            queryParams.push(hashedPassword, employeeId);

            pool.query(query, queryParams, (err, result) => {
                if (err) {
                    console.error('Error updating employee:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.json({ message: 'Employee updated successfully' });
            });
        });
    } else {
        query += ' WHERE employee_id_number = ?';
        queryParams.push(employeeId);

        pool.query(query, queryParams, (err, result) => {
            if (err) {
                console.error('Error updating employee:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Employee updated successfully' });
        });
    }
};


// Delete existing employee
const deleteEmployee = (req, res) => {
    const { employeeId } = req.params;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        const query = 'DELETE FROM employees WHERE employee_id_number=?';
        connection.query(query, [employeeId], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error deleting employee:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Employee deleted successfully' });
        });
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
