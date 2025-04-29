import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const NewCommentForm = ({ onSubmit }) => {
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!body.trim()) return;
    onSubmit(body);
    setBody('');
  };

  return (
    <Box mb={3}>
      <TextField
        multiline
        fullWidth
        rows={3}
        placeholder="Escribe un comentario sobre el tema..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
        Publicar comentario
      </Button>
    </Box>
  );
};

export default NewCommentForm;
