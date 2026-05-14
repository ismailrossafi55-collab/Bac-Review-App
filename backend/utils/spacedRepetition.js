// SM-2 Algorithm for Spaced Repetition
// Quality scale: 0-5
// 0: Blackout, complete memory loss
// 1: Incorrect response, but correct information recalled
// 2: Incorrect response, with serious difficulty recalling correct information
// 3: Correct response after a hesitation
// 4: Correct response after a moment's pause
// 5: Perfect response

const calculateNextReview = (card, quality) => {
  let { easeFactor, interval, repetitions } = card;

  // Update ease factor
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  // Update interval
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    easeFactor,
    interval,
    nextReviewDate,
    repetitions
  };
};

const getScheduledReviews = () => {
  return {
    first: 1,      // 1 day
    second: 3,     // 3 days
    third: 7,      // 7 days
    fourth: 15,    // 15 days
    fifth: 20      // 20 days
  };
};

module.exports = {
  calculateNextReview,
  getScheduledReviews
};
