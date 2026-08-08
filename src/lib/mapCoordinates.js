import { supabase } from './supabase.js'

export function parseGoogleMapsCoordinates(value) {
  if (!value) return null

  let decoded = value
  try {
    decoded = decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    // Keep the original value when it contains malformed URL encoding.
  }

  const patterns = [
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /\/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /\/search\/(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/,
    /[?&](?:query|q)=(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/,
  ]

  for (const pattern of patterns) {
    const match = decoded.match(pattern)
    if (match) return { lat: Number(match[1]), lng: Number(match[2]) }
  }

  return null
}

export async function resolveGoogleMapsLink(url) {
  const localCoordinates = parseGoogleMapsCoordinates(url)
  if (localCoordinates) return localCoordinates

  const { data, error } = await supabase.functions.invoke('resolve-map-link', {
    body: { url },
  })

  if (error) {
    throw new Error('No se pudo resolver el enlace corto. Verifica que la función resolve-map-link esté desplegada.')
  }
  if (!data?.lat || !data?.lng) throw new Error('Google Maps no devolvió coordenadas para este enlace.')
  return { lat: data.lat, lng: data.lng }
}

export async function geocodeAddress(address) {
  const query = address.toLowerCase().includes('oaxaca') ? address : `${address}, Oaxaca, México`
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.search = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    limit: '1',
    countrycodes: 'mx',
  })

  const response = await fetch(url, { headers: { 'Accept-Language': 'es' } })
  if (!response.ok) throw new Error('El servicio de búsqueda de direcciones no está disponible.')

  const [result] = await response.json()
  if (!result) throw new Error('No se encontró la dirección. Puedes marcarla manualmente en el mapa.')

  return {
    lat: Number(result.lat),
    lng: Number(result.lon),
    displayName: result.display_name,
  }
}
