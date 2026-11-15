import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const dist = join(process.cwd(), 'dist');
const staticPaths = [
  'ui-kit',
  'ui-kit/deportes',
  'ui-kit-andy',
  'ui-kit-andy/componentes',
  ...['fundamentos', 'filtros', 'formularios', 'seleccion', 'botones', 'etiquetas', 'tarjetas', 'mensajes'].map(section => `ui-kit-andy/${section}`),
  ...['input','select','textarea','calendario','adjuntos','checkbox','radio','switch','buscador','sede','edad','mas-filtros','ordenar','scrollbars','boton','chips','tarjeta','mensaje','acordeon'].map(component => `ui-kit-andy/componentes/${component}`),
  'ui-kit/formularios',
  'ui-kit/botones',
  'ui-kit/tipografia',
  'ui-kit/tarjetas',
  'ui-kit/etiquetas',
  'ui-kit/navegacion',
  'ui-kit/iconos',
  'ui-kit/tokens',
  'jovenes-en-comunidad',
  'agenda-de-la-comunidad',
  'agenda-de-la-comunidad/actividades',
  'agenda-de-la-comunidad/consola-preview',
  'agenda-de-la-comunidad/actividades/tita-y-rhodesia',
  'agenda-de-la-comunidad/actividades/preview-v2-yoga-dos-sedes',
  'agenda-de-la-comunidad/actividades/preview-v2-yoga-dos-sedes--sede-plaza-grigera',
  'agenda-de-la-comunidad/actividades/preview-v2-yoga-dos-sedes--sede-polideportivo-evita',
  'agenda-de-la-comunidad/actividades/preview-v2-futbol--sede-plaza-grigera',
  'agenda-de-la-comunidad/actividades/preview-v2-futbol--sede-parque-de-lomas',
  'agenda-de-la-comunidad/actividades/preview-v2-itinerante--sede-plaza-grigera',
  'agenda-de-la-comunidad/actividades/preview-v2-itinerante--sede-parque-de-lomas',
  'agenda-de-la-comunidad/actividades/preview-v2-compostaje',
  'agenda-de-la-comunidad/actividades/preview-v2-futbol',
  'agenda-de-la-comunidad/actividades/preview-v2-muestra',
  'agenda-de-la-comunidad/actividades/preview-v2-itinerante',
  'agenda-de-la-comunidad/actividades/preview-v2-huerta',
  'agenda-de-la-comunidad/actividades/preview-v2-folklore',
  'agenda-de-la-comunidad/actividades/preview-v2-reciclaje',
  ...Array.from({ length: 18 }, (_, i) => `agenda-de-la-comunidad/actividades/actividad-${i + 1}`),
];
for (const route of staticPaths) {
  const directory = join(dist, route);
  mkdirSync(directory, { recursive: true });
  copyFileSync(join(dist, 'index.html'), join(directory, 'index.html'));
}
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');
console.log('Rutas estáticas preparadas en GitHub Pages:', staticPaths.length);
