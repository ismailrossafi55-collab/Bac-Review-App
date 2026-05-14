const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const Subject = require('../models/Subject');
const Lesson = require('../models/Lesson');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Get overall stats
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.userId });
    const reviews = await Review.find({ userId: req.userId });
    const subjects = await Subject.find({ userId: req.userId });

    const stats = {
      totalCards: cards.length,
      masteredCards: cards.filter(c => c.status === 'mastered').length,
      learningCards: cards.filter(c => c.status === 'learning').length,
      reviewingCards: cards.filter(c => c.status === 'reviewing').length,
      newCards: cards.filter(c => c.status === 'new').length,
      totalReviews: reviews.length,
      totalSubjects: subjects.length,
      masteryPercentage: cards.length > 0 ? Math.round((cards.filter(c => c.status === 'mastered').length / cards.length) * 100) : 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get subject stats
router.get('/subject/:subjectId', auth, async (req, res) => {
  try {
    const cards = await Card.find({ subjectId: req.params.subjectId, userId: req.userId });
    const subject = await Subject.findById(req.params.subjectId);

    const stats = {
      subject: subject?.name,
      totalCards: cards.length,
      masteredCards: cards.filter(c => c.status === 'mastered').length,
      learningCards: cards.filter(c => c.status === 'learning').length,
      masteryPercentage: cards.length > 0 ? Math.round((cards.filter(c => c.status === 'mastered').length / cards.length) * 100) : 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get today's stats
router.get('/today/progress', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayReviews = await Review.find({
      userId: req.userId,
      reviewedAt: { $gte: today }
    });

    const duCards = await Card.find({
      userId: req.userId,
      nextReviewDate: { $lte: new Date() },
      status: { $ne: 'mastered' }
    });

    res.json({
      reviewsToday: todayReviews.length,
      dueCards: duCards.length,
      completedToday: todayReviews.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
