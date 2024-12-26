import { Dispatch } from "@reduxjs/toolkit";
import {
  addTaskFailure,
  addTaskStart,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  getTaskFailure,
  getTaskStart,
  getTaskSuccess,
  updateTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
} from "./redux/taskRedux";
import { publicRequest } from "./requestMethods";
import { CreateTask, Task, UpdateTask } from "./interfaces";

//get Task
export const getTask = async (dispatch: Dispatch) => {
  dispatch(getTaskStart());
  try {
    const res = await publicRequest.get("/tasks");
    dispatch(getTaskSuccess(res.data));
    console.log("res", res);
  } catch (err) {
    dispatch(getTaskFailure());
    console.error("Req failed:", err);
  }
};

// Add New Task
export const createTask = async (dispatch: Dispatch, Task: CreateTask) => {
  dispatch(addTaskStart());
  try {
    const res = await publicRequest.post("/tasks", Task);
    dispatch(addTaskSuccess(res.data));
  } catch (err) {
    dispatch(addTaskFailure());
    console.error("Req failed:", err);
  }
};

//update Task
export const updateTask = async (
  dispatch: Dispatch,
  newTask: UpdateTask,
  id?: number
) => {
  dispatch(updateTaskStart());
  try {
    const res = await publicRequest.put(`/tasks/${id}`, newTask);

    dispatch(updateTaskSuccess(res.data));
  } catch (err) {
    dispatch(updateTaskFailure());
    console.error("Req failed:", err);
  }
};

// delete Task

export const deleteTask = async (dispatch: Dispatch, id: number) => {
  dispatch(deleteTaskStart());
  try {
    await publicRequest.delete(`/tasks/${id}`);
    dispatch(deleteTaskSuccess(id));
  } catch (err) {
    dispatch(deleteTaskFailure());
    console.error("Req failed:", err);
  }
};
