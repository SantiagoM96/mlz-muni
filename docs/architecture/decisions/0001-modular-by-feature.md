# ADR-0001 — Arquitectura modular por funcionalidad municipal

- Estado: aceptada como dirección evolutiva; implementación incremental y sujeta a revisión de PR.
- Fecha: 2026-11-07
- Ámbito: `SantiagoM96/mlz-muni`.

## Contexto

La migración inicial reunió Jóvenes en Comunidad y Agenda V2, pero parte de Agenda quedó distribuida entre `pages/`, `components/`, `features/` y `data/`. Esa distribución dificulta reconocer quién posee las reglas y componentes del dominio cuando se agreguen servicios municipales distintos.

## Alternativas examinadas

1. **Mantener carpetas horizontales**: requiere menos movimientos hoy, pero prolonga la dispersión de responsabilidades por dominio.
2. **Modularización por funcionalidad (elegida)**: reúne la responsabilidad y permite distintos grados de complejidad por módulo.
3. **Clean Architecture estricta**: impone adaptadores, repositorios e interfaces que no aportan valor demostrable en un frontend demostrativo sin backend.
4. **Monorepo o microfrontends**: costes operativos y de integración sin necesidad actual de despliegues independientes.

## Decisión

Adoptar `src/modules/<funcionalidad>` como objetivo para módulos municipales autorizados. Mantener `src/app` para orquestación y un `shared` pequeño para elementos institucionales verdaderamente transversales; no materializar directorios vacíos.

La primera aplicación es **Jóvenes en Comunidad**: mover exclusivamente su página y datos a un módulo local, manteniendo los imports institucionales, el markup y la ruta. Migrar Agenda y elementos institucionales en PRs futuros con pruebas de caracterización.

## Consecuencias

- Positivas: ownership explícito, onboarding sencillo, menor dependencia accidental entre áreas municipales.
- Costos: cambio de imports y diffs estructurales, que requieren revisión y CI.
- Riesgos controlados: evitar PR masivo, conservar contenido y apariencia, no cambiar despliegue, comparar contra la base.
- No implica APIs, stores globales, cambios de UI ni funcionalidades futuras.
