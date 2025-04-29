import axios from './axiosInstance';

// Obtener todos los comentarios de un topic
export const getCommentsByTopicId = async (topicId) => {
  const response = await axios.get(`/comments/${topicId}`);
  return response.data;
};

// Crear un nuevo comentario
export const createComment = async (topicId, commentData) => {
  const response = await axios.post(`/comments`, commentData);
  return response.data;
};

// (Opcional) Obtener un comentario por ID
export const getCommentById = async (commentId) => {
  const response = await axios.get(`/comments/${commentId}`);
  return response.data;
};

// (Opcional) Eliminar un comentario
export const deleteComment = async (commentId) => {
  const response = await axios.delete(`/comments/${commentId}`);
  return response.data;
};


export const getCommentTree = async (topicId) => {
  const response = await axios.get(`/comments/tree/${topicId}`);
  return response.data;
};