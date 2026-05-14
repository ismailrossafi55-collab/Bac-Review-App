import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Lessons from './pages/Lessons';
import Cards from './pages/Cards';
import ReviewSession from './pages/ReviewSession';
import Statistics from './pages/Statistics';
import { useAuthStore } from './store/authStore';

function App() {
  const { token, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/subjects" element={token ? <Subjects /> : <Navigate to="/login" />} />
          <Route path="/lessons/:subjectId" element={token ? <Lessons /> : <Navigate to="/login" />} />
          <Route path="/cards/:lessonId" element={token ? <Cards /> : <Navigate to="/login" />} />
          <Route path="/review" element={token ? <ReviewSession /> : <Navigate to="/login" />} />
          <Route path="/statistics" element={token ? <Statistics /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
