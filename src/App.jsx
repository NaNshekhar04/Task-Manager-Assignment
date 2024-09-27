import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import TaskManager from './components/TaskManager';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/tasks" element={<TaskManager user={user} onLogout={handleLogout} />} />
        <Route path="/" element={
          <div className="home">
          <h1>Welcome to Task Management App</h1>
          <div className="home-links">
            <a href="/login" className="home-link">Login</a>
            <a href="/register" className="home-link">Register</a>
          </div>
        </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
