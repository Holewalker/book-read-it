import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById, updateTopic } from '../api/topicApi';

const EditTopicPage = () => {
  const { bookId, topicId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topic = await getTopicById(topicId);
        setForm({ title: topic.title, body: topic.body });
      } catch (err) {
        setError('No se pudo cargar el tema.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [topicId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await updateTopic(topicId, form);
      navigate(-1); // vuelve atrás
    } catch (err) {
      setError('Error al actualizar el tema.');
    }
  };

  if (loading) return <Box p={4}><CircularProgress /></Box>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Editar tema</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contenido"
          name="body"
          value={form.body}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          minRows={4}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Guardar cambios
        </Button>
      </form>
    </Container>
  );
};

export default EditTopicPage;
