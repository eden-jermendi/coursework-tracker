import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabase'

function AuthComponent() {
  return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#7c5f43',
                brandAccent: '#694f37',
                inputBackground: 'rgba(255, 250, 242, 0.96)',
                inputText: '#352b23',
                inputBorder: '#d5c7b6',
                inputPlaceholder: '#6f6254',
              },
              radii: {
                borderRadiusButton: '999px',
                buttonPadding: '0.72rem 1.05rem',
                inputBorderRadius: '12px',
              },
              fonts: {
                bodyFontFamily:
                  "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
                buttonFontFamily:
                  "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
                inputFontFamily:
                  "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
                labelFontFamily:
                  "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
              },
            },
          },
          className: {
            container: 'supabase-auth-container',
            button: 'supabase-auth-button',
            input: 'supabase-auth-input',
            label: 'supabase-auth-label',
          },
        }}
        providers={['github']}
        redirectTo={window.location.origin}
      />
    </div>
  )
}

export default AuthComponent
