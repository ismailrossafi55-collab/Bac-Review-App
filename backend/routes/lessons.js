const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get lessons by subject
router.get('/subject/:subjectId', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find({ subjectId: req.params.subjectId, userId: req.userId }).sort({ createdAt: -1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create lesson
router.post('/',
  auth,
  body('subjectId').notEmpty(),
  body('title').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { subjectId, title, description, content } = req.body;

      const lesson = new Lesson({
        subjectId,
        userId: req.userId,
        title,
        description,
        content
      });

      await lesson.save();
      res.status(201).json({ message: '✅ Lesson created', lesson });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update lesson
router.put('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ message: '✅ Lesson updated', lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete lesson
router.delete('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ message: '✅ Lesson deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
