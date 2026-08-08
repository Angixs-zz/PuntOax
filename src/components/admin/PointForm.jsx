import { useEffect, useState } from 'react'
import { geocodeAddress, resolveGoogleMapsLink } from '../../lib/mapCoordinates.js'
import CoordinatePicker from './CoordinatePicker.jsx'

const regions = [
  'Oaxaca y zona metropolitana',
  'Mixteca',
  'Costa',
  'Istmo',
  'Papaloapan',
  'Sierra Sur',
  'Valles Centrales',
]

const emptyPoint = {
  nombre: '',
  institucion: '',
  municipio: '',
  direccion: '',
  horario: '',
  lat: '',
  lng: '',
  restricciones: '',
  region: 'Oaxaca y zona metropolitana',
  tipo: 'fijo',
  coordenadaAproximada: false,
  enlaceReferencia: '',
}

export default function PointForm({ point, saving, onSave, onCancel }) {
  const [values, setValues] = useState(emptyPoint)
  const [coordinateLoading, setCoordinateLoading] = useState('')
  const [coordinateStatus, setCoordinateStatus] = useState({ text: '', type: '' })

  useEffect(() => {
    setValues(point ? { ...emptyPoint, ...point } : emptyPoint)
    setCoordinateStatus({ text: '', type: '' })
  }, [point])

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  function submit(event) {
    event.preventDefault()
    onSave(values)
  }

  function setCoordinates({ lat, lng }, approximate = values.coordenadaAproximada) {
    setValues((current) => ({
      ...current,
      lat: Number(lat).toFixed(7).replace(/0+$/, '').replace(/\.$/, ''),
      lng: Number(lng).toFixed(7).replace(/0+$/, '').replace(/\.$/, ''),
      coordenadaAproximada: approximate,
    }))
  }

  async function locateFromLink() {
    if (!values.enlaceReferencia.trim()) {
      setCoordinateStatus({ text: 'Primero pega un enlace de Google Maps.', type: 'error' })
      return
    }

    setCoordinateLoading('link')
    setCoordinateStatus({ text: '', type: '' })
    try {
      const coordinates = await resolveGoogleMapsLink(values.enlaceReferencia.trim())
      setCoordinates(coordinates, false)
      setCoordinateStatus({ text: 'Coordenadas obtenidas del enlace. Verifica el marcador antes de guardar.', type: 'success' })
    } catch (error) {
      setCoordinateStatus({ text: error.message, type: 'error' })
    } finally {
      setCoordinateLoading('')
    }
  }

  async function locateFromAddress() {
    if (!values.direccion.trim()) {
      setCoordinateStatus({ text: 'Primero escribe una dirección.', type: 'error' })
      return
    }

    setCoordinateLoading('address')
    setCoordinateStatus({ text: '', type: '' })
    try {
      const result = await geocodeAddress(values.direccion.trim())
      setCoordinates(result, true)
      setCoordinateStatus({ text: `Resultado aproximado: ${result.displayName}`, type: 'success' })
    } catch (error) {
      setCoordinateStatus({ text: error.message, type: 'error' })
    } finally {
      setCoordinateLoading('')
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="admin-section-heading">
        <div>
          <span>{point ? `Editando #${point.id}` : 'Nuevo registro'}</span>
          <h2>{point ? point.nombre : 'Agregar punto'}</h2>
        </div>
        {point && (
          <button type="button" className="admin-text-button" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </div>

      <div className="admin-form-grid">
        <label className="admin-field admin-field-wide">
          <span>Nombre *</span>
          <input name="nombre" value={values.nombre} onChange={updateField} required />
        </label>
        <label className="admin-field">
          <span>Institución</span>
          <input name="institucion" value={values.institucion} onChange={updateField} />
        </label>
        <label className="admin-field">
          <span>Municipio *</span>
          <input name="municipio" value={values.municipio} onChange={updateField} required />
        </label>
        <label className="admin-field admin-field-wide">
          <span>Dirección *</span>
          <textarea name="direccion" rows="3" value={values.direccion} onChange={updateField} required />
        </label>
        <label className="admin-field">
          <span>Horario</span>
          <input name="horario" value={values.horario} onChange={updateField} placeholder="L-V 09:00 - 15:00 Hrs" />
        </label>
        <label className="admin-field">
          <span>Región *</span>
          <select name="region" value={values.region} onChange={updateField} required>
            {regions.map((region) => <option key={region}>{region}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span>Latitud *</span>
          <input
            name="lat"
            type="number"
            min="-90"
            max="90"
            step="any"
            value={values.lat}
            onChange={updateField}
            required
          />
        </label>
        <label className="admin-field">
          <span>Longitud *</span>
          <input
            name="lng"
            type="number"
            min="-180"
            max="180"
            step="any"
            value={values.lng}
            onChange={updateField}
            required
          />
        </label>
        <label className="admin-field">
          <span>Tipo de servicio</span>
          <select name="tipo" value={values.tipo} onChange={updateField}>
            <option value="fijo">Fijo</option>
            <option value="movil">Móvil</option>
          </select>
        </label>
        <label className="admin-field admin-field-wide">
          <span>Restricciones o información importante</span>
          <textarea name="restricciones" rows="2" value={values.restricciones} onChange={updateField} />
        </label>
        <label className="admin-field admin-field-wide">
          <span>Enlace de referencia de Google Maps</span>
          <input
            name="enlaceReferencia"
            type="url"
            value={values.enlaceReferencia}
            onChange={updateField}
            placeholder="https://maps.app.goo.gl/..."
          />
          <small>Pega un enlace corto o completo y usa el botón para obtener las coordenadas.</small>
        </label>
        <div className="admin-coordinate-tools admin-field-wide">
          <button type="button" onClick={locateFromLink} disabled={Boolean(coordinateLoading)}>
            {coordinateLoading === 'link' ? 'Resolviendo enlace...' : 'Obtener del enlace'}
          </button>
          <button type="button" onClick={locateFromAddress} disabled={Boolean(coordinateLoading)}>
            {coordinateLoading === 'address' ? 'Buscando dirección...' : 'Buscar la dirección'}
          </button>
        </div>
        {coordinateStatus.text && (
          <p className={`coordinate-status admin-field-wide ${coordinateStatus.type === 'error' ? 'is-error' : 'is-success'}`} role="status">
            {coordinateStatus.text}
          </p>
        )}
        <div className="admin-field-wide">
          <CoordinatePicker lat={values.lat} lng={values.lng} onChange={(coordinates) => setCoordinates(coordinates)} />
        </div>
        <label className="admin-checkbox admin-field-wide">
          <input
            name="coordenadaAproximada"
            type="checkbox"
            checked={values.coordenadaAproximada}
            onChange={updateField}
          />
          <span>La coordenada es aproximada</span>
        </label>
      </div>

      <button className="admin-primary-button" type="submit" disabled={saving}>
        {saving ? 'Guardando...' : point ? 'Guardar cambios' : 'Crear punto'}
      </button>
    </form>
  )
}
