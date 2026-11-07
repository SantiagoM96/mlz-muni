# Guía para incorporar una funcionalidad municipal

> Aplicar **solo** cuando exista una funcionalidad autorizada. Esta guía no autoriza crear páginas, datos o servicios de ejemplo.

1. **Definir el alcance**: responsables, usuarios, rutas públicas, contenido validado, interacción, privacidad y dependencias. Distinguir un prototipo de un servicio real.
2. **Elegir tamaño del módulo**: landing simple = página + datos propios; formularios/catálogos complejos pueden requerir `model/`, `ui/`, `lib/`, `hooks/` o integraciones locales. No crear carpetas vacías.
3. **Ubicar bajo `src/modules/<nombre>/`**: la lógica y los tipos del módulo pertenecen allí. Reutilizar componentes institucionales solo cuando su contrato sea transversal.
4. **Registrar rutas desde `src/app/router.tsx`**: conservar `basename`, navegación y enlaces previos. Revisar la lista de rutas directas preparada por `scripts/prepare-pages.mjs`; no modificar Pages sin evaluar su impacto.
5. **Gestionar datos**: distinguir datos editoriales, fixtures y futuros datos remotos. Si una API real es necesaria, revisar contrato, errores, seguridad y estado remoto antes de añadir infraestructura.
6. **Probar comportamiento**: tests de reglas puras si existen, rutas, accesibilidad, responsive 390/432/768/1415, y comparación visual cuando corresponda.
7. **Documentar la decisión**: descripción breve, dueño del módulo, rutas, contratos compartidos, pruebas, riesgos y motivos para un eventual repositorio independiente.

## Cuándo usar otro repositorio

Evaluar separación si cambian significativamente autenticación, datos sensibles, requisitos de seguridad, equipos responsables, stack, releases o despliegues. Un módulo grande no necesita automáticamente un repositorio separado.

## Checklist de PR

- [ ] Scope municipal autorizado y sin datos ficticios no pedidos.
- [ ] No se modificaron otros módulos ni componentes compartidos por conveniencia.
- [ ] Rutas, recursos y URL directas conservados o cambios aprobados.
- [ ] Sin importaciones cruzadas entre internals de módulos.
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` y E2E según alcance, con resultados reales anotados.
- [ ] Capturas comparadas si existe riesgo visual.
- [ ] No merge ni despliegue automático de refactorización sin autorización.
