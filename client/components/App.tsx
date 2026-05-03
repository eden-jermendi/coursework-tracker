import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import Home from './Home'
import AuthComponent from './Auth'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="header-top">
          <p className="page-kicker">MVP A + Auth</p>
          {session && (
            <button
              className="logout-button"
              onClick={() => supabase.auth.signOut()}
            >
              Log Out
            </button>
          )}
        </div>
        <h1 id="page-title">Coursework Tracker</h1>
        <p className="page-subtitle">
          Keep upcoming work visible, organized, and easier to act on.
        </p>
      </header>
      <main className="page-content" aria-labelledby="page-title">
        {!session ? <AuthComponent /> : <Home />}
      </main>
    </div>
  )
}

export default App
