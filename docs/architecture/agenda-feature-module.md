# Módulo Agenda V2 — fase de consolidación

La lógica existente de Agenda vive ahora en `src/modules/agenda/`, con las cuatro páginas y los subdirectorios que originalmente estaban en `src/features/agenda/`.

```text
src/modules/agenda/
├── AGENTS.md
├── pages/
├── model/
├── utils/
├── hooks/
├── components/
└── consolePreview/
```

## Criterios de traslado

- El directorio antiguo `src/features/agenda/` se reemplazó por `src/modules/agenda/` conservando la profundidad de carpetas. Los imports **internos** mantienen sus rutas relativas y los archivos no requieren cambios en la lógica.
- Las páginas, componentes consumidores, `src/data/agenda.ts` y pruebas se actualizaron para importar el nuevo destino.
- Se conservaron los mismos contratos, fixtures, reglas, HTML, estilos y rutas. No se añadieron stores ni capas artificiales.
- La consola sigue siendo una vista previa sin backend, persistencia ni usuarios autenticados.
- El entorno de producción no se modifica: esta rama es solo un PR en borrador.

## Pendiente

- Trasladar `src/components/agenda/` al módulo como componentes públicos, sin convertirlos en shared institucionales.
- Separar y trasladar `src/data/agenda*.ts` manteniendo IDs, imágenes, textos y semántica editorial.
- Re-evaluar el `src/shared` institucional, una vez demostrados contratos transversales entre módulos.
- Verificar TypeScript, lint, build, cuatro proyectos Playwright y paridad visual, antes de integrar.

Las dependencias objetivo y sus excepciones temporales se documentan en [module-boundaries.md](./module-boundaries.md).
