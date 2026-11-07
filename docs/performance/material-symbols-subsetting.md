# Material Symbols Outlined — subconjunto variable autohospedado

## Motivo y alcance

Antes, `src/main.tsx` importaba el CSS del paquete `material-symbols/outlined.css`, que incluía la fuente variable completa de **4.011.996 bytes**. La UI actual declara un conjunto cerrado de ligaduras en `MaterialIconName`.

Este PR mantiene la misma familia "Material Symbols Outlined", el mismo CSS de Google empaquetado por `material-symbols`, los mismos ejes FILL, wght, GRAD y opsz, el mismo `font-display: block` y los mismos componentes. No se sustituyen los pictogramas por SVG, no se usan Google Fonts en tiempo de ejecución ni se modifican los datos editoriales.

## Compilación reproducible

- `npm ci` instala la fuente original, anclada por `package-lock.json`.
- `python3 -m pip install -r requirements-fonts.txt` instala fontTools y uharfbuzz en versiones fijadas.
- `npm run fonts:build` lee `src/shared/ui/MaterialIcon.tsx`, comprueba todas las ligaduras originales con HarfBuzz y extrae el subconjunto WOFF2.
- `npm run dev`, `npm run build` y `npm run build:pages` ejecutan automáticamente el generador antes de arrancar Vite; una firma local evita trabajo duplicado.
- La fuente generada y su firma no se agregan al repositorio ni requieren un servicio externo. CI y Pages instalan las mismas dependencias de build.

El generador **falla** si una ligadura desaparece, si cambia el glifo final, si se pierden los ejes variables o si el resultado supera 1.000.000 de bytes. Incluir íconos nuevos requiere agregarlos al tipo `MaterialIconName`, y el generador los incorporará automáticamente.

## Verificaciones

1. Comparar el WOFF2 generado con los 4.011.996 bytes originales usando el log de `npm run fonts:build`.
2. Ejecutar `npm run typecheck`, `npm run lint`, `npm run build` y Playwright en 390, 432, 768 y 1415 px.
3. Revisar paridad visual de la consola y la presentación de todos los íconos del sitio.
4. Confirmar en Network que solo se descarga `material-symbols-outlined-subset.woff2`, nunca la fuente completa; el CSS conserva el nombre de familia para no romper pruebas ni estilos.
5. Las mejoras de LCP/INP/CLS requieren medición real y no se infieren directamente de bytes transferidos.

## Consideraciones

Se añade **una herramienta Python solo para construir assets**, no una dependencia del frontend en runtime. Requiere Python 3.11+ para uharfbuzz. Un entorno sin Python o sin el set de dependencias falla explícitamente con instrucciones de instalación; no existe fallback silencioso que descargue fuentes de Google. Los workflows incorporan el requisito antes de compilar.

Fuentes: [guía Material Symbols](https://developers.google.com/fonts/docs/material_symbols) y [fontTools subset](https://fonttools.readthedocs.io/en/latest/subset/).
