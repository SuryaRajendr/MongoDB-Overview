const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Library", LibrarySchema);
