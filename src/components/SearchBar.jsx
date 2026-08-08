export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span className="sr-only">Buscar puntos</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m16.5 16.5 4 4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nombre, municipio o dirección..."
      />
    </label>
  )
}
