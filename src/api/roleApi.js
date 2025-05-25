import axios from './axiosInstance';

export const getUserRolesForBook = async (bookId) => {
    const response = await axios.get(`/roles/${bookId}`);
    return response.data;
};

export const assignRole = async ({ bookId, userId, role }) => {
    const response = await axios.post(`/roles/${bookId}`, { userId, bookId, role });
    return response.data;
};

export const removeRole = async (bookId, userId) => {
    const response = await axios.delete(`/roles/${bookId}/${userId}`);
    return response.data;
};

