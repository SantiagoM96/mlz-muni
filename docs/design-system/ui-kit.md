# MLZ UI Kit — catálogo visual

El catálogo de \`/ui-kit\` utiliza **exclusivamente las referencias de componentes provenientes de la biblioteca publicada "MLZ - UI KIT" de Figma**.

## Categorías

- \`/ui-kit/formularios\`: \`Input New\` (Text field, Dropdownn, Text area), \`Input/ChecBox\` y \`Input/RadioButton\`.
- \`/ui-kit/botones\`: \`Button/Standar\` y \`Button/Chico\` (variantes primario, secundario, terciario, gost y link).
- \`/ui-kit/etiquetas\`: \`tag\`, \`Chip/Fill\` y \`Chip/Trazo\`.
- \`/ui-kit/tarjetas\`: \`joven_card\`.

Se retiraron del **catálogo** todas las vistas anteriores que mezclaban Agenda, componentes React preexistentes, tokens, tipografía, navegación, íconos, snippets, playgrounds y demostraciones. Sus rutas antiguas redirigen a Formularios por compatibilidad.

## Alcance

- Solo aparecen los componentes del UI Kit Figma ya recuperados e implementados en React.
- Se muestran sin fichas de ejemplo, bloques de código ni paneles de configuración.
- La interacción nativa de campos, radios, checkboxes y chips puede seguir utilizándose.
- \`Cards_buscadores\` sigue pendiente de recuperar con fidelidad sus recursos visuales. No se reemplaza por imágenes inventadas.
- Las implementaciones \`src/pages/ui-kit/figma\` son **reconstrucciones React basadas en la biblioteca de Figma**, no instancias sincronizadas automáticamente.
- No se modifica \`src/shared/ui\`, ni los módulos Agenda y Jóvenes. Su adopción se decidirá después de aprobar las referencias del UI Kit.

## Código

- \`src/pages/ui-kit/UiKitPage.tsx\`: navegación del catálogo.
- \`src/pages/ui-kit/gallery/\`: presentación exclusiva de los componentes de Figma.
- \`src/pages/ui-kit/figma/\`: implementaciones React de las referencias del UI Kit.

Para estudiar o ajustar diseño, editar el componente Figma de referencia y comprobar el resultado en su galería, antes de migrar módulos.
