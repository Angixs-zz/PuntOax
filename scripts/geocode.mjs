const locations = [
  ['Oaxaca de Juárez', 'Oaxaca de Juárez, Oaxaca, México'],
  ['COESIDA Oaxaca', 'San Bartolo Coyotepec, Oaxaca, México'],
  ['Ciudad Universitaria UABJO', 'Universidad Autónoma Benito Juárez de Oaxaca, Oaxaca, México'],
  ['Zimatlán de Álvarez', 'Zimatlán de Álvarez, Oaxaca, México'],
  ['Miahuatlán de Porfirio Díaz', 'Miahuatlán de Porfirio Díaz, Oaxaca, México'],
  ['Tlaxiaco', 'Heroica Ciudad de Tlaxiaco, Oaxaca, México'],
  ['San Juan Bautista Tuxtepec', 'San Juan Bautista Tuxtepec, Oaxaca, México'],
  ['CAPASITS - Pinotepa Nacional', 'Santiago Pinotepa Nacional, Oaxaca, México'],
  ['CAPASITS - Salina Cruz', 'Salina Cruz, Oaxaca, México'],
  ['Santa María Huatulco', 'Santa María Huatulco, Oaxaca, México'],
]

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

for (const [name, query] of locations) {
  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.search = new URLSearchParams({ q: query, format: 'jsonv2', limit: '3', countrycodes: 'mx' })

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'PuntosDeteccionOaxaca/1.0 (local data preparation)',
      'Accept-Language': 'es',
    },
  })

  if (!response.ok) throw new Error(`Nominatim returned ${response.status} for ${name}`)
  const candidates = await response.json()
  console.log(JSON.stringify({ name, query, candidates }, null, 2))
  await wait(1200)
}
