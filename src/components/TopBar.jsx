import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import NotificationsMenu from './NotificationsMenu';
import NotificationAutoReload from './NotificationAutoReload';

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleGoToProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <AppBar position="fixed">
      <NotificationAutoReload />
      <Toolbar>
       
          <img
            src="./src/assets/bookreaditlogowhite.png"
            alt="Logo"
            style={{ height: '60px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
          </Typography>
 
        <form onSubmit={handleSearch}>
          <TextField
            size="small"
            placeholder="Buscar libros..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ mr: 2, backgroundColor: 'white', borderRadius: 1 }}
          />
        </form>

        {user ? (
          <>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => navigate('/create-book')}
            >
              Nuevo libro
            </Button>

            <NotificationsMenu />

            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleGoToProfile}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
