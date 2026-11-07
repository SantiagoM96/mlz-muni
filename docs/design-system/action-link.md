# ActionLink — enlaces de acción institucionales

**Componente:** `shared/ui/ActionLink.tsx`; dos variantes justificadas por estilos aprobados: `compact` (links de portada y 404) y `wide` (inscripción a Agenda).

**Consumidores migrados:** `HomePage`, `NotFoundPage` y `ActivityRegistrationLink`. El componente renderiza un `Link` de React Router si recibe `to`, o un `a` HTML si recibe `href`, con un tipo discriminado. Conserva `target`, `rel`, `aria-label`, `data-testid` y contenido.

**Implementaciones reemplazadas:** dos enlaces internos con la misma secuencia de utilities; un enlace externo de inscripción con variante amplia. Este es un componente React **adoptado**, no una clase compartida. No se introducen nuevas dependencias ni wrappers DOM, y el botón deshabilitado de previsualización sigue siendo `button` (no enlace sin destino).

**Validación:** rutas, roles, atributos y CSS computado con E2E; paridad visual pública de Agenda y pantallas existentes. No modificar colores, alturas ni geometrías sin pruebas.
