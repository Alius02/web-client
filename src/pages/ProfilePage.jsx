import { useSelector } from 'react-redux';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { selectUser } from '../features/todos/todosSlice';

export default function ProfilePage() {
  const user = useSelector(selectUser);

  if (!user) return <Typography>Завантаження...</Typography>;

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>Профіль</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight:'bold' }}>Ім’я</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight:'bold' }}>Email</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight:'bold' }}>Стать</TableCell>
              <TableCell>{user.profile?.gender || ''}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight:'bold' }}>Дата народження</TableCell>
              <TableCell>{user.profile?.date_of_birth || ''}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" sx={{ mt:2 }} href="/profile">Редагувати профіль</Button>
    </Box>
  );
}