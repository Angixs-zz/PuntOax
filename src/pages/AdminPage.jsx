import { useEffect, useState } from 'react'
import PointForm from '../components/admin/PointForm.jsx'
import initialPoints from '../data/puntos.json'
import { getPoints, toDatabasePoint } from '../lib/points.js'
import { supabase } from '../lib/supabase.js'

const publicPageUrl = import.meta.env.BASE_URL

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) setError('No fue posible iniciar sesión. Revisa tu correo y contraseña.')
    setLoading(false)
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <a href={publicPageUrl} className="admin-back-link">← Volver al mapa</a>
        <p className="eyebrow admin-eyebrow">Acceso restringido</p>
        <h1>Administración de puntos</h1>
        <p>Inicia sesión con la cuenta administradora registrada en Supabase.</p>
        <form onSubmit={submit}>
          <label className="admin-field">
            <span>Correo electrónico</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="admin-field">
            <span>Contraseña</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error && <p className="admin-alert is-error" role="alert">{error}</p>}
          <button className="admin-primary-button" type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default function AdminPage() {
  const [session, setSession] = useState(undefined)
  const [adminStatus, setAdminStatus] = useState('checking')
  const [points, setPoints] = useState([])
  const [editingPoint, setEditingPoint] = useState(null)
  const [loadingPoints, setLoadingPoints] = useState(false)
  const [importing, setImporting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session === undefined) return
    if (!session) {
      setAdminStatus('checking')
      return
    }

    let active = true
    supabase.rpc('is_admin').then(({ data, error }) => {
      if (!active) return
      if (error) {
        setMessage({ text: `No se pudo verificar el acceso: ${error.message}`, type: 'error' })
        setAdminStatus('denied')
        return
      }
      setAdminStatus(data ? 'allowed' : 'denied')
    })

    return () => {
      active = false
    }
  }, [session])

  useEffect(() => {
    if (adminStatus === 'allowed') loadPoints()
  }, [adminStatus])

  async function loadPoints() {
    setLoadingPoints(true)
    try {
      setPoints(await getPoints())
    } catch (error) {
      setMessage({ text: `No se pudieron cargar los puntos: ${error.message}`, type: 'error' })
    } finally {
      setLoadingPoints(false)
    }
  }

  async function savePoint(values) {
    setSaving(true)
    setMessage({ text: '', type: '' })
    const payload = toDatabasePoint(values)
    const query = editingPoint
      ? supabase.from('puntos').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingPoint.id)
      : supabase.from('puntos').insert(payload)
    const { error } = await query

    if (error) {
      setMessage({ text: `No se pudo guardar: ${error.message}`, type: 'error' })
    } else {
      setMessage({ text: editingPoint ? 'Punto actualizado correctamente.' : 'Punto creado correctamente.', type: 'success' })
      setEditingPoint(null)
      await loadPoints()
    }
    setSaving(false)
  }

  async function deletePoint(point) {
    if (!window.confirm(`¿Eliminar permanentemente "${point.nombre}"?`)) return

    setMessage({ text: '', type: '' })
    const { error } = await supabase.from('puntos').delete().eq('id', point.id)
    if (error) {
      setMessage({ text: `No se pudo eliminar: ${error.message}`, type: 'error' })
      return
    }

    if (editingPoint?.id === point.id) setEditingPoint(null)
    setMessage({ text: 'Punto eliminado correctamente.', type: 'success' })
    await loadPoints()
  }

  async function importInitialPoints() {
    if (!window.confirm('¿Importar los 19 puntos iniciales a Supabase? Esta acción solo debe ejecutarse con la tabla vacía.')) {
      return
    }

    setImporting(true)
    setMessage({ text: '', type: '' })
    try {
      const payload = initialPoints.map(toDatabasePoint)
      const { error } = await supabase.from('puntos').insert(payload)

      if (error) throw error
      setMessage({ text: `${payload.length} puntos importados correctamente.`, type: 'success' })
      await loadPoints()
    } catch (error) {
      setMessage({ text: `No se pudo completar la importación: ${error.message}`, type: 'error' })
    } finally {
      setImporting(false)
    }
  }

  if (session === undefined) {
    return <main className="admin-status-page"><p>Comprobando sesión...</p></main>
  }

  if (!session) return <LoginForm />

  if (adminStatus === 'checking') {
    return <main className="admin-status-page"><p>Verificando permisos de administrador...</p></main>
  }

  if (adminStatus === 'denied') {
    return (
      <main className="admin-status-page">
        <section className="admin-login-card">
          <h1>Acceso no autorizado</h1>
          <p>Esta cuenta tiene una sesión válida, pero no está registrada como administradora.</p>
          {message.text && <p className="admin-alert is-error">{message.text}</p>}
          <button className="admin-primary-button" type="button" onClick={() => supabase.auth.signOut()}>
            Cerrar sesión
          </button>
        </section>
      </main>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <p>Panel privado</p>
          <h1>Puntos de Detección Oaxaca</h1>
        </div>
        <nav aria-label="Acciones de administración">
          <a href={publicPageUrl}>Ver mapa público</a>
          <button type="button" onClick={() => supabase.auth.signOut()}>Cerrar sesión</button>
        </nav>
      </header>

      {message.text && (
        <p className={`admin-alert ${message.type === 'error' ? 'is-error' : 'is-success'}`} role="status">
          {message.text}
        </p>
      )}

      <main className="admin-workspace">
        <section className="admin-list-panel">
          <div className="admin-section-heading">
            <div>
              <span>Base de datos</span>
              <h2>Puntos registrados</h2>
            </div>
            <strong>{points.length}</strong>
          </div>

          {loadingPoints ? (
            <p className="admin-muted">Cargando registros...</p>
          ) : points.length === 0 ? (
            <div className="admin-import-state">
              <p>Todavía no hay puntos en Supabase.</p>
              <button className="admin-primary-button" type="button" onClick={importInitialPoints} disabled={importing}>
                {importing ? 'Importando...' : 'Importar 19 puntos iniciales'}
              </button>
              <small>La importación utiliza tu sesión administradora y está protegida por RLS.</small>
            </div>
          ) : (
            <div className="admin-point-list">
              {points.map((point) => (
                <article key={point.id} className={editingPoint?.id === point.id ? 'is-active' : ''}>
                  <div>
                    <span>#{point.id} · {point.region}</span>
                    <h3>{point.nombre}</h3>
                    <p>{point.municipio}</p>
                  </div>
                  <div className="admin-row-actions">
                    <button type="button" onClick={() => setEditingPoint(point)}>Editar</button>
                    <button type="button" className="is-danger" onClick={() => deletePoint(point)}>Eliminar</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <PointForm
          key={editingPoint?.id ?? `new-${points.length}`}
          point={editingPoint}
          saving={saving}
          onSave={savePoint}
          onCancel={() => setEditingPoint(null)}
        />
      </main>
    </div>
  )
}
