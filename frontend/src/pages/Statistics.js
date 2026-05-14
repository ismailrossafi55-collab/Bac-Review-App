import React, { useState, useEffect } from 'react';
import statsService from '../services/statsService';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'];

function Statistics() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await statsService.getOverallStats();
      setStats(data);
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

  const chartData = [
    { name: 'Mastered', value: stats?.masteredCards || 0, fill: '#10B981' },
    { name: 'Learning', value: stats?.learningCards || 0, fill: '#F59E0B' },
    { name: 'Reviewing', value: stats?.reviewingCards || 0, fill: '#3B82F6' },
    { name: 'New', value: stats?.newCards || 0, fill: '#EF4444' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Statistics</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-bold mb-2">Total Cards</p>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalCards}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-bold mb-2">Mastered Cards</p>
          <p className="text-3xl font-bold text-green-600">{stats?.masteredCards}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-bold mb-2">Mastery %</p>
          <p className="text-3xl font-bold text-purple-600">{stats?.masteryPercentage}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-bold mb-2">Total Reviews</p>
          <p className="text-3xl font-bold text-orange-600">{stats?.totalReviews}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Card Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Progress Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Detailed Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">New Cards</p>
            <p className="text-2xl font-bold text-red-600">{stats?.newCards}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Learning</p>
            <p className="text-2xl font-bold text-yellow-600">{stats?.learningCards}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Reviewing</p>
            <p className="text-2xl font-bold text-blue-600">{stats?.reviewingCards}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Mastered</p>
            <p className="text-2xl font-bold text-green-600">{stats?.masteredCards}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Subjects</p>
            <p className="text-2xl font-bold text-purple-600">{stats?.totalSubjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
