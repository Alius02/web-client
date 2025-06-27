import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/todos/todosSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handle = name => e => setForm({ ...form, [name]: e.target.value });
  
  const submit = async () => {
    try {
      const res = await dispatch(loginUser(form)).unwrap();
      localStorage.setItem('access', res.access);
      navigate('/profile');
    } catch {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <Box maxWidth={360} mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>Вхід</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField label="Ім'я" fullWidth sx={{ mb: 2 }}
        value={form.username} onChange={handle('username')} />
      <TextField label="Пароль" fullWidth type="password" sx={{ mb: 2 }}
        value={form.password} onChange={handle('password')} />
      <Button variant="contained" fullWidth onClick={submit}>
        Увійти
      </Button>
    </Box>
  );
}