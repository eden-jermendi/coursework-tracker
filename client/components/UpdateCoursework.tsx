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
  const pendingFocusRef = useRef(false)
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
      pendingFocusRef.current = true
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
    if (!isEditing && pendingFocusRef.current) {
      editButtonRef.current?.focus()
      pendingFocusRef.current = false
    }
  }, [isEditing])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      <select
        id={`status-${coursework.id}`}
        name="status"
        value={formData.status}
        onChange={handleChange}
        aria-label={`Status for coursework: ${coursework.title}`}
      >
        <option value="To do">To do</option>
        <option value="Draft">Draft</option>
        <option value="Submitted">Submitted</option>
        <option value="Need revisions">Need revisions</option>
      </select>

      <label htmlFor={`priority-${coursework.id}`}>Priority: </label>
      <select
        id={`priority-${coursework.id}`}
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        aria-label={`Priority for coursework: ${coursework.title}`}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

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
            pendingFocusRef.current = true
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
