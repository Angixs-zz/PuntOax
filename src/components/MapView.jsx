import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { formatDistance } from '../utils/distance.js'

const OAXACA_CENTER = [17.05, -96.72]

function makePointIcon({ selected, nearest, mobile }) {
  const classes = ['map-pin']
  if (selected) classes.push('is-selected')
  if (nearest) classes.push('is-nearest')
  if (mobile) classes.push('is-mobile')

  return L.divIcon({
    className: '',
    html: `<span class="${classes.join(' ')}"><span></span></span>`,
    iconSize: [32, 40],
    iconAnchor: [16, 38],
    popupAnchor: [0, -34],
  })
}

const userIcon = L.divIcon({
  className: '',
  html: '<span class="user-location-marker"><span></span></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -14],
})

function MapController({ selectedPoint, userLocation, nearestPoint, markerRefs }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedPoint) return
    map.flyTo([selectedPoint.lat, selectedPoint.lng], 15, { duration: 0.8 })
    const timer = window.setTimeout(() => markerRefs.current[selectedPoint.id]?.openPopup(), 500)
    return () => window.clearTimeout(timer)
  }, [map, markerRefs, selectedPoint])

  useEffect(() => {
    if (!userLocation) return
    if (nearestPoint) {
      map.fitBounds(
        [
          [userLocation.latitude, userLocation.longitude],
          [nearestPoint.lat, nearestPoint.lng],
        ],
        { padding: [60, 60], maxZoom: 13 },
      )
    } else {
      map.flyTo([userLocation.latitude, userLocation.longitude], 13)
    }
  }, [map, nearestPoint, userLocation])

  return null
}

export default function MapView({ points, selectedId, nearestId, userLocation, onSelect }) {
  const markerRefs = useRef({})
  const selectedPoint = points.find((point) => point.id === selectedId)
  const nearestPoint = points.find((point) => point.id === nearestId)
  const icons = useMemo(
    () =>
      Object.fromEntries(
        points.map((point) => [
          point.id,
          makePointIcon({
            selected: point.id === selectedId,
            nearest: point.id === nearestId,
            mobile: point.tipo === 'movil',
          }),
        ]),
      ),
    [nearestId, points, selectedId],
  )

  return (
    <section className="map-section" aria-label="Mapa de puntos de detección">
      <MapContainer center={OAXACA_CENTER} zoom={8} scrollWheelZoom className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={icons[point.id]}
            eventHandlers={{ click: () => onSelect(point.id) }}
            ref={(marker) => {
              if (marker) markerRefs.current[point.id] = marker
            }}
          >
            <Popup>
              <div className="map-popup">
                {point.id === nearestId && <span className="popup-label">Más cercano</span>}
                <h3>{point.nombre}</h3>
                {point.institucion && <strong>{point.institucion}</strong>}
                <p>{point.direccion}</p>
                <p>{point.horario || 'Horario no especificado'}</p>
                {point.coordenadaAproximada && <small>Ubicación aproximada</small>}
                {point.distance != null && <b>{formatDistance(point.distance)}</b>}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cómo llegar ↗
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
        <MapController
          selectedPoint={selectedPoint}
          userLocation={userLocation}
          nearestPoint={nearestPoint}
          markerRefs={markerRefs}
        />
      </MapContainer>
      <div className="map-legend" aria-hidden="true">
        <span><i className="legend-dot point-dot" /> Punto de detección</span>
        {userLocation && <span><i className="legend-dot user-dot" /> Tu ubicación</span>}
      </div>
    </section>
  )
}
