// auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure dotenv is configured to access environment variables

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent as Bearer Token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your .env file
    req.user = decoded; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
