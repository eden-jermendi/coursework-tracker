import { useState } from 'react'
import { fetchRandomJoke } from '../apis/jokes'
import { playLaughSound } from '../utils/sound.ts'

export default function JokeBox() {
  const [joke, setJoke] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGetJoke() {
    playLaughSound()
    try {
      setIsLoading(true)
      setError('')

      const data = await fetchRandomJoke()
      setJoke(data.joke)
    } catch (err) {
      setError('Could not load a joke right now.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="joke-content">
        <h2>Need a study break?</h2>

        <button type="button" onClick={handleGetJoke} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Random Joke'}
        </button>

        {error && <p>{error}</p>}

        {!error && joke && <p>{joke}</p>}
      </div>

      <div className="spotify-container">
        <iframe
          style={{ borderRadius: '18px' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Study Playlist"
        ></iframe>
      </div>
    </section>
  )
}
