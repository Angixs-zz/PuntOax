const coesidaSource = 'https://www.oaxaca.gob.mx/comunicacion/inaugura-coesida-capasits-nuevo-punto-para-la-deteccion-de-vih-sifilis-y-hepatitis-c-en-la-mixteca/'
const tlalixtacSource = 'https://www.oaxaca.gob.mx/administracion/brindan-secretaria-de-administracion-y-coesida-taller-sobre-educacion-sexual-y-prevencion-del-vih/'
const ahfSource = 'https://ahfmexico.org.mx/oaxaca/'

const publicPoint = {
  sector: 'publico',
  sectorLabel: 'Servicio público',
  costo: 'gratuito',
  costoLabel: 'Servicio gratuito',
  pruebas: ['VIH', 'Sífilis', 'Hepatitis C'],
  fuenteOperativa: coesidaSource,
  fechaVerificacion: 'Agosto de 2026',
}

export const pointMetadataById = {
  1: {
    ...publicPoint,
    nombre: 'Punto Fijo de Detección – Dirección de Sanidad',
    institucion: 'COESIDA-CAPASITS / Municipio de Oaxaca de Juárez',
    direccion: 'Mártires de Tacubaya 315, Col. Centro, C.P. 68000, Oaxaca de Juárez, Oaxaca.',
    horario: 'Lunes a viernes, 09:00 - 10:30 y 11:30 - 13:00 Hrs',
    restricciones: 'Presentar CURP. No requiere cita previa para pruebas rápidas.',
    coordenadaAproximada: true,
    servicios: ['Orientación y consejería asociada al servicio'],
    requisitos: 'Presentar CURP.',
    cita: 'Pruebas rápidas sin necesidad de cita previa.',
    confidencial: true,
    telefono: '951 516 8365',
    telefonoUrl: 'tel:+529515168365',
    telefonoInstitucional: '951 502 2200',
    telefonoInstitucionalUrl: 'tel:+529515022200',
  },
  3: publicPoint,
  4: publicPoint,
  5: publicPoint,
  7: {
    ...publicPoint,
    direccion: 'Centro Mujer Tu Espacio, piso 3 del edificio 1, Ciudad Administrativa Benemérito de las Américas, Carretera Oaxaca-Istmo Km 11.5, Tlalixtac de Cabrera, Oaxaca.',
    horario: 'Martes y jueves, 10:00 - 15:00 Hrs',
    requisitos: 'Presentar CURP y RFC.',
    fuenteOperativa: tlalixtacSource,
  },
  9: publicPoint,
  11: publicPoint,
  13: publicPoint,
  14: publicPoint,
  19: {
    sector: 'comunitario',
    sectorLabel: 'Organización comunitaria',
    costo: 'gratuito',
    costoLabel: 'Servicio gratuito',
    direccion: 'Calle Moctezuma #3, esquina con Matamoros, Centro, Santa Cruz Xoxocotlán, Oaxaca.',
    horario: 'Lunes, miércoles y viernes, 09:00 - 16:00 Hrs',
    pruebas: ['VIH', 'Sífilis', 'Hepatitis C'],
    servicios: ['Condones y lubricantes sin costo', 'Orientación', 'Vinculación a tratamiento si el resultado es reactivo'],
    telefono: '951 427 7713',
    telefonoUrl: 'tel:+529514277713',
    whatsapp: '55 6891 2077',
    whatsappUrl: 'https://wa.me/525568912077',
    fuenteOperativa: ahfSource,
    fechaVerificacion: 'Agosto de 2026',
  },
}
