import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { getUserByUsername } from '../api/userApi';
import { getTopicsByUserId } from '../api/topicApi';
import TopicListItems from '../components/TopicListItems';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userTopics, setUserTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga usuario y sus temas en orden
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserByUsername(username);
        setUser(userData);
        console.log(userData);

        const topicsData = await getTopicsByUserId(userData.userId);
        setUserTopics(topicsData);
      } catch (error) {
        console.error('Error al cargar perfil o temas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (!user) return <Box p={4}><Typography>Usuario no encontrado</Typography></Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{user.username}</Typography>
      <Typography variant="h6" mt={4}>Temas creados</Typography>
      <TopicListItems
        topics={topics}
        onDelete={(id) => setTopics((prev) => prev.filter((t) => t.id !== id))}
      />
    </Container>
  );
};

export default UserProfile;
