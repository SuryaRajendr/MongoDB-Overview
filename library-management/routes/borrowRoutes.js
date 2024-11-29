const express = require('express');
const BorrowRecord = require('../models/borrowRecordModel');
const Book = require('../models/bookModel');
const router = express.Router();

// Borrow a book
router.post('/borrow', async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book || book.copiesAvailable <= 0) {
      return res.status(400).json({ error: 'Book not available' });
    }

    // Create borrow record
    const borrowRecord = await BorrowRecord.create({ memberId, bookId });
    // Update book availability
    book.copiesAvailable -= 1;
    await book.save();

    res.status(201).json(borrowRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Return a book
router.post('/return', async (req, res) => {
  try {
    const { borrowId } = req.body;
    const borrowRecord = await BorrowRecord.findById(borrowId).populate('bookId');

    if (!borrowRecord || borrowRecord.returnDate) {
      return res.status(400).json({ error: 'Invalid borrow record' });
    }

    // Calculate fine (if overdue)
    const returnDate = new Date();
    const dueDate = new Date(borrowRecord.borrowDate);
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks loan period

    let fine = 0;
    if (returnDate > dueDate) {
      const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 10; // Fine: $10/day
    }

    borrowRecord.returnDate = returnDate;
    borrowRecord.fine = fine;
    await borrowRecord.save();

    // Update book availability
    const book = borrowRecord.bookId;
    book.copiesAvailable += 1;
    await book.save();

    res.status(200).json(borrowRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all borrow records
router.get('/', async (req, res) => {
  try {
    const records = await BorrowRecord.find()
      .populate('memberId')
      .populate('bookId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
