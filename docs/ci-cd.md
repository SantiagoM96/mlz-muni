# CI y publicación — mlz-muni

Los workflows se ejecutan con Node 22 y `npm ci` desde `package-lock.json`. Todos los procesos existentes son de **verificación**, no de despliegue.

| Workflow | Disparador | Verificación |
| --- | --- | --- |
| `quality.yml` | PR a main y ejecución manual | TypeScript, ESLint y build de Vite |
| `visual-qa.yml` | PR a main y cambios web relevantes en main; manual | E2E de Playwright, Chromium, cuatro viewports; artefactos de reporte |
| `motion-smoke.yml` | Manual | Motion de Agenda en cuatro viewports |
| `agenda-console-parity.yml` | PR que afecta Agenda | Referencia visual reproducible vs candidato en cuatro viewports |

La **primera migración** compara el PR contra la versión fija del repositorio anterior: `SantiagoM96/mlz@adc097b3fd6f129e7994b67b24cce46edc2b608b`, con ambos servidores locales, Chromium y datos originales. En otros PR posteriores la referencia será `main` del nuevo repositorio. No se reemplazan los snapshots de referencia al evaluar el candidato.

La comparación automática mide equivalencia técnica de escenarios cubiertos; no garantiza aprobación editorial de diseños ni accesibilidad asistida. Capturas, reportes y diffs se conservan durante 14 días cuando corre el workflow.

## Comandos locales
```bash
npm ci
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm run build:pages
```

`build:pages` genera artefactos locales para `/mlz-muni/` y **no publica**. No se trasladó `pages.yml` ni se configuró integración con Vercel. La publicación de un nuevo sitio, si se decide, requiere revisión y habilitación expresa.
