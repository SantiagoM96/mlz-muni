# Componentes públicos de Agenda — fase de consolidación

Este cambio traslada los componentes específicos de la Agenda desde `src/components/agenda/` a `src/modules/agenda/components/public/`. Los hooks `useAgendaMobileScrollLock` y `useAgendaSheetDismiss` se ubican en `src/modules/agenda/hooks/`.

## Criterios

- Ninguno de estos componentes es parte del design system institucional: son interfaces propias de Agenda y no deben exportarse desde `shared/` por simple parecido.
- Se conservan los mismos JSX, clases CSS, props, handlers y animaciones. Los cambios en los archivos trasladados se limitan a **imports relativos** necesarios por la nueva ubicación.
- Los imports desde páginas y componentes internos de Agenda apuntan al nuevo directorio; los enlaces, las rutas públicas, los datos y GitHub Pages permanecen sin cambios.
- `src/data/agenda*.ts` sigue en su ubicación original para mantener este PR acotado. Su traslado será posterior.
- La consola V2 sigue siendo una vista previa; no se añadió almacenamiento, API ni autenticación.

## Validación

Comparar `npm run typecheck`, `npm run lint`, `npm run build`, Playwright en cuatro viewports y paridad visual de la consola. El movimiento no implica aprobación automática de diseño o accesibilidad.
