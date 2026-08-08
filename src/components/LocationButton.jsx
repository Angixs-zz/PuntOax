export default function LocationButton({ onClick, loading, message, messageType }) {
  return (
    <section className="location-panel" aria-labelledby="location-title">
      <div className="location-copy">
        <strong id="location-title">Encuentra el más cercano</strong>
        <span>Tu ubicación no se almacena ni se comparte.</span>
      </div>
      <button className="location-button" type="button" onClick={onClick} disabled={loading}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2V5M12 19v3M2 12h3M19 12h3" />
        </svg>
        {loading ? 'Obteniendo ubicación...' : 'Usar mi ubicación'}
      </button>
      {message && (
        <p className={`location-message ${messageType === 'error' ? 'is-error' : 'is-success'}`} role="status">
          {message}
        </p>
      )}
    </section>
  )
}
