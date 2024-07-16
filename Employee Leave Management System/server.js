// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv').config(); // Add dotenv configuration
const routes = require('./routes/routes');
const { connectToDB } = require('./db'); // Import connectToDB function from db.js

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Call the connectToDB function to establish the database connection
connectToDB();

// Routes
app.use('/', routes);

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

