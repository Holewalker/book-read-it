import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { deleteTopic } from '../api/topicApi';

const TopicListItem = ({ topic, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner = user && topic.authorUserId === user.id;

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/book/${topic.bookId}/edit-topic/${topic.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este tema?');
    if (!confirmed) return;

    try {
      await deleteTopic(topic.id);
      onDelete?.(topic.id);
    } catch (error) {
      console.error('Error al eliminar el tema:', error);
    }
  };

  return (
    <ListItem divider>
      <ListItemText
        primary={
          <Link
            to={`/book/${topic.bookId}/${topic.id}`}
            style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            {topic.title}
          </Link>
        }
        secondary={`Creado: ${new Date(topic.createdAt).toLocaleDateString()}`}
      />
      <ListItemIcon sx={{ minWidth: 36 }}>
        <CommentIcon />
      </ListItemIcon>
      <Typography variant="body2" sx={{ mr: 2 }}>
        {topic.commentCount ?? 0} comentarios
      </Typography>
      {isOwner && (
        <Box>
          <IconButton edge="end" aria-label="editar" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="eliminar" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </ListItem>
  );
};

export default TopicListItem;
