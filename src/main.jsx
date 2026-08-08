import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './styles.css'
import App from './App.jsx'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const normalizedPath = window.location.pathname.slice(basePath.length).replace(/\/+$/, '') || '/'
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'))
const rootPage = normalizedPath === '/admin'
  ? <Suspense fallback={<main className="admin-status-page"><p>Cargando administración...</p></main>}><AdminPage /></Suspense>
  : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {rootPage}
  </StrictMode>,
)

if (import.meta.env.DEV) {
  import('./lib/supabase.js')
    .then(({ testSupabaseConnection }) => testSupabaseConnection())
    .then(() => console.info('[Supabase] Conexión con la Data API verificada.'))
    .catch((error) => console.error('[Supabase] No se pudo verificar la conexión:', error.message))
}
