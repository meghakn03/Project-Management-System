// src/components/Task/TaskPage.js
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './TaskPage.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const initialTasks = [
  {
    id: 1,
    project: 'Project Alpha',
    title: 'Task 1',
    description: 'Description for Task 1',
    notes: 'Notes from manager',
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    expectedEndDate: '2024-08-09',
    status: 'completed',
  },
  {
    id: 2,
    project: 'Project Alpha',
    title: 'Task 2',
    description: 'Description for Task 2',
    notes: 'Notes from member',
    startDate: '2024-08-05',
    endDate: '2024-08-15',
    expectedEndDate: '2024-08-14',
    status: 'ongoing',
  },
  {
    id: 3,
    project: 'Project Beta',
    title: 'Task A',
    description: 'Description for Task A',
    notes: 'Notes from manager',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    expectedEndDate: '2024-07-09',
    status: 'overdue',
  },
  {
    id: 4,
    project: 'Project Beta',
    title: 'Task B',
    description: 'Description for Task B',
    notes: 'Notes from member',
    startDate: '2024-07-05',
    endDate: '2024-07-15',
    expectedEndDate: '2024-07-14',
    status: 'completed',
  },
];

const TaskPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
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

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const handleAddTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddNewTask = () => {
    setTasks([
      ...tasks,
      { ...newTask, id: tasks.length + 1 }
    ]);
    setNewTask({
      project: '',
      title: '',
      description: '',
      notes: '',
      startDate: '',
      endDate: '',
      expectedEndDate: '',
      status: 'ongoing',
    });
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
                <div key={task.id} className={`task-card ${task.status}`}>
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
          <button onClick={handleAddNewTask}>Add Task</button>
          <button onClick={() => setNewTask({ ...newTask, project: '' })}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
