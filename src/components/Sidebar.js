import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { getCurrentDate } from '../utils/dateUtils';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState({});

  useEffect(() => {
    // Set selected item based on the current path
    setSelectedItem(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Get current date and set it in state
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Project Management</h2>
        <div className="current-date">
          <p>{currentDate.day}, {currentDate.month} {currentDate.date}, {currentDate.year}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={selectedItem === '/' ? 'active' : ''} onClick={() => setSelectedItem('/')}>
            <Link to="/"><i className="icon-dashboard"></i> Dashboard</Link>
          </li>
          <li className={selectedItem === '/projects' ? 'active' : ''} onClick={() => setSelectedItem('/projects')}>
            <Link to="/projects"><i className="icon-projects"></i> Projects</Link>
          </li>
          <li className={selectedItem === '/tasks' ? 'active' : ''} onClick={() => setSelectedItem('/tasks')}>
            <Link to="/tasks"><i className="icon-tasks"></i> Tasks</Link>
          </li>
          <li className={selectedItem === '/team' ? 'active' : ''} onClick={() => setSelectedItem('/team')}>
            <Link to="/team"><i className="icon-team"></i> Team Members</Link>
          </li>
          <li className={selectedItem === '/calendar' ? 'active' : ''} onClick={() => setSelectedItem('/calendar')}>
            <Link to="/calendar"><i className="icon-calendar"></i> Calendar</Link>
          </li>
          <li className={selectedItem === '/reports' ? 'active' : ''} onClick={() => setSelectedItem('/reports')}>
            <Link to="/report"><i className="icon-reports"></i> Reports</Link>
          </li>
          <li className={selectedItem === '/settings' ? 'active' : ''} onClick={() => setSelectedItem('/settings')}>
            <Link to="/settings"><i className="icon-settings"></i> Settings</Link>
          </li>
          <li className={selectedItem === '/help' ? 'active' : ''} onClick={() => setSelectedItem('/help')}>
            <Link to="/help"><i className="icon-help"></i> Help & Support</Link>
          </li>
          <li className={selectedItem === '/logout' ? 'active' : ''} onClick={() => setSelectedItem('/logout')}>
            <Link to="/logout"><i className="icon-logout"></i> Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
