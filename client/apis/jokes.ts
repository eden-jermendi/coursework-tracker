import request from 'superagent'

export async function fetchRandomJoke() {
  const response = await request.get('/api/v1/joke')
  return response.body
}
