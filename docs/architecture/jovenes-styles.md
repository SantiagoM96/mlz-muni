# CSS de Jóvenes en Comunidad — Etapa 2

Base: PR #22 de tipografía institucional. Este PR es **solo de Jóvenes**.

- Los selectores `.article-copy`, `.intro-copy` y `.article-section` estaban en `src/styles/globals.css` pese a ser utilizados por el módulo Jóvenes. Se trasladan **sin alterar declaraciones ni orden interno** a `src/modules/jovenes-en-comunidad/styles/jovenes.css`.
- La página importa su CSS explícitamente, sin modificar rutas, datos, composición ni medidas visuales aprobadas.
- El encabezado "INICIATIVAS" usa el par tipográfico 18/26 aprobado en PR #22.
- El vínculo editorial hacia Instagram agrega foco visible, sin alterar geometría en estado normal.
- Test de arquitectura comprueba propiedad de selectores y detecta referencias externas en `src/**/*.tsx`.
- E2E verifica tamaño computado y foco visible; Playwright de paridad compara **Jóvenes** contra el baseline de PR en cuatro viewports. La suite de paridad preexistente se amplía al módulo.

**Riesgos:** orden de cascade al cambiar import CSS; los tests visuales y de computed-style deben aprobarse antes del merge. Ningún reporte CSS se considera mejora de performance sin medición.
