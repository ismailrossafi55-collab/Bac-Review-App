import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cardService from '../services/cardService';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Cards() {
  const { lessonId } = useParams();
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, [lessonId]);

  const fetchCards = async () => {
    try {
      const data = await cardService.getByLesson(lessonId);
      setCards(data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await cardService.create({
        lessonId,
        subjectId: lessonId.split('-')[0],
        question,
        answer,
        difficulty,
      });
      setCards([...cards, response.card]);
      setQuestion('');
      setAnswer('');
      setDifficulty('medium');
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add card:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await cardService.delete(id);
      setCards(cards.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🎴 Cards</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Card
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCard} className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Card
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Q: {card.question}</h3>
                <p className="text-gray-700 text-sm mb-4"><strong>A:</strong> {card.answer}</p>
              </div>
              <button
                onClick={() => handleDeleteCard(card._id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="flex gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                card.difficulty === 'easy'
                  ? 'bg-green-100 text-green-700'
                  : card.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {card.difficulty}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{card.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
