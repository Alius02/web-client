import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/todos/todosSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/', { replace: true });
  }, [dispatch, navigate]);

  return null;
}