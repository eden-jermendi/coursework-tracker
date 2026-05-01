import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCoursework } from '../apis/coursework'
import AddCoursework from './AddCoursework'
import DeleteCoursework from './DeleteCoursework'
import UpdateCoursework from './UpdateCoursework'

function Home() {
  const [announcement, setAnnouncement] = useState('')
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
  return (
    <div className="dashboard-layout">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <section
        className="coursework-panel"
        aria-labelledby="coursework-section-title"
      >
        <header className="section-heading">
          <div>
            <p className="section-label">Stored entries</p>
            <h2 id="coursework-section-title">Current coursework</h2>
          </div>
          <p className="section-meta">
            {coursework.length} item{coursework.length === 1 ? '' : 's'}
          </p>
        </header>

        {coursework.length === 0 ? (
          <section className="empty-state" aria-live="polite">
            <p className="status-title">No coursework entries yet</p>
            <p>Add your first coursework item below to start tracking it.</p>
          </section>
        ) : (
          <div className="coursework-list">
            {coursework.map((coursework) => (
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
                    onAnnounce={setAnnouncement}
                  />
                  <UpdateCoursework
                    coursework={coursework}
                    onAnnounce={setAnnouncement}
                  />
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      <section className="form-panel" aria-labelledby="add-coursework-title">
        <AddCoursework onAnnounce={setAnnouncement} />
      </section>
    </div>
  )
}

export default Home
