const Document = require("../models/Docement")
const mongoose = require('mongoose');
// Create a new document with flexible blocks
exports.createDocument = async (req, res) => {
  try {
    const { title, blocks } = req.body;

    // Validate input
    if (!title || !blocks) {
      return res.status(400).json({ message: 'Title and blocks are required.' });
    }

    const document = new Document({
      title,
      blocks,
      userId: req.userId
    });

    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating document', error: err.message });
  }
};


// Get a document by ID
exports.getDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }

    const document = await Document.findById(id).populate('userId collaborators');
    if (!document) return res.status(404).json({ message: 'Document not found' });
    
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching document', error: err.message });
  }
};


// Update a document by ID (title or blocks)
exports.updateDocument = async (req, res) => {
  try {
    const { title, blocks } = req.body;

    if (!title && !blocks) {
      return res.status(400).json({ message: 'At least one of title or blocks must be provided.' });
    }

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { title, blocks, updatedAt: Date.now() },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating document', error: err.message });
  }
};


// Delete a document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }

    const document = await Document.findByIdAndDelete(id);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    
    res.status(204).send(); // No content to send back
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting document', error: err.message });
  }
};


// Add a collaborator to the document
exports.addCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.body;

    // Validate input
    if (!collaboratorId || !mongoose.Types.ObjectId.isValid(collaboratorId)) {
      return res.status(400).json({ message: 'Valid collaborator ID is required.' });
    }

    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.collaborators.includes(collaboratorId)) {
      return res.status(400).json({ message: 'Collaborator already added' });
    }

    document.collaborators.push(collaboratorId);
    await document.save();
    
    res.json({ message: 'Collaborator added', document });
  } catch (err) {
    res.status(500).json({ message: 'Server error while adding collaborator', error: err.message });
  }
};

