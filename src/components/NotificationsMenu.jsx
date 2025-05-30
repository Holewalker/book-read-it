import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotificationMenu = () => {

  const { user } = useAuth();
  if (!user) {
    console.warn('NotificationMenu: user is not defined, skipping rendering');
    return null;
  }

  const { notifications, unreadCount, markAsRead, reloadNotifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    reloadNotifications(); // Refresca cada vez que se abre
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    handleClose();
    navigate(`/book/${notification.bookId}/${notification.topicId}`);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { maxHeight: 400, width: 320 },
        }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, pt: 1 }}>
          Notificaciones
        </Typography>
        <Divider sx={{ mb: 1 }} />

        {notifications.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary="No hay notificaciones" />
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleClickNotification(notification)}
              selected={!notification.read}
              sx={{ whiteSpace: 'normal', alignItems: 'flex-start' }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: notification.read ? 'normal' : 'bold',
                    wordWrap: 'break-word',
                    maxWidth: 260,
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {new Date(notification.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
