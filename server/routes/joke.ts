import express from 'express'
import { getRandomJoke } from '../apis/jokes'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const joke = await getRandomJoke()
    res.json(joke)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch joke' })
  }
})

export default router
