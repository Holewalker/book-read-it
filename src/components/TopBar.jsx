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
import { useNavigate, Link } from 'react-router-dom';

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

  const handleCreateBook = () => {
    navigate('/create-book');
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
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          Book Read It
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            size="small"
            placeholder="Buscar libros o etiquetas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ mr: 2, backgroundColor: 'white', borderRadius: 1 }}
          />
        </form>

        {user ? (
          <>
            <Button color="inherit" onClick={handleCreateBook} sx={{ mr: 1 }}>
              Nuevo libro
            </Button>
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
