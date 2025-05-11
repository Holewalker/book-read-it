import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createBookPage } from '../api/bookApi';
import axios from 'axios';

const CreateBookPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    isbn: '',
    title: '',
    tags: '',
  });

  const [error, setError] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const fetchBookData = async () => {
    const trimmed = form.isbn.trim();
    if (!trimmed) return;

    try {
      const res = await axios.get(`https://openlibrary.org/isbn/${trimmed}.json`);
      setForm(prev => ({
        ...prev,
        title: res.data.title || prev.title,
      }));
      setCoverUrl(`https://covers.openlibrary.org/b/isbn/${trimmed}-L.jpg`);
    } catch {
      setCoverUrl(null);
      setError('No se pudo obtener información del ISBN.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        isbn: form.isbn.trim(),
        title: form.title.trim(),
        ownerUserId: user.id,
        tags: form.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== ''),
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
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="ISBN"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={fetchBookData}
                fullWidth
              >
                Buscar ISBN
              </Button>
            </Grid>
          </Grid>

          {coverUrl && (
            <Box mt={2} textAlign="center">
              <img
                src={coverUrl}
                alt="Portada"
                style={{ maxWidth: '200px', borderRadius: 8 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200x300?text=No+portada';
                }}
              />
            </Box>
          )}

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
