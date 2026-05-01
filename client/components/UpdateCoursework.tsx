import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateCoursework } from '../apis/coursework'
import { Coursework, CourseworkData } from '../../models/coursework'

interface Props {
  coursework: Coursework
  onAnnounce: (message: string) => void
}

function UpdateCoursework({ coursework, onAnnounce }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false)
  const [formData, setFormData] = useState({
    title: coursework.title,
    unit: coursework.unit,
    status: coursework.status,
    priority: coursework.priority,
    due_date: coursework.due_date ?? '',
    notes: coursework.notes ?? '',
  })
  const editButtonRef = useRef<HTMLButtonElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

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
      onAnnounce(`Saved changes to coursework: ${coursework.title}.`)
      setShouldRestoreFocus(true)
      setIsEditing(false)
    },
    onError: () => {
      onAnnounce(`Unable to save changes to coursework: ${coursework.title}.`)
    },
  })

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (!isEditing && shouldRestoreFocus) {
      editButtonRef.current?.focus()
      setShouldRestoreFocus(false)
    }
  }, [isEditing, shouldRestoreFocus])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.currentTarget.value
    const propertyName = e.currentTarget.name
    setFormData({ ...formData, [propertyName]: newValue })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAnnounce(`Saving changes to coursework: ${coursework.title}.`)
    updateCourseworkMutation.mutate({
      id: coursework.id,
      updatedCoursework: formData,
    })
  }

  if (!isEditing) {
    return (
      <button
        className="action-button secondary-button"
        type="button"
        aria-label={`Edit coursework: ${coursework.title}`}
        aria-expanded={isEditing}
        aria-controls={`edit-coursework-form-${coursework.id}`}
        ref={editButtonRef}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
    )
  }

  return (
    <form
      id={`edit-coursework-form-${coursework.id}`}
      className="form edit-form"
      aria-label={`Edit coursework: ${coursework.title}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor={`title-${coursework.id}`}>Title: </label>
      <input
        id={`title-${coursework.id}`}
        ref={titleInputRef}
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter Title here"
        aria-label={`Title for coursework: ${coursework.title}`}
      />
      <label htmlFor={`unit-${coursework.id}`}>Unit: </label>
      <input
        id={`unit-${coursework.id}`}
        type="text"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        placeholder="Enter Unit here"
        aria-label={`Unit for coursework: ${coursework.title}`}
      />

      <label htmlFor={`status-${coursework.id}`}>Status: </label>
      <input
        id={`status-${coursework.id}`}
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Enter Status here"
        aria-label={`Status for coursework: ${coursework.title}`}
      />

      <label htmlFor={`priority-${coursework.id}`}>Priority: </label>
      <input
        id={`priority-${coursework.id}`}
        type="text"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        placeholder="Enter Priority here"
        aria-label={`Priority for coursework: ${coursework.title}`}
      />

      <label htmlFor={`due_date-${coursework.id}`}>Due date: </label>
      <input
        id={`due_date-${coursework.id}`}
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        placeholder="Enter Due date here"
        aria-label={`Due date for coursework: ${coursework.title}`}
      />

      <label htmlFor={`notes-${coursework.id}`}>Notes: </label>
      <textarea
        id={`notes-${coursework.id}`}
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Enter Notes here"
        aria-label={`Notes for coursework: ${coursework.title}`}
      />

      <div className="edit-actions">
        <button
          className="primary-button save-button"
          type="submit"
          aria-label={`Save changes to coursework: ${coursework.title}`}
        >
          Save
        </button>
        <button
          className="action-button secondary-button"
          type="button"
          aria-label={`Cancel editing coursework: ${coursework.title}`}
          onClick={() => {
            setFormData({
              title: coursework.title,
              unit: coursework.unit,
              status: coursework.status,
              priority: coursework.priority,
              due_date: coursework.due_date ?? '',
              notes: coursework.notes ?? '',
            })
            setShouldRestoreFocus(true)
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
