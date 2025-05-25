import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const REPLIES_PAGE_SIZE = 2;
const MAX_NESTED_DEPTH = 2;

const CommentItem = ({ commentTree, onReply, level = 0 }) => {
  const { comment, replies = [] } = commentTree;
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [visibleReplies, setVisibleReplies] = useState(REPLIES_PAGE_SIZE);
  const [showNestedReplies, setShowNestedReplies] = useState(level < MAX_NESTED_DEPTH);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    await onReply(replyText, comment.id);
    setReplyText('');
    setShowReplyField(false);
  };

  const handleShowMoreReplies = () => {
    setVisibleReplies((prev) => prev + REPLIES_PAGE_SIZE);
  };

  const handleShowNested = () => {
    setShowNestedReplies(true);
  };

  return (
    <Box ml={level * 4} mt={2} mb={2}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
        component={Link}
        to={`/users/${comment.authorUsername}`}
      >
        {comment.authorUsername}
      </Typography>

      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {comment.body}
      </Typography>

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

      <Divider sx={{ mt: 2, mb: 2 }} />

      {showNestedReplies ? (
        <>
          {replies.slice(0, visibleReplies).map((replyTree) => (
            <CommentItem
              key={replyTree.comment.id}
              commentTree={replyTree}
              onReply={onReply}
              level={level + 1}
            />
          ))}
          {replies.length > visibleReplies && (
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={handleShowMoreReplies}
            >
              Ver más respuestas
            </Button>
          )}
        </>
      ) : (
        replies.length > 0 && (
          <Button
            size="small"
            sx={{ mt: 1 }}
            onClick={handleShowNested}
          >
            Ver respuestas
          </Button>
        )
      )}
    </Box>
  );
};

export default CommentItem;
