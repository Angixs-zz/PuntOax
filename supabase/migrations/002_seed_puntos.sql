begin;

insert into public.puntos (
  id, nombre, institucion, municipio, direccion, horario, lat, lng,
  restricciones, region, tipo, coordenada_aproximada
)
values
  (1, 'Oaxaca de Juárez', 'Dirección de Sanidad', 'Oaxaca de Juárez', 'Mártires de Tacubaya 315, Ruta Independencia, Centro, 68000 Oaxaca de Juárez, Oaxaca.', 'L-V 09:00 - 15:00 Hrs', 17.0632871, -96.7179158, null, 'Oaxaca y zona metropolitana', 'fijo', false),
  (2, 'Central de Abastos', 'CEBIVE', 'Oaxaca de Juárez', 'C. de Nuño del Mercado 601, Cosijoeza, 68090 Oaxaca de Juárez, Oaxaca.', 'L-V 08:00 - 17:00 Hrs', 17.0552934, -96.7328032, null, 'Oaxaca y zona metropolitana', 'fijo', false),
  (3, 'IMEDI', 'Instituto de Ciencias Médicas', 'Oaxaca de Juárez', 'Blvd. Eduardo Vasconcelos 517, Barrio de Jalatlaco, 68080 Oaxaca de Juárez, Oaxaca.', 'L-V 09:00 - 14:00 Hrs', 17.0651937, -96.714459, null, 'Oaxaca y zona metropolitana', 'fijo', false),
  (4, 'COESIDA Oaxaca', null, 'San Bartolo Coyotepec', 'Séptima Privada de Aldama Sur s/n, Centro, 71256 San Bartolo Coyotepec, Oaxaca.', 'L-V 08:00 - 14:00 Hrs', 16.9482801, -96.7162376, null, 'Oaxaca y zona metropolitana', 'fijo', false),
  (5, 'Ciudad Universitaria UABJO', 'Universidad Autónoma Benito Juárez de Oaxaca', 'Oaxaca de Juárez', 'Av. Universidad s/n, Ex-Hacienda Cinco Señores, Ciudad Universitaria UABJO, 68120 Oaxaca de Juárez, Oaxaca. A un costado del edificio de Rectoría.', 'L-V 10:00 - 14:00 Hrs', 17.0503666, -96.7124453, null, 'Oaxaca y zona metropolitana', 'fijo', false),
  (6, 'Santa Cruz Xoxocotlán', null, 'Santa Cruz Xoxocotlán', 'Las 16 Casas de Salud, Santa Cruz Xoxocotlán, Oaxaca.', '09:00 - 14:00 Hrs', 17.026389, -96.733333, null, 'Oaxaca y zona metropolitana', 'fijo', true),
  (7, 'Tlalixtac de Cabrera', 'Centro Mujer, tu espacio de la Secretaría de Administración', 'Tlalixtac de Cabrera', 'Centro Mujer Tu Espacio, piso 3 del edificio 1, Ciudad Administrativa Benemérito de las Américas, Carretera Oaxaca-Istmo Km 11.5, Tlalixtac de Cabrera, Oaxaca.', 'Martes y jueves, 10:00 - 15:00 Hrs', 17.0550147, -96.6537549, 'Presentar CURP y RFC.', 'Oaxaca y zona metropolitana', 'fijo', false),
  (8, 'Zimatlán de Álvarez', 'Dirección de Salud', 'Zimatlán de Álvarez', 'Calle Rayón s/n, Barrio San Antonio, Zimatlán de Álvarez, Oaxaca.', null, 16.8672761, -96.7849352, null, 'Valles Centrales', 'fijo', true),
  (9, 'Miahuatlán de Porfirio Díaz', null, 'Miahuatlán de Porfirio Díaz', 'Plan de Ayala, Col. 20 de Noviembre, 70805 Miahuatlán de Porfirio Díaz, Oaxaca. Número exterior no localizado.', 'L-S 08:00 - 16:00 Hrs', 16.31729, -96.579348, null, 'Sierra Sur', 'fijo', true),
  (10, 'Huajuapan de León', 'Dirección de Salud', 'Heroica Ciudad de Huajuapan de León', 'Col. La Merced, Heroica Ciudad de Huajuapan de León, Oaxaca.', null, 17.814453, -97.779639, null, 'Mixteca', 'fijo', false),
  (11, 'Tlaxiaco', null, 'Heroica Ciudad de Tlaxiaco', 'Av. San Bartolo esquina Emiliano Zapata, Barrio de San Bartolo, Heroica Ciudad de Tlaxiaco, Oaxaca.', null, 17.269444, -97.679167, null, 'Mixteca', 'fijo', true),
  (12, 'San Juan Bautista Tuxtepec', 'Consultorio de Alergología', 'San Juan Bautista Tuxtepec', 'Calle Miguel Hidalgo 839, Centro, 68460 San Juan Bautista Tuxtepec, Oaxaca.', 'Ma y Vi 17:00 - 19:00 Hrs', 18.0875126, -96.1176012, null, 'Papaloapan', 'fijo', false),
  (13, 'CAPASITS - Pinotepa Nacional', 'CAPASITS', 'Santiago Pinotepa Nacional', 'Av. José A. Baños Aguirre, La Banda, 71600 Santiago Pinotepa Nacional, Oaxaca.', 'L-V 08:00 - 15:00 Hrs', 16.3480829, -98.0484905, null, 'Costa', 'fijo', false),
  (14, 'CAPASITS - Salina Cruz', 'CAPASITS', 'Salina Cruz', 'La Brecha, Col. Jardines, 70614 Salina Cruz, Oaxaca.', 'L-V 08:00 - 14:00 Hrs', 16.224427, -95.20637, null, 'Istmo', 'fijo', false),
  (15, 'Centro de Justicia para las Mujeres', null, 'Juchitán de Zaragoza', 'Carretera Juchitán - Ixtepec Km. 1.3, Planta Impregnadora, Juchitán de Zaragoza, Oaxaca, CP 70050.', 'L-V 09:00 - 17:00 Hrs', 16.4541137, -95.0273169, 'Solo mujeres y adolescentes', 'Istmo', 'fijo', false),
  (16, 'Puerto Ángel', null, 'San Pedro Pochutla', 'Calle José Vasconcelos s/n, Puerto Ángel, San Pedro Pochutla, Oaxaca.', null, 15.667256, -96.4905351, null, 'Costa', 'fijo', true),
  (17, 'Santa María Huatulco', 'Dirección de Salud', 'Santa María Huatulco', 'Galeana 238, Centro de la Población, 70980 Santa María Huatulco, Oaxaca.', null, 15.8339571, -96.321974, null, 'Costa', 'fijo', false),
  (18, 'Caravanas DIF Estatal', 'DIF Estatal Oaxaca', 'Cobertura estatal', 'Dirección base: Murguía #802, Ruta Independencia, Centro, Oaxaca de Juárez, Oaxaca, CP 68000.', null, 17.0604663, -96.7253575, 'Servicio móvil: consulta disponibilidad actual.', 'Oaxaca y zona metropolitana', 'movil', true),
  (19, 'AHF Santa Cruz Xoxocotlán', 'AHF', 'Santa Cruz Xoxocotlán', 'Calle Moctezuma #3, esquina con Matamoros, Centro, Santa Cruz Xoxocotlán, Oaxaca.', 'Lunes, miércoles y viernes, 09:00 - 16:00 Hrs', 17.026864, -96.730492, 'Servicios gratuitos, confidenciales y sin juicios. Confirma la disponibilidad antes de acudir.', 'Oaxaca y zona metropolitana', 'fijo', false)
on conflict (id) do update set
  nombre = excluded.nombre,
  institucion = excluded.institucion,
  municipio = excluded.municipio,
  direccion = excluded.direccion,
  horario = excluded.horario,
  lat = excluded.lat,
  lng = excluded.lng,
  restricciones = excluded.restricciones,
  region = excluded.region,
  tipo = excluded.tipo,
  coordenada_aproximada = excluded.coordenada_aproximada,
  updated_at = now();

select setval(
  pg_get_serial_sequence('public.puntos', 'id'),
  coalesce((select max(id) from public.puntos), 1),
  true
);

commit;
