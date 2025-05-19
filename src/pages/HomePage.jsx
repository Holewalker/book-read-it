import React, { useState, useEffect } from 'react';
import BookList from '../components/BookListItems.jsx';
import TopicList from '../components/TopicListItems.jsx';
import FollowedTabs from '../components/FollowedTabs';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { getPaginatedBooks, getUserFollowedBooks } from '../api/bookApi.js';
import { getPublicTopics, getUserFollowedTopics } from '../api/topicApi.js';
import { useNotifications } from '../context/NotificationContext';

const HomePage = () => {
  const { reloadNotifications } = useNotifications();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user ? 'followed' : 'public');
  const [books, setBooks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const isPublicView = activeTab === 'public';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && activeTab === 'followed') {
          const [userBooks, userTopics] = await Promise.all([
            getUserFollowedBooks(),
            getUserFollowedTopics(),
          ]);
          setBooks(userBooks);
          setTopics(userTopics);
        } else {
          const [bookPage, publicTopics] = await Promise.all([
            getPaginatedBooks(page, 5),
            getPublicTopics(),
          ]);
          setBooks(bookPage.content);
          setTotalPages(bookPage.totalPages);
          setTopics(publicTopics.slice(0, 5));
        }
      } catch (error) {
        console.error('Error al cargar datos', error);
      }
    };

    fetchData();
    reloadNotifications();
  }, [user, activeTab, page]);

  // Reset page when switching tabs
  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  return (
    <Container sx={{ mt: 4 }}>
      {user && (
        <FollowedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isPublicView ? 'Libros populares' : 'Tus libros'}
        </Typography>
        <BookList books={books} />
        {isPublicView && totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              sx={{ mr: 2 }}
            >
              Anterior
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Página {page + 1} de {totalPages}
            </Typography>
            <Button
              variant="outlined"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((prev) => prev + 1)}
              sx={{ ml: 2 }}
            >
              Siguiente
            </Button>
          </Box>
        )}
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          {isPublicView ? 'Temas recientes' : 'Temas de tus libros'}
        </Typography>
        <TopicList
          topics={topics}
          onDelete={(id) => setTopics((prev) => prev.filter((t) => t.id !== id))}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
