const bcrypt = require('bcryptjs');
const { pool } = require('../db');

exports.resetPassword = (req, res) => {
  const { username, newPassword } = req.body;

  const query = 'SELECT * FROM Admins WHERE username = ?';
  pool.query(query, [username], (err, results) => {
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
    pool.query(updateQuery, [hashedPassword, username], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).send('Server error');
      }

      res.send('Password updated successfully');
    });
  });
};
