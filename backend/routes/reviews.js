const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Card = require('../models/Card');
const auth = require('../middleware/auth');
const { calculateNextReview } = require('../utils/spacedRepetition');
const { body, validationResult } = require('express-validator');

// Submit review
router.post('/',
  auth,
  body('cardId').notEmpty(),
  body('quality').isInt({ min: 0, max: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { cardId, quality, timeSpent } = req.body;

      // Get card
      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      // Create review record
      const review = new Review({
        cardId,
        lessonId: card.lessonId,
        subjectId: card.subjectId,
        userId: req.userId,
        quality,
        timeSpent
      });

      // Calculate next review using SM-2 algorithm
      const nextReview = calculateNextReview(card, quality);

      // Update card
      card.repetitions += 1;
      card.totalReviews += 1;
      if (quality >= 3) {
        card.correctAnswers += 1;
      }
      card.easeFactor = nextReview.easeFactor;
      card.interval = nextReview.interval;
      card.nextReviewDate = nextReview.nextReviewDate;

      // Update status
      if (card.repetitions === 1) {
        card.status = 'learning';
      } else if (card.repetitions >= 5) {
        card.status = 'mastered';
      } else {
        card.status = 'reviewing';
      }

      await review.save();
      await card.save();

      res.status(201).json({
        message: '✅ Review submitted',
        review,
        card
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user reviews
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.userId }).sort({ reviewedAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
