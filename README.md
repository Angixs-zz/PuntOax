# Puntos de Detección Oaxaca

Aplicación web de una sola página para consultar puntos de detección en el estado de Oaxaca. Permite explorar los centros en un mapa de OpenStreetMap, buscar por texto y región, consultar sus datos y calcular cuál punto fijo se encuentra más cerca del usuario.

No utiliza backend ni base de datos. Los 19 registros y sus coordenadas están almacenados localmente en `src/data/puntos.json`.

## Tecnologías

- React y Vite
- JavaScript
- Leaflet y React Leaflet
- OpenStreetMap
- CSS propio

## Instalación

Requiere una versión reciente de Node.js.

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Mapa interactivo con los 19 puntos disponibles.
- Buscador sin distinción entre mayúsculas, minúsculas o acentos.
- Filtros por región y orden alfabético o por distancia.
- Selección sincronizada entre las tarjetas y los marcadores.
- Popups con dirección, institución, horario y distancia.
- Enlaces externos a Google Maps para solicitar indicaciones.
- Geolocalización opcional con errores manejados de forma amigable.
- Identificación automática del punto fijo más cercano.
- Diseño adaptable para teléfonos, tabletas y escritorio.
- Tratamiento diferenciado de Caravanas DIF como servicio móvil.

## Estructura

```text
src/
  components/
    Filters.jsx
    Header.jsx
    LocationButton.jsx
    MapView.jsx
    PuntoCard.jsx
    PuntoList.jsx
    SearchBar.jsx
  data/
    puntos.json
  utils/
    distance.js
  App.jsx
  main.jsx
  styles.css
scripts/
  geocode.mjs
```

`App.jsx` mantiene el estado compartido de filtros, selección y ubicación. `MapView.jsx` concentra la integración con Leaflet. Los componentes de lista presentan la misma colección filtrada y `distance.js` contiene la fórmula de Haversine y el formato de distancias.

## Datos y coordenadas

Los datos se cargan directamente desde `src/data/puntos.json`; la aplicación no realiza geocodificación al abrirse. Cada registro incluye región, tipo de servicio y la propiedad `coordenadaAproximada`.

Las coordenadas iniciales se consultaron con Nominatim/OpenStreetMap mediante solicitudes secuenciales con pausas. Posteriormente se verificaron manualmente direcciones y pines compartidos de Google Maps. Cuando no existe una ubicación suficientemente precisa, se conserva una coincidencia verificable de calle o del centro de la localidad y se marca `coordenadaAproximada: true`. La interfaz avisa al usuario para que confirme la dirección antes de acudir.

Trece registros cuentan con un pin específico verificado. Se mantienen como aproximados Santa Cruz Xoxocotlán, Zimatlán de Álvarez, Miahuatlán de Porfirio Díaz, Tlaxiaco, Puerto Ángel y Caravanas DIF Estatal. La dirección base de Caravanas DIF no se usa para determinar el punto más cercano porque el servicio es móvil.

El script `scripts/geocode.mjs` documenta el procedimiento auxiliar de consulta. No forma parte de la aplicación y no se ejecuta durante el desarrollo, la compilación ni en el navegador.

## Geolocalización y privacidad

La ubicación solo se solicita cuando el usuario presiona **Usar mi ubicación**. Se conserva en el estado en memoria de React durante la sesión actual; no se guarda en almacenamiento local, no se envía a un backend y desaparece al recargar o cerrar la página.

La API de geolocalización del navegador exige un contexto seguro. Funciona en `localhost` durante desarrollo y mediante HTTPS al desplegar. Si el permiso se rechaza, no hay soporte o se agota el tiempo, la aplicación sigue funcionando para consulta manual.

## Cálculo de distancia

`src/utils/distance.js` implementa la fórmula de Haversine sobre latitud y longitud. El resultado se expresa en kilómetros, o en metros cuando es inferior a un kilómetro. Tras obtener la ubicación se calculan las distancias a los puntos fijos, se ordena la lista y se destaca el menor resultado.

Caravanas DIF no recibe una distancia porque su coordenada corresponde únicamente a su dirección base y no a su ubicación operativa actual.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el repositorio desde Vercel.
3. Selecciona Vite si Vercel no lo detecta automáticamente.
4. Usa `npm run build` como comando de compilación.
5. Usa `dist` como directorio de salida.
6. Publica el proyecto.

No se requieren variables de entorno. La configuración `base: './'` de Vite también permite publicar los archivos estáticos en Netlify o GitHub Pages bajo una subruta.

## Fuente cartográfica

El mapa y la geocodificación utilizan datos de OpenStreetMap, disponibles bajo la licencia ODbL y con la atribución correspondiente visible en el mapa.
