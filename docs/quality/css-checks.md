# Control CSS y medición de tamaño — MLZ

## Decisión

No se instala Stylelint en esta etapa: Tailwind CSS v4 utiliza `@theme` y otras directivas que requieren una configuración específica; un linter genérico agregaría deuda y falsos positivos sin cubrir interacciones visuales. Este PR agrega dos scripts Node sin dependencias nuevas.

## Comandos

- `npm run check:styles`: comprueba el bloque `@theme` institucional, que `primary-600` permanezca en `#236999`, `grey-900` y la familia Geometria. Si existe `tokens.css`, exige import y ausencia de duplicación; si existe `modules/agenda/styles/agenda.css`, prohíbe clases/variables de Agenda en global y exige imports en las cuatro páginas y contratos básicos de motion. Tolera expresamente el estado anterior a las extracciones.
- `npm run report:css`: requiere `dist/` construido. Muestra para cada CSS compilado y en total bytes sin comprimir y gzip (nivel 9), con kB decimales. No aplica un umbral artificial.
- `npm run test:architecture` incluye tests básicos para el verificador y una prueba negativa de cambio de token.

Se integran estos comandos a `.github/workflows/quality.yml` en PRs dirigidos a `main`.

## Qué no verifica

- No es un parser CSS general, no analiza reglas contradictorias, especificidad, performance de layout, contrastes, colores repetidos en TSX ni clasifica valores arbitrarios por semántica.
- No determina si un JSX tiene una clase dinámica omitida por Tailwind; requiere revisión, build y browser.
- No valida la similitud pixel a pixel, los gestos táctiles ni el contenido editorial. Playwright y revisión visual siguen siendo obligatorios.
- La medición gzip usa una configuración fija de Node; para comparar con Vite, controlar modo, versión y archivo correspondiente. No reportar LCP/CLS/INP a partir de tamaño de CSS.

## Baseline

En main `b8203c6ebe8592a64aea8b4540186f93573e87b0`, el build **Pages** [#42389732947](https://github.com/SantiagoM96/mlz-muni/actions/runs/42389732947) reportó 52,31 kB / gzip 10,89 kB de CSS. Comparar por modo equivalente; el script propio puede dar un gzip levemente diferente.

## Ampliación futura

Para agregar reglas, exigir primero un bug real o un patrón de error repetido, tests negativos y justificación de falsos positivos. No bloquear indiscriminadamente hexadecimales, `!important`, breakpoints especiales ni valores `[...]` que ya son contratos de Agenda.
