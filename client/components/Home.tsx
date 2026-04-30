const coursework = [
  {
    title: 'Design a relational DB - (Assignment)',
    unit: 'Unit 5 - Databases',
    status: 'Submitted - Awaiting results',
    priority: 'High',
    due_date: '2026-04-05',
    notes: 'Submitted late, Jatin is aware.',
  },
  {
    title: 'JWT challenge polish (for assignment)',
    unit: 'Unit 6 - JWT and Auth',
    status: 'Incomplete',
    priority: 'High',
    due_date: '2026-05-17',
    notes:
      'Read assignment card (WD05) in assessment tracker and polish jwt-auth for submission.',
  },
  {
    title: 'dreamfest polish (for assignment)',
    unit: 'Unit 6 - JWT and Auth',
    status: 'Incomplete',
    priority: 'High',
    due_date: '2026-05-17',
    notes:
      'Read assignment card (CP02) in assessment tracker and polish dreamfest for submission.',
  },
]

function Home() {
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
