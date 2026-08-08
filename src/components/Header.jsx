const baseUrl = import.meta.env.BASE_URL

export default function Header() {
  return (
    <header className="site-header">
      <a className="header-branding" href={`${baseUrl}mapa`} aria-label="Directorio de PuntOax">
        <span className="header-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img">
            <path d="M12 21s7-5.7 7-12A7 7 0 0 0 5 9c0 6.3 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </span>
        <span>
          <span className="eyebrow">Red estatal de atención</span>
          <strong>Puntos de Detección en Oaxaca</strong>
          <span className="header-subtitle">Encuentra el punto más cercano a tu ubicación</span>
        </span>
      </a>
      <nav className="header-navigation" aria-label="Navegación principal">
        <a href={baseUrl}>Inicio</a>
        <a href={`${baseUrl}admin`}>Administración</a>
      </nav>
    </header>
  )
}
