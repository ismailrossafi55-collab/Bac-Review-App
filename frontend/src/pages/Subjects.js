import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import subjectService from '../services/subjectService';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const SUBJECTS_INFO = {
  MAT: { name: 'الرياضيات', icon: '🧮', color: '#3B82F6' },
  PC: { name: 'الفيزياء والكيمياء', icon: '⚗️', color: '#A855F7' },
  SVT: { name: 'العلوم الطبيعية', icon: '🧬', color: '#10B981' },
  PH: { name: 'الفلسفة', icon: '🤔', color: '#8B4513' },
  FR: { name: 'اللغة الفرنسية', icon: '🇫🇷', color: '#06B6D4' },
  AR: { name: 'اللغة العربية', icon: '📖', color: '#EF4444' },
  IS: { name: 'الدراسات الإسلامية', icon: '☪️', color: '#D4AF37' },
  HG: { name: 'التاريخ والجغرافيا', icon: '🗺️', color: '#F97316' },
  EN: { name: 'اللغة الإنجليزية', icon: '🇬🇧', color: '#1E40AF' },
};

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCode, setSelectedCode] = useState('MAT');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await subjectService.getAll();
      setSubjects(data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubject = async () => {
    try {
      const subjectInfo = SUBJECTS_INFO[selectedCode];
      const response = await subjectService.create({
        code: selectedCode,
        name: subjectInfo.name,
        icon: subjectInfo.icon,
        color: subjectInfo.color,
      });
      setSubjects([...subjects, response.subject]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add subject:', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await subjectService.delete(id);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Failed to delete subject:', error);
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
        <h1 className="text-3xl font-bold text-gray-800">📚 Subjects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Subject
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Subject</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(SUBJECTS_INFO).map(([code, info]) => (
              <button
                key={code}
                onClick={() => setSelectedCode(code)}
                className={`p-4 rounded text-center ${
                  selectedCode === code ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <div className="text-2xl">{info.icon}</div>
                <div className="text-sm font-bold">{code}</div>
              </button>
            ))}
          </div>
          <button
            onClick={handleAddSubject}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add {SUBJECTS_INFO[selectedCode].name}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            style={{ borderLeft: `4px solid ${subject.color}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-4xl">{subject.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{subject.code}</h3>
                  <p className="text-sm text-gray-600">{subject.name}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteSubject(subject._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">Cards: {subject.totalCards}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: subject.totalCards > 0 ? `${(subject.masteredCards / subject.totalCards) * 100}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/lessons/${subject._id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Lessons
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;
