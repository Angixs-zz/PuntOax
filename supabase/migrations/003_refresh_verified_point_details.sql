begin;

update public.puntos
set
  direccion = 'Centro Mujer Tu Espacio, piso 3 del edificio 1, Ciudad Administrativa Benemérito de las Américas, Carretera Oaxaca-Istmo Km 11.5, Tlalixtac de Cabrera, Oaxaca.',
  horario = 'Martes y jueves, 10:00 - 15:00 Hrs',
  restricciones = 'Presentar CURP y RFC.',
  updated_at = now()
where id = 7;

update public.puntos
set
  direccion = 'Calle Moctezuma #3, esquina con Matamoros, Centro, Santa Cruz Xoxocotlán, Oaxaca.',
  horario = 'Lunes, miércoles y viernes, 09:00 - 16:00 Hrs',
  restricciones = 'Servicios gratuitos, confidenciales y sin juicios. Confirma la disponibilidad antes de acudir.',
  updated_at = now()
where id = 19;

commit;
