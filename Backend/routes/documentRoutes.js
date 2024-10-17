const express = require('express');
const {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  addCollaborator
} = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a new document
router.post('/', authMiddleware, createDocument);

// Get a document by ID
router.get('/:id', authMiddleware, getDocument);

// Update a document by ID
router.put('/:id', authMiddleware, updateDocument);

// Delete a document by ID
router.delete('/:id', authMiddleware, deleteDocument);

// Add a collaborator to a document
router.put('/:id/collaborator', authMiddleware, addCollaborator);

module.exports = router;
