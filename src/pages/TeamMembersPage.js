import React from 'react';
import TeamMember from '../components/Team/TeamMember';
import './TeamMembersPage.css';
import femaleProfile from '../assets/female.jpg';
import maleProfile from '../assets/male.webp';
import maleProfile1 from '../assets/male1.webp';

// Sample data for team members
const teamMembersData = [
    {
        id: 1,
        profilePicture: femaleProfile,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        currentTask: 'Design the new UI',
        currentProject: 'Project Alpha',
        pastProjects: ['Project Beta', 'Project Gamma'],
        incompleteTasks: ['Design the new UI'],
        completedTasks: ['Setup environment', 'Create wireframes'],
        overdueTasks: ['Review design mockups'],
    },
    {
        id: 2,
        profilePicture: maleProfile,
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        currentTask: null,
        currentProject: null,
        pastProjects: ['Project Delta'],
        incompleteTasks: [],
        completedTasks: ['Setup database', 'API integration'],
        overdueTasks: [],
    },
    {
        id: 3,
        profilePicture: maleProfile1,
        fullName: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        currentTask: 'Backend Development',
        currentProject: 'Project Alpha',
        pastProjects: ['Project Beta'],
        incompleteTasks: ['Backend Development'],
        completedTasks: ['Setup backend environment'],
        overdueTasks: [],
    },
    {
        id: 4,
        profilePicture: maleProfile1,
        fullName: 'Bob Brown',
        email: 'bob.brown@example.com',
        currentTask: 'Testing',
        currentProject: 'Project Beta',
        pastProjects: ['Project Alpha'],
        incompleteTasks: ['Testing'],
        completedTasks: ['Setup test environment'],
        overdueTasks: [],
    },
    {
        id: 5,
        profilePicture: maleProfile1,
        fullName: 'Bob Brown',
        email: 'bob.brown@example.com',
        currentTask: 'Testing',
        currentProject: 'Project Beta',
        pastProjects: ['Project Alpha'],
        incompleteTasks: ['Testing'],
        completedTasks: ['Setup test environment'],
        overdueTasks: [],
    },
    {
        id: 6,
        profilePicture: maleProfile1,
        fullName: 'Bob Brown',
        email: 'bob.brown@example.com',
        currentTask: 'Testing',
        currentProject: 'Project Beta',
        pastProjects: ['Project Alpha'],
        incompleteTasks: ['Testing'],
        completedTasks: ['Setup test environment'],
        overdueTasks: [],
    },
];

const TeamMembersPage = () => {
    const availableMembers = teamMembersData.filter(member => !member.currentTask && !member.currentProject);
    const assignedMembers = teamMembersData.filter(member => member.currentTask && member.currentProject);

    // Group assigned members by their current project
    const membersByProject = assignedMembers.reduce((acc, member) => {
        const project = member.currentProject;
        if (!acc[project]) {
            acc[project] = [];
        }
        acc[project].push(member);
        return acc;
    }, {});

    return (
        <div className="team-members-page">
            <h1>Team Members</h1>
            {Object.keys(membersByProject).map(project => (
                <div key={project} className="project-section">
                    <h2>{project}</h2>
                    <div className="project-members">
                        {membersByProject[project].map(member => (
                            <TeamMember key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            ))}
            {availableMembers.length > 0 && (
                <div className="available-members">
                    <h2>Available Members</h2>
                    <div className="available-members-list">
                        {availableMembers.map(member => (
                            <TeamMember key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TeamMembersPage;
