import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { createTopic } from '../api/topicApi';

const NewTopicForm = ({ bookId, onCreated }) => {
  const [form, setForm] = useState({ title: '', body: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const newTopic = await createTopic({ ...form, bookId });
      onCreated(newTopic);
      setForm({ title: '', body: '' });
    } catch (err) {
      setError('No se pudo crear el tema.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4} mb={4}>
      <Typography variant="h6" gutterBottom>Crear nuevo tema</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Título del tema"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="body"
          label="Contenido"
          fullWidth
          margin="normal"
          value={form.body}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" disabled={loading}>
          Publicar
        </Button>
      </form>
    </Box>
  );
};

export default NewTopicForm;
