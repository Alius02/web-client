import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchTasks as fetchTasksAPI, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from './todosAPI';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // 1. Login to get token
      const response = await axios.post('/api/login/', credentials);
      const token = response.data.token;

      // 2. Fetch user profile with token
      const profileRes = await axios.get('/api/users/profile/', {
        headers: { Authorization: `Token ${token}` }
      });

      // 3. Return both token and user info
      return { ...profileRes.data, token };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/register/', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Async thunk for fetching tasks (example) ---
export const fetchTasks = createAsyncThunk(
  'todos/fetchTasks',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchTasksAPI(token);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- User slice state ---
const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('access');

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedToken,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.items = action.payload;
    },
    taskAdded(state, action) {
      state.items.push(action.payload);
    },
    taskToggled(state, action) {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.is_completed = !task.is_completed;
      }
    },
    taskRemoved(state, action) {
      const index = state.items.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('access');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('access', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  }
});

export const { setTasks, taskAdded, taskToggled, taskRemoved, setUser, logout } = todosSlice.actions;

// Add Task
export const addTask = createAsyncThunk(
  'todos/addTask',
  async ({ title, description }, { getState, rejectWithValue }) => {
    try {
      const token = getState().todos.user?.token;
      // Always send both fields, even if description is empty
      return await addTaskAPI({ title, description: description ?? "" }, token);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Toggle Task
export const toggleTask = createAsyncThunk(
  'todos/toggleTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.todos.user?.token;
      const task = state.todos.items.find(t => t.id === taskId);
      const updatedTask = { is_completed: !task.is_completed };
      return await updateTaskAPI(taskId, updatedTask, token);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Remove Task
export const removeTask = createAsyncThunk(
  'todos/removeTask',
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().todos.user?.token;
      await deleteTaskAPI(taskId, token);
      return taskId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const selectAllTasks = (state) => state.todos.items;
export const selectUser = (state) => state.todos.user;
export const selectIsAuthenticated = (state) => state.todos.isAuthenticated;

export default todosSlice.reducer;