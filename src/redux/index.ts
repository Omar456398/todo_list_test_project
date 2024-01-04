import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers.ts';

const store = configureStore({
    reducer: {
      tasks: tasksReducer
    }
  })

export default store;