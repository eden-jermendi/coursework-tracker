import { Coursework } from "../../models/coursework"
import connection from "./connection"

export async function getCoursework(db = connection): Promise<Coursework[]> {
  return db('coursework')
    .select()
    .orderBy('id')
}