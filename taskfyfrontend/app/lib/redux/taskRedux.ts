import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interfaces";

const TaskSlice = createSlice({
  name: "task",
  initialState: {
    Task: [] as Task[],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get Task
    getTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.Task = action.payload;
      state.error = false;
    },
    getTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Delete Task
    deleteTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.Task.splice(
        state.Task.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Update Task
    updateTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.Task[
        state.Task.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.Task;
    },
    updateTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Create Task
    addTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.Task.push(action.payload);
    },
    addTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update Task Order
    updateTaskOrder: (state, action: PayloadAction<Task[]>) => {
      state.Task = action.payload;
    },
  },
});

export const {
  getTaskStart,
  getTaskSuccess,
  getTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
  updateTaskOrder,
} = TaskSlice.actions;
export default TaskSlice.reducer;
