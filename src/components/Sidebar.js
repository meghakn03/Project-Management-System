// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Project Management</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
        <li><Link to="/"><i className="icon-dashboard"></i> Dashboard</Link></li>
        <li><Link to="/projects"><i className="icon-projects"></i> Projects</Link></li>
          <li><Link to="/tasks"><i className="icon-tasks"></i> Tasks</Link></li>
          <li><Link to="/team"><i className="icon-team"></i> Team Members</Link></li>
          <li><Link to="/calendar"><i className="icon-calendar"></i> Calendar</Link></li>
          <li><Link to="/reports"><i className="icon-reports"></i> Reports</Link></li>
          <li><Link to="/settings"><i className="icon-settings"></i> Settings</Link></li>
          <li><Link to="/help"><i className="icon-help"></i> Help & Support</Link></li>
          <li><Link to="/logout"><i className="icon-logout"></i> Logout</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
