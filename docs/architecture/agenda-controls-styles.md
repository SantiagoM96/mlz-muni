# Normalización localizada de controles Agenda — PR 3

Se comprobó una repetición real en `ConsoleFormPrimitives.tsx` y `ConsoleScheduleFormPrimitives.tsx`: ambos campos usan idénticas reglas de altura, borde, fondo, fuente, focus y placeholder. Se extrae la parte común a `consoleInputBaseClass` dentro del mismo módulo, sin crear UI institucional ni API de variantes.

**Excepciones intencionales:** formulario general conserva `rounded-[4px]` y `transition-colors`; editor de programaciones conserva `rounded-[6px]` sin la transición. Las clases permanecen completas y literales para Tailwind CSS v4.

Se unifica el color de focus de `AgendaDropdown` con el token `info-500` ya existente (mismo valor `#006eff`). Se explicita `focus-visible` en acciones de filtros que no lo declaraban; no se modifican estilos base, hover, geometría ni interacciones.

**Prueba agregada:** `tests/e2e/agenda-control-styles.spec.ts` verifica en Chromium los radios 4px y 6px, tamaños 16px y color institucional de ambos formularios. Se ejecuta en los cuatro viewports de la matriz existente. Las demás pruebas protegen navegación, drag, scroll, motion y consola.

No se promueve `ConsoleFormPrimitives` a `src/shared`: la similitud observada se limita a dos flujos del mismo módulo.
