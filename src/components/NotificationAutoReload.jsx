import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';

const NotificationAutoReload = () => {
  const { user } = useAuth();
  const { reloadNotifications } = useNotifications();

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      console.log('Notificaciones recargadas automáticamente');
      reloadNotifications();
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [user, reloadNotifications]);

  return null;
};


export default NotificationAutoReload;
