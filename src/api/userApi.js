import axios from './axiosInstance';

export const getUserByUsername = async (username) => {
  const response = await axios.get(`/users/username/${username}`);
  return response.data;
};

export const followBook = (bookId) =>
  axios.put(`/users/me/follow-book/${bookId}`);

export const unfollowBook = (bookId) =>
  axios.put(`/users/me/unfollow-book/${bookId}`);

export const getUserFollowedBooksList = async () => {
  const response = await axios.get('/users/me/followed-books-list');
  return response.data;
};

export const getUserNamebyId = async (userId) => {
  const response = await axios.get(`/users/${userId}/username`);
  return response.data;
}



export const getUserById = async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};




