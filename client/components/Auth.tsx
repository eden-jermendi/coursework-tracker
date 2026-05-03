import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabase'

function AuthComponent() {
  return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']} // Optional: Add more providers if you set them up in Supabase
        redirectTo={window.location.origin}
      />
    </div>
  )
}

export default AuthComponent
