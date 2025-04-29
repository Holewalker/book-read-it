import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

const TopicListItems = ({ topics, title }) => {
  return (
    <>
      {title && (
        <Typography variant="h5" gutterBottom>{title}</Typography>
      )}
      {(!topics || topics.length === 0) ? (
        <Typography>No hay temas disponibles.</Typography>
      ) : (
        <List>
          {topics.map((topic) => (
            <ListItem
              key={topic.id}
              divider
              component={Link}
              to={`/book/${topic.bookId}/${topic.id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemText
                primary={topic.title}
                secondary={`Creado: ${new Date(topic.createdAt).toLocaleDateString()}`}
              />
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CommentIcon />
              </ListItemIcon>
              <Typography variant="body2">
                {topic.commentCount ?? 0} comentarios
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default TopicListItems;
