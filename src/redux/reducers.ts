import { createSlice } from '@reduxjs/toolkit';
import { TaskType, TasksSliceType } from '../types';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], isLoading: false, isError: false } as TasksSliceType,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTask: (state, action) => {
      let tasksNew: TaskType[] = JSON.parse(JSON.stringify(state.tasks))
      const taskIdx = tasksNew.findIndex((item)=>item.id === action.payload.id)
      if(taskIdx > -1) {
        tasksNew[taskIdx] = action.payload.task
      }
      state.tasks = tasksNew;
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(item=> item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError, setTask, addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
