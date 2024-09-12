const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamMemberController');

// GET all team members
router.get('/', getTeamMembers);

// POST create a new team member
router.post('/', createTeamMember);

// PUT update an existing team member
router.put('/:id', updateTeamMember);

// DELETE a team member
router.delete('/:id', deleteTeamMember);

module.exports = router;
