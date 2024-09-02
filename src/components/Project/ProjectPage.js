// src/components/Project/ProjectPage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjects, addProject } from '../../redux/slices/projectSlice';
import './ProjectPage.css'; // Create this CSS file for styling

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tasks: [],
    clientDetails: '',
    endDate: '',
    startDate: '',
  });

  useEffect(() => {
    // Fetch initial list of projects (replace with actual API call)
    const fetchProjects = async () => {
      // For now, use placeholder data
      const placeholderProjects = [
        {
          id: 1,
          title: 'Project 1',
          description: 'Description for Project 1',
          tasks: ['Task 1', 'Task 2'],
          clientDetails: 'Client A',
          endDate: '2024-12-31',
          startDate: '2024-01-01',
          status: 'ongoing', // "completed", "ongoing", or "overdue"
        },
        // Add more projects here
      ];
      dispatch(setProjects(placeholderProjects));
    };

    fetchProjects();
  }, [dispatch]);

  const handleAddProject = () => {
    dispatch(addProject(newProject));
    setNewProject({
      title: '',
      description: '',
      tasks: [],
      clientDetails: '',
      endDate: '',
      startDate: '',
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Project Management</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Project'}
      </button>

      {showForm && (
        <div className="project-form">
          <input
            type="text"
            name="title"
            value={newProject.title}
            placeholder="Project Title"
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={newProject.description}
            placeholder="Project Description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="clientDetails"
            value={newProject.clientDetails}
            placeholder="Client Details"
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
      )}

      <div className="project-cards">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${
              project.status === 'completed'
                ? 'completed'
                : project.status === 'ongoing'
                ? 'ongoing'
                : 'overdue'
            }`}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Tasks:</strong> {project.tasks.join(', ')}</p>
            <p><strong>Client:</strong> {project.clientDetails}</p>
            <p><strong>Start Date:</strong> {project.startDate}</p>
            <p><strong>End Date:</strong> {project.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
