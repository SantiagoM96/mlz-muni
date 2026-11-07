# Arquitectura frontend municipal

## Decisión

La arquitectura objetivo de `mlz-muni` es **modular por funcionalidades municipales**, sin adoptar capas de Clean Architecture estricta ni reescribir implementaciones que ya funcionan. La decisión se documenta en [ADR-0001](./decisions/0001-modular-by-feature.md).

El repositorio puede alojar módulos municipales autorizados de distinta complejidad: una landing no necesita los mismos archivos que una consola o un formulario interactivo. No crear funcionalidades de ejemplo para anticipar proyectos futuros.

## Responsabilidades

- `src/app/`: router, configuración de composición y dependencias globales; no contiene reglas de negocio.
- `src/modules/<modulo>/`: propietario de páginas, UI específica, modelos, reglas, hooks y datos de ese ámbito. Agregar subcarpetas **solo si el código existente lo justifica**.
- `src/shared/` (objetivo evolutivo, aún no creado): layout, navegación, estilos y primitivas realmente transversales. Compartir por contrato y comportamiento, no por parecido visual.
- `src/main.tsx`: punto de entrada de React y estilos globales.

## Estado comprobado de la transición

1. `src/modules/jovenes-en-comunidad/` es el primer módulo piloto: su página y sus datos editoriales se mantienen juntos.
2. Agenda reúne páginas, modelo, utilidades, componentes públicos e internos, hooks y consola bajo `src/modules/agenda/`. Sus fixtures y adaptadores editoriales todavía residen en `src/data/agenda*.ts` y se migrarán en un PR separado.
3. El diseño institucional conserva `src/layouts/`, `src/components/layout/`, `src/components/navigation/`, `src/components/ui/`, `src/styles/` y las fuentes existentes. No moverlos por estética.
4. El router mantiene rutas públicas, `basename` y tratamiento actual de GitHub Pages.

## Restricciones de las refactorizaciones

- Conservar contenidos, fixtures, URLs, navegación, color `#236999`, Geometria, responsive, animaciones y comportamiento.
- Los cambios funcionales, visuales, de rendimiento y de despliegue deben evaluarse en PRs separados si alteran contratos o resultados observables.
- No crear stores globales, repositories, services, adapters, API mocks ni carpetas vacías por anticipación.
- No integrar nuevos proyectos municipales sin alcance autorizado.

Las reglas de importación están en [module-boundaries.md](./module-boundaries.md) y el procedimiento de incorporación en [new-feature.md](../contributing/new-feature.md).

## Validación

Para cada PR: verificar `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` y Playwright según alcance. Comparar visualmente con la base del PR; no actualizar snapshots del candidato para ocultar diferencias. Registrar resultados efectivos, no inferirlos de la existencia de scripts.

El estado de esta fase está detallado en [módulo Agenda](./agenda-feature-module.md).
