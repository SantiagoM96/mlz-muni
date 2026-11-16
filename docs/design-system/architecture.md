# MLZ Design System — arquitectura de documentación

## Objetivo

Mantener una única fuente de verdad para fundamentos, componentes y patrones. La documentación debe permitir consultar y comparar, no replicar la misma especificación en varias páginas.

## Taxonomía

### Foundations
Reglas globales independientes de un componente concreto: color, tipografía, espaciado, radios, iconografía y scrollbars. Los valores originales de Figma se conservan como referencia; los tokens semánticos del producto definen el uso en interfaz.

### Components
Piezas reutilizables con una responsabilidad acotada. Se clasifican por familia funcional:
- Forms
- Selection
- Actions
- Navigation
- Feedback
- Data Display
- Overlays

### Patterns
Composiciones de dos o más componentes que resuelven una tarea: formularios, búsqueda y filtros, selección combinada, tarjetas y mensajes en contexto. Un patrón consume componentes; no vuelve a definir sus tokens ni sus estados globales.

### Templates
Pantallas o flujos completos construidos con Foundations, Components y Patterns. Solo se publican cuando existe una composición real validada; no crear páginas vacías para completar la taxonomía.

## Fuente única de verdad

- `andy-kit.registry.ts` es el registro de navegación, agrupación y metadatos de Components.
- Cada componente tiene una sola página canónica.
- Foundations define tokens y reglas transversales. Las páginas de componentes muestran su aplicación, sin volver a explicar el significado global de cada token.
- Patterns reutiliza los componentes reales. No debe duplicar su matriz de estados ni redefinir sus variantes.
- Las rutas antiguas deben conservarse mediante redirecciones cuando cambie la nomenclatura o la organización.

## Plantilla documental flexible

Cada página puede utilizar, cuando aporte valor:
1. **Overview:** propósito y ejemplo principal.
2. **Variants:** diferencias entre variantes reales.
3. **States & Behavior:** estados y comportamiento propios del componente.
4. **Usage Guidelines:** criterios, restricciones y elección frente a alternativas.

No se deben crear secciones vacías ni repetir contenido para completar una plantilla. Una matriz global define el significado de los estados; cada componente muestra solamente los estados que admite.

## Reglas para evitar redundancia

1. No documentar el mismo componente en una vista general y en su página canónica.
2. No repetir HEX, medidas o radios si existe un token de Foundations que los define.
3. No crear dos componentes con la misma responsabilidad sin una diferencia funcional demostrable.
4. Diferenciar componentes parecidos por su propósito: Alert/Toast, Table/Data Table, Accordion/Collapsible, Dialog/Alert Dialog/Sheet.
5. Agrupar variantes comparables en una demostración; evitar una página independiente por cada combinación.
6. Los patrones explican composición y contexto; los componentes explican anatomía visual, variantes y comportamiento propio.

## Criterio para incorporar componentes

Antes de incorporar un elemento nuevo, responder:
- ¿Resuelve una necesidad recurrente del producto?
- ¿Tiene una responsabilidad diferente de los componentes existentes?
- ¿Es un componente reutilizable o un patrón compuesto?
- ¿Qué variantes y estados reales necesita?
- ¿Existe una implementación y una referencia visual validadas?

Si no hay una diferencia funcional clara, documentarlo como variante o patrón en lugar de crear otra entrada.

## Estado de la migración

La navegación y el registro ya separan Foundations, Components y Patterns. Templates queda como capa de composición validada para una siguiente etapa; no se muestran entradas vacías. La migración del contenido de cada página continúa de forma incremental, preservando estilos y comportamientos aprobados.
