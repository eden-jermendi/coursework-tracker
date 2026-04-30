import Home from './Home'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">{<Home />}</section>
    </>
  )
}

export default App
