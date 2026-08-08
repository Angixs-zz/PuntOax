import { useEffect, useMemo, useState } from 'react'
import Filters from './components/Filters.jsx'
import Header from './components/Header.jsx'
import LocationButton from './components/LocationButton.jsx'
import MapView from './components/MapView.jsx'
import PuntoList from './components/PuntoList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { getPoints } from './lib/points.js'
import { calculateDistance } from './utils/distance.js'

const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export default function App() {
  const [points, setPoints] = useState([])
  const [pointsLoading, setPointsLoading] = useState(true)
  const [pointsError, setPointsError] = useState('')
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('Todos')
  const [sort, setSort] = useState('nombre')
  const [selectedId, setSelectedId] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationStatus, setLocationStatus] = useState({ message: '', type: '' })

  useEffect(() => {
    let active = true

    getPoints()
      .then((data) => {
        if (active) setPoints(data)
      })
      .catch(() => {
        if (active) setPointsError('No pudimos cargar los puntos. Intenta nuevamente más tarde.')
      })
      .finally(() => {
        if (active) setPointsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const pointsWithDistance = useMemo(
    () =>
      points.map((point) => ({
        ...point,
        distance:
          userLocation && point.tipo === 'fijo'
            ? calculateDistance(userLocation.latitude, userLocation.longitude, point.lat, point.lng)
            : null,
      })),
    [points, userLocation],
  )

  const nearestId = useMemo(() => {
    if (!userLocation) return null
    return pointsWithDistance.reduce((nearest, point) => {
      if (point.distance == null) return nearest
      return !nearest || point.distance < nearest.distance ? point : nearest
    }, null)?.id
  }, [pointsWithDistance, userLocation])

  const visiblePoints = useMemo(() => {
    const normalizedQuery = normalize(query)
    const filtered = pointsWithDistance.filter((point) => {
      const searchableText = normalize(`${point.nombre} ${point.institucion} ${point.municipio} ${point.direccion}`)
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery)
      const matchesRegion = region === 'Todos' || point.region === region
      return matchesSearch && matchesRegion
    })

    return filtered.sort((a, b) => {
      if (sort === 'distancia') return (a.distance ?? Infinity) - (b.distance ?? Infinity)
      return a.nombre.localeCompare(b.nombre, 'es')
    })
  }, [pointsWithDistance, query, region, sort])

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationStatus({
        message: 'Tu navegador no permite obtener la ubicación. Puedes consultar los puntos manualmente.',
        type: 'error',
      })
      return
    }

    setLocationLoading(true)
    setLocationStatus({ message: '', type: '' })
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude })
        setSort('distancia')
        setLocationLoading(false)
        setLocationStatus({ message: 'Ubicación obtenida. Los puntos están ordenados por distancia.', type: 'success' })
      },
      (error) => {
        const messages = {
          1: 'No se concedió permiso para acceder a tu ubicación.',
          2: 'No fue posible determinar tu ubicación actual.',
          3: 'La solicitud de ubicación tardó demasiado.',
        }
        setLocationLoading(false)
        setLocationStatus({
          message: `${messages[error.code] || 'Ocurrió un error al obtener tu ubicación.'} Puedes seguir consultando los puntos manualmente.`,
          type: 'error',
        })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    )
  }

  function selectPoint(id) {
    setSelectedId(id)
    if (window.innerWidth < 860) {
      document.querySelector('.map-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace">
        <aside className="sidebar" aria-label="Consulta de puntos">
          <div className="sidebar-tools">
            <SearchBar value={query} onChange={setQuery} />
            <Filters
              region={region}
              onRegionChange={setRegion}
              sort={sort}
              onSortChange={setSort}
              hasLocation={Boolean(userLocation)}
            />
            <LocationButton
              onClick={requestLocation}
              loading={locationLoading}
              message={locationStatus.message}
              messageType={locationStatus.type}
            />
            <div className="results-heading">
              <h2>Puntos disponibles</h2>
              <span>{visiblePoints.length} {visiblePoints.length === 1 ? 'resultado' : 'resultados'}</span>
            </div>
          </div>
          <PuntoList
            points={visiblePoints}
            loading={pointsLoading}
            error={pointsError}
            selectedId={selectedId}
            nearestId={nearestId}
            onSelect={selectPoint}
          />
        </aside>
        <MapView
          points={visiblePoints}
          selectedId={selectedId}
          nearestId={nearestId}
          userLocation={userLocation}
          onSelect={setSelectedId}
        />
      </main>
    </div>
  )
}
