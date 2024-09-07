const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  expectedEndDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'overdue'],
    required: true,
  },
  assignedTo: {
    type: String,  // Assuming assignedTo is a username or user ID as a string
    required: false,  // Optional field
  },
});

module.exports = mongoose.model('Task', taskSchema);
