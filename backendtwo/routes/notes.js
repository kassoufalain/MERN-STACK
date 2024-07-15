const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Define routes
router.get('/', noteController.getAllNotes); // Example endpoint for fetching all notes
router.post('/', noteController.createNote); // Example endpoint for creating a new note
router.get('/', noteController.getNotCompletedNotes); 

module.exports = router;
