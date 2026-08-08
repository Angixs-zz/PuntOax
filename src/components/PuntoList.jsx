import PuntoCard from './PuntoCard.jsx'

export default function PuntoList({ points, loading, error, selectedId, nearestId, onSelect }) {
  if (loading) {
    return (
      <div className="empty-state" role="status">
        <span className="loading-dot" aria-hidden="true" />
        <h3>Cargando puntos</h3>
        <p>Estamos consultando la información disponible.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="empty-state is-error" role="alert">
        <span aria-hidden="true">!</span>
        <h3>No se pudieron cargar los puntos</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (points.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span aria-hidden="true">?</span>
        <h3>No encontramos puntos</h3>
        <p>No encontramos puntos que coincidan con tu búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="point-list">
      {points.map((point) => (
        <PuntoCard
          key={point.id}
          point={point}
          selected={point.id === selectedId}
          nearest={point.id === nearestId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
