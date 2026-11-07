# Carga diferida de la consola de Agenda

## Motivo

La consola `/agenda-de-la-comunidad/consola-preview` es una vista demostrativa de edición y no se necesita para mostrar la landing municipal ni el listado público de actividades. Antes de este PR su página se importaba de forma estática desde `src/app/router.tsx`, incorporando sus dependencias al grafo de entrada.

## Cambio

La ruta conserva su `path`, `basename`, JSX, datos, navegación y estado demostrativo. Solo sustituye el import estático por la propiedad `lazy` de React Router 7 y un `import()` dinámico que resuelve `Component`.

No se añade otra biblioteca, backend, persistencia ni un loading overlay arbitrario.

## Validación

- `npm run typecheck`, `npm run lint`, `npm run build`.
- Comparar chunks y bytes gzip de los logs de Vite antes y después. **El tamaño de archivo por sí solo no demuestra mejora de Core Web Vitals**; medir LCP/INP/CLS requiere una evaluación de runtime.
- Playwright y paridad visual de la consola, incluida apertura directa por URL y navegación desde el sitio.
- Revisar refresco directo de la ruta con el `basename` de GitHub Pages.
- Confirmar que la consola no carga antes de navegar a ella mediante Network/Performance del navegador, si ese entorno está disponible.

La ruta de consola sigue siendo pública y demostrativa; este cambio **no** agrega control de acceso.
