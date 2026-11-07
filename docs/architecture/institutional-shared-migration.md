# Consolidación de infraestructura institucional en `src/shared`

Se migran 12 archivos que representan componentes verdaderamente transversales y se usan por los dos módulos municipales actuales:

```text
src/shared/
├── layout/
│   ├── PageContainer.tsx
│   ├── PageHero.tsx
│   ├── SiteFooter.tsx
│   └── SiteLayout.tsx
├── navigation/
│   ├── Breadcrumbs.tsx
│   ├── getMobileBreadcrumbParent.ts
│   └── SiteHeader.tsx
└── ui/
    ├── Button.tsx
    ├── IconLink.tsx
    ├── InfoCard.tsx
    ├── MaterialIcon.tsx
    └── TableOfContents.tsx
```

## Criterios

- El cambio **no refactoriza ni reestiliza** los componentes. Los 12 archivos se trasladan; en `SiteLayout.tsx` se actualizan dos rutas relativas a Header y Footer.
- Los módulos consumen UI compartida con imports relativos apuntando a `src/shared/`. No se mueven componentes específicos de Agenda ni se incorporan componentes nuevos innecesarios.
- `src/styles/globals.css`, `src/assets/fonts`, el paquete Material Symbols y las imágenes públicas permanecen en sus ubicaciones originales. Las rutas y la configuración de Vite/GitHub Pages tampoco cambian.
- El control automático de arquitectura aplica a `src/shared`: ningún archivo compartido puede importar internals municipales.

## Verificación

- TypeScript, lint, `test:architecture`, `check:architecture`, build.
- Playwright en cuatro proyectos responsive y paridad visual de consola.
- Revisar visualmente header, footer, breadcrumbs y componentes institucionales, además de Agenda y Jóvenes.

Se trata de una consolidación de carpetas, no de una rediseño, ni de un cambio funcional o de despliegue.
