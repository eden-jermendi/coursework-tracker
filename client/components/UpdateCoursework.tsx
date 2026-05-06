import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateCoursework } from '../apis/coursework'
import { Coursework, CourseworkData } from '../../models/coursework'
import { useFocusTrap } from '../utils/accessibility'

interface Props {
  coursework: Coursework
  onAnnounce: (message: string) => void
}

function UpdateCoursework({ coursework, onAnnounce }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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
  const modalRef = useRef<HTMLElement | null>(null)

  const queryClient = useQueryClient()

  const handleClose = () => {
    setIsAnimating(false)
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setIsEditing(false)
      setFormData({
        title: coursework.title,
        unit: coursework.unit,
        status: coursework.status,
        priority: coursework.priority,
        due_date: coursework.due_date ?? '',
        notes: coursework.notes ?? '',
      })
    }, 300)
  }

  useFocusTrap(modalRef, isEditing, () => handleClose())

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
      handleClose()
    },
    onError: () => {
      onAnnounce(`Unable to save changes to coursework: ${coursework.title}.`)
    },
  })

  useEffect(() => {
    if (isEditing) {
      // Trigger animation after mount
      const timer = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timer)
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

  return (
    <>
      <button
        className="action-button secondary-button"
        type="button"
        aria-label={`Edit coursework: ${coursework.title}`}
        aria-expanded={isEditing}
        ref={editButtonRef}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>

      {isEditing &&
        createPortal(
          <div className={`modal-overlay ${isAnimating ? 'is-open' : ''}`}>
            <section
              ref={modalRef}
              className="modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`edit-coursework-title-${coursework.id}`}
            >
              <button
                className="modal-close-button"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <header className="section-heading form-heading">
                <div>
                  <p className="section-label">Planner tools</p>
                  <h2 id={`edit-coursework-title-${coursework.id}`}>
                    Edit coursework
                  </h2>
                </div>
              </header>

              <form
                id={`edit-coursework-form-${coursework.id}`}
                className="form"
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
                />
                <label htmlFor={`unit-${coursework.id}`}>Unit: </label>
                <input
                  id={`unit-${coursework.id}`}
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Enter Unit here"
                />

                <label htmlFor={`status-${coursework.id}`}>Status: </label>
                <select
                  id={`status-${coursework.id}`}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                />

                <label htmlFor={`notes-${coursework.id}`}>Notes: </label>
                <textarea
                  id={`notes-${coursework.id}`}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter Notes here"
                />

                <div className="edit-actions">
                  <button
                    className="primary-button save-button"
                    type="submit"
                    aria-label={`Save changes to coursework: ${coursework.title}`}
                  >
                    Save entry
                  </button>
                  <button
                    className="action-button secondary-button"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>,
          document.body,
        )}
    </>
  )
}

export default UpdateCoursework
