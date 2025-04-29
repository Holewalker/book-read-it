import axios from './axiosInstance';

export const getBooksByTag = async (tag) => {
  const response = await axios.get(`/tags/${tag}/books`);
  return response.data;
};

