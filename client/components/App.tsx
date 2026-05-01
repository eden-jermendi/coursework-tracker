import Home from './Home'

function App() {
  return (
    <div className="app-shell">
      <header className="page-header">
        <p className="page-kicker">MVP A</p>
        <h1 id="page-title">Coursework Tracker</h1>
        <p className="page-subtitle">
          Keep upcoming work visible, organized, and easier to act on.
        </p>
      </header>
      <main className="page-content" aria-labelledby="page-title">
        <Home />
      </main>
    </div>
  )
}

export default App
