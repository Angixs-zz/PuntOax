import {
  directoryDistribution,
  researchFindings,
  researchSources,
  sectorComparison,
} from '../data/research.js'

const baseUrl = import.meta.env.BASE_URL
const maxDirectoryCount = Math.max(...directoryDistribution.map((item) => item.count))

export default function ResearchPage() {
  return (
    <div className="research-page">
      <a className="skip-link" href="#contenido-investigacion">Saltar al contenido</a>
      <header className="research-nav">
        <a className="welcome-brand" href={baseUrl} aria-label="PuntOax, página de inicio">
          <span className="welcome-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s7-5.7 7-12A7 7 0 0 0 5 9c0 6.3 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <span><strong>PuntOax</strong><small>Investigación territorial</small></span>
        </a>
        <nav aria-label="Navegación de investigación">
          <a href={baseUrl}>Inicio</a>
          <a className="is-primary" href={`${baseUrl}mapa`}>Explorar mapa</a>
        </nav>
      </header>

      <main id="contenido-investigacion">
        <section className="research-hero">
          <p className="research-kicker">Análisis geoespacial · Oaxaca</p>
          <h1>Acceso territorial a la detección de ITS</h1>
          <p className="research-lead">
            Una lectura de cómo la ubicación, el tiempo, los requisitos y el costo influyen en el acceso a pruebas
            de VIH, Sífilis y Hepatitis C en el estado.
          </p>
          <div className="research-hero-actions">
            <a href={`${baseUrl}mapa`}>Consultar directorio <span aria-hidden="true">→</span></a>
            <a href="#fuentes">Revisar fuentes</a>
          </div>
          <div className="research-scope-note" role="note">
            <strong>Alcance de esta lectura</strong>
            <p>El directorio es una selección operativa en actualización, no un censo exhaustivo. La ausencia de un marcador no demuestra que una región carezca de servicios.</p>
          </div>
        </section>

        <section className="research-overview" aria-labelledby="panorama-title">
          <div className="research-section-heading">
            <p>Fotografía del directorio</p>
            <div>
              <h2 id="panorama-title">Una red extendida, pero todavía concentrada.</h2>
              <p>La distribución muestra dónde se encuentran los registros actuales de PuntOax. No representa demanda, capacidad clínica ni tiempos reales de traslado.</p>
            </div>
          </div>
          <div className="research-overview-grid">
            <dl className="research-metrics">
              <div><dt>19</dt><dd>registros actuales</dd></div>
              <div><dt>9</dt><dd>en zona metropolitana</dd></div>
              <div><dt>10</dt><dd>PDP reportados en abril de 2025</dd></div>
            </dl>
            <div className="research-distribution" aria-label="Registros actuales por región">
              {directoryDistribution.map((item) => (
                <div className="research-bar-row" key={item.region}>
                  <span>{item.region}</span>
                  <i><b style={{ width: `${(item.count / maxDirectoryCount) * 100}%` }} /></i>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="research-findings" aria-labelledby="hallazgos-title">
          <div className="research-section-heading is-light">
            <p>Lectura estructural</p>
            <div>
              <h2 id="hallazgos-title">Seis dimensiones que un marcador no alcanza a mostrar.</h2>
              <p>La accesibilidad efectiva combina territorio, recursos, tiempo, confianza institucional y opciones diagnósticas.</p>
            </div>
          </div>
          <div className="research-findings-grid">
            {researchFindings.map((finding) => (
              <article key={finding.number}>
                <span>{finding.number}</span>
                <p>{finding.label}</p>
                <h3>{finding.title}</h3>
                <div>{finding.text}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="research-sectors" aria-labelledby="sectores-title">
          <div className="research-section-heading">
            <p>Ecosistema de atención</p>
            <div>
              <h2 id="sectores-title">Tres sectores, distintos papeles y barreras.</h2>
              <p>La clasificación ayuda a comparar condiciones de acceso; no califica la calidad clínica de un establecimiento.</p>
            </div>
          </div>
          <div className="research-sector-grid">
            {sectorComparison.map((item) => (
              <article key={item.sector}>
                <h3>{item.sector}</h3>
                <div><span>Aporta</span><p>{item.role}</p></div>
                <div><span>Posibles barreras</span><p>{item.barrier}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="research-guidance" aria-labelledby="guia-title">
          <div>
            <p>Antes de acudir</p>
            <h2 id="guia-title">Convierte la información en una decisión práctica.</h2>
          </div>
          <ol>
            <li><span>01</span><p><strong>Confirma directamente</strong> el horario, costo, requisitos y pruebas disponibles.</p></li>
            <li><span>02</span><p><strong>Considera el traslado completo:</strong> ruta, transporte, tiempo y costo total, no solo kilómetros.</p></li>
            <li><span>03</span><p><strong>Solicita orientación profesional</strong> para elegir e interpretar una prueba diagnóstica.</p></li>
          </ol>
        </section>

        <section className="research-method" id="fuentes" aria-labelledby="fuentes-title">
          <div className="research-section-heading">
            <p>Metodología y evidencia</p>
            <div>
              <h2 id="fuentes-title">Fuentes consultadas</h2>
              <p>Se priorizan páginas institucionales y proveedores directos. Precios, horarios y requisitos son variables y deben confirmarse.</p>
            </div>
          </div>
          <div className="research-source-list">
            {researchSources.slice(0, 6).map((source) => (
              <SourceItem key={source.url} source={source} />
            ))}
          </div>
          <details className="research-more-sources">
            <summary>Ver todas las fuentes ({researchSources.length})</summary>
            <div className="research-source-list">
              {researchSources.slice(6).map((source) => (
                <SourceItem key={source.url} source={source} />
              ))}
            </div>
          </details>
          <div className="research-disclaimer" role="note">
            <strong>Información de orientación</strong>
            <p>Este análisis describe condiciones territoriales de acceso y no sustituye una valoración médica, una prueba diagnóstica ni la orientación de personal de salud. Si necesitas atención urgente, utiliza los servicios de emergencia disponibles en tu localidad.</p>
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>PuntOax · Análisis territorial de acceso</p>
        <a href={`${baseUrl}mapa`}>Ir al directorio</a>
      </footer>
    </div>
  )
}

function SourceItem({ source }) {
  return (
    <a href={source.url} target="_blank" rel="noreferrer">
      <span>{source.group}</span>
      <strong>{source.title}</strong>
      <small>{source.organization} · Abrir fuente ↗</small>
    </a>
  )
}
