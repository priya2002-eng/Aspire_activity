// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const bcrypt = require('bcryptjs');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Configure MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Delicious@2002',
//   database: 'elms'
// });

// db.connect(err => {
//   if (err) {
//     throw err;
//   }
//   console.log('MySQL connected...');
// });

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle employee ID check
// app.post('/check-employee-id', (req, res) => {
//   const { employeeId } = req.body;

//   const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
//   db.query(checkQuery, [employeeId], (err, results) => {
//     if (err) {
//       console.error('Error checking employee ID:', err);
//       return res.status(500).send('Server error');
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ exists: true });
//     }

//     res.json({ exists: false });
//   });
// });

// // Handle registration
// app.post('/register', (req, res) => {
//   const { fullName, email, employeeId, username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
//   db.query(checkQuery, [employeeId], (err, results) => {
//     if (err) {
//       console.error('Error checking employee ID:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ message: 'User already exists with the entered employee ID' });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 8);

//     const insertQuery = 'INSERT INTO Admins (full_name, email, empid_number, username, password) VALUES (?, ?, ?, ?, ?)';
//     db.query(insertQuery, [fullName, email, employeeId, username, hashedPassword], (err, result) => {
//       if (err) {
//         console.error('Error registering user:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
//       res.json({ message: 'Registration successful' });
//     });
//   });
// });

// // Handle login
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM Admins WHERE username = ?';
//   db.query(query, [username], (err, results) => {
//     if (err) {
//       console.error('Error logging in user:', err);
//       return res.status(500).send('Server error');
//     }

//     if (results.length === 0) {
//       return res.status(400).send('User not found');
//     }

//     const user = results[0];

//     const passwordIsValid = bcrypt.compareSync(password, user.password);

//     if (!passwordIsValid) {
//       return res.status(401).send('Invalid password');
//     }

//     res.send('Login successful');
//   });
// });

// // Serve the main page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Delicious@2002',
  database: 'elms'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle employee ID check
app.post('/check-employee-id', (req, res) => {
  const { employeeId } = req.body;

  const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
  db.query(checkQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Error checking employee ID:', err);
      return res.status(500).send('Server error');
    }

    if (results.length > 0) {
      return res.status(400).json({ exists: true });
    }

    res.json({ exists: false });
  });
});

// Handle registration
app.post('/register', (req, res) => {
  const { fullName, email, employeeId, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const checkQuery = 'SELECT empid_number FROM Admins WHERE empid_number = ?';
  db.query(checkQuery, [employeeId], (err, results) => {
    if (err) {
      console.error('Error checking employee ID:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists with the entered employee ID' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const insertQuery = 'INSERT INTO Admins (full_name, email, empid_number, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [fullName, email, employeeId, username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({ message: 'Registration successful' });
    });
  });
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Admins WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Invalid username or password');
    }

    const user = results[0];

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(404).send('Invalid username or password');
    }

    res.send('Login successful');
  });
});



// Handle forget password
app.post('/reset-password', (req, res) => {
  const { username, newPassword } = req.body;

  const query = 'SELECT * FROM Admins WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Invalid username');
    }

    // Update the user's password in the database
    const user = results[0];
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    const updateQuery = 'UPDATE Admins SET password = ? WHERE username = ?';
    db.query(updateQuery, [hashedPassword, username], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).send('Server error');
      }

      res.send('Password updated successfully');
    });
  });
});


// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
