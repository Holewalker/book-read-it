import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h5">Debes iniciar sesión para ver tu perfil.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Tu perfil
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6">Nombre de usuario</Typography>
            <Typography variant="body1" gutterBottom>{user.username}</Typography>

            <Typography variant="h6">Correo electrónico</Typography>
            <Typography variant="body1" gutterBottom>{user.email}</Typography>

            {/* Puedes agregar más campos si están disponibles en el objeto `user` */}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfilePage;
