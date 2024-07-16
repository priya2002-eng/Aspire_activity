const { pool } = require('../db');

// Fetch all leave requests with employee details and leave type
const getLeaveRequests = (req, res) => {
  pool.query(
    `SELECT lr.*, e.employee_id_number, e.full_name, lt.leave_type, lr.created_date AS applied_on, lr.status
     FROM leaverequests lr 
     JOIN employees e ON lr.emp_id = e.emp_id 
     JOIN leavetypes lt ON lr.leave_type_id = lt.leave_type_id`,
    (err, results) => {
      if (err) {
        console.error('Error fetching leave requests:', err);
        res.status(500).send('Error fetching leave requests');
        return;
      }
      console.log('Leave Requests:', results);
      res.json(results);
    }
  );
};

// Fetch specific leave request details
const getLeaveRequestById = (req, res) => {
  const requestId = req.params.id;
  pool.query(
    `SELECT lr.*, e.employee_id_number, e.full_name, lt.leave_type
     FROM leaverequests lr 
     JOIN employees e ON lr.emp_id = e.emp_id 
     JOIN leavetypes lt ON lr.leave_type_id = lt.leave_type_id
     WHERE lr.leave_request_id = ?`,
    [requestId],
    (err, results) => {
      if (err) {
        console.error('Error fetching leave request details:', err);
        res.status(500).send('Error fetching leave request details');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Leave request not found');
        return;
      }
      console.log('Leave Request:', results[0]);
      res.json(results[0]);
    }
  );
};

// Update leave request status
const updateLeaveRequestStatus = (req, res) => {
  const requestId = req.params.id;
  const status = req.body.status;

  console.log(`Updating leave request ID ${requestId} to status ${status}`);

  pool.query(
    'UPDATE leaverequests SET status = ? WHERE leave_request_id = ?',
    [status, requestId],
    (err, results) => {
      if (err) {
        console.error('Error updating leave request status:', err);
        res.status(500).send('Error updating leave request status');
        return;
      }
      if (results.affectedRows === 0) {
        console.warn(`Leave request ID ${requestId} not found`);
        res.status(404).send('Leave request not found');
        return;
      }
      console.log(`Leave request ID ${requestId} updated to status ${status}`);
      res.send('Leave request status updated successfully');
    }
  );
};


module.exports = {
  getLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus
};
