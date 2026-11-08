# MLZ UI Kit — catálogo visual

El catálogo de `/ui-kit` utiliza **exclusivamente las referencias de componentes provenientes de la biblioteca publicada "MLZ - UI KIT" de Figma**.

## Categorías

- `/ui-kit/formularios`: catálogo completo de familias de formularios publicadas en MLZ - UI KIT (inventario verificado abajo).
- `/ui-kit/botones`: `Button/Standar` y `Button/Chico` (variantes primario, secundario, terciario, gost y link).
- `/ui-kit/etiquetas`: `tag`, `Chip/Fill` y `Chip/Trazo`.
- `/ui-kit/tarjetas`: `joven_card`.

Se retiraron del **catálogo** todas las vistas anteriores que mezclaban Agenda, componentes React preexistentes, tokens, tipografía, navegación, íconos, snippets, playgrounds y demostraciones. Sus rutas antiguas redirigen a Formularios por compatibilidad.

## Auditoría de formularios contra Figma (8/11/2026)

Las primeras galerías solo representaban **3 tipos de Input New + checkbox/radio**. La librería real contiene distintas generaciones de controles que no deben confundirse ni fusionarse sin evaluación.

| Componente publicado | Variante / propiedad | Geometría verificada |
| --- | --- | --- |
| `Input New` | Text field, Dropdownn, Text area × Default, Hovered, Focus, Completo, Disable y Error | 342×72 (input/select); 342×147 (textarea); errores aumentan alto |
| `Input/TextFile` | Placeholder, Completo, Disable, Error; Default/Hovered/Activo | 438×72; control 48 y radio 4 |
| `Input/Dropdownn` | Open, Default, Cerrar, Cerrar v2, Hovered, Error | 342×72; lista desplegada en overlay |
| `Input/TextArea` | default, Error | 435×147; control 123 |
| `Input` | Contraseña, Show visibility, Show SecurityLevel, Show Succes | 438×72; panel de seguridad opcional |
| `Seguridad contraseña` | Requisitos / Requisitos correctos | 438×166 |
| `Input/Codigo` | Default, Hovered, Activo, Completo | 216×72; cuatro campos 48×48 separados 8 |
| `Input/DocumentoSelect` | selector documento + número | 438×72; 129px selector y 309px número |
| `SearchInput` | Default, Variant2, Variant3 | barra de 56px |
| `Input/Adjuntar/Opcion 1` | Default, Hovered, Error | 435×104; bandeja 48 y botón 36 |
| `Input/Adjuntar/Opcion 2 Nuevo` | Componente individual | 473×56; radio 8, borde gris |
| `Input/T&C` | aceptación de declaración jurada | 435×136 |
| `Input/ChecBox`, `Input/RadioButton` | Horizontal / Vertical + opciones anidadas | horizontal 222×48, vertical 103×88 |

Los componentes se muestran **de forma independiente y en su proporción de diseño**. Las variantes internas permanecen tipadas en los componentes React, sin agregar paneles de playground a la galería.

**Diferencias detectadas y corregidas:** el foco de `Input New` usa `#006EFF` (no `#236999`), el disabled tiene fondo `#E5F0F9` (no opacidad), el textarea mide 123px de altura, el código tiene cuatro casillas, y los adjuntos y las contraseñas son componentes distintos. El error usa `#EF284C` (textarea `#FF344F`). Se conservan nombres de Figma como `TextFile`, `Dropdownn` y `ChecBox`, aunque su ortografía puede revisarse en una futura normalización, sin alterar la fuente actual.

El texto literal de `Input/T&C` habla de una declaración jurada sobre poda de árboles en **2024**. Es contenido de origen del componente Figma, no un texto genérico aprobado para reutilizar en nuevos trámites.

La galería usa componentes funcionales de revisión; no sustituye los formularios productivos de Agenda ni Jóvenes. 

## Alcance

- Solo aparecen los componentes del UI Kit Figma ya recuperados e implementados en React.
- Se muestran sin fichas de ejemplo, bloques de código ni paneles de configuración.
- La interacción nativa de campos, radios, checkboxes y chips puede seguir utilizándose.
- `Cards_buscadores` sigue pendiente de recuperar con fidelidad sus recursos visuales. No se reemplaza por imágenes inventadas.
- Las implementaciones `src/pages/ui-kit/figma` son **reconstrucciones React basadas en la biblioteca de Figma**, no instancias sincronizadas automáticamente.
- No se modifica `src/shared/ui`, ni los módulos Agenda y Jóvenes. Su adopción se decidirá después de aprobar las referencias del UI Kit.

## Código

- `src/pages/ui-kit/UiKitPage.tsx`: navegación del catálogo.
- `src/pages/ui-kit/gallery/`: presentación exclusiva de los componentes de Figma.
- `src/pages/ui-kit/figma/`: implementaciones React de las referencias del UI Kit.

Para estudiar o ajustar diseño, editar el componente Figma de referencia y comprobar el resultado en su galería, antes de migrar módulos.
