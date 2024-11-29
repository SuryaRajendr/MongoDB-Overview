const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  copiesAvailable: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
