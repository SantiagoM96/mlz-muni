import { additionalComponents } from './AndyAdditionalComponents';

/** Registro único de componentes: la navegación y el directorio consumen esta misma fuente. */
const componentGroups=[
 {title:'Fundamentos',items:[['espaciados','Espaciados'],['border-radius','Border radius']]}, 
 {title:'Campos de formulario',items:[['field','Field'],['input','Input'],['select','Select'],['textarea','Textarea'],['calendario','Date Picker'],['adjuntos','Attachment']]},
 {title:'Selección',items:[['checkbox','Checkbox'],['radio','Radio Group'],['switch','Switch']]},
 {title:'Filtros y navegación',items:[['buscador','Buscador y filtros']]},
 {title:'Acciones y contenido',items:[['boton','Button'],['chips','Badge'],['tarjeta','Card'],['mensaje','Alert'],['acordeon','Accordion']]},
 {title:'Componentes adicionales',items:additionalComponents}
] as const;
type ComponentId=typeof componentGroups[number]['items'][number][0];
const componentAliases:Record<string,string>={sede:'buscador',edad:'buscador','mas-filtros':'buscador',ordenar:'buscador','seleccion-unica':'buscador','seleccion-multiple':'buscador','filtros-avanzados':'buscador',ordenamiento:'buscador',scrollbars:'buscador'};
const componentEntries:ReadonlyArray<readonly [ComponentId,string]>=componentGroups.flatMap(group=>group.items as ReadonlyArray<readonly [ComponentId,string]>);
const componentMeta:Record<ComponentId,{description:string;category:string}>={
 espaciados:{description:'Escala oficial 2–64 px de gaps, márgenes y padding de todos los componentes.',category:'Fundamentos'},
 'border-radius':{description:'Escala semántica de redondeos para controles, paneles, tarjetas y drawers.',category:'Fundamentos'},
 field:{description:'Estructura accesible para asociar etiqueta, control, ayuda, validación y grupos de campos.',category:'Campos de formulario'},
 input:{description:'Control de texto de una línea para el ingreso de datos.',category:'Campos de formulario'},
 select:{description:'Selección única, múltiple y con búsqueda; menús desktop y drawers mobile.',category:'Campos de formulario'},
 textarea:{description:'Campos de texto multilínea y sus estados.',category:'Campos de formulario'},
 calendario:{description:'Selector de fechas del producto Deportes Anual, con vistas de mes y año.',category:'Campos de formulario'},
 adjuntos:{description:'Adjunto de documentación y sus estados visuales.',category:'Campos de formulario'},
 checkbox:{description:'Selección múltiple con Material Symbols Outlined.',category:'Selección'},
 radio:{description:'Selección exclusiva entre varias alternativas.',category:'Selección'},
 switch:{description:'Activar o desactivar una configuración.',category:'Selección'},
 buscador:{description:'Buscador, selección única y múltiple, filtros avanzados, ordenamiento y barras de scroll con patrones de Deportes Anual.',category:'Filtros y navegación'},
 boton:{description:'Acciones primarias, secundarias, de texto y con íconos.',category:'Acciones y contenido'},
 chips:{description:'Etiquetas y chips removibles.',category:'Acciones y contenido'},
 tarjeta:{description:'Tarjetas de actividad y resúmenes de inscripción.',category:'Acciones y contenido'},
 mensaje:{description:'Avisos informativos, estados de validación y vacíos.',category:'Acciones y contenido'},
 acordeon:{description:'Secciones expandibles de contenido, con apertura única o múltiple.',category:'Acciones y contenido'},
 'toast':{description:'Notificación temporal y descartable.',category:'Componentes adicionales'},
 'skeleton':{description:'Representación del contenido durante la carga.',category:'Componentes adicionales'},
 'data-table':{description:'Tabla de registros con filtrado y estados.',category:'Componentes adicionales'},
 'tabla':{description:'Presentación tabular de datos estructurados.',category:'Componentes adicionales'},
 'paginacion':{description:'Navegación entre páginas de registros.',category:'Componentes adicionales'},
 'progreso':{description:'Indicador de porcentaje de avance.',category:'Componentes adicionales'},
 'spinner':{description:'Indicador de operación en curso.',category:'Componentes adicionales'},
 'tooltip':{description:'Ayuda contextual accesible.',category:'Componentes adicionales'},
 'slider':{description:'Selección de un valor dentro de un rango.',category:'Componentes adicionales'},
 'toggle':{description:'Control de acción persistente con estado presionado.',category:'Componentes adicionales'},
 'toggle-group':{description:'Conjunto de acciones seleccionables.',category:'Componentes adicionales'},
 'empty':{description:'Estado vacío de una lista o vista.',category:'Componentes adicionales'},
 'separator':{description:'Separación semántica de contenidos.',category:'Componentes adicionales'},
 'dialog':{description:'Panel modal de contenido.',category:'Componentes adicionales'},
 'alert-dialog':{description:'Diálogo de confirmación.',category:'Componentes adicionales'},
 'sheet':{description:'Panel lateral superpuesto.',category:'Componentes adicionales'},
 'collapsible':{description:'Región de contenido expandible.',category:'Componentes adicionales'},
 'button-group':{description:'Grupo de botones relacionados.',category:'Componentes adicionales'}
};

export { componentGroups, componentAliases, componentEntries, componentMeta };
export type { ComponentId };
