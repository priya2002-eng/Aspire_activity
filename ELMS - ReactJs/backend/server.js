const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// const session = require('express-session');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_LOCAL_URI = process.env.DB_LOCAL_URI;

app.use(cors());
app.use(express.json());

// Session setup
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   },
// }));

mongoose.connect(DB_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api', authRoutes); // Ensure routes are prefixed with `/api`

app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
