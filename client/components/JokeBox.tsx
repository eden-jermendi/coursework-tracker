import { useState, useEffect } from 'react'
import { fetchRandomJoke } from '../apis/jokes'
import { playLaughSound } from '../utils/sound.ts'

export default function JokeBox() {
  const [joke, setJoke] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('joke_audio_muted')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('joke_audio_muted', isMuted.toString())
  }, [isMuted])

  async function handleGetJoke() {
    if (!isMuted) {
      playLaughSound()
    }
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

        <div className="joke-actions">
          <button type="button" onClick={handleGetJoke} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Random Joke'}
          </button>

          <button
            type="button"
            className={`mute-button ${isMuted ? 'is-muted' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute joke sounds' : 'Mute joke sounds'}
          >
            <img
              src={
                isMuted
                  ? '/images/volume/volume-off.svg'
                  : '/images/volume/volume-2.svg'
              }
              alt=""
              className="mute-icon"
            />
          </button>
        </div>

        {error && <p>{error}</p>}

        {!error && joke && <p>{joke}</p>}
      </div>

      <div className="spotify-container">
        <iframe
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
