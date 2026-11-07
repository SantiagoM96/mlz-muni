# Agenda consola — adopción controlada del Design System (etapa 2)

**Base:** PR #24 (Agenda pública), dependiente de PR #23 y PR #22.

## Cambios reales

- `ConsoleFormPrimitives.tsx`: `text-[#236999]` → `text-primary-600`; `focus-visible:ring-[#236999]/20` → `focus-visible:ring-primary-600/20`; equivalencia cromática exacta.
- `SectionTitle` utiliza el token institucional de sección 24/30.
- `consoleCheckboxClass`: una constante con utilities **completas detectables por Tailwind v4** para tres checkboxes en información, programación e imágenes (20px / acento institucional).
- Los inputs de formulario general mantienen radio 4px y transición; el editor mantiene radio 6px sin transición.

## Reglas de arquitectura y excepciones

- El control pertenece a la consola demostrativa; no introducirlo en `src/shared` sin consumidores institucionales reales.
- Colores de error/ayuda y otras escalas de 16/24 se preservan; no crear tokens sin semántica validada.
- No cambiar JSX funcional, estados, rutas, datos, textos, validaciones, persistencia ni responsividad.

## QA

Nuevo E2E verifica títulos, radios y el color computado de las tres casillas. Mantener E2E de consola/modales, motion y comparación pixel a pixel de consola; medir bundle con la misma configuración.
