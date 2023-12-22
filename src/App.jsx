import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BlogPostsProvider } from './Context';
import { FormDataProvider } from './FormContext';
import Navbar from './components/Navbar';
import About from './pages/About';
import BlogPostPage from './pages/BlogPostPage';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState('');

  return (
    <>
      <BlogPostsProvider>
        <FormDataProvider>
          <BrowserRouter>

            <Navbar />

            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route path="/search" element={<Search setSelectedPreviewUrl={setSelectedPreviewUrl} />} />
              <Route path="/post/:id" element={<BlogPostPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/create/:id" element={<FormPage selectedPreviewUrl={selectedPreviewUrl} />} />
              <Route path="/update/:id" element={<FormPage selectedPreviewUrl={selectedPreviewUrl} />} />

            </Routes>

          </BrowserRouter>
        </FormDataProvider>
      </BlogPostsProvider>
    </>
  )
}

export default App

