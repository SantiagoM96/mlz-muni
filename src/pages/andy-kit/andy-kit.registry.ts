/** Registro único de componentes: la navegación y el directorio consumen esta misma fuente. */
const componentGroups=[
 {title:'Forms',items:[['field','Field'],['input','Input'],['select','Select'],['textarea','Textarea'],['calendario','Date Picker'],['adjuntos','Attachment']]},
 {title:'Selection',items:[['checkbox','Checkbox'],['radio','Radio Group'],['switch','Switch'],['slider','Slider'],['toggle','Toggle'],['toggle-group','Toggle Group']]},
 {title:'Actions',items:[['boton','Button'],['button-group','Button Group']]},
 {title:'Navigation',items:[['acordeon','Accordion'],['breadcrumb','Breadcrumb'],['collapsible','Collapsible'],['paginacion','Pagination']]},
 {title:'Feedback',items:[['mensaje','Alert'],['toast','Toast'],['progreso','Progress'],['spinner','Spinner'],['skeleton','Skeleton']]},
 {title:'Data Display',items:[['avatar','Avatar'],['chips','Badge'],['tarjeta','Card'],['tabla','Table'],['data-table','Data Table'],['empty','Empty'],['separator','Separator']]},
 {title:'Overlays',items:[['dialog','Dialog'],['alert-dialog','Alert Dialog'],['sheet','Sheet'],['tooltip','Tooltip']]},
] as const;
type ComponentId=typeof componentGroups[number]['items'][number][0];
const componentAliases:Record<string,string>={espaciados:'fundamentos','border-radius':'fundamentos',buscador:'filtros',scrollbars:'fundamentos',sede:'filtros',edad:'filtros','mas-filtros':'filtros',ordenar:'filtros','seleccion-unica':'filtros','seleccion-multiple':'filtros','filtros-avanzados':'filtros',ordenamiento:'filtros'};
const componentEntries:ReadonlyArray<readonly [ComponentId,string]>=componentGroups.flatMap(group=>group.items as ReadonlyArray<readonly [ComponentId,string]>);
const componentMeta:Record<ComponentId,{description:string;category:string}>={
 field:{description:'Estructura accesible para asociar etiqueta, control, ayuda, validación y grupos de campos.',category:'Forms'},
 input:{description:'Control de texto de una línea para el ingreso de datos.',category:'Forms'},
 select:{description:'Selección única, múltiple y con búsqueda; menús desktop y drawers mobile.',category:'Forms'},
 textarea:{description:'Campos de texto multilínea y sus estados.',category:'Forms'},
 calendario:{description:'Selector de fechas del producto Deportes Anual, con vistas de mes y año.',category:'Forms'},
 adjuntos:{description:'Adjunto de documentación y sus estados visuales.',category:'Forms'},
 checkbox:{description:'Selección múltiple con Material Symbols Outlined.',category:'Selection'},
 radio:{description:'Selección exclusiva entre varias alternativas.',category:'Selection'},
 switch:{description:'Activar o desactivar una configuración.',category:'Selection'},
 boton:{description:'Acciones primarias, secundarias, de texto y con íconos.',category:'Data Display'},
 avatar:{description:'Identidad visual de personas: fotografía, iniciales, indicador, grupo y contador.',category:'Data Display'},
 chips:{description:'Badge de estado o categoría, con variantes, tamaños, íconos y enlaces; chips removibles separados.',category:'Data Display'},
 tarjeta:{description:'Tarjetas de actividad y resúmenes de inscripción.',category:'Data Display'},
 mensaje:{description:'Mensajes persistentes de información, éxito, advertencia y error, con acción opcional.',category:'Feedback'},
 acordeon:{description:'Secciones expandibles de contenido, con apertura única o múltiple.',category:'Data Display'},
 breadcrumb:{description:'Ruta de navegación jerárquica, separadores configurables, colapsado y vuelta al padre en mobile.',category:'Navigation'},
 'toast':{description:'Notificación temporal y descartable.',category:'Feedback'},
 'skeleton':{description:'Representación del contenido durante la carga.',category:'Feedback'},
 'data-table':{description:'Tabla de registros con filtrado, ordenamiento y estados.',category:'Data Display'},
 'tabla':{description:'Estructura tabular para presentar datos.',category:'Data Display'},
 'paginacion':{description:'Navegación entre páginas de registros.',category:'Navigation'},
 'progreso':{description:'Indicador de porcentaje de avance.',category:'Feedback'},
 'spinner':{description:'Indicador de operación en curso.',category:'Feedback'},
 'tooltip':{description:'Ayuda contextual accesible.',category:'Overlays'},
 'slider':{description:'Selección de un valor dentro de un rango.',category:'Selection'},
 'toggle':{description:'Control de acción persistente con estado presionado.',category:'Selection'},
 'toggle-group':{description:'Conjunto de acciones seleccionables.',category:'Selection'},
 'empty':{description:'Estado vacío de una lista o vista.',category:'Data Display'},
 'separator':{description:'Separación semántica de contenidos.',category:'Data Display'},
 'dialog':{description:'Panel modal de contenido.',category:'Overlays'},
 'alert-dialog':{description:'Diálogo de confirmación.',category:'Overlays'},
 'sheet':{description:'Panel lateral superpuesto.',category:'Overlays'},
 'collapsible':{description:'Región de contenido expandible.',category:'Navigation'},
 'button-group':{description:'Acciones relacionadas con bordes compartidos, botón dividido, tamaños y orientación.',category:'Actions'}
};

export { componentGroups, componentAliases, componentEntries, componentMeta };
export type { ComponentId };
