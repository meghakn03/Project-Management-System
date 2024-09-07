import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './ProjectPage.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const members = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tasks: [{ name: '', member: members[0] }],
    clientDetails: '',
    clientNotes: '',
    startDate: '',
    endDate: '',
    status: 'ongoing',
  });

  // Fetch projects from the backend
  useEffect(() => {
    fetch('http://localhost:4000/api/projects')
      .then((response) => response.json())
      .then((data) => {
        // Calculate the status of each project
        const updatedProjects = data.map((project) => {
          const today = new Date();
          const endDate = new Date(project.end_date);
  
          if (project.completion_completed === 100) {
            project.status = 'completed';
          } else if (today > endDate) {
            project.status = 'overdue';
          } else {
            project.status = 'ongoing';
          }
  
          return project;
        });
        setProjects(updatedProjects);
      })
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);
  

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const index = parseInt(dataset.index, 10);

    if (name === 'taskName') {
      const updatedTasks = [...newProject.tasks];
      updatedTasks[index].name = value;
      setNewProject({
        ...newProject,
        tasks: updatedTasks,
      });
    } else if (name === 'taskMember') {
      const updatedTasks = [...newProject.tasks];
      updatedTasks[index].member = value;
      setNewProject({
        ...newProject,
        tasks: updatedTasks,
      });
    } else {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    }
  };

  const handleAddTask = () => {
    setNewProject({
      ...newProject,
      tasks: [...newProject.tasks, { name: '', member: members[0] }],
    });
  };

  const handleAddProject = () => {
    fetch('http://localhost:4000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newProject.title,
        tasks: newProject.tasks.map(task => task.name),
        members: newProject.tasks.map(task => task.member),
        start_date: newProject.startDate,
        end_date: newProject.endDate,
        completion_completed: 0, // Initialize with 0
        completion_remaining: 100, // Initialize with 100
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects([data, ...projects]);
        setNewProject({
          title: '',
          description: '',
          tasks: [{ name: '', member: members[0] }],
          clientDetails: '',
          clientNotes: '',
          startDate: '',
          endDate: '',
          status: 'ongoing',
        });
      })
      .catch((error) => console.error('Error adding project:', error));
  };

  const projectStatusCounts = projects.reduce(
    (acc, project) => {
      if (project.status === 'completed') {
        acc.completed += 1;
      } else if (project.status === 'ongoing') {
        acc.ongoing += 1;
      } else if (project.status === 'overdue') {
        acc.overdue += 1;
      }
      return acc;
    },
    { completed: 0, ongoing: 0, overdue: 0 }
  );

  const pieChartData = {
    labels: ['Completed', 'Ongoing', 'Overdue'],
    datasets: [
      {
        data: [
          projectStatusCounts.completed,
          projectStatusCounts.ongoing,
          projectStatusCounts.overdue
        ],
        backgroundColor: ['#66ea87', '#e6b86f', '#ab4f5d'],
      }
    ]
  };

  const completedProjects = projects.filter((project) => project.status === 'completed');
  const overdueProjects = projects.filter((project) => project.status === 'overdue');
  const ongoingProjects = projects.filter((project) => project.status === 'ongoing');

  return (
    <div className="project-page">
      <div className="form-container">
        <div className="new-project-form">
          <h2>Add New Project</h2>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleChange}
          />
          <div className="tasks-container">
            {newProject.tasks.map((task, index) => (
              <div key={index} className="task-row">
                <input
                  type="text"
                  name="taskName"
                  placeholder="Task Name"
                  data-index={index}
                  value={task.name}
                  onChange={handleChange}
                />
                <select
                  name="taskMember"
                  data-index={index}
                  value={task.member}
                  onChange={handleChange}
                >
                  {members.map((member, i) => (
                    <option key={i} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <input
            type="text"
            name="clientDetails"
            placeholder="Client Details"
            value={newProject.clientDetails}
            onChange={handleChange}
          />
          <input
            type="text"
            name="clientNotes"
            placeholder="Client Notes"
            value={newProject.clientNotes}
            onChange={handleChange}
          />
          <input
            type="date"
            name="startDate"
            value={newProject.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            value={newProject.endDate}
            onChange={handleChange}
          />
          <button onClick={handleAddProject}>Add Project</button>
        </div>

        <div className="project-columns">
          <div className="completed-projects">
          <div className="project-column">
            <h2>Completed Projects</h2>
            {completedProjects.map((project) => (
              <div key={project._id} className="project-cardd" data-status={project.status}>
                <h3>{project.name}</h3>
                <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Tasks:</strong></p>
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>{task} (Assigned to: {project.members[index]})</li>
                ))}
              </ul>
              <p><strong>Client Details:</strong> {project.clientDetails}</p>
              <p><strong>Client Notes:</strong> {project.clientNotes}</p>
              <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
              </div>
            ))}
                          </div>
          </div>

          <div className="overdue-projects">
          <div className="project-column">
            <h2>Deadline-Crossed Projects</h2>
            {overdueProjects.map((project) => (
              <div key={project._id} className="project-cardd" data-status={project.status}>
                <h3>{project.name}</h3>
                <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Tasks:</strong></p>
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>{task} (Assigned to: {project.members[index]})</li>
                ))}
              </ul>
              <p><strong>Client Details:</strong> {project.clientDetails}</p>
              <p><strong>Client Notes:</strong> {project.clientNotes}</p>
              <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
              </div>
            ))}
                          </div>

          </div>

          <div className="ongoing-projects">
          <div className="project-column">
            <h2>Ongoing Projects</h2>
            {ongoingProjects.map((project) => (
              <div key={project._id} className="project-cardd" data-status={project.status}>
                <h3>{project.name}</h3>
                <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Tasks:</strong></p>
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>{task} (Assigned to: {project.members[index]})</li>
                ))}
              </ul>
              <p><strong>Client Details:</strong> {project.clientDetails}</p>
              <p><strong>Client Notes:</strong> {project.clientNotes}</p>
              <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
              </div>
            ))}
                          </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h2>Project Status Overview</h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default ProjectPage;