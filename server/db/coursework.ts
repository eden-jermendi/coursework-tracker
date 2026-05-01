import { Coursework, CourseworkData } from '../../models/coursework'
import connection from './connection'

export async function getCoursework(db = connection): Promise<Coursework[]> {
  return db('coursework').select()
}

export async function addCoursework(
  coursework: CourseworkData,
  db = connection,
): Promise<Coursework> {
  return db('coursework')
    .insert(coursework)
    .returning('*')
    .then((insertedEntries) => insertedEntries[0])
}

export async function updateCoursework(
  id: number,
  updatedCoursework: CourseworkData,
  db = connection,
): Promise<Coursework> {
  return db('coursework')
    .where({ id })
    .update(updatedCoursework)
    .returning('*')
    .then((updatedEntries) => updatedEntries[0])
}

export async function deleteCoursework(id: number, db = connection) {
  return db('coursework').where({ id }).delete()
}
