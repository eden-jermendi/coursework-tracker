import { useQuery } from '@tanstack/react-query'
import { getCoursework } from '../apis/coursework'

function Home() {
  const {
    data: coursework,
    isPending,
    error,
  } = useQuery({ queryKey: ['coursework'], queryFn: () => getCoursework() })

  if (isPending || !coursework) {
    return (
      <>
        <p>Loading...</p>
        <p>Your patience is appreciated!</p>
      </>
    )
  }

  if (error) {
    return <p>Error loading coursework</p>
  }
  return (
    <>
      <header className="header">
        <h1>Home</h1>
      </header>
      <section className="main">
        <ol className="list">
          {coursework.map((coursework) => (
            <li key={coursework.title}>
              <div>
                <strong>Title:</strong> {coursework.title}
              </div>
              <div>
                <strong>Unit:</strong> {coursework.unit}
              </div>
              <div>
                <strong>Status:</strong> {coursework.status}
              </div>
              <div>
                <strong>Priority:</strong> {coursework.priority}
              </div>
              <div>
                <strong>Due date:</strong> {coursework.due_date}
              </div>
              <div>
                <strong>Notes:</strong> {coursework.notes}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

export default Home
