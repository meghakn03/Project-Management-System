// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './HomePage.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/projects')  // Ensure the correct API endpoint
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <h1>Project Management System</h1>
      </header>
      <div className="dashboard">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h2 className="project-title">{project.name}</h2>
            <div className="dashboard-content">
              <div className="column">
                <h3>Tasks</h3>
                <ul>
                  {project.tasks[0]?.split(';').map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <h3>Members</h3>
                <ul>
                  {project.members[0]?.split(';').map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <h3>Dates & Timelines</h3>
                <p>Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                <p>End Date: {new Date(project.end_date).toLocaleDateString()}</p>
              </div>
              <div className="column">
                <h3>Completion</h3>
                <Pie
                  data={{
                    labels: ['Completed', 'Remaining'],
                    datasets: [
                      {
                        data: [project.completion_completed, project.completion_remaining],
                        backgroundColor: ['#4CAF50', '#FFC107'],
                        borderColor: '#ffffff',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
