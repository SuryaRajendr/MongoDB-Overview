const express = require("express");
const router = express.Router();
const Library = require("../models/library.model");

// Add a Library
router.post("/", async (req, res) => {
  try {
    const newLibrary = new Library(req.body);
    await newLibrary.save();
    res.status(201).json(newLibrary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Libraries
router.get("/", async (req, res) => {
  try {
    const libraries = await Library.find();
    res.status(200).json(libraries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
