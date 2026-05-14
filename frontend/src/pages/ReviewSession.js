import React, { useState, useEffect } from 'react';
import cardService from '../services/cardService';
import reviewService from '../services/reviewService';
import { FiChevronRight } from 'react-icons/fi';

function ReviewSession() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewStats, setReviewStats] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    fetchDueCards();
  }, []);

  const fetchDueCards = async () => {
    try {
      const data = await cardService.getDueForReview();
      setCards(data);
      if (data.length === 0) {
        setSessionComplete(true);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (quality) => {
    try {
      const card = cards[currentCardIndex];
      await reviewService.submitReview(card._id, quality, 0);

      if (quality >= 3) {
        setReviewStats({ ...reviewStats, correct: reviewStats.correct + 1 });
      } else {
        setReviewStats({ ...reviewStats, incorrect: reviewStats.incorrect + 1 });
      }

      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      } else {
        setSessionComplete(true);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cards.length === 0 && !sessionComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">📚 No cards due for review!</p>
          <p className="text-gray-600 mt-2">Great job! Keep it up.</p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎉 Session Complete!</h1>
          <p className="text-lg text-green-600 mb-2">✅ Correct: {reviewStats.correct}</p>
          <p className="text-lg text-red-600 mb-4">❌ Incorrect: {reviewStats.incorrect}</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const card = cards[currentCardIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-4">
        <p className="text-gray-600">
          Card {currentCardIndex + 1} of {cards.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div
        className="bg-white p-8 rounded-lg shadow-lg h-96 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {!isFlipped ? (
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">Click to reveal answer</p>
            <p className="text-2xl font-bold text-gray-800">{card.question}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">Click to see question</p>
            <p className="text-2xl font-bold text-green-600">{card.answer}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <button
          onClick={() => handleReview(0)}
          className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-bold"
        >
          Forgot
        </button>
        <button
          onClick={() => handleReview(3)}
          className="bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 font-bold"
        >
          Difficult
        </button>
        <button
          onClick={() => handleReview(5)}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold flex items-center justify-center gap-2"
        >
          Perfect <FiChevronRight />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 text-sm">Correct</p>
          <p className="text-2xl font-bold text-green-600">{reviewStats.correct}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-gray-600 text-sm">Incorrect</p>
          <p className="text-2xl font-bold text-red-600">{reviewStats.incorrect}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewSession;
