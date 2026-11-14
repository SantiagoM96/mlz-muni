# Migración inicial de patrones de Deportes al MLZ UI Kit (14/11/2026)

## Fuentes inspeccionadas
- `SantiagoM96/mlz/public/prototipos/deportes_formulario_resumen_compacto.html`: bloque `.sports-filters`, estados `.sf-control`, `.sf-option`, bandeja mobile, check, acciones y scrollbars.
- `SantiagoM96/mlz-muni/src/modules/agenda/components/public/AgendaDropdown.tsx`: versión modular de Agenda, con opciones separadas en `space-y-[2px]`, estados seleccionados, contorno del checkbox, búsqueda (excepto Fecha) y botones.
- `SantiagoM96/mlz-muni/src/modules/agenda/consolePreview/ConsoleFormPrimitives.tsx` y biblioteca `src/shared/ui`: base de consola y convenciones institucionales.
- `src/styles/tokens.css` y `docs/design-system/README.md`: tokens existentes.

## Implementación
Se incorpora `/ui-kit/deportes` como galería de referencia interactiva en `src/pages/ui-kit/SportsControlsGallery.tsx`. El CSS está **encapsulado** en `src/pages/ui-kit/deportes-controls.css` bajo `.kit-sports-*` para no modificar componentes productivos ni desplazar el catálogo Figma existente.

**Filtros de catálogo:** desencadenante 48px, borde normal 1px `#5ba8d5`, abierto/seleccionado 2px `#006eff`, separación 2px entre opciones de radio 4px, fondo seleccionado `#006eff`, texto y check blanco con contorno sin relleno, búsqueda por opciones excepto Fecha, selección simple/múltiple, contador, limpiar y aplicar. Sheet mobile inferior por debajo de 680px, backdrop y scroll lock, Escape, click exterior y foco de retorno.

**Campos de inscripción:** muestra independiente de texto, select, disabled y error; etiquetas, alturas y colores tomados de referencias. No reemplaza los formularios reales ni sus lógicas de validación.

**Íconos:** utiliza el componente `MaterialIcon` existente (Material Symbols Outlined y subconjunto local), sin dependencia de fuente externa ni SVG artesanal.

## Tokens comprobados
| Semántica | Valor | Estado |
| --- | --- | --- |
| primario institucional | #236999 | token global existente |
| acento de selección | #006eff | token global info-500 existente |
| borde de filtro | #5ba8d5 | referencia local Deportes, pendiente de contrato institucional |
| texto base | #3d3d3d | token global existente |
| superficie activa | #f6f6f6 | referencia local Deportes |
| disabled formulario | #e5f0f9 | referencia biblioteca UI Kit Figma |
| error formulario | #ef284c | referencia biblioteca UI Kit Figma |

## Pendiente de aprobación / paridad
- Contrastar capturas reales 390, 432, 768, 1415px con Deportes Anual; esta primera migración no afirma paridad pixel a pixel.
- Recrear en catálogo todos los estados de selectores de formularios: autocomplete, calendario, dropdown mobile y selectors con búsqueda propia.
- Confirmar el nombre semántico de `Info 600`: el valor de acento `#006eff` está registrado en código como `info-500`; no se renombra el token sin fuente.
- Extraer los componentes a biblioteca compartida **solo después** de su aprobación y prueba de consumidores.
- Ejecutar validaciones de CI (`npm run typecheck`, `npm run lint`, `npm run test:architecture`, `npm run build`, E2E y capturas). No se ejecutaron en este cambio por no disponer de un entorno con dependencias del repositorio.

Esta rama es solo de revisión. No se abrió PR, no se fusionó con main y no se desplegó.
