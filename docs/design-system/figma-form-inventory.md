# Auditoría de formularios — MLZ UI Kit

**Fuente:** biblioteca publicada MLZ - UI KIT en Figma, consultada el 8 de noviembre de 2026.

La versión anterior del catálogo solo representaba tres tipos de Input New, un checkbox y un radio. Se recuperaron las familias originales por separado, sin mezclarlas con Agenda ni con las primitivas productivas de MLZ.

| Componente Figma | Set o componente publicado | Geometría y propiedades |
| --- | --- | --- |
| Input New | 1ac711ae309077b910b8a9b96ffa08ffcff1e5b5 | 3 tipos × 6 estados; 342×72, textarea 342×147 |
| Input/TextFile | 474a96af4665f26832c68ba10c7584f2999572c4 | 8 variantes; 438×72 |
| Input/Dropdownn | 28951bea82aaf7367a9f2b33453489f420212dba | 6 variantes, incluida apertura; 342×72 |
| Input/TextArea | 35f269b14893265d3dbc4b7eedeafb42a2365623 | default y error; 435×147 |
| Input (Contraseña) | 466b35683e9bacf439e9738055a7ac7b27629185 | Visibilidad, seguridad, 438×72 |
| Seguridad contraseña | 82316ecd1ea08db74c4f06b3bb860f3115162950 | Requisitos/correctos, 438×166 |
| Input/Codigo | f7f85e44506e93dcd19458b996d95ebc16b404f3 | 4 celdas 48×48 con 8px gap, 216×72 |
| Input/DocumentoSelect | 8de43676e042ee5ea5b496dd5daf2a467701e269 | 129px tipo + 309px número; 438×72 |
| SearchInput | e2eb7cde8deea0aed0d1fbad0808f4f2f2836c67 | Barra 56px |
| Input/Adjuntar/Opcion 1 | ef08a617f5d6651497ff79b408b721fd049e81bf | 435×104; botón 36, bandeja 48 |
| Input/Adjuntar/Opcion 2 Nuevo | 7a7bc115adfb871920f3b951db98773b4a7e9813 | 473×56, radio 8, borde gris |
| Input/T&C | e170d1ea3c229e70a83f43e34a60c21169d81860 | 435×136; texto sobre poda de 2024 |
| Input/ChecBox | 7d7991a97f3bc03596bc00166e9798ef17589e61 | Horizontal 222×48 y vertical 103×88 |
| Input/RadioButton | 3ea32d6dc9854cd6e6d890baa33d59c11be84535 | Horizontal 222×48 y vertical 103×88 |

Las 14 referencias se agrupan en **12 secciones visuales**: contraseña con sus requisitos, dos variantes de adjuntar, y otros controles propios.

## Correcciones verificadas

- Input New tiene 18 variantes: Text field, Dropdownn, Text area × Default, Hovered, Focus, Completo, Disable y Error. Sus propiedades opcionales incluyen ayuda, contraseña, búsqueda, verificación, label y seguridad de contraseña.
- Los controles de una sola línea tienen 48px y radio 4px; textarea usa control 123px.
- Focus usa #006EFF, Disabled usa fondo #E5F0F9 y Error usa #EF284C (textarea #FF344F). La implementación antigua utilizaba colores y opacidad diferentes.
- El código es un grupo de cuatro casillas, no un input plano; el documento combina dos controles con geometría 129 + 309.
- Se reconstruyeron las dos variantes publicadas de adjunto y el SearchInput de 56px.
- Los checkbox/radio conservan distribución horizontal y vertical.
- Los nombres Dropdownn, ChecBox, TextFile y las propiedades históricas se conservan como están publicados en Figma. Son nombres a normalizar solo si se aprueba un cambio del diseño fuente.
- Input/T&C contiene un texto literal de declaración jurada sobre poda del año 2024. **Ese contenido no debe reutilizarse como términos genéricos sin validación editorial**.

## Alcance

Se modifican exclusivamente la sección Formularios del UI Kit, sus componentes de referencia y las ligaduras Material Symbols necesarias para reproducir los íconos. Los módulos Agenda y Jóvenes no se alteran.

La biblioteca React es una **reconstrucción funcional verificada** contra la fuente de diseño; no hay sincronización automática Figma ↔ React. Los casos de uso, reglas y validaciones específicas de trámites se incorporarán cuando se acuerde la migración productiva.
