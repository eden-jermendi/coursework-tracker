import { useState, ChangeEvent } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateCoursework } from '../apis/coursework'
import { Coursework, CourseworkData } from '../../models/coursework'

interface Props {
  coursework: Coursework
}

function UpdateCoursework({ coursework }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: coursework.title,
    unit: coursework.unit,
    status: coursework.status,
    priority: coursework.priority,
    due_date: coursework.due_date ?? '',
    notes: coursework.notes ?? '',
  })

  const queryClient = useQueryClient()

  const updateCourseworkMutation = useMutation({
    mutationFn: ({
      id,
      updatedCoursework,
    }: {
      id: number
      updatedCoursework: CourseworkData
    }) => updateCoursework(id, updatedCoursework),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursework'] })
      setIsEditing(false)
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.currentTarget.value
    const propertyName = e.currentTarget.name
    setFormData({ ...formData, [propertyName]: newValue })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateCourseworkMutation.mutate({
      id: coursework.id,
      updatedCoursework: formData,
    })
  }

  if (!isEditing) {
    return (
      <button
        className="action-button secondary-button"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
    )
  }

  return (
    <form className="form edit-form" onSubmit={handleSubmit}>
      <label htmlFor={`title-${coursework.id}`}>Title: </label>
      <input
        id={`title-${coursework.id}`}
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor={`unit-${coursework.id}`}>Unit: </label>
      <input
        id={`unit-${coursework.id}`}
        type="text"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
      />

      <label htmlFor={`status-${coursework.id}`}>Status: </label>
      <input
        id={`status-${coursework.id}`}
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
      />

      <label htmlFor={`priority-${coursework.id}`}>Priority: </label>
      <input
        id={`priority-${coursework.id}`}
        type="text"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      />

      <label htmlFor={`due_date-${coursework.id}`}>Due date: </label>
      <input
        id={`due_date-${coursework.id}`}
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
      />

      <label htmlFor={`notes-${coursework.id}`}>Notes: </label>
      <textarea
        id={`notes-${coursework.id}`}
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <div className="edit-actions">
        <button className="primary-button save-button" type="submit">
          Save
        </button>
        <button
          className="action-button secondary-button"
          type="button"
          onClick={() => {
            setFormData({
              title: coursework.title,
              unit: coursework.unit,
              status: coursework.status,
              priority: coursework.priority,
              due_date: coursework.due_date ?? '',
              notes: coursework.notes ?? '',
            })
            setIsEditing(false)
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default UpdateCoursework
