import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { CourseworkData } from '../../models/coursework'
import { addCoursework } from '../../client/apis/coursework.ts'

interface Props {
  onAnnounce: (message: string) => void
}

function AddCoursework({ onAnnounce }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    unit: '',
    status: '',
    priority: '',
    due_date: '',
    notes: '',
  })

  const queryClient = useQueryClient()
  const addCourseworkMutation = useMutation({
    mutationFn: (newCoursework: CourseworkData) => addCoursework(newCoursework),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursework'] })
      onAnnounce(`Saved new coursework entry: ${formData.title}.`)
    },
    onError: () => {
      onAnnounce('Unable to save the new coursework entry.')
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
    onAnnounce('Saving new coursework entry.')
    addCourseworkMutation.mutate(formData)
    setFormData({
      title: '',
      unit: '',
      status: '',
      priority: '',
      due_date: '',
      notes: '',
    })
  }

  return (
    <>
      <header className="section-heading form-heading">
        <div>
          <p className="section-label">Planner tools</p>
          <h2 id="add-coursework-title">Add coursework</h2>
        </div>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          onChange={handleChange}
          type="text"
          value={formData.title}
          name="title"
          placeholder="Enter Title here"
        />

        <label htmlFor="unit">Unit: </label>
        <input
          id="unit"
          onChange={handleChange}
          type="text"
          value={formData.unit}
          name="unit"
          placeholder="Enter Unit here"
        />

        <label htmlFor="status">Status: </label>
        <input
          id="status"
          onChange={handleChange}
          type="text"
          value={formData.status}
          name="status"
          placeholder="Enter Status here"
        />

        <label htmlFor="priority">Priority: </label>
        <input
          id="priority"
          onChange={handleChange}
          type="text"
          value={formData.priority}
          name="priority"
          placeholder="Enter Priority here"
        />

        <label htmlFor="due_date">Due date: </label>
        <input
          id="due_date"
          onChange={handleChange}
          type="date"
          value={formData.due_date}
          name="due_date"
          placeholder="Enter Due date here"
        />

        <label htmlFor="notes">Notes: </label>
        <textarea
          id="notes"
          onChange={handleChange}
          value={formData.notes}
          name="notes"
          placeholder="Enter Notes here"
        />
        <button
          className="primary-button"
          type="submit"
          aria-label="Save new coursework entry"
        >
          Save entry
        </button>
      </form>
    </>
  )
}

export default AddCoursework
