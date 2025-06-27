import axios from 'axios';

const API_URL = '/api/tasks/';

export const fetchTasks = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const addTask = async (newTask, token) => {
  const response = await axios.post(API_URL, newTask, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateTask = async (taskId, updatedTask, token) => {
  const response = await axios.patch(`${API_URL}${taskId}/`, updatedTask, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteTask = async (taskId, token) => {
  await axios.delete(`${API_URL}${taskId}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};