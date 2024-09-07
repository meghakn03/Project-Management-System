// src/utils/dateUtils.js
export const getCurrentDate = () => {
    const today = new Date();
    const day = today.toLocaleString('default', { weekday: 'long' });
    const date = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
  
    return { day, date, month, year };
  };
  
  // Function to categorize project based on deadline
  export const categorizeProjectByDeadline = (project) => {
    const today = new Date();
    const endDate = new Date(project.end_date);
  
    if (today > endDate) {
      return 'deadline-crossed';
    } else if (project.completion_remaining === 0) {
      return 'completed';
    } else {
      return 'yet-to-complete';
    }
  };
  