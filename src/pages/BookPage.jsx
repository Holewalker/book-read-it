import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import TopicListItems from '../components/TopicListItems';
import { getBookPageById, updateBookTags } from '../api/bookApi';
import { getTopicsByBookId } from '../api/topicApi';
import { followBook, unfollowBook, getUserFollowedBooksList } from '../api/userApi.js';
import { useAuth } from '../hooks/useAuth';

const BookPage = () => {
  const { bookPageId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookPageById(bookPageId);
        const topicsData = await getTopicsByBookId(bookPageId);
        setBook(bookData);
        setTagsInput((bookData.tags || []).join(', '));
        setTopics(topicsData);

        if (user) {
          const followedBooks = await getUserFollowedBooksList();
          setIsFollowed(followedBooks.includes(bookPageId));
        }
      } catch (error) {
        console.error('Error al cargar la página del libro', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookPageId, user]);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await unfollowBook(bookPageId);
      } else {
        await followBook(bookPageId);
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.error('Error al cambiar el estado de seguimiento', err);
    }
  };

  const handleTagSave = async () => {
    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(Boolean);
      await updateBookTags(bookPageId, tags);
      setBook(prev => ({ ...prev, tags }));
      setEditTags(false);
    } catch (err) {
      console.error('Error al guardar etiquetas:', err);
    }
  };

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (!book) return <Box p={4}><Typography>Libro no encontrado</Typography></Box>;

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            {book.isbn && (
              <Box>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  alt={`Portada de ${book.title}`}
                  style={{ width: '100%', borderRadius: 8 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/200x300?text=Portada+no+disponible';
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>{book.title}</Typography>
            <Typography variant="body2"><strong>ISBN:</strong> {book.isbn}</Typography>
            <Typography variant="body2" gutterBottom><strong>Creador:</strong> {book.ownerUserId || 'Anónimo'}</Typography>

            <Box mt={2}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Etiquetas:</Typography>
              {editTags ? (
                <>
                  <TextField
                    fullWidth
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Ej: fantasía, aventuras"
                    sx={{ mt: 1 }}
                  />
                  <Box mt={1}>
                    <Button size="small" variant="contained" onClick={handleTagSave}>Guardar</Button>
                    <Button size="small" sx={{ ml: 1 }} onClick={() => setEditTags(false)}>Cancelar</Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {(book.tags || []).map(tag => (
                    <Link to={`/tags/${tag}`} key={tag} style={{ textDecoration: 'none' }}>
                      <Box sx={{
                        bgcolor: '#e0e0e0',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.85rem',
                        color: 'black'
                      }}>
                        {tag}
                      </Box>
                    </Link>
                  ))}
                </Box>
              )}
              {user?.id === book.ownerUserId && !editTags && (
                <Button size="small" sx={{ mt: 1 }} onClick={() => setEditTags(true)}>Editar etiquetas</Button>
              )}
            </Box>

            {user && (
              <Box mt={3} sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/book/${book.id}/new-topic`)}
                >
                  Crear nuevo tema
                </Button>
                <Button
                  variant="outlined"
                  color={isFollowed ? 'secondary' : 'primary'}
                  onClick={handleFollow}
                >
                  {isFollowed ? 'Dejar de seguir' : 'Seguir libro'}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" gutterBottom>Temas de discusión</Typography>
      <TopicListItems
        topics={topics}
        onDelete={(id) => setTopics((prev) => prev.filter((t) => t.id !== id))}
      />
    </Container>
  );
};

export default BookPage;
