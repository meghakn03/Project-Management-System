const express = require('express');
const router = express.Router();
const { getProjects, getProject } = require('../controllers/projectsController'); // Importing updated controller functions

// Route to get all projects
router.get('/', getProjects);

// Route to get a specific project by ID
router.get('/:id', getProject);

module.exports = router;
