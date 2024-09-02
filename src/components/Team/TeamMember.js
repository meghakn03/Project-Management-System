import React from 'react';
import './TeamMember.css';
import { Pie } from 'react-chartjs-2';



const TeamMember = ({ member }) => {
    const {
        profilePicture,
        fullName,
        email,
        currentTask,
        currentProject,
        pastProjects,
        incompleteTasks,
        completedTasks,
        overdueTasks,
    } = member;

    const data = {
        labels: ['Incomplete', 'Completed', 'Overdue'],
        datasets: [
            {
                data: [incompleteTasks.length, completedTasks.length, overdueTasks.length],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    return (
        <div className="team-member-card">
            <img src={profilePicture} alt={`${fullName}`} className="profile-picture" />
            <h3>{fullName}</h3>
            <p>Email: {email}</p>
            <br></br>
            {currentTask && currentProject ? (
                <>
                    <p className="highlight-task">Current Task: {currentTask}</p>
                    <p className="highlight-project">Current Project: {currentProject}</p>
                </>
            ) : (
                <p>Available for new tasks/projects</p>
            )}
            <div className="task-info">
                <p className="highlight-incomplete">Incomplete Tasks: {incompleteTasks.join(', ')}</p>
                <p className="highlight-completed">Completed Tasks: {completedTasks.join(', ')}</p>
                <p className="highlight-overdue">Overdue Tasks: {overdueTasks.join(', ')}</p>
            </div>
            <div className="pie-chart-container">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default TeamMember;
