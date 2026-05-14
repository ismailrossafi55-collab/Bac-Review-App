const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
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
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'learning', 'reviewing', 'mastered'],
    default: 'new'
  },
  // Spaced Repetition System
  easeFactor: {
    type: Number,
    default: 2.5,
    min: 1.3
  },
  interval: {
    type: Number,
    default: 0 // Days
  },
  nextReviewDate: {
    type: Date,
    default: Date.now
  },
  repetitions: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  image: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', cardSchema);
