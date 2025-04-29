import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import TopicListItems from '../components/TopicListItems';

import { getBookPageById } from '../api/bookApi';
import { getTopicsByBookId } from '../api/topicApi';
import { useAuth } from '../hooks/useAuth';

const BookPage = () => {
  const { bookPageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndTopics = async () => {
      try {
        const bookData = await getBookPageById(bookPageId);
        const topicsData = await getTopicsByBookId(bookPageId);
        setBook(bookData);
        setTopics(topicsData);
      } catch (error) {
        console.error('Error al cargar la página del libro', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndTopics();
  }, [bookPageId]);

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (!book) return <Box p={4}><Typography>Libro no encontrado</Typography></Box>;

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Grid container spacing={4}>
          {/* Imagen a la izquierda */}
          <Grid item xs={12} md={3}>
            {book.isbn && (
              <Box>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  alt={`Portada de ${book.title}`}
                  style={{ width: '100%', borderRadius: 8 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200x300?text=Portada+no+disponible';
                    e.target.style.borderRadius = '8px';
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Información a la derecha */}
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>{book.title}</Typography>

            <Typography variant="body2" gutterBottom>
              <strong>ISBN:</strong> {book.isbn || 'No disponible'}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <strong>Creador:</strong> {book.ownerUserId || 'Anónimo'}
            </Typography>

            {book.tags && book.tags.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Etiquetas:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {book.tags.map((tag) => (
                    <Box key={tag} sx={{ bgcolor: '#e0e0e0', px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.85rem' }}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {user && (
        <Box mb={3}>
          <Button
            variant="contained"
            onClick={() => navigate(`/book/${book.id}/new-topic`)}
          >
            Crear nuevo tema
          </Button>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>Temas de discusión</Typography>

      <TopicListItems topics={topics} />
    </Container>
  );
};

export default BookPage;
