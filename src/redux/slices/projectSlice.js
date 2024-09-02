// src/redux/slices/projectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload); // Add new project at the start of the list
    },
  },
});

export const { setProjects, setCurrentProject, addProject } = projectSlice.actions;
export default projectSlice.reducer;
