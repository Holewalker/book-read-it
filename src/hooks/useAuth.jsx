import { useState, useEffect, useContext, createContext } from 'react';
import { loginUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
  
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify({
      username: data.username,
      email: data.email,
      role: data.role,
      id: data.id
    }));
  
    setUser({
      username: data.username,
      email: data.email,
      role: data.role,
      id: data.id
    });
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
