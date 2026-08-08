export default function Header() {
  return (
    <header className="site-header">
      <div className="header-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img">
          <path d="M12 21s7-5.7 7-12A7 7 0 0 0 5 9c0 6.3 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </div>
      <div>
        <p className="eyebrow">Red estatal de atención</p>
        <h1>Puntos de Detección en Oaxaca</h1>
        <p className="header-subtitle">Encuentra el punto más cercano a tu ubicación</p>
      </div>
    </header>
  )
}
