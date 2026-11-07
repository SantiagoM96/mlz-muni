# Etapa 2 — calidad y criterios de cierre (2026-11-07)

## Cobertura implementada

| Área | Código real modificado | Verificación |
| --- | --- | --- |
| Institucional | Tokens 18/26 y 24/30; Button, IconLink, InfoCard, SiteHeader/Footer y estilos globales | E2E `institutional-typography.spec.ts` + 4 viewports |
| Jóvenes | `jovenes.css`, import y título, foco accesible | E2E `jovenes-design-system.spec.ts`, test arquitectura y paridad de página |
| Agenda pública | 8 componentes adoptan el par correcto donde coincide exactamente | E2E `agenda-public-design-system.spec.ts`, tests públicos y paridad |
| Agenda consola | `consoleCheckboxClass` con 3 consumidores, tokens de color/título | E2E `agenda-console-design-system.spec.ts`, paridad de consola |

## Controles y límites

- `check:styles` ahora protege también los nuevos tokens y la propiedad de `jovenes.css` cuando existe. `test:architecture` protege consumidores reales y excepciones de radio/line-height.
- Revisar workflows CI de todas las ramas y la rama combinada. No afirmar pruebas exitosas si están pendientes; no fusionar ni desplegar sin autorización.
- La paridad usa capturas temporales del baseline de PR en Chrome a 390/432/768/1415 px. Es una comparación mecánica, no una auditoría humana de contraste o WCAG completa.
- `audit:styles` es heurístico. Los conteos son métricas de inventario, no una puntuación de calidad. El cambio puede no reducir CSS total; medir raw/gzip mediante el mismo `npm run build`.

## Deuda conservada deliberadamente

- Los componentes de Agenda con jerarquías propias 18/22, 22/28, 30/36 y los colores/sombras específicos no se normalizan por apariencia.
- La consola no se promueve a `shared`, ni se alteran 4/6px, validaciones ni inputs por conveniencia.
- Revisar de forma independiente futuros problemas de contraste, code splitting, drag/reduced-motion y Web Vitals con pruebas específicas antes de implementar.

El objetivo es una adopción **concreta y limitada a patrones comprobados**, no erradicar todos los valores arbitrarios ni declarar cumplimiento WCAG 2.2 AA exhaustivo.
