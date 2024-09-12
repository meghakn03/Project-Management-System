const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const projectsRoutes = require('./routes/projectsRoutes'); // Adjust the path if needed
const tasksRoutes = require('./routes/tasksRoutes'); // New tasks routes
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const eventRoutes = require('./routes/eventRoutes'); // New events routes


// Use the projects route
app.use('/api/projects', projectsRoutes);
app.use('/api/tasks', tasksRoutes); // Add this line for tasks routes
app.use('/api/team-members', teamMemberRoutes); // Add this line for team member routes
app.use('/api/events', eventRoutes); // Add this line for events routes



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
