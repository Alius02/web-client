import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import logo from '../logo.svg'; // або свій логотип

export default function AboutPage() {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="140"
          image={logo}
          alt="Логотип"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">To-Do List App</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Цей додаток дозволяє:
            <ul>
              <li>Реєструватися та входити</li>
              <li>Переглядати профіль</li>
              <li>Керувати списком завдань</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}