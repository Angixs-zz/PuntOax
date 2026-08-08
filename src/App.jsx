import { useMemo, useState } from 'react'
import Filters from './components/Filters.jsx'
import Header from './components/Header.jsx'
import PuntoList from './components/PuntoList.jsx'
import SearchBar from './components/SearchBar.jsx'
import puntos from './data/puntos.json'

const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export default function App() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('Todos')
  const [selectedId, setSelectedId] = useState(null)

  const visiblePoints = useMemo(() => {
    const normalizedQuery = normalize(query)

    return puntos
      .filter((point) => {
        const searchableText = normalize(`${point.nombre} ${point.institucion} ${point.municipio} ${point.direccion}`)
        const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery)
        const matchesRegion = region === 'Todos' || point.region === region
        return matchesSearch && matchesRegion
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }, [query, region])

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
              sort="nombre"
              onSortChange={() => {}}
              hasLocation={false}
            />
            <div className="results-heading">
              <h2>Puntos disponibles</h2>
              <span>{visiblePoints.length} {visiblePoints.length === 1 ? 'resultado' : 'resultados'}</span>
            </div>
          </div>
          <PuntoList
            points={visiblePoints}
            selectedId={selectedId}
            nearestId={null}
            onSelect={setSelectedId}
          />
        </aside>
        <section className="map-section" aria-label="Mapa en preparación">
          <div className="map-placeholder">
            <strong>Mapa de puntos</strong>
            <p>La vista geográfica estará disponible en la siguiente etapa.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
