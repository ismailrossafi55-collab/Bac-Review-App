import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiHome, FiBook, FiBarChart2 } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <span>📚</span> Bac Review
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
            <FiHome /> Home
          </Link>
          <Link to="/subjects" className="flex items-center gap-2 hover:text-blue-600">
            <FiBook /> Subjects
          </Link>
          <Link to="/statistics" className="flex items-center gap-2 hover:text-blue-600">
            <FiBarChart2 /> Stats
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
