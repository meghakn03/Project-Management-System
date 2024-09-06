const Project = require('../models/projectModel');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      return res.status(200).json({ message: 'No projects' });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new project
const createProject = async (req, res) => {
    const {
      name,
      tasks,
      members,
      start_date,
      end_date,
      completion_completed,
      completion_remaining
    } = req.body;
  
    try {
      const newProject = new Project({
        name,
        tasks,
        members,
        start_date,
        end_date,
        completion_completed,
        completion_remaining
      });
      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  getProjects,
  getProject,
  createProject
};
