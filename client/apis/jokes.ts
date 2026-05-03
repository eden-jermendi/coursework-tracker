import request from 'superagent'

export async function fetchRandomJoke() {
  // We're switching to a public, keyless API so we can call it from the frontend safely
  const response = await request.get(
    'https://official-joke-api.appspot.com/random_joke',
  )
  return {
    joke: `${response.body.setup} ... ${response.body.punchline}`,
  }
}
