import React, { useState, useEffect } from 'react';
import BookList from '../components/BookListItems.jsx';
import TopicList from '../components/TopicListItems.jsx';
import FollowedTabs from '../components/FollowedTabs';
import { useAuth } from '../hooks/useAuth';
import { Box, Container, Typography } from '@mui/material';
import { getPublicBooks } from '../api/bookApi.js';
import { getPublicTopics, getUserFollowedTopics } from '../api/topicApi.js';
import { getUserFollowedBooks } from '../api/bookApi.js';

const HomePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user ? 'followed' : 'public');
  const [books, setBooks] = useState([]);
  const [topics, setTopics] = useState([]);

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
          const [publicBooks, publicTopics] = await Promise.all([
            getPublicBooks(),
            getPublicTopics(),
          ]);
          setBooks(publicBooks);
          setTopics(publicTopics);
        }
      } catch (error) {
        console.error('Error al cargar datos', error);
      }
    };

    fetchData();
  }, [user, activeTab]);

  const isPublicView = activeTab === 'public';

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
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          {isPublicView ? 'Temas recientes' : 'Tus temas'}
        </Typography>
        <TopicList topics={topics} />
      </Box>
    </Container>
  );
};

export default HomePage;
