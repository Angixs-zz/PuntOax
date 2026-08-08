import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const missingVariables = [
  !supabaseUrl && 'VITE_SUPABASE_URL',
  !supabasePublishableKey && 'VITE_SUPABASE_PUBLISHABLE_KEY',
].filter(Boolean)

if (missingVariables.length > 0) {
  throw new Error(
    `Falta configurar ${missingVariables.join(' y ')} en .env.local. Reinicia Vite después de agregar las variables.`,
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export async function testSupabaseConnection() {
  const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: supabasePublishableKey,
    },
  })

  if (!response.ok) {
    throw new Error(`Supabase respondió con el estado HTTP ${response.status}.`)
  }

  return true
}
