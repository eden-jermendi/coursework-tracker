import { supabase } from '../supabase'
import { Coursework, CourseworkData } from '../../models/coursework'

// GET - Fetches only the coursework for the logged-in user (handled by RLS)
export async function getCoursework(): Promise<Coursework[]> {
  const { data, error } = await supabase
    .from('coursework')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Coursework[]
}

// POST (add)
export async function addCoursework(
  newCoursework: CourseworkData,
): Promise<Coursework> {
  // We get the current user session to attach the user_id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('User must be logged in to add coursework')

  const { data, error } = await supabase
    .from('coursework')
    .insert([{ ...newCoursework, user_id: user.id }])
    .select()
    .single()

  if (error) throw error
  return data as Coursework
}

// DELETE
export async function deleteCoursework(id: number): Promise<void> {
  const { error } = await supabase.from('coursework').delete().eq('id', id)

  if (error) throw error
}

// UPDATE
export async function updateCoursework(
  id: number,
  newCoursework: CourseworkData,
): Promise<Coursework> {
  const { data, error } = await supabase
    .from('coursework')
    .update(newCoursework)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Coursework
}
