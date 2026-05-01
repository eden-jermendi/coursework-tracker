import request from 'superagent'

const API_NINJAS_URL = 'https://api.api-ninjas.com/v1/jokes'

export async function getRandomJoke() {
  const apiKey = process.env.API_NINJAS_KEY

  if (!apiKey) {
    throw new Error('Missing API_NINJAS_KEY')
  }

  const response = await request.get(API_NINJAS_URL).set('X-Api-Key', apiKey)

  const data = response.body

  if (!Array.isArray(data) || data.length === 0 || !data[0].joke) {
    throw new Error('Invalid joke response from API Ninjas')
  }

  return {
    joke: data[0].joke,
  }
}
