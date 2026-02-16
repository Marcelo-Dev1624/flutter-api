const mongoose = require('mongoose');

// Define the schema structure
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create and export the model
module.exports = mongoose.model('Item', itemSchema);
