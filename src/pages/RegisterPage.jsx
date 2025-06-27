import { useDispatch } from 'react-redux';
import { registerUser } from '../features/todos/todosSlice';
import { useState } from 'react';
import { Box, TextField, Button, Grid, MenuItem } from '@mui/material';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
    gender: '',
    date_of_birth: '',
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = () => {
    if (form.password !== form.confirm) return;
    const { confirm, ...data } = form; // не відправляйте confirm
    dispatch(registerUser(data));
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TextField label="Ім’я" fullWidth value={form.username} onChange={handleChange('username')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" fullWidth value={form.email} onChange={handleChange('email')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Стать" fullWidth select value={form.gender} onChange={handleChange('gender')}>
            <MenuItem value="M">Чоловік</MenuItem>
            <MenuItem value="F">Жінка</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Дата народження"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.date_of_birth}
            onChange={handleChange('date_of_birth')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Пароль" fullWidth type="password" value={form.password} onChange={handleChange('password')} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Підтвердити пароль" fullWidth type="password" value={form.confirm} onChange={handleChange('confirm')} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={submit}>Зареєструватися</Button>
        </Grid>
      </Grid>
    </Box>
  );
}