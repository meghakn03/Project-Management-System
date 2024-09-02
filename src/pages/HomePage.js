// src/pages/HomePage.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './HomePage.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const projects = [
  {
    id: 1,
    name: "Project Alpha",
    tasks: ["Task 1", "Task 2", "Task 3"],
    members: ["Alice", "Bob", "Charlie"],
    dates: ["2024-09-01", "2024-10-01"], // Start Date, End Date
    completion: {
      completed: 70,
      remaining: 30
    }
  },
  {
    id: 2,
    name: "Project Beta",
    tasks: ["Task A", "Task B", "Task C"],
    members: ["Dave", "Eve"],
    dates: ["2024-08-15", "2024-09-15"], // Start Date, End Date
    completion: {
      completed: 40,
      remaining: 60
    }
  }
];

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Project Management System</h1>
      </header>
      <div className="dashboard">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h2 className="project-title">{project.name}</h2>
            <div className="dashboard-content">
              <div className="column">
                <h3>Tasks</h3>
                <ul>
                  {project.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <h3>Members</h3>
                <ul>
                  {project.members.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <h3>Dates & Timelines</h3>
                <p>Start Date: {project.dates[0]}</p>
                <p>End Date: {project.dates[1]}</p>
              </div>
              <div className="column">
                <h3>Completion</h3>
                <Pie
                  data={{
                    labels: ['Completed', 'Remaining'],
                    datasets: [
                      {
                        data: [project.completion.completed, project.completion.remaining],
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
