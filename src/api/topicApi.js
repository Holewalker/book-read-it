import axios from './axiosInstance';

export const getPublicTopics = async () => {
  const response = await axios.get('/topics');
  return response.data;
};

export const getUserFollowedTopics = async () => {
  const response = await axios.get('/users/me/followed-topics');
  return response.data;
};

export const getTopicsByBookId = async (bookPageId) => {
  const response = await axios.get(`/topics/book/${bookPageId}`);
  return response.data;
};

export const createTopic = async (topicData) => {
  const response = await axios.post('/topics', topicData);
  return response.data;
};

export const getTopicById = async (topicId) => {
  const response = await axios.get(`/topics/${topicId}`);
  return response.data;
};