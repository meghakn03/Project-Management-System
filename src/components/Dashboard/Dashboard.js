// src/components/Dashboard/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);

  return (
    <div>
      <h1>Welcome, {userInfo?.name}</h1>
      <h2>Your Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
