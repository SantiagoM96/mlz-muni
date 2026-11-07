# MLZ — Frontend institucional de Lomas de Zamora

Proyecto autónomo de prototipos y vistas del Municipio de Lomas de Zamora, separado de otros trabajos del repositorio `SantiagoM96/mlz`.

## Alcance

- **Jóvenes en Comunidad:** landing, contenido, imágenes, iniciativas y contacto.
- **Agenda de la Comunidad V2:** portada, catálogo, búsqueda y filtros, tarjetas, ficha de actividad, fechas, sedes, inscripción y mapa.
- **Consola V2:** edición y vista previa demostrativas de actividades, tipos, sedes y programaciones.

**Importante:** la consola es una demostración de frontend; **no** tiene backend, autenticación, persistencia ni publicación real de actividades. Los datos son fixtures/prototipos, no una agenda oficial confirmada.

## Stack y requisitos

React 19, React Router 7, TypeScript 5.9, Vite 8, Tailwind CSS 4, Material Symbols y Playwright. Node.js **>=20.19**; para CI se utiliza Node 22. Se mantiene el nombre interno `mlz-web` en el package manifest para conservar el lockfile verificado.

## Desarrollo local

```bash
npm ci
npm run dev
```

La URL local se muestra en la salida de Vite. En modo local el `base` es `/`.

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Portada institucional provisional |
| `/jovenes-en-comunidad` | Jóvenes en Comunidad |
| `/agenda-de-la-comunidad` | Portada de Agenda |
| `/agenda-de-la-comunidad/actividades` | Catálogo público |
| `/agenda-de-la-comunidad/actividades/:id` | Ficha / sede de actividad |
| `/agenda-de-la-comunidad/consola-preview` | Consola V2 demostrativa |

## Organización

- `src/app`, `src/layouts`, `src/pages`: router, layout y páginas.
- `src/components`: elementos de interfaz compartidos e interfaz pública de Agenda.
- `src/features/agenda`: dominio, consola, filtros, hooks y utilidades.
- `src/data`: datos fuente y de demostración.
- `src/styles` y `src/assets/fonts`: estilos institucionales y Geometria.
- `public/assets`: logos, fotografías e ilustraciones.
- `tests/e2e` y `tests/visual-parity`: QA funcional y paridad visual.

Se preservan las rutas, los componentes y las reglas existentes. El color institucional es `#236999`.

## Validación

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright prueba 390, 432, 768 y 1415 px. `npm run test:visual` crea capturas de revisión. El estado de cada ejecución debe consultarse en GitHub Actions; que exista un script no significa que ya se haya ejecutado exitosamente.

## GitHub Pages (preparación únicamente)

```bash
npm run build:pages
```

Este comando **compila localmente**, prepara copias de `index.html` para enlaces directos y configura la base `/mlz-muni/`. **No despliega por sí mismo.** El workflow `.github/workflows/pages.yml` publica el preview en GitHub Pages desde `main` tras una autorización posterior a la migración. URL prevista: `https://santiagom96.github.io/mlz-muni/` (confirmar tras el primer despliegue). No modificar ni redirigir las antiguas URL de `/mlz/`.

## Procedencia y políticas

Migrado selectivamente de [`SantiagoM96/mlz`](https://github.com/SantiagoM96/mlz) desde el commit fijo `adc097b3fd6f129e7994b67b24cce46edc2b608b`. El origen no se modifica. No incorporar Crónica, BAE, editores ni prototipos ajenos al alcance municipal.

Consultar [`AGENTS.md`](./AGENTS.md), [documentación de migración](./docs/migracion-frontend-2026-11-06.md), [CI y pruebas](./docs/ci-cd.md) y el [diagnóstico de Agenda V2](./docs/agenda-v2-refactor.md).
