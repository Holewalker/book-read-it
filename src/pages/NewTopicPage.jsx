// src/pages/NewTopicPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import NewTopicForm from '../components/NewTopicForm';

const NewTopicPage = () => {
  const { bookPageId } = useParams();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mt={4} mb={2}>
        Crear nuevo tema
      </Typography>
      <NewTopicForm bookId={bookPageId} onCreated={() => window.history.back()} />
    </Container>
  );
};

export default NewTopicPage;
