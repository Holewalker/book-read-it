import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../hooks/useAuth';

const CommentItem = ({ commentTree, onReply, level = 0, userRoles = [] }) => {
  const { comment, replies = [] } = commentTree;
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { user } = useAuth();

  const isDeleted = comment.body === '[deleted]';
  const isAuthor = user?.username === comment.authorUsername;
  const canDelete = isAuthor || (userRoles && (userRoles.role==='OWNER' || userRoles.includes==='MODERATOR'));

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    await onReply(replyText, comment.id);
    setReplyText('');
    setShowReplyField(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('¿Eliminar comentario? El contenido será reemplazado por "[deleted]".');
    if (!confirmed) return;

    try {
      await fetch(`/api/comments/${comment.id}/delete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      comment.body = '[deleted]';
    } catch (e) {
      console.error('Error al eliminar comentario', e);
    }
  };

  return (
    <Box ml={level * 4} mt={2} mb={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
          component={comment.authorUsername ? Link : 'span'}
          to={comment.authorUsername ? `/users/${comment.authorUsername}` : undefined}
        >
          {comment.authorUsername || '[deleted]'}
        </Typography>
        {canDelete && !isDeleted && (
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {comment.body}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(comment.createdAt).toLocaleString()}
      </Typography>

      {!isDeleted && (
        <Box>
          <Button size="small" onClick={() => setShowReplyField(!showReplyField)}>
            Responder
          </Button>
        </Box>
      )}

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

      <Divider sx={{ mt: 2 }} />

      {replies.map((replyTree) => (
        <CommentItem
          key={replyTree.comment.id}
          commentTree={replyTree}
          onReply={onReply}
          level={level + 1}
          userRoles={userRoles}
        />
      ))}
    </Box>
  );
};

export default CommentItem;
