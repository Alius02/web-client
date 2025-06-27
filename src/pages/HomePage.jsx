import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h3" gutterBottom>
        Ласкаво просимо до To-Do List App
      </Typography>
      <Button component={Link} to="/login" variant="contained" sx={{ mr:2 }}>
        Увійти
      </Button>
      <Button component={Link} to="/register" variant="outlined">
        Зареєструватися
      </Button>
    </Box>
  );
}