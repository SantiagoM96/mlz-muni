# Límites de módulos e importaciones

## Regla principal

Cada módulo es propietario de sus contratos, reglas, datos y componentes específicos. `shared` debe permanecer independiente de cualquier módulo municipal. Las páginas propias se pueden componer con elementos institucionales.

### Dependencias permitidas

| Origen | Puede consumir | No debe consumir |
| --- | --- | --- |
| `app/` | Entradas explícitas de módulos, layout y navegación | Reglas internas o fixtures de módulos como lógica de aplicación |
| `modules/<a>/` | Sus archivos internos, componentes institucionales compartidos | Archivos internos de `modules/<b>/` |
| `shared/` (cuando exista) | Otros elementos de `shared/` con dependencias dirigidas | `modules/`, `pages/`, `features/` específicas |
| Dominio/modelo de un módulo | Tipos y funciones puras del mismo dominio | React, DOM, router, componentes, fixtures o UI de consola |
| Consola demo | Modelo y UI pública de su mismo módulo a través de contratos explícitos | Publicación, backend o persistencia inexistentes |

### Durante la migración

La estructura antigua de Agenda y la estructura institucional actual siguen siendo válidas **hasta que sean migradas**. No introducir nuevas dependencias cruzadas para acomodar un refactor parcial; cuando un movimiento precise modificar consumidores, hacerlo en el mismo PR.

- Los componentes públicos de Agenda (`src/modules/agenda/components/public`) pertenecen exclusivamente al módulo y no deben confundirse con UI institucional genérica.
- `src/data/agenda.ts` sigue alojando fixtures y transformaciones editoriales; los contratos y el reloj municipal ya están separados en `src/modules/agenda/model` y `src/modules/agenda/utils`. Completar el traslado de datos en otro PR.
- `src/modules/jovenes-en-comunidad` contiene la página y los datos de Jóvenes; importa componentes institucionales existentes sin duplicarlos.
- `src/components/navigation/Breadcrumbs.tsx` aún contiene un fallback específico de Agenda; corregir ese acoplamiento en un PR propio, con pruebas.
- Mantener los tests E2E de todas las rutas mientras migra la estructura.

## Reglas de mantenimiento

1. Un módulo nuevo empieza con la mínima estructura necesaria.
2. No exportar una utilidad hacia `shared` hasta demostrar al menos dos consumidores semánticamente equivalentes o una responsabilidad transversal explícita.
3. No importar archivos internos de otro módulo; acordar antes una interfaz pública o reconsiderar los límites.
4. Evitar dependencias circulares, barrels innecesarios y tipos globales sin dueño.
5. La consola demostrativa y la web pública pueden compartir reglas y presentación de Agenda, pero deben seguir diferenciando sus comportamientos.
6. Un cambio de importación es arquitectónico: ejecutar typecheck, lint, build y pruebas funcionales relevantes.

## Revisión de PR

Documentar: archivos movidos, antiguos y nuevos consumidores, invariantes conservados, comandos verificados, regresiones conocidas y plan de rollback. No confundir un compilado exitoso con aprobación visual.

## Migración parcial de las páginas de Agenda

Las cuatro páginas de Agenda están en `src/modules/agenda/pages/`, incluida `AgendaConsolePreviewPage`; el router conserva las mismas rutas y el mismo `basename`. Los modelos, componentes, hooks, utilidades y la consola ya se incorporaron al mismo módulo. Por ahora, los datos editoriales permanecen en `src/data/agenda*.ts`. Esta excepción temporal no autoriza a módulos futuros a importar código interno de Agenda.
