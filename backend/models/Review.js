const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quality: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    description: '0=forgot, 3=difficult, 4=ok, 5=perfect'
  },
  reviewedAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  reviewDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
