// controllers/homeController.js

const { pool } = require('../db');

// Function to fetch dynamic data from the database
async function fetchData(req, res) {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Query to fetch counts for different entities
      const queries = [
        'SELECT COUNT(*) AS empCount FROM employees',
        'SELECT COUNT(*) AS pendingCount FROM leaverequests WHERE status = "pending"',
        'SELECT COUNT(*) AS approvedCount FROM leaverequests WHERE status = "approved"',
        'SELECT COUNT(*) AS declinedCount FROM leaverequests WHERE status = "declined"',
        'SELECT COUNT(*) AS leaveTypesCount FROM leavetypes',
      ];

      const results = {};

      // Execute each query in parallel
      const promises = queries.map((query) => {
        return new Promise((resolve, reject) => {
          connection.query(query, (err, rows) => {
            if (err) {
              console.error('Error executing query:', err);
              return reject(err);
            }

            const key = Object.keys(rows[0])[0];
            results[key] = rows[0][key];
            resolve();
          });
        });
      });

      // Wait for all queries to complete
      Promise.all(promises)
        .then(() => {
          connection.release();
          res.json(results);
        })
        .catch((error) => {
          console.error('Error fetching counts:', error);
          connection.release();
          res.status(500).json({ message: 'Server error' });
        });
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { fetchData };
