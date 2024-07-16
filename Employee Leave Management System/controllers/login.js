const bcrypt = require('bcryptjs');
const { pool } = require('../db');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Admins WHERE username = ?';
  pool.query(query, [username], (err, results) => {
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
};
