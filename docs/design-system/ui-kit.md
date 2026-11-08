# Laboratorio UI · mini Storybook de MLZ

El catálogo interno de revisión está implementado como **rutas de React** y usa los componentes reales de `src/shared/ui` y, cuando corresponde, los componentes **propios de Agenda**. No depende de Storybook ni incorpora bibliotecas de terceros.

## Acceso

Durante el desarrollo:

```bash
npm ci
npm run dev
```

Abrir `http://localhost:5173/ui-kit/formularios`. El puerto es el que imprima Vite si se configuró uno distinto.

Las siete vistas son:

- `/ui-kit/formularios`: FormField, TextField, SelectControl, TextAreaControl y CheckboxField. Variantes standard (radio 4px), soft (6px), disabled, aria-invalid y densidad. Valores de estado local.
- `/ui-kit/botones`: Button primary/secondary/success, disabled, callback de click, ActionLink compact/wide e IconLink.
- `/ui-kit/tipografia`: PageTitle, pares tipográficos 18/26 y 24/30, fuente Geometria y pesos existentes.
- `/ui-kit/tarjetas`: InfoCard y componentes reales de Agenda (ActivityCard, ActivityBadges, FeaturedActivityCard, AgendaCircuitCard).
- `/ui-kit/navegacion`: Breadcrumbs, TableOfContents y PageHero con recursos reales.
- `/ui-kit/iconos`: MaterialIcon con búsqueda y selección de tamaño.
- `/ui-kit/tokens`: colores actuales y geometrías existentes.

`/ui-kit` abre por defecto Formularios. Cada categoría tiene su URL; `scripts/prepare-pages.mjs` crea su entrada HTML para que funcionen los enlaces directos de GitHub Pages. Cuando el cambio se fusione y se publique, el catálogo podrá abrirse desde `https://santiagom96.github.io/mlz-muni/ui-kit/formularios/`.

## Fuente visual: biblioteca Figma MLZ - UI KIT

Los ejemplos nuevos usan los componentes publicados de la biblioteca **MLZ - UI KIT** como fuente verificada de medidas y estados:

- `Button/Standar`: cinco tipos (primario, secundario, terciario, gost, link) × cinco estados. Alto 48px, tipografía Geometria Bold 18/26, radio 4px.
- `Button/Chico`: mismos tipos y estados, alto 40px y tipografía 16/26.
- `Input New`: Text field, Dropdownn, Text area; estados Default, Hovered, Focus, Completo, Disable y Error. Controles 48px, radio 4px, error #ef284c.
- `Input/ChecBox`, `Input/RadioButton`: variantes Horizontal/Vertical.
- `tag`: 3 tamaños (Chico, Mediano, Grande) × 6 colores, icono opcional.
- `Chip/Fill` y `Chip/Trazo`: 6 estados, incluido selected.

La implementación de los componentes de referencia vive en `src/pages/ui-kit/figma/`. **No reemplaza los componentes de producción** antes de evaluar diferencias. `Cards_buscadores` y `joven_card` también existen en Figma, pero no se declaran migradas porque incluyen recursos gráficos que requieren exportación fiel.

No hay sincronización automática: se recuperaron variantes y propiedades reales y se implementaron componentes React para estudio. La nueva ruta `/ui-kit/etiquetas` abre tags y chips.

## Alcance y reglas

- **No está en la navegación institucional.** No constituye autenticación ni control de acceso: al fusionarse se podrá acceder desde la URL pública.
- Es un **laboratorio de revisión**, no un editor persistente. Los selects, checkboxes y campos alteran props o estado React local y se restauran al cambiar/cargar de nuevo la página.
- Las fichas muestran el path del componente fuente y código de uso copiables. Las modificaciones definitivas se hacen en `src/shared/ui` o el componente de módulo y deben validarse en todos sus consumidores.
- No duplicar componentes de producción dentro del UI Kit ni introducir nuevos componentes compartidos únicamente para mostrarlos.
- Las cards y badges de Agenda **no se convierten en componentes institucionales**: su lógica, datos ilustrativos y semántica permanecen en su módulo. La carpeta `src/pages/ui-kit` actúa como herramienta de composición.
- En Formularios, `aria-invalid` se puede probar, pero no implica que exista una variante visual de error institucional: esto queda explícitamente señalado como una oportunidad de diseño.
- No se guardan valores, no se envían solicitudes ni se crean actividades. El ejemplo de ActivityCard usa datos ficticios ya presentes en el repositorio.
- `Button` recibió soporte para props `onClick` y `type` sin romper su API existente.
- Todos los ejemplos deben tener nombres accesibles y conservar la navegación por teclado.

## Validación

```bash
npm run typecheck
npm run lint
npm run test:architecture
npm run check:architecture
npm run check:styles
npm run build
npm run build:pages
npm run test:e2e -- tests/e2e/ui-kit.spec.ts
```

Se requieren los cuatro proyectos Playwright (390, 432, 768 y 1415 px). El UI Kit se carga con un `lazy` independiente del layout público; evitar añadirlo al menú global y no publicar sin aprobación del PR.
