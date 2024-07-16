const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');
const loginController = require('../controllers/login');
const resetPasswordController = require('../controllers/resetPassword');
const employeeController = require('../controllers/employeeController');
const leaveTypesController = require('../controllers/leave_types');
const manageLeaveController = require('../controllers/manage_leave'); // Import the manage_leave controller
const homeController = require('../controllers/home');

// Handle registration
router.post('/register', registerController.registerUser);

// Handle login
router.post('/login', loginController.loginUser);

// Handle forget password
router.post('/reset-password', resetPasswordController.resetPassword);

// Route to get all employees
router.get('/employees', employeeController.getAllEmployees);

// Route to add a new employee
router.post('/employees', employeeController.addEmployee);

// Route to update an existing employee
router.put('/employees/:id', employeeController.updateEmployee);

// Route to delete an existing employee
router.delete('/employees/:employeeId', employeeController.deleteEmployee);

// Route to get an employee by ID
router.get('/employees/:employeeId', employeeController.getEmployeeById);

// Add a new leave type
router.get('/leavetypes', leaveTypesController.getAllLeaveTypes);
router.post('/leavetypes', leaveTypesController.addLeaveType);
router.put('/leavetypes/:leaveTypeId', leaveTypesController.updateLeaveType);
router.delete('/leavetypes/:leaveTypeId', leaveTypesController.deleteLeaveType);

// Fetch a leave type by ID
router.get('/leavetypes/:leaveTypeId', leaveTypesController.getLeaveTypeByIdController);

// Define routes for leave management
router.get('/leave-requests', manageLeaveController.getLeaveRequests);
router.get('/leave-request/:id', manageLeaveController.getLeaveRequestById);
router.put('/leave-request/:id', manageLeaveController.updateLeaveRequestStatus);

// Route to fetch dynamic data for the home page
router.get('/api/home/counts', homeController.fetchData);

module.exports = router;
