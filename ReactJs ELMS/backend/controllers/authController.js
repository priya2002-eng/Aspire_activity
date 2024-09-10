const User = require('../models/User');
const Employee = require('../models/employee');
const LeaveType = require('../models/LeaveType');
const LeaveRequest = require('../models/LeaveRequest');

// Handle user registration
exports.registerUser = async (req, res) => {
    const { fullName, email, employeeId, username, password, confirmPassword } = req.body;

    if (!fullName || !email || !employeeId || !username || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if employee ID is already in use
        user = await User.findOne({ employeeId });
        if (user) {
            return res.status(400).json({ message: 'Employee ID already in use' });
        }

        // Create a new user
        user = new User({
            fullName,
            email,
            employeeId,
            username,
            password,
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'Registration successful' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Handle user login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};  

// Check if employee ID exists
exports.checkEmployeeId = async (req, res) => {
    const { employeeId } = req.body;

    if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const user = await User.findOne({ employeeId });
        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking employee ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Username and new password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Invalid username' });
        }

        // Directly assign the hashed password
        user.password = newPassword;

        // Save the updated user (password will be hashed here by the pre-save hook)
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Employee Controllers
// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send('Error fetching employees');
    }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }
        const employee = new Employee(req.body);
        await employee.save();
        res.json({ message: 'Employee added successfully' });
    } catch (err) {
        res.status(500).send('Error adding employee');
    }
};

// Update an existing employee
exports.updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params; // Use employeeId from route parameters
        const updatedEmployeeData = req.body; // Get updated data from request body

        // Find and update the employee by employeeId (not _id)
        const employee = await Employee.findOneAndUpdate(
            { employeeId: employeeId }, // Search by employeeId
            updatedEmployeeData,
            { new: true, runValidators: true } // Return updated document and run validators
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' }); // Ensure JSON response
        }

        res.json({ message: 'Employee updated successfully', data: employee }); // Return success message and updated data
    } catch (err) {
        console.error('Error updating employee:', err); // Log error for debugging
        res.status(500).json({ message: 'Error updating employee' }); // Ensure JSON response
    }
};


// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).send('Error deleting employee');
    }
};


// Get all leave types
exports.getAllLeaveTypes = async (req, res) => {
    try {
        const leaveTypes = await LeaveType.find();
        res.json(leaveTypes);
    } catch (err) {
        console.error('Error fetching leave types:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new leave type
exports.addLeaveType = async (req, res) => {
    try {
      const { leaveType, description } = req.body;
  
      // Validate required fields
      if (!leaveType || !description) {
        return res.status(400).json({ message: 'Leave type and description are required' });
      }
  
      // Create new leave type
      const newLeaveType = new LeaveType({ leaveType, description });
      await newLeaveType.save();
      
      res.status(201).json(newLeaveType);
    } catch (err) {
      console.error('Error adding leave type:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Update a leave type
exports.updateLeaveType = async (req, res) => {
    try {
        const updatedLeaveType = await LeaveType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedLeaveType) {
            return res.status(404).json({ message: 'Leave type not found' });
        }
        res.json(updatedLeaveType);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a leave type
exports.deleteLeaveType = async (req, res) => {
    try {
        const leaveType = await LeaveType.findByIdAndDelete(req.params.id);
        if (!leaveType) {
            return res.status(404).json({ message: 'Leave type not found' });
        }
        res.json({ message: 'Leave type deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Fetch leave requests
exports.getLeaveRequests = async (req, res) => {
    try {
      const leaveRequests = await LeaveRequest.find({});
      res.json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leave requests', error });
    }
  };
  
  
// In authController.js
// authController.js
exports.getEmployeeDetails = async (req, res) => {
    try {
        const { id } = req.params; // Use id from route parameters

        // Find the employee by employeeId
        const employee = await Employee.findOne({ employeeId: id });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' }); // Ensure JSON response
        }

        res.json(employee); // Return the employee details
    } catch (err) {
        // console.error('Error fetching employee details:', err); // Log error for debugging
        res.status(500).json({ message: 'Error fetching employee details' }); // Ensure JSON response
    }
};

  
  
  
  // Update leave request status
  exports.updateLeaveRequestStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const leaveRequestId = req.params.id;
  
      if (!leaveRequestId) {
        return res.status(400).json({ message: 'Leave Request ID is missing' });
      }
  
      const leaveRequest = await LeaveRequest.findByIdAndUpdate(leaveRequestId, { status }, { new: true });
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave Request not found' });
      }
  
      res.json({ message: 'Leave request status updated successfully', leaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error updating leave request status', error });
    }
  };
  

// Fetch counts for the home page
exports.fetchCounts = async (req, res) => {
    try {
        const empCount = await Employee.countDocuments();
        const leaveTypesCount = await LeaveType.countDocuments();
        const pendingCount = await LeaveRequest.countDocuments({ status: 'Pending' });
        const approvedCount = await LeaveRequest.countDocuments({ status: 'Approved' });
        const declinedCount = await LeaveRequest.countDocuments({ status: 'Declined' });

        res.status(200).json({
            empCount,
            leaveTypesCount,
            pendingCount,
            approvedCount,
            declinedCount
        });
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// done a sample for handling session management
// exports.loginUser = async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = await Employee.findOne({ username });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid username' });
//       }
  
//       const isMatch = await user.comparePassword(password);
  
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
  
//       // Save session
//       req.session.userId = user._id;
//       res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

// // Handle user logout
// exports.logoutUser = (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Logout failed' });
//       }
//       res.clearCookie('connect.sid'); // Clear cookie
//       res.status(200).json({ message: 'Logout successful' });
//     });
//   };
  
//   // Middleware to check if user is authenticated
//   exports.isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//       return next();
//     } else {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   };