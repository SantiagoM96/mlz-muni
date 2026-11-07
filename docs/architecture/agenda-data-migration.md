# Datos editoriales de Agenda — migración al módulo

Se trasladan **cinco archivos** desde `src/data/` hacia `src/modules/agenda/data/`:

- `agenda.ts`
- `agenda-imported.ts`
- `agenda-descriptions.ts`
- `agenda-featured.ts`
- `agenda-v2-previews.ts`

## Garantías y límites

- Los registros importados, descripciones, previews, títulos, categorías, fechas, textos ilustrativos, badges, imágenes y IDs se conservan sin cambios.
- El contenido de cuatro archivos conserva el SHA del blob original. En `agenda.ts` solo cambian las rutas relativas de importación y reexportación por el traslado físico.
- Los consumidores del mismo módulo apuntan ahora a `data/`. No se crean APIs ni se altera la construcción de las actividades.
- La fecha argentina y las reglas de filtrado continúan fuera del adaptador editorial en `utils/`.
- Los datasets de demostración siguen siendo **prototipos no validados como programación oficial**. Este cambio organizativo no autoriza su publicación.

## Validación

Typecheck, lint, build, Playwright en desktop/tablet/mobile y paridad visual de la consola. Comparar el resultado con la rama base. No modificar datos para facilitar tests o compensar cambios de ruta.
