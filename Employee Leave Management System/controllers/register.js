const bcrypt = require('bcryptjs');
const { pool } = require('../db');

// Handle employee ID check
exports.checkEmployeeId = (req, res) => {
  const { employeeId } = req.body;

  const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
  pool.query(checkQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Error checking employee ID:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      return res.status(400).json({ exists: true });
    }

    res.json({ exists: false });
  });
};

// Handle registration
exports.registerUser = (req, res) => {
  const { fullName, email, employeeId, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
  pool.query(checkQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Error checking employee ID:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists with the entered employee ID' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const insertQuery = 'INSERT INTO Admins (full_name, email, empid_number, username, password) VALUES (?, ?, ?, ?, ?)';
    pool.query(insertQuery, [fullName, email, employeeId, username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({ message: 'Registration successful' });
    });
  });
};
