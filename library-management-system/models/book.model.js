const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, unique: true, required: true },
  libraryId: { type: mongoose.Schema.Types.ObjectId, ref: "Library", required: true },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", BookSchema);
