import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lessonService from '../services/lessonService';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Lessons() {
  const { subjectId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, [subjectId]);

  const fetchLessons = async () => {
    try {
      const data = await lessonService.getBySubject(subjectId);
      setLessons(data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await lessonService.create({
        subjectId,
        title,
        description,
      });
      setLessons([...lessons, response.lesson]);
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add lesson:', error);
    }
  };

  const handleDeleteLesson = async (id) => {
    try {
      await lessonService.delete(id);
      setLessons(lessons.filter((l) => l._id !== id));
    } catch (error) {
      console.error('Failed to delete lesson:', error);
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
        <h1 className="text-3xl font-bold text-gray-800">📖 Lessons</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Lesson
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddLesson} className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Lesson
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.description}</p>
              </div>
              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">Cards: {lesson.totalCards}</p>
              <button
                onClick={() => navigate(`/cards/${lesson._id}`)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                View Cards
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
