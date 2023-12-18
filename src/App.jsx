import { useState } from 'react'
import './App.css'
import './assets/getToken'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p>balls</p>
        <spotifyEmbed />
      </div>
    </>
  )
}

export default App

