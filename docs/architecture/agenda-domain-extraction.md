# Extracción inicial de contratos de dominio de Agenda

Este PR prepara la migración posterior de Agenda a `src/modules/agenda` sin mover aún toda la funcionalidad ni alterar la UI.

## Cambio

- `src/features/agenda/model/activity.ts` contiene **únicamente tipos TypeScript**: actividad, programación, modo de inscripción, grupo de filtro y categoría.
- `src/data/agenda.ts` mantiene la construcción y los datos editoriales originales, y reexporta los mismos tipos como compatibilidad para los consumidores existentes.
- `filterState.ts`, `activitySchedules.ts` y `filterAgendaActivities.ts` consumen los tipos directamente desde `model/activity.ts`; los valores de runtime existentes siguen usando `src/data/agenda.ts`.

## Invariantes

- No se cambian nombres de tipos, propiedades, valores ni contratos.
- `src/data/agenda*.ts` conserva íntegramente los datos y transformaciones.
- No se modifican rutas, páginas, CSS, JSX, assets, contenido ni comportamiento de filtros, fechas y consola.
- La dependencia de runtime de utilidades hacia `agendaActivities` o `argentinaTodayISO` **aún existe**: esta extracción de tipos no pretende resolverla en un único PR.
- El siguiente paso será separar fecha municipal y fixtures de los algoritmos puros, con pruebas específicas; la mudanza completa a `modules/agenda` se realizará cuando las dependencias estén caracterizadas.

## Validación requerida

Ejecutar `npm run typecheck`, `npm run lint`, `npm run build` y E2E de Agenda. Revisar el diff para confirmar que no hay cambios funcionales.

## Etapa 2 — reloj municipal y filtrado sin datos globales

- La función `argentinaTodayISO` pasa a `src/features/agenda/utils/argentinaTodayISO.ts`, con `now: Date = new Date()` para permitir pruebas deterministas. El módulo de datos mantiene un reexport de compatibilidad.
- `filterAgendaActivities` recibe fecha y colección obligatorias, sin importar `agendaActivities` ni el reloj. La página de Agenda ya proporcionaba ambos argumentos explícitamente: su comportamiento no cambia.
- `activitySchedules.ts` deja de cargar indirectamente los fixtures para consultar la fecha.
- `tests/e2e/agenda-domain-rules.spec.ts` verifica explícitamente medianoche argentina, búsqueda, filtros, ordenamiento y visibilidad con fixtures locales.

La separación final de datos y la migración a `modules/agenda` se abordarán en PRs posteriores.
