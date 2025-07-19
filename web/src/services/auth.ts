// services/auth.ts
import { supabasePublic } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js';

export const AuthService = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  logout: async () => {
    const { error } = await supabasePublic.auth.signOut()
    if (error) throw error
  },

  getUser: async () => {
    const { data, error } = await supabasePublic.auth.getUser()
    if (error) throw error
    return data.user
  },

  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabasePublic.auth.onAuthStateChange(callback)
  }
}
