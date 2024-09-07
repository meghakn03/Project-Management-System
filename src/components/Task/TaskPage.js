// src/components/Task/TaskPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './TaskPage.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    project: '',
    title: '',
    description: '',
    notes: '',
    startDate: '',
    endDate: '',
    expectedEndDate: '',
    status: 'ongoing',
  });

  useEffect(() => {
    // Fetch all tasks on component mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/tasks/${editingTask._id}`, editingTask);
      setTasks(tasks.map(task =>
        task._id === editingTask._id ? response.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddNewTask = async () => {
    try {
      // Setting headers for the request
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // Create the new task object with required properties
      const newTaskPayload = {
        project: newTask.project || 'Project Delta',
        title: newTask.title || 'Task 3',
        description: newTask.description || 'Description for Task 1',
        notes: newTask.notes || 'Notes from manager',
        startDate: newTask.startDate || '2024-08-01',
        endDate: newTask.endDate || '2024-08-10',
        expectedEndDate: newTask.expectedEndDate || '2024-08-09',
        status: newTask.status || 'completed',
        assignedTo: newTask.assignedTo || 'Bob',
      };
  
      // Make the POST request to add the new task
      const response = await axios.post('http://localhost:4000/api/tasks', newTaskPayload, config);
  
      // Update the task list with the newly added task
      setTasks([...tasks, response.data]);
  
      // Reset the newTask state to initial values
      setNewTask({
        project: '',
        title: '',
        description: '',
        notes: '',
        startDate: '',
        endDate: '',
        expectedEndDate: '',
        status: 'ongoing',
        assignedTo: '',
      });
  
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Calculate task status counts
  const taskStatusCounts = tasks.reduce(
    (acc, task) => {
      if (task.status === 'completed') {
        acc.completed += 1;
      } else if (task.status === 'ongoing') {
        acc.ongoing += 1;
      } else if (task.status === 'overdue') {
        acc.overdue += 1;
      }
      return acc;
    },
    { completed: 0, ongoing: 0, overdue: 0 }
  );

  const pieChartData = {
    labels: ['Completed', 'Ongoing', 'Overdue'],
    datasets: [
      {
        data: [
          taskStatusCounts.completed,
          taskStatusCounts.ongoing,
          taskStatusCounts.overdue,
        ],
        backgroundColor: ['#66ea87', '#e6b86f', '#ab4f5d'],
      },
    ],
  };

  // Group tasks by project
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.project]) {
      acc[task.project] = [];
    }
    acc[task.project].push(task);
    return acc;
  }, {});

  return (
    <div className="task-page">
      <div className="tasks-list">
        {Object.keys(groupedTasks).map((project) => (
          <div key={project} className="project-tasks">
            <h2>{project}</h2>
            <div className="task-cards-container">
              {groupedTasks[project].map((task) => (
                <div key={task._id} className={`task-card ${task.status}`}>
                  <h3>{task.title}</h3>
                  <p><strong>Description:</strong> {task.description}</p>
                  <p><strong>Notes:</strong> {task.notes}</p>
                  <p><strong>Start Date:</strong> {task.startDate}</p>
                  <p><strong>End Date:</strong> {task.endDate}</p>
                  <p><strong>Expected End Date:</strong> {task.expectedEndDate}</p>
                  {task.status === 'completed' && (
                    <>
                      <p><strong>Completion Date:</strong> {task.endDate}</p>
                    </>
                  )}
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                  {/* New Edit Button */}
                  <button onClick={() => handleEditClick(task)}>Edit Details</button>
                </div>
              ))}
            </div>
            <button className="add-task-button" onClick={() => setNewTask({ ...newTask, project })}>
              Add Task
            </button>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h2>Task Status Overview</h2>
        <Pie data={pieChartData} />
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal">
          <h2>Edit Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={editingTask.title}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editingTask.description}
            onChange={handleEditChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={editingTask.notes}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="startDate"
            value={editingTask.startDate}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="endDate"
            value={editingTask.endDate}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="expectedEndDate"
            value={editingTask.expectedEndDate}
            onChange={handleEditChange}
          />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}

      {/* Add New Task Form */}
      {newTask.project && (
        <div className="modal">
          <h2>Add New Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleAddTaskChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleAddTaskChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={newTask.notes}
            onChange={handleAddTaskChange}
          />
          <input
            type="date"
            name="startDate"
            value={newTask.startDate}
            onChange={handleAddTaskChange}
          />
          <input
            type="date"
            name="endDate"
            value={newTask.endDate}
            onChange={handleAddTaskChange}
          />
          <input
            type="date"
            name="expectedEndDate"
            value={newTask.expectedEndDate}
            onChange={handleAddTaskChange}
          />
          <select name="status" value={newTask.status} onChange={handleAddTaskChange}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <button onClick={handleAddNewTask}>Add Task</button>
          <button onClick={() => setNewTask({ ...newTask, project: '' })}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
