const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [String], // Array of task descriptions
  members: [String], // Array of member names
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  completion_completed: { type: Number, required: true },
  completion_remaining: { type: Number, required: true },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
