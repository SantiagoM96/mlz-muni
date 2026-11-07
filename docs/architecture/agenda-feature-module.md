# Módulo Agenda V2 — fase de consolidación

La lógica existente de Agenda vive ahora en `src/modules/agenda/`, con las cuatro páginas y los subdirectorios que originalmente estaban en `src/features/agenda/`.

```text
src/modules/agenda/
├── AGENTS.md
├── data/
├── pages/
├── model/
├── utils/
├── hooks/
├── components/
│   ├── public/
│   ├── detail/
│   ├── filters/
│   └── shared/
└── consolePreview/
```

## Criterios de traslado

- El directorio antiguo `src/features/agenda/` se reemplazó por `src/modules/agenda/` conservando la profundidad de carpetas. Los imports **internos** mantienen sus rutas relativas y los archivos no requieren cambios en la lógica.
- Las páginas, componentes consumidores, datos editoriales y pruebas se actualizaron para importar desde la nueva ubicación modular.
- Se conservaron los mismos contratos, fixtures, reglas, HTML, estilos y rutas. No se añadieron stores ni capas artificiales.
- La consola sigue siendo una vista previa sin backend, persistencia ni usuarios autenticados.
- El entorno de producción no se modifica: esta rama es solo un PR en borrador.

## Pendiente

- Los componentes públicos se trasladaron desde `src/components/agenda/` a `src/modules/agenda/components/public/`; los dos hooks de interacción se movieron a `src/modules/agenda/hooks/`.
- Los cinco archivos de `src/data/agenda*.ts` ya se trasladaron a `src/modules/agenda/data/`, preservando IDs, imágenes, textos y semántica editorial.
- La UI institucional se consolidó en `src/shared/{layout,navigation,ui}`; Agenda solo consume esos componentes, sin introducir dependencias desde `shared` hacia su dominio.
- Verificar TypeScript, lint, build, cuatro proyectos Playwright y paridad visual, antes de integrar.

Las dependencias objetivo y sus excepciones temporales se documentan en [module-boundaries.md](./module-boundaries.md).
