const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject } = require('../controllers/projectsController'); // Importing updated controller functions

// Route to get all projects
router.get('/', getProjects);

// Route to get a specific project by ID
router.get('/:id', getProject);

// Route to create a new project
router.post('/', createProject);

module.exports = router;
