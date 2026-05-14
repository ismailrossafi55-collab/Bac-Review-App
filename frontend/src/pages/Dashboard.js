import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cardService from '../services/cardService';
import statsService from '../services/statsService';
import { FiPlay, FiTrendingUp } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [todayStats, setTodayStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [overall, today] = await Promise.all([
        statsService.getOverallStats(),
        statsService.getTodayProgress(),
      ]);
      setStats(overall);
      setTodayStats(today);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Dashboard</h1>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-gray-700 font-bold mb-2">Due for Review</h3>
          <p className="text-4xl font-bold text-blue-600">{todayStats?.dueCards || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-gray-700 font-bold mb-2">Completed Today</h3>
          <p className="text-4xl font-bold text-green-600">{todayStats?.reviewsToday || 0}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow">
          <h3 className="text-gray-700 font-bold mb-2">Overall Progress</h3>
          <p className="text-4xl font-bold text-purple-600">{stats?.masteryPercentage || 0}%</p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Total Cards</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalCards || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Mastered</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.masteredCards || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Learning</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.learningCards || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Reviewing</h3>
          <p className="text-3xl font-bold text-gray-800">{stats?.reviewingCards || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/review')}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 text-lg font-bold"
        >
          <FiPlay size={24} /> Start Review Session
        </button>
        <button
          onClick={() => navigate('/subjects')}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 text-lg font-bold"
        >
          <FiTrendingUp size={24} /> Manage Subjects
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
