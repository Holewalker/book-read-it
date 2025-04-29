import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createBookPage } from '../api/bookApi';

const CreateBookPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    isbn: '',
    title: '',
    tags: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        isbn: form.isbn.trim(),
        title: form.title.trim(),
        ownerUserId: user.id,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };

      await createBookPage(payload);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error al crear el libro.';
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom>Crear página de libro</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="ISBN"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
            label="Etiquetas (separadas por comas)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Crear libro
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBookPage;
