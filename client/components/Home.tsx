import { useQuery } from '@tanstack/react-query'
import { getCoursework } from '../apis/coursework'
import AddCoursework from './AddCoursework'
import DeleteCoursework from './DeleteCoursework'
import UpdateCoursework from './UpdateCoursework'

function Home() {
  const {
    data: coursework,
    isPending,
    error,
  } = useQuery({ queryKey: ['coursework'], queryFn: () => getCoursework() })

  if (isPending || !coursework) {
    return (
      <section className="status-panel">
        <p className="status-title">Loading coursework...</p>
        <p>Your study dashboard is on the way.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="status-panel status-panel-error">
        <p className="status-title">Error loading coursework</p>
        <p>Try refreshing the page and checking the API connection.</p>
      </section>
    )
  }
  return (
    <div className="dashboard-layout">
      <section className="coursework-panel">
        <header className="section-heading">
          <div>
            <p className="section-label">Stored entries</p>
            <h2>Current coursework</h2>
          </div>
          <p className="section-meta">
            {coursework.length} item{coursework.length === 1 ? '' : 's'}
          </p>
        </header>

        <div className="coursework-list">
          {coursework.map((coursework) => (
            <section className="coursework-entry" key={coursework.id}>
              <header className="entry-header">
                <div>
                  <p className="entry-label">Coursework</p>
                  <h3>{coursework.title}</h3>
                </div>
                <p className="entry-unit">{coursework.unit}</p>
              </header>

              <table className="coursework-table">
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
                <DeleteCoursework id={coursework.id} />
                <UpdateCoursework coursework={coursework} />
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="form-panel">
        <AddCoursework />
      </section>
    </div>
  )
}

export default Home
