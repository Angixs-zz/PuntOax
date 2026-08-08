import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

const DEFAULT_CENTER = [17.0605, -96.7254]

const pickerIcon = L.divIcon({
  className: '',
  html: '<span class="map-pin is-selected"><span></span></span>',
  iconSize: [32, 40],
  iconAnchor: [16, 38],
})

function MapClick({ onChange }) {
  useMapEvents({
    click(event) {
      onChange({ lat: event.latlng.lat, lng: event.latlng.lng })
    },
  })
  return null
}

function MapPosition({ position }) {
  const map = useMap()

  useEffect(() => {
    if (position) map.flyTo(position, 16, { duration: 0.6 })
  }, [map, position])

  return null
}

export default function CoordinatePicker({ lat, lng, onChange }) {
  const position = useMemo(() => {
    const latitude = Number(lat)
    const longitude = Number(lng)
    return Number.isFinite(latitude) && Number.isFinite(longitude) && lat !== '' && lng !== ''
      ? [latitude, longitude]
      : null
  }, [lat, lng])

  return (
    <div className="coordinate-picker">
      <div className="coordinate-picker-heading">
        <strong>Ajustar en el mapa</strong>
        <span>Haz clic en la ubicación exacta para completar las coordenadas.</span>
      </div>
      <MapContainer center={position || DEFAULT_CENTER} zoom={position ? 16 : 12} scrollWheelZoom className="coordinate-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick onChange={onChange} />
        <MapPosition position={position} />
        {position && <Marker position={position} icon={pickerIcon} />}
      </MapContainer>
    </div>
  )
}
