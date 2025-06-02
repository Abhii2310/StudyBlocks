// routes/note.js
const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');

// CRUD routes for Note
router.post('/', NoteController.createNote);      // Create
router.get('/', NoteController.getNotes);         // Read all
router.get('/:id', NoteController.getNoteById);   // Read one
router.put('/:id', NoteController.updateNote);    // Update
router.delete('/:id', NoteController.deleteNote); // Delete

module.exports = router;
