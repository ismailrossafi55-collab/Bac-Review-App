const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true,
    enum: ['MAT', 'PC', 'SVT', 'PH', 'FR', 'AR', 'IS', 'HG', 'EN'],
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  description: String,
  totalCards: {
    type: Number,
    default: 0
  },
  masteredCards: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
