const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// User Routes
router.post('/register',  authController.registerUser);
router.post('/login',  authController.loginUser);
router.post('/check-employee-id',  authController.checkEmployeeId);
router.post('/reset-password',  authController.resetPassword);

// Employee routes
router.get('/employees',  authController.getAllEmployees);
router.post('/employees',  authController.addEmployee);
router.put('/employees/:employeeId',  authController.updateEmployee);
router.delete('/employees/:id', authController.deleteEmployee);

// Leave-types routes
router.get('/leave-types', authController.getAllLeaveTypes);
router.post('/leave-types', authController.addLeaveType);
router.put('/leave-types/:id', authController.updateLeaveType);
router.delete('/leave-types/:id', authController.deleteLeaveType);

// Leave requests routes
router.get('/leave-requests', authController.getLeaveRequests);
router.get('/employees/:id', authController.getEmployeeDetails);
router.put('/leave-requests/:id', authController.updateLeaveRequestStatus);

// Home counts route
router.get('/counts', authController.fetchCounts);

// for session management
// router.post('/login', authController.loginUser);
// router.post('/logout', authController.logoutUser);

module.exports = router;
