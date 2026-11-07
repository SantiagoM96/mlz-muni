# Adopción de Design System — Etapa 2: diagnóstico aplicado

**Base verificada:** `main` `cbb88527b5218961d5bc5d6aae37604e2aba52ac` (2026-11-07). Alcance: solo `SantiagoM96/mlz-muni`.

## Hallazgos, evidencia y acciones

| Prioridad | Lugar | Evidencia | Decisión y riesgo controlado |
| --- | --- | --- | --- |
| Media | `Button.tsx`, `IconLink.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` | Se repite `text-[18px] leading-[26px]` | Par tipográfico compartido 18/26; no reemplazar por `text-lg` pues puede modificar métricas. |
| Media | `InfoCard.tsx`, `SiteFooter.tsx`, `.article-section h3` | Se repite 24/30 para títulos | Token institucional de sección 24/30; mantener cascada y geometría. |
| Media | `src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx` | Layout con breakpoints propios y clases arbitrarias válidas | Clasificar mejoras en PR específico; no forzar geometrías a tokens genéricos. |
| Media | `src/modules/agenda/components/public/ActivityCard.tsx` | Tarjetas con 22/28, bordes y sombras propios | Preservar 22/28, no migrarlo al token de sección 24/30; evaluar usos reales. |
| Media | `src/modules/agenda/consolePreview/ConsoleFormPrimitives.tsx` | Radios de 4 y 6 px y colores propios | Respetar diferencias; refactorizar solo contratos equivalentes en PR posterior. |
| Baja | `src/styles/globals.css` | 18/26 en article-copy, 24/30 en títulos de sección | Adoptar tokens de mismos valores en reglas institucionales. |

## Secuencia y límites

1. PR institucional: dos pares tipográficos reales en tokens y consumidores compartidos; tests CSS computado y QA visual.
2. PR Jóvenes: adaptar patrones demostrados sin modificar datos ni layout.
3. PR Agenda pública: adoptar tokens cuando coincidan valor y responsabilidad.
4. PR consola: reducir duplicaciones específicas sin alterar geometrías y comportamiento.
5. Cierre: QA, accesibilidad verificable, tamaño CSS y decisiones documentadas.

**Criterios:** cambios reales; typecheck, lint, tests arquitectura, check:styles, build, E2E y comparativas de capturas a 390/432/768/1415 px. Medir CSS bruto/gzip con mismo modo; no inferir mejoras de Web Vitals.

**Definido** = token documentado; **implementado** = código de producción lo usa; **verificado** = pruebas browser/CI confirman valores. La adopción de Jóvenes y Agenda no está completa con este PR.
