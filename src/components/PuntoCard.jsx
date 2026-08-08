import { formatDistance } from '../utils/distance.js'

const directionsUrl = (point) =>
  `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`

export default function PuntoCard({ point, selected, nearest, onSelect }) {
  return (
    <article className={`point-card${selected ? ' is-selected' : ''}${nearest ? ' is-nearest' : ''}`}>
      <div className="card-heading">
        <div>
          <div className="badges">
            {nearest && <span className="badge nearest-badge">Más cercano</span>}
            {point.tipo === 'movil' && <span className="badge mobile-badge">Servicio móvil</span>}
          </div>
          <h3>{point.nombre}</h3>
          {point.institucion && <p className="institution">{point.institucion}</p>}
        </div>
        {point.distance != null && <strong className="distance">{formatDistance(point.distance)}</strong>}
      </div>

      <dl className="point-details">
        <div>
          <dt>Municipio</dt>
          <dd>{point.municipio}</dd>
        </div>
        <div>
          <dt>Dirección</dt>
          <dd>{point.direccion}</dd>
        </div>
        <div>
          <dt>Horario</dt>
          <dd>{point.horario || 'Horario no especificado'}</dd>
        </div>
        {point.restricciones && (
          <div className="restriction">
            <dt>Información importante</dt>
            <dd>{point.restricciones}</dd>
          </div>
        )}
      </dl>

      {point.coordenadaAproximada && (
        <p className="approximate-note">Ubicación aproximada. Confirma la dirección antes de acudir.</p>
      )}

      <div className="card-actions">
        <button type="button" className="secondary-button" onClick={() => onSelect(point.id)}>
          Ver en mapa
        </button>
        <a className="primary-link" href={directionsUrl(point)} target="_blank" rel="noreferrer">
          Cómo llegar <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}
