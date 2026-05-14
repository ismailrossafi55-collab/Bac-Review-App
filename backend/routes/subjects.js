const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all subjects
router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subject
router.post('/',
  auth,
  body('code').notEmpty().isIn(['MAT', 'PC', 'SVT', 'PH', 'FR', 'AR', 'IS', 'HG', 'EN']),
  body('name').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { code, name, description } = req.body;

      // Check if subject already exists for this user
      const existingSubject = await Subject.findOne({ userId: req.userId, code });
      if (existingSubject) {
        return res.status(400).json({ message: 'Subject already exists' });
      }

      const subject = new Subject({
        userId: req.userId,
        code,
        name,
        description
      });

      await subject.save();
      res.status(201).json({ message: '✅ Subject created', subject });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update subject
router.put('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: '✅ Subject updated', subject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete subject
router.delete('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: '✅ Subject deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
