import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BookPage from './pages/BookPage';
import { Toolbar } from '@mui/material';
import TagPage from './pages/TagPage';
import CreateBookPage from './pages/CreateBookPage';
import NewTopicPage from './pages/NewTopicPage';
import TopicPage from './pages/TopicPage';

const App = () => {
  return (
    <>
      <TopBar />
      <Toolbar />{
        /* Toolbar para dar espacio */
      }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/book/:bookPageId" element={<BookPage />} />
        <Route path="/create-book" element={<CreateBookPage />} />
        <Route path="/tags/:tagName" element={<TagPage />} />
        <Route path="/book/:bookPageId/new-topic" element={<NewTopicPage />} />
        <Route path="/book/:bookPageId/:topicId" element={<TopicPage />} />

      </Routes>
    </>
  );
};

export default App;
