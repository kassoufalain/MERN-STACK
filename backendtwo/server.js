require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');

// Create express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

// Database connection
const MONGO_URI = process.env.MONG;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // This option is no longer supported in MongoDB native driver
    useCreateIndex: true // Ensure indexes are created
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
