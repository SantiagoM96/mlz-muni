# Migración de páginas Agenda a un módulo propio

Este cambio traslada las cuatro páginas de Agenda V2 desde `src/pages/agenda/` a `src/modules/agenda/pages/` y actualiza sus rutas de importación y el router. No modifica `path`, `basename`, elementos JSX, estilos, lógica, datos, previews ni comportamiento.

## Alcance

- `AgendaHomePage`, `AgendaPage`, `AgendaActivityDetailPage` y `AgendaConsolePreviewPage` se mueven completas.
- El router conserva las cuatro rutas y la ubicación excepcional de consola fuera del layout institucional.
- La dependencia de `NotFoundPage` de la ficha sigue apuntando al mismo componente.
- Las carpetas heredadas `src/features/agenda/`, `src/components/agenda/` y `src/data/agenda*.ts` no cambian en este PR.

## Control de riesgos

Verificar TypeScript, lint, build y Playwright por cuatro viewports. Inspeccionar rutas directas y refresco en GitHub Pages. Comparar snapshots existentes cuando aplique. Una migración mecánica no prueba ausencia de regresión visual por sí sola. No unir este PR hasta que sus antecesores estén validados.
