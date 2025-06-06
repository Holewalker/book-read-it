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

export const getTopicsByUserId = async (userId) => {
  const response = await axios.get(`/topics/user/${userId}`);
  console.log('Response from getTopicsByUserId:', response.data);
  return response.data;
};

export const updateTopic = async (topicId, topicData) => {
  const res = await axios.put(`/topics/${topicId}`, topicData);
  return res.data;
};

export const deleteTopic = async (topicId) => {
  const res = await axios.delete(`/topics/${topicId}`);
  return res.data;
};