const express = require("express");
const router = express.Router();
const BorrowRecord = require("../models/borrowRecord.model");

// Borrow a Book
router.post("/", async (req, res) => {
  try {
    const newRecord = new BorrowRecord(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Borrow Records
router.get("/", async (req, res) => {
  try {
    const records = await BorrowRecord.find()
      .populate("memberId")
      .populate("bookId");
    res.status(200).json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
