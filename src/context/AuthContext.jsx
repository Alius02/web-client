import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/todos/todosSlice'; // Assuming you have a user slice

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('access');
    if (saved) {
      setToken(saved);
      dispatch(setUser(saved)); // Dispatch user info if needed
    }
  }, [dispatch]);

  const login = (newToken) => {
    localStorage.setItem('access', newToken);
    setToken(newToken);
    dispatch(setUser(newToken)); // Dispatch user info if needed
  };

  const logout = () => {
    localStorage.removeItem('access');
    setToken(null);
    dispatch(setUser(null)); // Clear user info
  };

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated: !!token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}