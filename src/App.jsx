import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { BlogPostsProvider } from './Context';
import BlogForm from './components/Form';
import Navbar from './components/Navbar';

function App() {
  // const [spotifyApiToken, setSpotifyApiToken] = useState('')
  // const [searchTerm, setSearchTerm] = useState('')
  // const [searchResults, setSearchResults] = useState([])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
  //     headers: { Authorization: `Bearer ${spotifyApiToken}` }
  //   })
  //   .then((results) => {
  //     console.log("Search results", results.data)
  //     setSearchResults(results.data.tracks.items)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
  
  // useEffect(() => {
  //   axios.post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' }, {
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'Authorization': 'Basic ' + (Buffer.from(import.meta.env.VITE_SPOTIFY_ID + ':' + import.meta.env.VITE_SPOTIFY_SECRET).toString('base64'))
  //     }
  //   })
  //     .then((response) => {
  //       console.log("Spotify response", response)
  //       setSpotifyApiToken(response.data.access_token)
  //     })
  //     .catch((err) => {
  //       console.log("Spotify/Axios Error ==>", err)
  //     })
  // }, [])



  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(err => console.error(err));
  }, []);


  

  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Search" component={Search} />
        {/* Other routes */}
      </Switch>
    </Router>

      <BlogPostsProvider>

      <Navbar />

      <div>
        <p>balls</p>
      </div>

      <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          {/* Render other project details */}
        </div>
      ))}
      </div>

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
      <BlogForm />
      </BlogPostsProvider>
    </>
  )
}

export default App

