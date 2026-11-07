# Jóvenes en Comunidad — componentización real

**Antes:** `JovenesEnComunidadPage.tsx` incluía `LinkedParagraph`, `Content` e `InitiativeSection` como funciones locales. La página decidía también cómo renderizar cada iniciativa.

**Después:** la página compone componentes con responsabilidad individual:

- `components/EditorialContent.tsx`: transforma `ContentBlock` en párrafos/listas, preservando el enlace editorial accesible.
- `components/InitiativeSection.tsx`: renderiza el bloque de iniciativa (anclaje, heading, contenido y botón institucional deshabilitado) a partir de `Initiative` tipado.
- `data/links.ts`: única URL editorial existente para los dos consumidores (contacto y texto).
- `PageTitle`, `Button`, `InfoCard`, `IconLink`, `PageHero`, `PageContainer`, `TableOfContents` y `Breadcrumbs`: componentes institucionales compartidos que Jóvenes ya utiliza; conservar, no duplicar.

No se cambiaron textos, datos, routes, IDs, estructura DOM, componentes visuales ni responsive. Se incorpora test de arquitectura y E2E de nueve iniciativas, índice y enlaces. Requiere paridad visual completa antes de fusionar.
