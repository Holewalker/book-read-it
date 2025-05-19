
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext'; // Ajusta la ruta según dónde esté

const NotificationAutoReload = () => {
  const location = useLocation();
  const { reloadNotifications } = useNotifications();

  useEffect(() => {
    reloadNotifications();
  }, [location.pathname]);

  return null;
};

export default NotificationAutoReload;
