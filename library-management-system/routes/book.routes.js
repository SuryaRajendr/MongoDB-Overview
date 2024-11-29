const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

// Add a Book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("libraryId");
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
