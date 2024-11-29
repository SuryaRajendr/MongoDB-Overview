const express = require("express");
const router = express.Router();
const Member = require("../models/member.model");

// Add a Member
router.post("/", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
