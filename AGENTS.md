# AGENTS — MLZ municipal

## Alcance y responsabilidades
Este repositorio `mlz-muni` aloja funcionalidades municipales autorizadas. Actualmente incluye Jóvenes en Comunidad, Agenda de la Comunidad V2 y dependencias institucionales necesarias. No incorporar Crónica, BAE, Deportes independiente ni proyectos futuros no solicitados. La consola de Agenda es demostrativa: no agregar backend, almacenamiento ni prometer publicación efectiva sin nueva autorización.

## Flujo seguro
1. Inspeccionar el código, los consumidores y las pruebas antes de modificar.
2. Trabajar en ramas con commits descriptivos y PR revisables; revisar PRs y publicar en Pages únicamente desde `main` por el workflow de preview autorizado; no publicar otros entornos ni hacer merge automático.
3. No modificar datos originales, contenido editorial, rutas, expectativas de QA, Figma ni entornos externos durante una migración de infraestructura.
4. No introducir secretos, credenciales ni dependencias sin justificación.
5. Ejecutar `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test:architecture`, `npm run check:architecture`, `npm run build` y `npm run test:e2e` según alcance. Documentar comandos, SHA y resultados, sin atribuir éxito a pruebas no ejecutadas.

## Arquitectura
- La arquitectura objetivo agrupa cada funcionalidad autorizada bajo `src/modules/<nombre>/`; crear únicamente subcarpetas con responsabilidad real. Ver `docs/architecture/overview.md` y `module-boundaries.md`.
- `src/modules/jovenes-en-comunidad` es el primer módulo migrado: posee su página y datos editoriales.
- Agenda V2 concentra páginas, modelos, componentes, consola, hooks, utilidades y fixtures en `src/modules/agenda`. Los datos editoriales siguen siendo de demostración y no deben interpretarse como publicaciones oficiales.
- `src/shared/layout`, `src/shared/navigation` y `src/shared/ui` contienen la UI institucional reutilizable. No agregar allí componentes ni reglas específicos de Agenda u otros módulos. Los estilos y fuentes globales permanecen en `src/styles` y `src/assets`.
- `src/modules/agenda/data/agenda*.ts` se considera fuente original inmutable durante trabajos de arquitectura: no modificar registros para facilitar migraciones.
- `app` configura rutas, los módulos son propietarios de su lógica y `shared` no debe importar módulos municipales. Ningún módulo debe importar internals de otro módulo.
- Respetar importaciones entre capas; evitar dependencias circulares, duplicaciones, abstracciones prematuras y barrels innecesarios.
- Aplicar DRY, KISS, Separation of Concerns y TypeScript explícito. Componentes PascalCase, hooks useCamelCase, variables camelCase.

## UI, responsive y accesibilidad
- Conservar Geometria 400/500/700, Material Symbols, `PageContainer` de 1200 px, y `#236999`; no reemplazar familias/tokens arbitrariamente.
- Mantener diseño, componentes, spacing, breakpoints y comportamiento aprobado. No consultar Figma en la fase de migración; las referencias de diseño heredadas son documentales.
- Preservar filtros, chips, búsqueda, navegación, scroll restoration, teclado, focus/escape, diálogos, scroll lock y animaciones móviles; no alterar curvas de motion sin pruebas.
- Utilizar HTML semántico, controles accesibles y verificar anchos 390, 432, 768, 1415 px sin overflow horizontal.
- Consultar también `src/modules/agenda/AGENTS.md` para contratos específicos.

## GitHub / CI
- `vite.config.ts`: `/` en desarrollo y `/mlz-muni/` al compilar con `--mode pages`.
- CI valida PRs con TypeScript, ESLint, build y Playwright; un workflow especial compara la primera migración con `adc097b3fd6f129e7994b67b24cce46edc2b608b`.
- Por autorización posterior del usuario, `pages.yml` despliega el preview de GitHub Pages después de pushes a `main` y por ejecución manual. No conectar Vercel, otros entornos ni redirecciones sin nueva autorización.
- Registrar riesgos, validaciones y regresiones en el PR. La comparación pixel a pixel y la revisión humana son cosas diferentes.
