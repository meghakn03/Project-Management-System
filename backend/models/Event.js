const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['important', 'not-important'],
    default: 'not-important',
  },
});

module.exports = mongoose.model('Event', eventSchema);
