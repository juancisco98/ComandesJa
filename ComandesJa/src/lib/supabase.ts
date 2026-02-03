import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definition for business registration
export interface BusinessRegistration {
    id?: string
    owner_name: string
    business_name: string
    category: string
    email: string
    phone: string
    selected_plan: string
    status?: 'pending' | 'contacted' | 'approved' | 'rejected'
    created_at?: string
    updated_at?: string
    notes?: string
}

// Auth helper functions
export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            }
        }
    })
    return { data, error }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
}

export const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
}
