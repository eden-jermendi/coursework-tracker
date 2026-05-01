import request from 'superagent'
import { Coursework, CourseworkData } from '../../models/coursework'

const rootURL = new URL(`/api/v1`, document.baseURI)

// GET
export async function getCoursework(): Promise<Coursework[]> {
  const result = await request.get(`${rootURL}/coursework`)

  return result.body.coursework
}

// POST (add)
export async function addCoursework(
  newCoursework: CourseworkData,
): Promise<Coursework> {
  const result = await request
    .post(`${rootURL}/coursework`)
    .send({ coursework: newCoursework })

  return result.body.coursework
}

// DELETE
export async function deleteCoursework(id: number): Promise<void> {
  await request.delete(`${rootURL}/coursework/${id}`)
}

// UPDATE
export async function updateCoursework(
  id: number,
  newCoursework: CourseworkData,
): Promise<Coursework> {
  const result = await request
    .put(`${rootURL}/coursework/${id}`)
    .send({ coursework: newCoursework })

  return result.body.coursework
}
