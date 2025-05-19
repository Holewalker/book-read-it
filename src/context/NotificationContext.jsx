// context/NotificationContext.jsx
import React, { createContext, useContext, useLocation, useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../api/notificationApi';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  const markAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      reloadNotifications: loadNotifications,
      markAsRead,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};


