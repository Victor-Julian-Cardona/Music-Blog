import { useEffect, useState } from 'react';

import axios from 'axios';

import { Buffer } from 'buffer';

import ReactAudioPlayer from 'react-audio-player';
import './App.css';
import Navbar from './components/Navbar';
// import './assets/getToken';

function App() {
  const [spotifyApiToken, setSpotifyApiToken] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: { Authorization: `Bearer ${spotifyApiToken}` }
    })
    .then((results) => {
      console.log("Search results", results.data)
      setSearchResults(results.data.tracks.items)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    axios.post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' }, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(import.meta.env.VITE_SPOTIFY_ID + ':' + import.meta.env.VITE_SPOTIFY_SECRET).toString('base64'))
      }
    })
      .then((response) => {
        console.log("Spotify response", response)
        setSpotifyApiToken(response.data.access_token)
      })
      .catch((err) => {
        console.log("Spotify/Axios Error ==>", err)
      })
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <p>balls</p>
        {/* <spotifyEmbed /> */}
      </div>

      <div>
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
      </div>
    </>
  )
}

export default App

