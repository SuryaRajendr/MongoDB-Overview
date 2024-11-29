const express = require('express');
const Enrollment = require('../models/enrollmentModel');
const router = express.Router();

// Enroll a student in a course
router.post('/', async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all enrollments with populated student and course data
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId')
      .populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
