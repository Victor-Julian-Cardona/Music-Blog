import { Route, Routes } from 'react-router-dom';
import './App.css';
import { BlogPostsProvider } from './Context';
import BlogPost from './components/BlogPost';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {

  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5005/projects')
  //     .then(response => {
  //       setProjects(response.data);
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  //const [postId, setPostId] = useState(1)

  return (
    <>
    <BlogPostsProvider>

    <Navbar />
    <Sidebar />
    <Home />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/post/:id" element={<BlogPost />} />

    </Routes>

      {/* <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search for Track
            <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </label>
        <button type='submit'>Search</button>
      </form>

      {
        searchResults.map((result, i) => {
          return <div key={result.id}>
            <ReactAudioPlayer src={result.preview_url} controls />
            <h2>{i}</h2>
          </div>
        })
      }
      </div> */}
      </BlogPostsProvider>
    </>
  )
}

export default App

