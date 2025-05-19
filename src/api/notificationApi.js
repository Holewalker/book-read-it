import axios from "./axiosInstance";

export const getNotifications = async () => {
  const res = await axios.get('/notifications');
  return res.data;
};

export const markNotificationAsRead = async (notificationId) => {
  await axios.put(`/notifications/${notificationId}/read`);
};
