import request from 'superagent'
import { Coursework, CourseworkData } from '../../models/coursework'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getCoursework(): Promise<Coursework[]> {
  const result = await request.get(`${rootURL}/coursework`)

  return result.body.coursework
}

export async function addCoursework(
  newCoursework: CourseworkData,
): Promise<Coursework> {
  const result = await request
    .post(`${rootURL}/coursework`)
    .send({ coursework: newCoursework })

  return result.body.coursework
}
