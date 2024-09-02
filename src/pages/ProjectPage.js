import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './ProjectPage.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const initialProjects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'Description for Project Alpha',
    tasks: [
      { name: 'Task 1', member: 'Alice' },
      { name: 'Task 2', member: 'Bob' }
    ],
    clientDetails: 'Client Alpha Details',
    clientNotes: 'Client Alpha Notes',
    startDate: '2024-08-01',
    endDate: '2024-12-01',
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Description for Project Beta',
    tasks: [
      { name: 'Task A', member: 'Dave' },
      { name: 'Task B', member: 'Eve' }
    ],
    clientDetails: 'Client Beta Details',
    clientNotes: 'Client Beta Notes',
    startDate: '2024-07-01',
    endDate: '2024-11-01',
    status: 'completed',
  },
];

const members = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];

const ProjectPage = () => {
  const [projects, setProjects] = useState(initialProjects);
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
    setProjects([
      { ...newProject, id: projects.length + 1, status: 'ongoing' },
      ...projects,
    ]);
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
        <div className="projects-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-cardd"
              data-status={project.status}
            >
              <h2>{project.title}</h2>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Tasks:</strong></p>
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>{task.name} (Assigned to: {task.member})</li>
                ))}
              </ul>
              <p><strong>Client Details:</strong> {project.clientDetails}</p>
              <p><strong>Client Notes:</strong> {project.clientNotes}</p>
              <p><strong>Start Date:</strong> {project.startDate}</p>
              <p><strong>End Date:</strong> {project.endDate}</p>
            </div>
          ))}
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
