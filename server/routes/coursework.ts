import express from 'express'

import * as db from '../db/coursework.ts'

const router = express.Router()

//Public endpoint
// GET api/v1/coursework


router.get('/', async (req, res) => {
  try  {
    const coursework = await db.getCoursework()

  res.json({ coursework })
} catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router