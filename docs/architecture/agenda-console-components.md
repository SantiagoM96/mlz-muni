# Componentización de consola Agenda — PR 5

Los formularios consumen **componentes React compartidos y tipados**, no `inputClass`, `consoleInputBaseClass` ni `consoleCheckboxClass`.

| Componente | Consumidores | Variantes |
| --- | --- | --- |
| `FormField` | GeneralInfo, Registration, ScheduleDate, ScheduleAdditional, VenueSelector | Label + campo, ayuda opcional |
| `TextField` | Título, URL, fechas/horarios, alta de sedes | `standard` 4px / `soft` 6px |
| `SelectControl` | Categoría, tipo, inscripción, tipo fecha/participantes, sede y demo | 4/6px |
| `TextAreaControl` | Descripción, inscripción, participantes y detalle fecha | 4/6px, resize-y |
| `CheckboxField` | Inclusiva, lluvia, destacada | `standard` 28px / `comfortable` 44px; input 20px |

Conservados: IDs, HTML nativo, onChange, refs, validación de fecha y sedes, aria-describedby, radios 4/6, focus, colores, datos y diálogos. Se elimina `ConsoleScheduleFormPrimitives.tsx` por duplicación. Inputs de archivo y editor de tipos siguen específicos por responsabilidad y geometría.

Validación requerida: tests de arquitectura y E2E de fechas, sedes, radios, checkboxes; paridad visual a 390/432/768/1415.
