// db.js
const mysql = require('mysql');

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to establish database connection
function connectToDB() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
}

module.exports = { connectToDB, pool };
