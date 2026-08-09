begin;

update public.puntos
set
  nombre = 'Punto Fijo de Detección – Dirección de Sanidad',
  institucion = 'COESIDA-CAPASITS / Municipio de Oaxaca de Juárez',
  municipio = 'Oaxaca de Juárez',
  direccion = 'Mártires de Tacubaya 315, Col. Centro, C.P. 68000, Oaxaca de Juárez, Oaxaca.',
  horario = 'Lunes a viernes, 09:00 - 10:30 y 11:30 - 13:00 Hrs',
  restricciones = 'Presentar CURP. No requiere cita previa para pruebas rápidas.',
  region = 'Oaxaca y zona metropolitana',
  tipo = 'fijo',
  coordenada_aproximada = true,
  updated_at = now()
where id = 1
  and direccion ilike '%Mártires de Tacubaya%';

commit;
