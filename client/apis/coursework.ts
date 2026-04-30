import request from 'superagent'
import { Coursework } from '../../models/coursework'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getCoursework(): Promise<Coursework[]> {
  const result = await request.get(`${rootURL}/coursework`)

  return result.body.coursework
}
