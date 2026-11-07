# Design System institucional — matriz de reutilización real

**Base:** `main` `65f7c106d73380d1df1f13d33b4b771328707a42` del repositorio `SantiagoM96/mlz-muni`. Esta matriz registra **consumidores existentes**, no un catálogo especulativo de componentes.

| Patrón | Implementaciones encontradas | Contrato / destino | Consumidores | Decisión y motivo |
| --- | --- | --- | --- | --- |
| Título de página azul 32px/40px | `JovenesEnComunidadPage.tsx`, `AgendaIntro.tsx` | `shared/ui/PageTitle.tsx` | Jóvenes y Agenda (inicio/listado) | **Extraer y adoptar**: mismo `h1`, jerarquía y geometría |
| Botón institucional deshabilitado | `shared/ui/Button.tsx` | `shared/ui/Button.tsx` | `JovenesEnComunidadPage.tsx` | **Mejorar contrato del componente existente**, no duplicarlo |
| Llamados a la acción de navegación | `HomePage.tsx`, `NotFoundPage.tsx` | `ButtonLink` o primitiva de acción según variante | Home/404 | **Evaluar**: variaciones reales de font-size, radio y altura; no cambiar a ciegas |
| Entrada, select y textarea de consola | `ConsoleGeneralInfoSection.tsx`, `ConsoleRegistrationSection.tsx`, `ConsoleScheduleDateFields.tsx`, `ConsoleScheduleAdditionalFields.tsx`, `ConsoleVenueSelector.tsx` | Controles tipados compartidos + variantes visuales reales | Dos familias de formularios de Agenda | **Implementar y migrar**: múltiples consumidores, comportamiento HTML homogéneo; conservar radios 4/6px |
| Agrupación label + campo | `ConsoleFormPrimitives.tsx`, `ConsoleScheduleFormPrimitives.tsx` | `shared/ui/FormField.tsx` | General, registro, fechas, sedes, participantes | **Unificar**: mismo DOM label/control; hint opcional, IDs preservados |
| Checkbox con label | `ConsoleGeneralInfoSection.tsx`, `ConsoleScheduleAdditionalFields.tsx`, `ConsoleImagesSection.tsx` | `shared/ui/CheckboxField.tsx` | Inclusiva, lluvia y destacada | **Unificar estructura**, no solo `className`; conservar min-height variante |
| Tarjeta de índice/contacto | `shared/ui/InfoCard.tsx` | Mantener `InfoCard` | Jóvenes: índice y contacto | **Mantener**: fondo y encabezado institucional propios |
| Tarjeta de actividad | `ActivityCard.tsx`, `FeaturedActivityCard.tsx` | Mantener en `modules/agenda/components/public` | Agenda pública y consola de previsualización | **No promover a shared**: horarios, badges, imagen y lógica de negocio |
| Badges de Agenda | `ActivityBadges.tsx` | Mantener en Agenda | ActivityCard, ActivitySummary, FeaturedActivityCard | **Mantener**: atributos de actividad y semántica específicos |
| Modales y foco | `ConsoleScheduleEditorDialog.tsx`, `ConsoleTypeEditorDialog.tsx`, `ConsoleDetailDialog.tsx`, `useConsoleDialogFocus.ts` | Evaluar `Dialog` compartido solo para una API común real | Consola Agenda | **No extraer todavía**: overlay, tamaño, scroll y retorno de foco diferentes; migración de alto riesgo |
| Header, breadcrumb, hero y contenedor | `shared/navigation`, `shared/layout` | Componentes ya existentes | Agenda, Jóvenes y páginas institucionales | **Reutilizar actuales**; no duplicar |

## Política de migración

1. Un componente nuevo debe tener una API tipada y **consumidores migrados en el mismo PR**.
2. Mantener la semántica HTML, los IDs, refs, rutas y comportamiento; **preservar píxeles** en reposo.
3. Evitar un componente universal que dependa de datos de Agenda o Jóvenes.
4. Preservar excepciones 18/22, 22/28 y radios 4/6 cuando correspondan.
5. Verificar con pruebas de arquitectura + E2E, y paridad a 390/432/768/1415 px.

## Adopción tras la tercera etapa

- **Definido:** contratos documentados de `PageTitle`, `FormField`, `TextField`, `SelectControl`, `TextAreaControl`, `CheckboxField` y `ActionLink`.
- **Implementado:** funciones React reales y tipadas en `src/shared/ui/`, con semántica HTML propia.
- **Adoptado:** Jóvenes, Agenda pública y consola consumen esos componentes; dos composiciones locales se extrajeron en Jóvenes.
- **Verificado:** tests de arquitectura/E2E y paridad visual contra `main` (evidencia en PR de integración). No declarar WCAG AA integral ni mejora de Web Vitals sin estudios específicos.
