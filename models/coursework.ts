export interface CourseworkData {
  title: string
  unit: string
  status: string
  priority: string
  due_date: string | null
  notes: string | null
}

export interface Coursework extends CourseworkData {
  id: number
  created_at: string
  updated_at: string
}

