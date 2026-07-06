import axios from "axios";
import type {  TaskListResponse } from "../utils/interface";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTasks = () => {
  return API.get<TaskListResponse>("/GetTask");
};

export const addTask = (
  task: string,
  disc: string,
  completed: boolean,
  favorite: boolean
) => {
  return API.post<TaskListResponse>("/AddTask", {
    task,
    disc,
    completed,
    favorite,
  });
};

export const updateTask = (
  id: string,
  task: string,
  disc: string
) => {
  return API.put(`/UpdateTask/${id}`, {
    task,
    disc,
  });
};

export const deleteTask = (id: string) => {
  return API.delete(`/DeleteTask/${id}`);
};

export const completeTask = (
  id: string,
  completed: boolean
) => {
  return API.put(`/completeTask/${id}`, {
    completed,
  });
};

export const favoriteTask = (
  id: string,
  favorite: boolean
) => {
  return API.put(`/FavTask/${id}`, {
    favorite,
  });
};