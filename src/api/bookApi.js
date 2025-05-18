import axios from "./axiosInstance";

export const getPublicBooks = async () => {
  const response = await axios.get("/book-pages");
  return response.data;
};

export const getPaginatedBooks = async (page = 0, size = 10) => {
  const res = await axios.get(
    `/book-pages/paginated?page=${page}&size=${size}`
  );
  return res.data;
};

export const getBookPageById = async (bookPageId) => {
  const response = await axios.get(`/book-pages/${bookPageId}`);
  return response.data;
};

export const createBookPage = async (bookData) => {
  const response = await axios.post("/book-pages", bookData);
  return response.data;
};

export const getUserFollowedBooks = async () => {
  const response = await axios.get("/book-pages/me/followed-books");
  return response.data;
};

export const searchBooks = async (query, page = 0, size = 10) => {
  const response = await axios.get("/book-pages/search", {
    params: { query, page, size },
  });
  return response.data;
};
