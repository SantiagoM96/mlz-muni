# Biblioteca de componentes React institucionales — MLZ Municipal

**Ámbito:** `SantiagoM96/mlz-muni`, tercera etapa. La fuente de verdad es `src/shared/ui` y los consumidores; no se crean abstracciones ni dependencias nuevas sin uso real.

| Componente | API / variantes tipadas | Consumidores de producción (reales) | Responsabilidad |
| --- | --- | --- | --- |
| `PageTitle` | Props nativas `h1`, `children`, `className` | `JovenesEnComunidadPage`, `AgendaIntro` | Encabezado de página 32px/40px y azul institucional |
| `Button` (preexistente) | `variant` primary/secondary/success, disabled | `InitiativeSection` (Jóvenes) | Acción nativa deshabilitada para próxima funcionalidad |
| `ActionLink` | `to` interno **o** `href` externo; `appearance` compact/wide | `HomePage`, `NotFoundPage`, `ActivityRegistrationLink` | Acción navegable semántica, sin reemplazarla por botón |
| `FormField` | `label`, `htmlFor`, `hint?`, `children` | GeneralInfo, Registration, ScheduleDate, ScheduleAdditional, VenueSelector | Asociación label-control y layout de campo |
| `TextField` | Props nativas input + `appearance` standard/soft | GeneralInfo, Registration, ScheduleDate, VenueSelector | Input con estilo institucional y ref nativa (React 19) |
| `SelectControl` | Props nativas select + `appearance` | GeneralInfo, Registration, ScheduleDate, ScheduleAdditional, VenueSelector y ConsolePreviewPage | Select/option HTML nativos |
| `TextAreaControl` | Props nativas textarea + `appearance` | GeneralInfo, Registration, ScheduleAdditional | Texto multilínea con tamaños por consumidor |
| `CheckboxField` | Props nativas input + `children`, `density` standard/comfortable | GeneralInfo (inclusiva), ScheduleAdditional (lluvia), Images (destacada) | Label + checkbox nativo, acento institucional |
| `InfoCard`, `IconLink`, `PageContainer`, `PageHero`, `Breadcrumbs` | Contratos ya existentes | Jóvenes y otras pantallas | Componentes institucionales que se reutilizan, no se duplican |

## Límites de responsabilidad

- `src/shared/ui` **no importa datos de Agenda ni Jóvenes**. Recibe props nativas y presentación.
- `src/modules/jovenes-en-comunidad/components/EditorialContent.tsx` y `InitiativeSection.tsx`: contenido y composición editorial exclusivos del módulo. No promover al sistema institucional.
- `src/modules/agenda/components/public/ActivityCard.tsx`, `ActivityBadges.tsx`, `AgendaToolbar.tsx`: conservan horarios, imágenes, filtros y estados de dominio de Agenda.
- `ConsoleScheduleEditorDialog`, `ConsoleTypeEditorDialog`, `ConsoleDetailDialog`: mantienen foco, backdrop, scroll y ciclo de vida propios. Extraer un Dialog universal requeriría demostrar igualdad del contrato de apertura/cierre y regresión visual sin romper interacción táctil.
- `ConsoleImageUpload` y el campo propio de `ConsoleTypeEditorDialog`: no son equivalentes a input estándar (interacción de archivo o geometría 6px especial). Conservar hasta encontrar consumidores compatibles.
- Los radios 4px (formulario estándar) y 6px (editor) se preservan mediante `FormControlAppearance`. No se fuerzan cambios de apariencia.

## QA y performance

`npm run typecheck`, `npm run lint`, `npm run test:architecture`, `npm run check:architecture`, `npm run check:styles`, `npm run build`, `npm run report:css`, `npm run audit:styles`, `npm run test:e2e`.

Comparación visual automatizada frente a `main` en 390px, 432px, 768px y 1415px, incluyendo Jóvenes, Agenda pública y consola. No actualizar capturas para justificar divergencias ni declarar mejoras de CSS/JS sin mediciones de los dos estados.

**Adopción real:** una función exportada sin consumidores no cuenta; esta biblioteca se prueba y se utiliza en las pantallas existentes. Las excepciones quedan intencionales, no son deuda de unificación a ciegas.
