const baseUrl = import.meta.env.BASE_URL

const features = [
  {
    number: '01',
    title: 'Explora la red estatal',
    description: 'Consulta los puntos disponibles en Oaxaca desde un mapa interactivo y una lista detallada.',
  },
  {
    number: '02',
    title: 'Encuentra información útil',
    description: 'Revisa dirección, institución responsable, horario y recomendaciones antes de acudir.',
  },
  {
    number: '03',
    title: 'Ubica el punto más cercano',
    description: 'Comparte tu ubicación de forma opcional para ordenar los centros por distancia.',
  },
]

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <header className="welcome-nav">
        <a className="welcome-brand" href={baseUrl} aria-label="PuntOax, página de inicio">
          <span className="welcome-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s7-5.7 7-12A7 7 0 0 0 5 9c0 6.3 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <span>
            <strong>PuntOax</strong>
            <small>Red estatal de atención</small>
          </span>
        </a>
        <a className="welcome-nav-link" href={`${baseUrl}mapa`}>Abrir directorio</a>
      </header>

      <main>
        <section className="welcome-hero">
          <div className="welcome-hero-copy">
            <p className="welcome-kicker"><span /> Información pública para Oaxaca</p>
            <h1>Un punto de atención puede estar más cerca de lo que imaginas.</h1>
            <p className="welcome-intro">
              PuntOax reúne en un solo lugar los puntos de detección disponibles en el estado para que puedas
              conocerlos, comparar su ubicación y planear tu visita con información clara.
            </p>
            <div className="welcome-actions">
              <a className="welcome-primary-action" href={`${baseUrl}mapa`}>
                Consultar puntos
                <span aria-hidden="true">→</span>
              </a>
              <a className="welcome-text-action" href="#conoce-el-proyecto">Conocer el proyecto</a>
            </div>
            <dl className="welcome-summary" aria-label="Resumen del proyecto">
              <div><dt>19</dt><dd>puntos registrados</dd></div>
              <div><dt>8</dt><dd>regiones consultables</dd></div>
              <div><dt>24/7</dt><dd>directorio disponible</dd></div>
            </dl>
          </div>

          <div className="welcome-visual" aria-label="Representación del mapa de Oaxaca">
            <div className="welcome-map-card">
              <div className="welcome-map-topline">
                <span>Oaxaca, México</span>
                <span className="welcome-live-label"><i /> Red disponible</span>
              </div>
              <div className="welcome-map-canvas" aria-hidden="true">
                <svg className="welcome-map-shape" viewBox="0 0 520 310">
                  <path d="M58 143 91 92l60-16 42-39 67 18 49-18 42 42 68 10 43 51-32 47-49 12-31 43-61-6-43 34-66-25-48 8-34-47-45-18Z" />
                </svg>
                <span className="welcome-pin pin-one"><i /></span>
                <span className="welcome-pin pin-two"><i /></span>
                <span className="welcome-pin pin-three"><i /></span>
                <span className="welcome-pin pin-four"><i /></span>
                <span className="welcome-pin pin-five"><i /></span>
                <div className="welcome-location-card">
                  <span className="welcome-location-icon" aria-hidden="true">⌖</span>
                  <span><small>Punto destacado</small><strong>Oaxaca de Juárez</strong></span>
                  <b>2.4 km</b>
                </div>
              </div>
            </div>
            <p className="welcome-privacy-note"><span aria-hidden="true">✓</span> Tu ubicación solo se usa cuando tú lo decides.</p>
          </div>
        </section>

        <section className="welcome-about" id="conoce-el-proyecto">
          <div className="welcome-section-heading">
            <p>Sobre PuntOax</p>
            <h2>Información para tomar una decisión sencilla y oportuna.</h2>
          </div>
          <div className="welcome-feature-grid">
            {features.map((feature) => (
              <article key={feature.number}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>PuntOax · Puntos de Detección en Oaxaca</p>
        <a href={`${baseUrl}admin`}>Acceso administrativo</a>
      </footer>
    </div>
  )
}
