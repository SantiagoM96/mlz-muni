# Agenda — instrucciones específicas para agentes

Estas reglas complementan [AGENTS.md de la raíz](../../../AGENTS.md) y se aplican al código de `src/features/agenda/` y a sus consumidores en `src/components/agenda/` y `src/modules/agenda/pages/`.

## Contratos de las vistas

- Rutas públicas invariables: `/agenda-de-la-comunidad`, `/agenda-de-la-comunidad/actividades` y `/agenda-de-la-comunidad/actividades/:id`. Mantener Breadcrumbs, back/forward y `ScrollRestoration`.
- Las tarjetas deben conservar contenido, destinos, badges, imágenes, etiquetas, alturas aprobadas y estados hover/focus.
- La ficha mantiene descripción completa, imagen, compartir, resumen sticky de desktop, horario/fecha/ubicación y mapa cuando exista dirección.
- Los registros de `src/data/agenda*.ts` son la fuente original: no alterar fechas, títulos, descripciones, badges ni imágenes para facilitar la implementación. Mantener separados los datos de demostración de eventos confirmados.

## Filtros

- Los tipos de dominio de Agenda tienen como fuente autoritativa `model/activity.ts`; `src/data/agenda.ts` mantiene reexportaciones de compatibilidad para consumidores heredados. No introducir imports runtime de fixtures en `model/activity.ts`.
- La fuente autoritativa de estructura y operaciones de selección está en `model/filterState.ts`; el contrato de ordenamiento está en `model/sort.ts`.
- `utils/filterAgendaActivities.ts` concentra filtrado y ordenamiento puros: requiere la fecha y colección explícitas, sin importar fixtures. `utils/argentinaTodayISO.ts` proporciona la fecha local argentina y permite inyección de un instante para tests. `utils/normalizeAgendaText.ts` centraliza la comparación insensible a tildes y mayúsculas.
- El estado de búsqueda y filtros se mantiene en la página; los controles reciben valores y callbacks. No crear estados seleccionados paralelos en componentes hijos.
- Conservar multiselección, limpieza individual y general, etiquetas de chips, búsqueda por opción, ordenamiento A-Z/Z-A, resultado vacío y mostrar más actividades.
- Conservar click outside, Escape, restauración de foco, scroll lock, accesibilidad y separación táctil de al menos 44 px cuando corresponda, sin aumentar padding arbitrariamente.

## Drawer y animaciones

- Las hojas móviles existentes (`AgendaMobileSheet`, `useAgendaSheetDismiss`, `useAgendaMobileScrollLock`) preservan apertura/salida, backdrop, arrastre, resistencia hacia arriba, rebote elástico y cancelación de gestos.
- Los tiempos, clases CSS y curvas están calibrados en `src/styles/globals.css`. No simplificar ni sustituir con otra biblioteca sin medir regresiones.
- Comprobar `prefers-reduced-motion` y body scroll lock, también después de cerrar mediante Escape, botón, backdrop o swipe.
- Evitar cambiar el punto de quiebre mobile actual de 680 px sin autorización visual.

## Design System y verificación

- Conservar Geometria, Material Symbols mediante `MaterialIcon`, `PageContainer` de 1200 px y tokens institucionales.
- Referencia Figma: https://www.figma.com/design/i1EyRb02SVGEtP6nWElLlT/AGENDA-DE-ACTIVIDADES---TEATROS-LOCALES . Consultar el frame específico; no modificar Figma.
- Revisar `tests/e2e/agenda.spec.ts` antes de modificar un comportamiento. Usar `npm run typecheck`, `npm run lint`, `npm run build` y `npm run test:e2e` como verificaciones existentes; Playwright usa viewports 390, 432, 768 y 1415 px.
- No atribuir una aprobación visual al simple hecho de que compile. Reportar resultados efectivos y cualquier diferencia de UX, motion o responsive.
