# Adopción de Design Tokens — Agenda pública (etapa 2)

**Base:** PR #23 de Jóvenes, encadenado sobre PR #22 de tokens compartidos.

## Cambios de código

Se reemplaza exclusivamente la pareja exacta `text-[18px] leading-[26px]` por la utility institucional `text-institutional-body` en textos descriptivos de AgendaIntro, ActivityDescription, ActivityInformation, ActivitySummary, ActivityRegistrationLink, AgendaPage, ActivityShare y AgendaCircuitCard. En ActivitySummary, el encabezado `24px/30px` pasa al token `text-institutional-section`.

Las clases permanecen explícitas/detectables por Tailwind CSS v4; no se agregan constantes dinámicas de clases, estilos inline, componentes universales ni dependencias. El token preserva la pareja de medidas, no solamente `font-size`.

## Excepciones justificadas

- `ActivityCharacteristic` usa 18px/**22px** (no 26): no migrar por similitud parcial.
- La tarjeta de Agenda usa títulos 22px/**28px**; la portada destacada tiene su propia jerarquía.
- Otros `text-[18px]` tienen `line-height` diferente o heredado: no reemplazar sin medir.
- Colores/sombras particulares no equivalen automáticamente a `primary`, `divider` o un token universal.

## Validación

E2E comprueba `font-size` y `line-height` en Agenda pública; los tests actuales de filtros, listado, detalle y motion siguen activos. La paridad visual pública (inicio/listado/ficha) y la de consola comparan contra el baseline del PR. No se modifican datos, JSX funcional, rutas o copy. No se reclama mejora de Web Vitals ni reducción de CSS sin reporte.
