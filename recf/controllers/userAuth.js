const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Mock user data (Replace this with actual user data from the database)
const users = [
  { id: 1, username: 'investor1', password: 'password1' },
  { id: 2, username: 'investor2', password: 'password2' },
];

// Login route to generate token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;
