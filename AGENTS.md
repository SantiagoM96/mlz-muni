# AGENTS — MLZ municipal

## Alcance y responsabilidades
Este repositorio `mlz-muni` contiene exclusivamente Jóvenes en Comunidad, Agenda de la Comunidad V2 y dependencias institucionales necesarias. No incorporar Crónica, BAE, Deportes independiente ni otros trabajos ajenos. La consola es demostrativa: no agregar backend, almacenamiento ni prometer publicación efectiva sin nueva autorización.

## Flujo seguro
1. Inspeccionar el código, los consumidores y las pruebas antes de modificar.
2. Trabajar en ramas con commits descriptivos y PR revisables; no mergear o publicar de manera automática.
3. No modificar datos originales, contenido editorial, rutas, expectativas de QA, Figma ni entornos externos durante una migración de infraestructura.
4. No introducir secretos, credenciales ni dependencias sin justificación.
5. Ejecutar `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build` y `npm run test:e2e` según alcance. Documentar comandos, SHA y resultados, sin atribuir éxito a pruebas no ejecutadas.

## Arquitectura
- `src/pages` compone las vistas; `src/layouts` y `src/components/layout` definen la estructura institucional.
- `src/components/ui` contiene componentes realmente compartidos.
- `src/features/agenda` contiene lógica de Agenda, consola, hooks, componentes y reglas.
- `src/data/agenda*.ts` se considera fuente original inmutable durante trabajos de arquitectura.
- Respetar importaciones entre capas; evitar dependencias circulares, duplicaciones, abstracciones prematuras y barrels innecesarios.
- Aplicar DRY, KISS, Separation of Concerns y TypeScript explícito. Componentes PascalCase, hooks useCamelCase, variables camelCase.

## UI, responsive y accesibilidad
- Conservar Geometria 400/500/700, Material Symbols, `PageContainer` de 1200 px, y `#236999`; no reemplazar familias/tokens arbitrariamente.
- Mantener diseño, componentes, spacing, breakpoints y comportamiento aprobado. No consultar Figma en la fase de migración; las referencias de diseño heredadas son documentales.
- Preservar filtros, chips, búsqueda, navegación, scroll restoration, teclado, focus/escape, diálogos, scroll lock y animaciones móviles; no alterar curvas de motion sin pruebas.
- Utilizar HTML semántico, controles accesibles y verificar anchos 390, 432, 768, 1415 px sin overflow horizontal.
- Consultar también `src/features/agenda/AGENTS.md` para contratos específicos.

## GitHub / CI
- `vite.config.ts`: `/` en desarrollo y `/mlz-muni/` al compilar con `--mode pages`.
- CI valida PRs con TypeScript, ESLint, build y Playwright; un workflow especial compara la primera migración con `adc097b3fd6f129e7994b67b24cce46edc2b608b`.
- No existe despliegue automático; nunca agregar `deploy-pages`, Vercel o redirecciones sin autorización.
- Registrar riesgos, validaciones y regresiones en el PR. La comparación pixel a pixel y la revisión humana son cosas diferentes.
