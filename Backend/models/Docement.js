const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['heading', 'paragraph', 'list', 'checklist', 'table', 'image', 'video', 'audio', 'file']  // Define all block types
    },
    content: mongoose.Schema.Types.Mixed,  // Content can be text, URLs, etc.
    style: { type: Object, default: {} },  // Optional styling (bold, italics)
    metadata: { type: Object, default: {} },  // For media like images or files (file paths, alt text, etc.)
    level: { type: Number },  // For headings (H1, H2, etc.)
    items: { type: [String] },  // For lists or checklists (array of strings)
    completed: { type: [Boolean] },  // For checklists (completion status)
  }, { _id: false });
  
  const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blocks: [blockSchema],  // Array of blocks to support any kind of content
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Document', documentSchema);
  