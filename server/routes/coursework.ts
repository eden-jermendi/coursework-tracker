import express from 'express'

import * as db from '../db/coursework.ts'
import { CourseworkData } from '../../models/coursework.ts'

const router = express.Router()

//Public endpoint
// GET api/v1/coursework

router.get('/', async (req, res) => {
  try {
    const coursework = await db.getCoursework()

    res.json({ coursework })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/coursework
router.post('/', async (req, res) => {
  const { coursework } = req.body as { coursework: CourseworkData }

  if (!coursework) {
    console.error('No coursework')
    return res.status(400).send('Bad request')
  }

  try {
    const newCoursework = await db.addCoursework(coursework)

    res.status(201).json({ coursework: newCoursework })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// PUT /api/v1/coursework
router.put('/:id', async (req, res) => {
  const { coursework } = req.body as { coursework: CourseworkData }

  const id = Number(req.params.id)

  if (!coursework || !id) {
    console.error('Bad Request - no coursework or id')
    return res.status(400).send('Bad request')
  }

  try {
    const updatedCoursework = await db.updateCoursework(id, coursework)

    res.status(200).json({ coursework: updatedCoursework })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).send('Something went wrong')
    }
  }
})

// DELETE /api/v1/coursework
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('Invalid coursework id')
    return res.status(400).send('Bad request')
  }

  try {
    await db.deleteCoursework(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
