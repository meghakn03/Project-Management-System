const TeamMember = require('../models/teamMemberModel');

// @desc    Get all team members
// @route   GET /api/team-members
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Create a new team member
// @route   POST /api/team-members
// @access  Public
const createTeamMember = async (req, res) => {
  const { profilePicture, fullName, email, currentTask, currentProject, pastProjects, incompleteTasks, completedTasks, overdueTasks } = req.body;
  
  try {
    const newTeamMember = new TeamMember({
      profilePicture,
      fullName,
      email,
      currentTask,
      currentProject,
      pastProjects,
      incompleteTasks,
      completedTasks,
      overdueTasks,
    });

    const savedTeamMember = await newTeamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/team-members/:id
// @access  Public
const updateTeamMember = async (req, res) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team-members/:id
// @access  Public
const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
};

module.exports = {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
