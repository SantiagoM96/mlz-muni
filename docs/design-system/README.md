# Estándares CSS, Tailwind v4 y Design System — MLZ

Esta guía describe el código vigente, no habilita rediseños. Aplica a cualquier funcionalidad municipal autorizada. Fuente de verdad: `src/styles/tokens.css` y componentes reales de `src/shared`.

## Responsabilidades

- `src/styles/tokens.css`: tokens institucionales en `@theme` de Tailwind CSS v4. No inventar escalas ni duplicar hexadecimales.
- `src/styles/globals.css`: import de Tailwind/tokens, fuentes, estilos base y composición institucional transversal. No alberga selectores propios de Agenda tras el PR #18.
- `src/modules/agenda/styles/agenda.css`: reglas, animaciones, estados táctiles y scrollbars específicos de Agenda; se importa desde las cuatro páginas del módulo. Su extracción **no implica carga diferida de CSS por ruta**.
- `src/modules/jovenes-en-comunidad/styles/jovenes.css`: contenido editorial maquetado e iniciativas exclusivos de Jóvenes; sus selectores `.article-*` y `.intro-copy` no son reglas institucionales globales.
- `src/styles/material-symbols.css`: subset existente de íconos; su generación no se modifica desde estilos.
- `src/shared/ui`, `layout`, `navigation`: componentes con contrato institucional real, no envoltorios universales.
- `src/modules/<nombre>/`: estilos y componentes del módulo cuando tengan responsabilidad específica. No crear carpetas vacías.

## Tokens actuales (sin cambio de valores)

| Token Tailwind v4 | Valor | Uso vigente |
| --- | --- | --- |
| `primary-600` | `#236999` | Principal institucional, títulos, enlaces, acciones |
| `primary-500` / `primary-700` | `#358dc2` / `#19577f` | Variaciones de primario |
| `info-500` | `#006eff` | Selecciones y controles informativos |
| `grey-900` | `#3d3d3d` | Texto general |
| `success-500` / `success-600` | `#2abb5b` / `#208c43` | Estados/acciones positivos existentes |
| `panel` / `divider` | `#f3f7fc` / `#e1e7eb` | Superficies y separadores |
| `font-sans` | Geometria y fallback existente | Tipografía institucional |
| `text-institutional-body` | 18px / 26px | Texto de acciones y enlaces institucionales |
| `text-institutional-section` | 24px / 30px | Encabezados de secciones y tarjetas existentes |

No establecer un color de error, warning o nuevas sombras hasta encontrar un contrato validado y varios usos. Los colores de Agenda específicos (por ejemplo, de filtros) se preservan hasta demostrar equivalencia; un color idéntico no implica automáticamente la misma semántica.

## Tipografía, spacing y dimensiones

- Mantener Geometria 400/500/700 con los archivos locales actuales. No cambiar familias ni métricas sin capturas y medición.
- Respetar la jerarquía visual aprobada (por ejemplo 18/26, 24/30 y 32/40). No convertir automáticamente `text-[18px]` en `text-lg`: el valor de `line-height` puede cambiar.
- Usar las utilidades de Tailwind como primera opción. Priorizar incrementos de 8 px cuando coincidan con la interfaz; 4, 6, 10, 12, 14, 18, 20 px son excepciones admisibles según el diseño real.
- No imponer alturas fijas a formularios, tarjetas o layouts. `PageContainer` mantiene 1200 px y su breakpoint actual de 1232 px; las vistas pueden tener constraints propios ya aprobados.
- Los valores arbitrarios son legítimos cuando representan geometría de layout, tamaño óptico, viewport, borde, breakpoint o animación específica. Antes de agregar uno repetido, verificar si existe token con igual **valor y significado**.

## Tailwind vs. CSS tradicional

- Preferir utilities para layout, spacing, color, estados y responsive local.
- Usar CSS para `@font-face`, keyframes, pseudo-elementos, scrollbars, interacciones con selectores de estado y animación gestual compleja.
- Evitar `@apply`, concatenación dinámica de nombres de clase y soluciones CSS-in-JS por defecto. Construir variantes con strings completos conocidas por Tailwind.
- No mover CSS a `shared` únicamente porque varias pantallas usen botones parecidos; comprobar consumidores y semántica.
- Un `!important` solo puede mantenerse con razón documentada (por ejemplo, precedencia de estados de una hoja táctil). Nuevos usos requieren evidencia.

## Responsive, accesibilidad y motion

- Conservar breakpoints existentes, especialmente `max-width: 680px` para hojas móviles de Agenda; no equipararlo sin más a `sm` o `md`.
- Asegurar foco visible, contraste, interacción por teclado, estados `disabled`, nombres accesibles y áreas táctiles verificadas. Hover nunca debe ser la única pista de interacción.
- Mantener `prefers-reduced-motion`, Escape, click outside, restauración de foco y scroll lock. CSS y lógica de estos comportamientos son un único contrato.
- No cambiar `height`, `transform`, `will-change` ni easings de drawers como supuesta optimización sin pruebas de gestos.

## Criterio para extraer un componente

Extraer solo si (a) hay al menos dos consumidores semánticamente compatibles, o (b) es una responsabilidad institucional transversal comprobada. Evaluar diferencias de estructura, interacción, estados y radio antes de introducir variantes. Evitar APIs con muchas props booleanas.

## Checklist para PR de estilos

- [ ] Indicar archivos afectados, consumidores, motivo y alternativa rechazada.
- [ ] Conservar contenido, rutas, tipografía, colores, alturas y breakpoints aprobados.
- [ ] Ejecutar `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test:architecture`, `npm run check:architecture`, `npm run check:styles`, `npm run build` y E2E relevantes (el check de estilos se introduce en el PR #19).
- [ ] Comparar capturas a 390, 432, 768 y 1415 px; revisar Agenda, consola, foco, gestos y reduced motion.
- [ ] Registrar tamaños CSS en kB y gzip obtenidos del mismo modo/entorno; no afirmar LCP/CLS/INP sin medición.
- [ ] No actualizar snapshots para tapar diferencias, ni fusionar o desplegar sin autorización.

## Estado real de adopción — Etapa 2

- **Componentes compartidos:** pares `text-institutional-body` (18/26) y `text-institutional-section` (24/30) aplicados a Button, IconLink, InfoCard, header, footer y texto institucional global.
- **Jóvenes:** CSS editorial extraído al módulo, foco visible en enlaces y títulos consistentes; [arquitectura](../architecture/jovenes-styles.md).
- **Agenda pública:** pares tipográficos adoptados solo donde coinciden font-size/line-height y semántica; excepciones documentadas en [Agenda pública](../architecture/agenda-public-design-system.md).
- **Consola Agenda:** controles con acento institucional compartido, semántica confinada al módulo; [decisiones](../architecture/agenda-console-design-system.md).
- **Pruebas:** E2E de estilos computados y paridad visual por viewport. Los cambios requieren aprobación de CI, no se consideran verificados por existir en documentos.

Ver también [auditoría inicial](./audit-2026-11-07.md), [diagnóstico etapa 2](./adoption-stage2-2026-11-07.md), `AGENTS.md` y `src/modules/agenda/AGENTS.md`.

## Biblioteca React institucional — tercera etapa

La componentización implementada y sus contratos están detallados en [Componentes React](./component-library.md). El inventario de patrones reales y las decisiones de compartir/mantener en cada módulo están en [Matriz de reutilización](./component-matrix.md).

La biblioteca debe **consumirse en código de producción**; los componentes sin consumidores o los wrappers que solo reexpongan `className` no se consideran migración. Conservar la semántica de enlaces, labels nativos, refs y variantes 4/6px. Los modales y badges específicos de Agenda permanecen encapsulados hasta demostrar una API verdaderamente transversal.
