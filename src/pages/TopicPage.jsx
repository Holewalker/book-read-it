import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getTopicById } from '../api/topicApi';
import { getCommentTree, createComment } from '../api/commentApi';
import { getUserRolesForBook } from '../api/roleApi'; // 👈 nuevo import
import { useAuth } from '../hooks/useAuth';
import CommentItem from '../components/CommentItem';
import NewCommentForm from '../components/NewCommentForm';

const TopicPage = () => {
  const { topicId } = useParams();
  const { user } = useAuth();

  const [topic, setTopic] = useState(null);
  const [commentTree, setCommentTree] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga topic, árbol de comentarios y roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicData = await getTopicById(topicId);
        const commentsTreeData = await getCommentTree(topicId);

        setTopic(topicData);
        setCommentTree(commentsTreeData);

        if (user && topicData?.bookId) {
          const roles = await getUserRolesForBook(topicData.bookId);
          setUserRoles(roles);
        }
      } catch (error) {
        console.error('Error al cargar el tema o comentarios', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topicId, user]);

  const handleReply = async (body, parentCommentId = null) => {
    try {
      const commentData = {
        topicId,
        authorUserId: user.id,
        body,
        parentCommentId,
        createdAt: Date.now(),
      };
      await createComment(topicId, commentData);
      const updatedTree = await getCommentTree(topicId);
      setCommentTree(updatedTree);
    } catch (error) {
      console.error('Error al responder', error);
    }
  };

  if (loading) {
    return (
      <Box p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!topic) {
    return (
      <Box p={4}>
        <Typography>El tema no fue encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{topic.title}</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{topic.body}</Typography>
      <Typography variant="caption" color="text.secondary">
        Creado el {new Date(topic.createdAt).toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>Comentarios</Typography>

      {user && <NewCommentForm onSubmit={(body) => handleReply(body, null)} />}

      {commentTree.length === 0 ? (
        <Typography>No hay comentarios aún.</Typography>
      ) : (
        commentTree.map((treeItem) => (
          <CommentItem
            key={treeItem.comment.id}
            commentTree={treeItem}
            onReply={handleReply}
            userRoles={userRoles} // 👈 aquí se pasan los roles
          />
        ))
      )}
    </Container>
  );
};

export default TopicPage;
