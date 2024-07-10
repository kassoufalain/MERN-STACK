const express = require('express');
const {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController');

const router = express.Router();

// Get all notes
router.get('/', getNotes);

// Get note by id
router.get('/:id', getNote);

// Post a new note (auto id given)
router.post('/', createNote);

// Delete note by id 
router.delete('/:id', deleteNote);

// Update a note
router.patch('/:id', updateNote);

module.exports = router;
