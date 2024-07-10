require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('../models/userModel'); 
const createToken = require('../utils/createToken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONG;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.post('/api/auth/signup', signupUser);
app.post('/api/auth/login', loginUser);


module.exports = {
  loginUser,
  signupUser
};
