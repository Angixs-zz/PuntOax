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
            {point.sectorLabel && <span className={`badge sector-badge is-${point.sector}`}>{point.sectorLabel}</span>}
            {point.costo === 'gratuito' && <span className="badge free-badge">Gratuito</span>}
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

      {(point.pruebas || point.servicios || point.requisitos || point.cita || point.confidencial || point.telefono || point.telefonoInstitucional || point.fuenteOperativa) && (
        <details className="point-access-details">
          <summary>Servicios y condiciones de acceso</summary>
          <dl>
            {point.pruebas && <div><dt>Pruebas</dt><dd>{point.pruebas.join(', ')}</dd></div>}
            {point.servicios && <div><dt>Servicios</dt><dd>{point.servicios.join('. ')}.</dd></div>}
            {point.costoLabel && <div><dt>Costo</dt><dd>{point.costoLabel}</dd></div>}
            {point.requisitos && <div><dt>Requisitos</dt><dd>{point.requisitos}</dd></div>}
            {point.cita && <div><dt>Cita</dt><dd>{point.cita}</dd></div>}
            {point.confidencial && <div><dt>Privacidad</dt><dd>Atención confidencial</dd></div>}
          </dl>
          {(point.telefono || point.telefonoInstitucional || point.whatsapp) && (
            <div className="point-contact-links">
              {point.telefono && <a href={point.telefonoUrl}>Llamar: {point.telefono}</a>}
              {point.telefonoInstitucional && (
                <a href={point.telefonoInstitucionalUrl}>COESIDA: {point.telefonoInstitucional}</a>
              )}
              {point.whatsapp && <a href={point.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: {point.whatsapp}</a>}
            </div>
          )}
          {point.fuenteOperativa && (
            <a className="point-source-link" href={point.fuenteOperativa} target="_blank" rel="noreferrer">
              Consultar fuente oficial <span aria-hidden="true">↗</span>
            </a>
          )}
          {point.fechaVerificacion && <small>Información revisada: {point.fechaVerificacion}. Confirma antes de acudir.</small>}
        </details>
      )}

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
