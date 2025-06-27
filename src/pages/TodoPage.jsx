import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTasks, addTask, toggleTask, removeTask } from '../features/todos/todosSlice';

export default function TodoPage() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.todos.items);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (!newTitle) return;
    // Pass description when adding a task
    dispatch(addTask({ title: newTitle, description: newDescription }));
    setNewTitle('');
    setNewDescription('');
  };

  const handleToggleTask = (task) => {
    dispatch(toggleTask(task.id));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>Мої завдання</Typography>
      <Box display="flex" mb={2} gap={2}>
        <TextField
          fullWidth
          label="Нове завдання"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Опис"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <Button onClick={handleAddTask} variant="contained">Додати</Button>
      </Box>
      <List>
        {items.map(task => (
          <div key={task.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={task.is_completed}
                onChange={() => handleToggleTask(task)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description} // <-- Show description here
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}