// src/pages/ProjectPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Project Page</h1>
      <p>Details for project with ID: {id}</p>
      {/* Add more details and components as needed */}
    </div>
  );
};

export default ProjectPage;
