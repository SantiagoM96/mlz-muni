# Extracción del CSS de Agenda — PR 2

**Base:** `main` `b8203c6ebe8592a64aea8b4540186f93573e87b0`. PR independiente del refactor de tokens.

## Propósito

`src/styles/globals.css` deja de incluir selectores y animaciones propios de Agenda. Se trasladan las reglas **sin cambiar valores CSS** a `src/modules/agenda/styles/agenda.css`. Se mantiene global la configuración de scrollbar de `html` y el ajuste institucional de `[data-layout-container]`; el scrollbar de opciones de Agenda queda en su módulo.

Las cuatro páginas de Agenda importan la misma hoja del módulo. Vite deduplica los imports durante la compilación; esto **no garantiza lazy-loading de CSS**, ya que las tres rutas públicas todavía se importan estáticamente desde `src/app/router.tsx`. El cambio de carga por ruta requeriría un PR funcional separado.

## Contratos protegidos

- Sin cambios a `@theme`, tipografía, JSX, rutas, datos, menús, popovers o lógica de eventos.
- Conservar `max-width: 680px`, `min-width: 681px`, todos los keyframes, easings, tiempos, transforms, `!important`, scroll y selectores de Agenda.
- Conservar scrollbars de `html` y `scrollbar-gutter` globales, más compensación del contenedor.
- Conservar `prefers-reduced-motion` y estados de dragging, stretching, rebound y exit.

## Comprobación

- Nuevo `tests/architecture/agenda-style-contracts.test.mjs` para prevenir regresión de propiedad CSS global y pérdida accidental de contratos de motion. Este test es **estático**, no sustituye las pruebas de navegador.
- CI existente en PR: TypeScript, lint, build, test arquitectura, 4 viewports y paridad de consola.
- Revisar también `tests/e2e/motion-smoke.spec.ts` con `reducedMotion: 'no-preference'`, ya que la suite general usa `reduce`.
- Medir CSS Pages respecto de main: 52,31 kB y 10,89 kB gzip en la ejecución [#42389732947](https://github.com/SantiagoM96/mlz-muni/actions/runs/42389732947).

**Riesgo a vigilar:** orden de aplicación de estilos cuando los imports CSS se resuelven desde páginas. Si la equivalencia de browser/computed-style falla, no aprobar el PR aunque las pruebas estáticas pasen.
