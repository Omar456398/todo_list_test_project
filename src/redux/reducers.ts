import { createSlice } from '@reduxjs/toolkit';
import { TasksSliceType } from '../types';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], isLoading: false, isError: false } as TasksSliceType,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
