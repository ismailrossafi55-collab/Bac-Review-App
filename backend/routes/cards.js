const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get cards by lesson
router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const cards = await Card.find({ lessonId: req.params.lessonId, userId: req.userId });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cards due for review
router.get('/review/due', auth, async (req, res) => {
  try {
    const cards = await Card.find({
      userId: req.userId,
      nextReviewDate: { $lte: new Date() },
      status: { $ne: 'mastered' }
    }).sort({ nextReviewDate: 1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create card
router.post('/',
  auth,
  body('lessonId').notEmpty(),
  body('subjectId').notEmpty(),
  body('question').notEmpty().trim(),
  body('answer').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { lessonId, subjectId, question, answer, difficulty } = req.body;

      const card = new Card({
        lessonId,
        subjectId,
        userId: req.userId,
        question,
        answer,
        difficulty
      });

      await card.save();
      res.status(201).json({ message: '✅ Card created', card });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update card
router.put('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json({ message: '✅ Card updated', card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete card
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json({ message: '✅ Card deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
