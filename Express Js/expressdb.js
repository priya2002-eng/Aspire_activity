// Title - Implementing Database connection in Express Js
// Author - Priyadharshini S
// Created Date - 30/04/2024

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  const { username, password, mobile, email } = req.body;

  // Create user object
  const user = {
    username,
    password,
    mobile,
    email
  };

  // Read existing data from dbconn.json
  fs.readFile('dbconn.json', 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      res.status(500).send('Error occurred while reading data.');
      return;
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        console.error(parseErr);
        res.status(500).send('Error occurred while parsing data.');
        return;
      }
    }

    // Append new user to the array
    users.push(user);

    // Write updated data back to dbconn.json with pretty formatting
    fs.writeFile('dbconn.json', JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500).send('Error occurred while writing data.');
        return;
      }

      console.log('Data stored successfully:', user);
      res.send('<script>alert("Data stored successfully!"); window.location.href = "/";</script>');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
