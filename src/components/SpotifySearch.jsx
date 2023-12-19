import axios from 'axios';
import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';

function SearchBar() {

const [spotifyApiToken, setSpotifyApiToken] = useState('')
const [searchTerm, setSearchTerm] = useState('')
const [searchResults, setSearchResults] = useState([])
// const [dropdownVisible, setDropdownVisible] = useState(false);


const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: { Authorization: `Bearer ${spotifyApiToken}` }
    })
    .then((results) => {
        console.log("Search results", results.data)
        setSearchResults(results.data.tracks.items)
        // setDropdownVisible(true)
    })
    .catch((err) => {
        // setDropdownVisible(false)
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Search for Track
                    <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </label>
                <button type='submit'>Search</button>
            </form>

        
            <div>
                {searchResults.map((result, i) => (
                    <div key={result.id}>
                        {/* <ReactAudioPlayer src={result.preview_url} controls /> */}
                        <h3>{result.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchBar