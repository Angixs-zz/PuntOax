# PuntOax

Aplicación web para conocer y consultar puntos de detección en el estado de Oaxaca. La portada presenta el propósito del proyecto y conduce a un directorio donde es posible explorar los centros en un mapa de OpenStreetMap, buscar por texto y región, consultar sus datos y calcular cuál punto fijo se encuentra más cerca del usuario.

Los puntos se almacenan en Supabase/PostgreSQL y se consultan mediante su Data API. La vista pública es de libre acceso y las modificaciones están protegidas con Supabase Auth y políticas RLS basadas en una lista privada de administradores.

## Tecnologías

- React y Vite
- JavaScript
- Leaflet y React Leaflet
- OpenStreetMap
- CSS propio
- Supabase y PostgreSQL

## Instalación

Requiere una versión reciente de Node.js.

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

### Configuración de Supabase

La integración utiliza únicamente `@supabase/supabase-js`. Configura en `.env.local` la URL y la clave pública del proyecto:

```dotenv
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_tu_clave_publica
```

No utilices una clave secreta, `service_role` ni la contraseña de PostgreSQL. Después de modificar `.env.local`, reinicia `npm run dev` y abre la consola del navegador. El mensaje `[Supabase] Conexión con la Data API verificada.` confirma que la URL y la clave pública funcionan.

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Portada informativa con una introducción al proyecto y acceso directo al directorio.
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
- Administración privada en `/admin` para crear, editar y eliminar registros.
- Seguridad de escritura mediante `private.admin_users`, `public.is_admin()` y RLS.

## Estructura

```text
src/
  components/
    admin/
      PointForm.jsx
    Filters.jsx
    Header.jsx
    LocationButton.jsx
    MapView.jsx
    PuntoCard.jsx
    PuntoList.jsx
    SearchBar.jsx
  data/
    puntos.json (respaldo histórico)
  lib/
    points.js
    supabase.js
  pages/
    AdminPage.jsx
    WelcomePage.jsx
  utils/
    distance.js
  App.jsx
  main.jsx
  styles.css
scripts/
  geocode.mjs
supabase/
  migrations/
    002_seed_puntos.sql
```

`WelcomePage.jsx` presenta el proyecto en la ruta `/`. `App.jsx` muestra el directorio en `/mapa`, obtiene los registros públicos desde Supabase y mantiene el estado de filtros, selección y ubicación. `MapView.jsx` concentra la integración con Leaflet. `AdminPage.jsx` gestiona la sesión en `/admin`, comprueba `is_admin()` y ejecuta las operaciones CRUD, que también están protegidas en la base de datos mediante RLS.

## Datos y coordenadas

Los datos activos se cargan desde `public.puntos` en Supabase; la aplicación no realiza geocodificación al abrirse. `src/data/puntos.json` se conserva como respaldo e importación inicial. Cuando la tabla está vacía, `/admin` muestra un botón para insertar los 19 registros usando la sesión administradora y RLS. Como alternativa, la migración idempotente `supabase/migrations/002_seed_puntos.sql` permite insertarlos desde SQL Editor.

### Coordenadas desde administración

El formulario administrativo ofrece tres métodos:

- Extraer coordenadas de un enlace completo de Google Maps.
- Resolver un enlace corto mediante la Edge Function protegida `resolve-map-link`.
- Buscar la dirección con Nominatim y ajustar el resultado haciendo clic en OpenStreetMap.

La búsqueda por dirección se marca automáticamente como aproximada hasta que el administrador confirme el marcador. La Edge Function valida la sesión y ejecuta `is_admin()` antes de seguir cualquier redirección; no utiliza `service_role`.

Para desplegarla con Supabase CLI:

```bash
npx supabase login
npx supabase functions deploy resolve-map-link --project-ref fxvcltsuimrwhkgzhknr
```

El inicio de sesión abre el flujo seguro de Supabase. No guardes tokens de acceso en el repositorio. Una vez desplegada, el botón **Obtener del enlace** funciona también con URLs del tipo `https://maps.app.goo.gl/...`.

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

Configura en Vercel las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` antes de desplegar. `vercel.json` redirige `/admin` a la aplicación de una sola página. Para Netlify se incluye la regla equivalente en `public/_redirects`.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila y publica la aplicación automáticamente con cada push a `main`. Antes del primer despliegue:

1. En GitHub abre **Settings > Secrets and variables > Actions** y crea los secretos `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con los mismos valores públicos de `.env.local`.
2. Abre **Settings > Pages** y selecciona **GitHub Actions** como fuente de publicación.
3. Sube los cambios a la rama `main` o ejecuta manualmente **Deploy to GitHub Pages** desde la pestaña **Actions**.

El workflow configura la subruta del repositorio y genera el fallback necesario para que la portada, `/mapa` y `/admin` carguen correctamente en GitHub Pages.

## Fuente cartográfica

El mapa y la geocodificación utilizan datos de OpenStreetMap, disponibles bajo la licencia ODbL y con la atribución correspondiente visible en el mapa.
