const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
  profilePicture: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  currentTask: {
    type: String,
    required: false,
  },
  currentProject: {
    type: String,
    required: false,
  },
  pastProjects: {
    type: [String],
    required: false,
  },
  incompleteTasks: {
    type: [String],
    required: false,
  },
  completedTasks: {
    type: [String],
    required: false,
  },
  overdueTasks: {
    type: [String],
    required: false,
  },
}, {
  timestamps: true,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
