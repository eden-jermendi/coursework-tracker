import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCoursework } from '../apis/coursework'
import AddCoursework from './AddCoursework'
import DeleteCoursework from './DeleteCoursework'
import UpdateCoursework from './UpdateCoursework'
import JokeBox from './JokeBox'
import { useFocusTrap } from '../utils/accessibility'

type SortOption =
  | 'priority-desc'
  | 'priority-asc'
  | 'due_date-asc'
  | 'due_date-desc'
  | 'title-asc'
  | 'title-desc'
  | 'unit-asc'
  | 'unit-desc'
  | ''

const priorityMap: Record<string, number> = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
}

function Home() {
  const [announcement, setAnnouncement] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('priority-desc')
  const [searchQuery, setSearchQuery] = useState('')
  const addButtonRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLElement | null>(null)

  const handleCloseForm = () => {
    setIsFormOpen(false)
    addButtonRef.current?.focus()
  }

  useFocusTrap(modalRef, isFormOpen, handleCloseForm)

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleAnnounce = (message: string) => {
    setAnnouncement(message)
    showNotification(message)
  }

  const handleSuccess = (message: string) => {
    handleAnnounce(message)
    setIsFormOpen(false)
  }

  const {
    data: coursework,
    isPending,
    error,
  } = useQuery({ queryKey: ['coursework'], queryFn: () => getCoursework() })

  if (isPending || !coursework) {
    return (
      <section className="status-panel" role="status" aria-live="polite">
        <p className="status-title">Loading coursework...</p>
        <p>Your study dashboard is on the way.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="status-panel status-panel-error" role="alert">
        <p className="status-title">Error loading coursework</p>
        <p>Try refreshing the page and checking the API connection.</p>
      </section>
    )
  }

  const filteredCoursework = coursework.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedCoursework = [...filteredCoursework].sort((a, b) => {
    if (!sortBy) return 0

    const [key, order] = sortBy.split('-') as [
      'priority' | 'due_date' | 'title' | 'unit',
      'asc' | 'desc',
    ]

    if (key === 'priority') {
      const valA = priorityMap[a.priority] || 0
      const valB = priorityMap[b.priority] || 0
      return order === 'asc' ? valA - valB : valB - valA
    }

    if (key === 'due_date') {
      const dateA = a.due_date ? new Date(a.due_date).getTime() : Infinity
      const dateB = b.due_date ? new Date(b.due_date).getTime() : Infinity
      return order === 'asc' ? dateA - dateB : dateB - dateA
    }

    if (key === 'title' || key === 'unit') {
      const valA = a[key].toLowerCase()
      const valB = b[key].toLowerCase()
      return order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }

    return 0
  })

  return (
    <div className="dashboard-layout" id="main-content">
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>

      {notification && (
        <div className="notification-container">
          <div className="notification">{notification}</div>
        </div>
      )}

      <a href="#coursework-list" className="skip-link">
        Skip Spotify player
      </a>
      <aside className="joke-panel">
        <JokeBox />
      </aside>

      <section
        id="coursework-list"
        className="coursework-panel"
        aria-labelledby="coursework-section-title"
      >
        <header className="section-heading">
          <div>
            <p className="section-label">Stored entries</p>
            <h2 id="coursework-section-title">Current coursework</h2>
          </div>
          <div className="heading-actions">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search coursework by title"
            />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort coursework"
            >
              <option value="">Sort by...</option>
              <option value="priority-desc">Priority (Urgent first)</option>
              <option value="priority-asc">Priority (Low first)</option>
              <option value="due_date-asc">Due Date (Earliest)</option>
              <option value="due_date-desc">Due Date (Latest)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="unit-asc">Unit (A-Z)</option>
              <option value="unit-desc">Unit (Z-A)</option>
            </select>
            <button
              className="add-button-small"
              onClick={() => setIsFormOpen(true)}
              aria-label="Add new coursework"
              ref={addButtonRef}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Course
            </button>
            <p className="section-meta">
              {filteredCoursework.length} item
              {filteredCoursework.length === 1 ? '' : 's'}
            </p>
          </div>
        </header>

        {coursework.length === 0 ? (
          <section className="empty-state" aria-live="polite">
            <p className="status-title">No coursework entries yet</p>
            <p>Add your first coursework item below to start tracking it.</p>
          </section>
        ) : filteredCoursework.length === 0 ? (
          <section className="empty-state" aria-live="polite">
            <p className="status-title">No matches found</p>
            <p>Try a different search term or clear your search.</p>
            <div className="empty-state-actions">
              <button
                className="reset-button"
                onClick={() => setSearchQuery('')}
              >
                Reset Search
              </button>
            </div>
          </section>
        ) : (
          <div className="coursework-list">
            {sortedCoursework.map((coursework) => (
              <section
                className="coursework-entry"
                key={coursework.id}
                aria-labelledby={`coursework-title-${coursework.id}`}
              >
                <header className="entry-header">
                  <div>
                    <p className="entry-label">Coursework</p>
                    <h3 id={`coursework-title-${coursework.id}`}>
                      {coursework.title}
                    </h3>
                  </div>
                  <p className="entry-unit">{coursework.unit}</p>
                </header>

                <table
                  className="coursework-table"
                  aria-label={`Details for coursework: ${coursework.title}`}
                >
                  <tbody>
                    <tr>
                      <th scope="row">Status</th>
                      <td>{coursework.status}</td>
                    </tr>
                    <tr>
                      <th scope="row">Priority</th>
                      <td>{coursework.priority}</td>
                    </tr>
                    <tr>
                      <th scope="row">Due date</th>
                      <td>{coursework.due_date || 'Not set'}</td>
                    </tr>
                    <tr>
                      <th scope="row">Notes</th>
                      <td>{coursework.notes || 'No notes added yet'}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="entry-actions">
                  <DeleteCoursework
                    id={coursework.id}
                    title={coursework.title}
                    onAnnounce={handleAnnounce}
                  />
                  <UpdateCoursework
                    coursework={coursework}
                    onAnnounce={handleAnnounce}
                  />
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      <div className={`modal-overlay ${isFormOpen ? 'is-open' : ''}`}>
        <section
          ref={modalRef}
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-coursework-title"
        >
          <button
            className="modal-close-button"
            onClick={handleCloseForm}
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
          <AddCoursework onAnnounce={handleSuccess} />
        </section>
      </div>
    </div>
  )
}

export default Home
