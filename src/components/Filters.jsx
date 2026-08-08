const regions = [
  'Todos',
  'Oaxaca y zona metropolitana',
  'Mixteca',
  'Costa',
  'Istmo',
  'Papaloapan',
  'Sierra Sur',
  'Valles Centrales',
]

export default function Filters({
  region,
  onRegionChange,
  sector,
  onSectorChange,
  access,
  onAccessChange,
  sort,
  onSortChange,
  hasLocation,
}) {
  return (
    <div className="filters" aria-label="Filtros de puntos">
      <label>
        <span>Región</span>
        <select value={region} onChange={(event) => onRegionChange(event.target.value)}>
          {regions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Sector</span>
        <select value={sector} onChange={(event) => onSectorChange(event.target.value)}>
          <option value="Todos">Todos</option>
          <option value="publico">Público</option>
          <option value="comunitario">Comunitario</option>
          <option value="sin_clasificar">Sin clasificar</option>
        </select>
      </label>
      <label>
        <span>Acceso</span>
        <select value={access} onChange={(event) => onAccessChange(event.target.value)}>
          <option value="Todos">Todos</option>
          <option value="gratuito">Gratuito verificado</option>
          <option value="con_requisitos">Con requisitos documentales</option>
        </select>
      </label>
      <label>
        <span>Ordenar por</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="distancia" disabled={!hasLocation}>
            Distancia{hasLocation ? '' : ' (requiere ubicación)'}
          </option>
        </select>
      </label>
    </div>
  )
}
