import React, { useEffect, useState } from 'react';
import TeamMember from '../components/Team/TeamMember';
import './TeamMembersPage.css';
import axios from 'axios';

const TeamMembersPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/team-members');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const availableMembers = teamMembers.filter(member => !member.currentTask && !member.currentProject);
  const assignedMembers = teamMembers.filter(member => member.currentTask && member.currentProject);

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
              <TeamMember key={member._id} member={member} />
            ))}
          </div>
        </div>
      ))}
      {availableMembers.length > 0 && (
        <div className="available-members">
          <h2>Available Members</h2>
          <div className="available-members-list">
            {availableMembers.map(member => (
              <TeamMember key={member._id} member={member} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
