import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BlogPostsProvider } from './Context';
import BlogPost from './components/BlogPost';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState('Please select Song');

  return (
    <>
      <BlogPostsProvider>
        <BrowserRouter>

          <Navbar />
          <Sidebar />

          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search setSelectedPreviewUrl={setSelectedPreviewUrl} />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/create" element={<FormPage selectedPreviewUrl={selectedPreviewUrl} />} />

          </Routes>

        </BrowserRouter>
      </BlogPostsProvider>
    </>
  )
}

export default App

