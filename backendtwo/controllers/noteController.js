const Note = require('../models/noteModel'); // Adjust based on your model path

// Fetch all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fetch not completed notes
const getNotCompletedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ completed: false });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching not completed notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new note
const createNote = async (req, res) => {
  try {
    const { description, completed } = req.body;
    
    // Ensure req.user and req.user._id are properly set
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user._id; // Adjust according to your database structure

    // Create a new note
    const newNote = await Note.create({ userId, description, completed });

    // Send back the newly created note as response
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllNotes,
  getNotCompletedNotes,
  createNote
  // Add other controller methods as needed
};
