// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './components/Task/TaskPage'; // Import the TaskPage component
import Sidebar from './components/Sidebar';
import TeamMembersPage from './pages/TeamMembersPage'; // Import the TeamMembersPage component
import CalendarPage from './components/Calendar/CalendarPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/tasks" element={<TaskPage />} /> {/* Add this route */}
            <Route path="/team" element={<TeamMembersPage />} /> {/* Add Team Members route */}
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
