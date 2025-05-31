import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  IconButton,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import {
  assignRole,
  removeRole,
} from '../api/roleApi';
import { getRolesByBookId } from '../api/bookApi';
import { getUserByUsername, getUserById  } from '../api/userApi';

const VALID_ROLES = ['OWNER', 'MODERATOR' ];

const RoleManager = () => {
  const { bookPageId } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('MODERATOR');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleList = await getRolesByBookId(bookPageId);

        setRoles(roleList);

        // Fetch usernames in paralelo
        const users = await Promise.all(
          roleList.map(role => getUserById(role.userId))
        );

        const usernameMap = {};
        users.forEach(user => {
          if (user && user.userId) {
            usernameMap[user.userId] = user.username;
          }
        });
        setUsernames(usernameMap);
      } catch (error) {
        console.error('Error al cargar roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [bookPageId]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await assignRole({
        bookId: bookPageId,
        userId,
        role: newRole,
      });
      setRoles(prev =>
        prev.map(r =>
          r.userId === userId ? { ...r, role: newRole } : r
        )
      );
    } catch (error) {
      console.error('Error al cambiar rol:', error);
    }
  };

  const handleRemove = async (userId) => {
    try {
      await removeRole(bookPageId, userId);
      setRoles(prev => prev.filter(r => r.userId !== userId));
    } catch (error) {
      console.error('Error al eliminar rol:', error);
    }
  };

  const handleAddRole = async () => {
  try {
    const user = await getUserByUsername(newUsername);
    console.log('Usuario encontrado:', user);
    await assignRole({
      bookId: bookPageId,
      userId: user.userId,
      role: newRole,
    });
    // Refresh roles from backend
    const updatedRoles = await getRolesByBookId(bookPageId);
    setRoles(updatedRoles);

    setUsernames(prev => ({
      ...prev,
      [user.userId]: user.username,
    }));

    setNewUsername('');
    setNewRole('MODERATOR');
  } catch (error) {
    console.error('Error al asignar rol:', error);
    alert('No se pudo asignar el rol. Verifica el nombre de usuario.');
  }
};


  if (loading) return <CircularProgress />;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Gestión de roles</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(({ userId, role }) => (
            <TableRow key={userId}>
              <TableCell>{usernames[userId] || userId}</TableCell>
              <TableCell>
                <Select
                  value={role}
                  onChange={(e) => handleRoleChange(userId, e.target.value)}
                  size="small"
                >
                  {VALID_ROLES.map(r => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {role !== 'OWNER' && (
                  <IconButton onClick={() => handleRemove(userId)} size="small">
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box mt={4}>
  <Typography variant="h6">Asignar nuevo rol</Typography>
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
    <TextField
      label="Nombre de usuario"
      value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
      size="small"
    />
    <Select
      value={newRole}
      onChange={(e) => setNewRole(e.target.value)}
      size="small"
    >
      {VALID_ROLES.filter(r => r !== 'OWNER').map(r => (
        <MenuItem key={r} value={r}>{r}</MenuItem>
      ))}
    </Select>
    <Button variant="contained" onClick={handleAddRole}>Asignar</Button>
  </Box>
</Box>


    </Box> 
  );
};

export default RoleManager;
