import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const CommentItem = ({ commentTree, onReply, level = 0 }) => {
  const { comment, replies } = commentTree;
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    await onReply(replyText, comment.id);
    setReplyText('');
    setShowReplyField(false);
  };

  return (
    <Box ml={level * 4} mt={2} mb={2}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        {comment.authorUsername}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{comment.body}</Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(comment.createdAt).toLocaleString()}
      </Typography>

      <Box>
        <Button size="small" onClick={() => setShowReplyField(!showReplyField)}>
          Responder
        </Button>
      </Box>

      {showReplyField && (
        <Box mt={1}>
          <TextField
            size="small"
            multiline
            fullWidth
            placeholder="Escribe tu respuesta..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button
            size="small"
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={handleSubmitReply}
          >
            Enviar respuesta
          </Button>
        </Box>
      )}

      {replies && replies.map((replyTree) => (
        <CommentItem
          key={replyTree.comment.id}
          commentTree={replyTree}
          onReply={onReply}
          level={level + 1}
        />
      ))}
    </Box>
  );
};

export default CommentItem;
