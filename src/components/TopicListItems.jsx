import React from 'react';
import { List, Typography } from '@mui/material';
import TopicListItem from './TopicListItem';

const TopicListItems = ({ topics, title, onDelete }) => {
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
            <TopicListItem key={topic.id} topic={topic} onDelete={onDelete} />
          ))}
        </List>
      )}
    </>
  );
};

export default TopicListItems;
