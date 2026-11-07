# Controles de formulario React — PR 2

Se implementaron **primitivas de UI reales**, no una constante de clases importada por todos los consumidores.

| Componente | API tipada | Consumidores migrados | Contrato |
| --- | --- | --- | --- |
| `FormField` | `label`, `htmlFor`, `hint?`, `children` | `ConsoleGeneralInfoSection`, `ConsoleRegistrationSection` | Estructura `div > label + children + hint`, HTML semántico nativo |
| `TextField` | Props nativas `input`, `appearance?` | Título y URL de inscripción | Estado controlado externo, clase institucional y ref reenviado por React 19 |
| `SelectControl` | Props nativas `select`, `appearance?` | Categoría, tipo, modalidad | Semántica de opción y handlers sin acoplamiento a Agenda |
| `TextAreaControl` | Props nativas `textarea`, `appearance?` | Descripción general e inscripción | `rows`, `resize`, `min-height` preservados |

`appearance=standard` conserva radius 4px y transición; `soft` conserva radius 6px (para consumidores del editor en siguiente PR). HTML, `id`, `value`, `onChange`, `ref` y DOM semántico son nativos, sin wrappers extra en cada control.

Los formularios específicos permanecen en `modules/agenda`. No se introducen dependencias. La separación es deliberada: comportamiento de validación y negocios no debe entrar a `shared/ui`.
