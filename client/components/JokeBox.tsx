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
      <h2>Need a study break?</h2>

      <button type="button" onClick={handleGetJoke} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Random Joke'}
      </button>

      {error && <p>{error}</p>}

      {!error && joke && <p>{joke}</p>}
    </section>
  )
}
