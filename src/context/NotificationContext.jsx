import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getNotifications, markNotificationAsRead } from '../api/notificationApi';
import { useAuth } from '../hooks/useAuth';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const loadNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  }, [user]);

  const markAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  };

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

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
