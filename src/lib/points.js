import { supabase } from './supabase.js'

export function toAppPoint(point) {
  return {
    id: point.id,
    nombre: point.nombre,
    institucion: point.institucion || '',
    municipio: point.municipio,
    direccion: point.direccion,
    horario: point.horario || '',
    lat: point.lat,
    lng: point.lng,
    restricciones: point.restricciones || '',
    region: point.region,
    tipo: point.tipo,
    coordenadaAproximada: point.coordenada_aproximada,
    enlaceReferencia: point.enlace_referencia || '',
  }
}

export function toDatabasePoint(point) {
  const optionalText = (value) => String(value ?? '').trim() || null

  return {
    nombre: String(point.nombre ?? '').trim(),
    institucion: optionalText(point.institucion),
    municipio: String(point.municipio ?? '').trim(),
    direccion: String(point.direccion ?? '').trim(),
    horario: optionalText(point.horario),
    lat: Number(point.lat),
    lng: Number(point.lng),
    restricciones: optionalText(point.restricciones),
    region: point.region,
    tipo: point.tipo,
    coordenada_aproximada: Boolean(point.coordenadaAproximada),
    enlace_referencia: optionalText(point.enlaceReferencia),
  }
}

export async function getPoints() {
  const { data, error } = await supabase.from('puntos').select('*').order('nombre')

  if (error) throw error
  return data.map(toAppPoint)
}
