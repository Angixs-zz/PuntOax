import PuntoCard from './PuntoCard.jsx'

export default function PuntoList({ points, selectedId, nearestId, onSelect }) {
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
