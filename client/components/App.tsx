import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import Home from './Home'
import AuthComponent from './Auth'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app_theme')
    return (saved as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })
      .catch((error) => {
        console.error('Error getting session:', error)
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="page-header">
        <div className="header-top">
          <p className="page-kicker">MVP A + Auth</p>
          {session && (
            <div className="user-info">
              <div className="user-controls">
                <span className="user-email">
                  Currently logged in as: {session.user.email}
                </span>
                <button
                  className="logout-button"
                  onClick={() => supabase.auth.signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
        <h1 id="page-title">Coursework Tracker</h1>
        <p className="page-subtitle">
          Keep upcoming work visible, organized, and easier to act on.
        </p>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span className="theme-toggle-text">Dark Mode</span>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <span className="theme-toggle-text">Light Mode</span>
            </>
          )}
        </button>
      </header>
      <main className="page-content" aria-labelledby="page-title">
        {!session ? <AuthComponent /> : <Home />}
      </main>
    </div>
  )
}

export default App
