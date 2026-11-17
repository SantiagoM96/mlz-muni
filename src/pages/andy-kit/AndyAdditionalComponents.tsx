import { useEffect, useState } from 'react';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { AndyDialogDocs, AndyAlertDialogDocs } from './AndyModalDocs';
import './andy-additional-components.css';

export const additionalComponents = [
 ['toast','Toast'],['skeleton','Skeleton'],['data-table','Data Table'],['tabla','Table'],
 ['paginacion','Pagination'],['progreso','Progress'],['spinner','Spinner'],
 ['tooltip','Tooltip'],['slider','Slider'],['toggle','Toggle'],['toggle-group','Toggle Group'],
 ['empty','Empty'],['separator','Separator'],['dialog','Dialog'],
 ['alert-dialog','Alert Dialog'],['sheet','Sheet'],['collapsible','Collapsible'],
 ['button-group','Button Group']
] as const;

export type AdditionalId = typeof additionalComponents[number][0];

type ToastKind = 'success' | 'info' | 'warning' | 'error';
const toastVariants: {id:ToastKind;label:string;title:string;body:string;icon:'check_circle'|'error'|'warning'|'cancel'}[] = [
 {id:'success',label:'Success',title:'Datos completos',body:'La información se guardó correctamente.',icon:'check_circle'},
 {id:'info',label:'Info',title:'Antes de empezar',body:'Completá los datos para continuar con la inscripción.',icon:'error'},
 {id:'warning',label:'Alert',title:'Información importante',body:'Revisá los requisitos de la actividad antes de inscribirte.',icon:'warning'},
 {id:'error',label:'Error',title:'Revisá el formulario',body:'Hay campos obligatorios pendientes.',icon:'cancel'},
];

function ToastExample({variant, onClose, example=false}:{variant:typeof toastVariants[number];onClose?:()=>void;example?:boolean}){
 return <div className={'andy-add-toast andy-add-toast-'+variant.id} role={example?'status':undefined}>
  <MaterialIcon name={variant.icon} size={24}/>
  <div className="andy-add-toast-content"><strong>{variant.title}</strong><span>{variant.body}</span></div>
  {onClose&&<button className="andy-add-toast-close" type="button" onClick={onClose} aria-label={'Cerrar notificación: '+variant.title}>
   <MaterialIcon name="close_small" size={20}/>
  </button>}
 </div>;
}

function AndyToastDocs(){
 const [active,setActive]=useState<ToastKind|null>(null);
 const selected=toastVariants.find(item=>item.id===active);
 return <>
  <DocSection title="Variantes" description="Cuatro notificaciones semánticas que reutilizan los colores e íconos de Mensajes y alertas de MLZ.">
   <DocPreview align="start"><div className="andy-add-toast-list">
    {toastVariants.map(item=><div className="andy-add-toast-item" key={item.id}>
      <strong className="andy-add-toast-label">{item.label}</strong>
      <ToastExample variant={item}/>
    </div>)}
   </div></DocPreview>
  </DocSection>
  <DocSection title="Vista previa interactiva" description="Elegí una variante para mostrar y cerrar su notificación.">
   <DocPreview><div className="andy-add-toast-demo">
    <div className="andy-add-toast-triggers">{toastVariants.map(item=><button
      key={item.id} type="button" className="andy-btn andy-btn-outline" onClick={()=>setActive(item.id)}>
      {item.label}
    </button>)}</div>
    {selected&&<ToastExample variant={selected} onClose={()=>setActive(null)} example/>}
   </div></DocPreview>
  </DocSection>
  <DocSection title="Comportamiento" description="Toast comunica resultados breves de acciones. Los mensajes persistentes y contextuales se documentan por separado en Mensajes y alertas.">
   <GuidelineTable rows={[["Semántica","Success confirma una acción; Info proporciona contexto; Alert advierte; Error informa un problema que requiere atención."],["Cierre","La notificación se puede cerrar desde su botón. El ejemplo interactivo se anuncia como actualización de estado."]]}/>
  </DocSection>
 </>;
}

function AndySliderDocs(){
 const [intensity,setIntensity]=useState(45);
 const [start,setStart]=useState(20);
 const [end,setEnd]=useState(75);
 const fill=(value:number)=>({'--andy-slider-fill':value+'%'} as React.CSSProperties);
 return <>
  <DocSection title="Slider básico" description="Pista fina de 6 px y thumb de 16 px según la escala MLZ. En reposo, blanco con borde Primario 600; al arrastrar, relleno Info 500.">
   <DocPreview><div className="andy-add-slider-demo">
    <div className="andy-add-slider-heading"><label htmlFor="andy-mlz-slider">Intensidad</label><output htmlFor="andy-mlz-slider">{intensity}%</output></div>
    <input className="andy-add-slider" id="andy-mlz-slider" type="range" min="0" max="100" step="1"
      value={intensity} style={fill(intensity)} onChange={event=>setIntensity(Number(event.target.value))}/>
    <div className="andy-add-slider-bounds"><span>0</span><span>100</span></div>
   </div></DocPreview>
  </DocSection>
  <DocSection title="Rango" description="Dos manejadores para elegir un mínimo y un máximo. El tramo entre ambos se resalta con Primario 600.">
   <DocPreview><div className="andy-add-slider-demo">
    <div className="andy-add-slider-heading"><span>Rango de valores</span><output>{start} – {end}</output></div>
    <div className="andy-add-slider-range" style={{'--andy-range-start':start+'%','--andy-range-end':end+'%'} as React.CSSProperties}>
     <div className="andy-add-slider-range-track" aria-hidden="true"><span/></div>
     <input aria-label="Valor mínimo" type="range" min="0" max="100" step="1" value={start}
      onChange={event=>setStart(Math.min(Number(event.target.value),end-1))}/>
     <input aria-label="Valor máximo" type="range" min="0" max="100" step="1" value={end}
      onChange={event=>setEnd(Math.max(Number(event.target.value),start+1))}/>
    </div>
    <div className="andy-add-slider-bounds"><span>0</span><span>100</span></div>
   </div></DocPreview>
  </DocSection>
  <DocSection title="Disabled" description="El slider mantiene su geometría y reduce el contraste cuando no admite interacción.">
   <DocPreview><div className="andy-add-slider-demo">
    <div className="andy-add-slider-heading"><label htmlFor="andy-mlz-slider-disabled">Intensidad no disponible</label><output>45%</output></div>
    <input className="andy-add-slider" id="andy-mlz-slider-disabled" type="range" min="0" max="100"
      value={45} style={fill(45)} disabled readOnly/>
   </div></DocPreview>
  </DocSection>
  <DocSection title="Comportamiento" description="Control operable con mouse, pantalla táctil y teclado.">
   <GuidelineTable rows={[["Interacción","Arrastrar el indicador o usar las flechas del teclado para modificar el valor. En rango, el mínimo no puede superar al máximo."],["Foco","Indicador de foco Info 500 visible para navegación con teclado, sin alterar el tamaño del componente."]]}/>
  </DocSection>
 </>;
}

const visualGuidance:Partial<Record<AdditionalId,{heading:string;description:string;rows:[string,string][]}>>={
 skeleton:{heading:'Estados de carga',description:'Representación provisional de una superficie antes de recibir los datos.',rows:[['Uso','Mostrar la estructura aproximada que ocupará el contenido.'],['Transición','Reemplazarla por el contenido real al completar la carga.']]},
 'data-table':{heading:'Filtrado y resultados',description:'Ejemplo agrupado de búsqueda, tabla y cantidad de resultados.',rows:[['Filtrar','La búsqueda actualiza las filas mostradas.'],['Sin coincidencias','Mantener cabeceras visibles y comunicar el resultado vacío.']]},
 tabla:{heading:'Presentación de datos',description:'Filas y columnas para comparar información estructurada.',rows:[['Encabezados','Identificar cada columna con un título claro.'],['Contenido','Mantener alineación y legibilidad de las celdas.']]},
 paginacion:{heading:'Navegación',description:'Control de página anterior, siguiente y posición actual.',rows:[['Límites','No avanzar más allá de la última página ni retroceder antes de la primera.'],['Contexto','Indicar la página actual y el total disponible.']]},
 progreso:{heading:'Estados de progreso',description:'Porcentaje visible junto al indicador de avance.',rows:[['Valor','Representar la proporción completada.'],['Contexto','Acompañar el progreso con una etiqueta comprensible.']]},
 spinner:{heading:'Estado de carga',description:'Indicador de una operación de duración indeterminada.',rows:[['Uso','Mostrarlo solo mientras exista una operación en curso.'],['Accesibilidad','Acompañarlo con una descripción de estado.']]},
 tooltip:{heading:'Interacción',description:'Ayuda breve disponible mediante hover y foco.',rows:[['Contenido','Usar textos breves, que no sean indispensables para completar una acción.'],['Acceso','Permitir descubrirlo con puntero y teclado.']]},
 toggle:{heading:'Estados',description:'Comparación interactiva entre presionado y no presionado.',rows:[['Selección','El botón comunica claramente si permanece activado.'],['Uso','Reservarlo para acciones con estado persistente.']]},
 'toggle-group':{heading:'Selección agrupada',description:'Opciones relacionadas que comparten una misma superficie de selección.',rows:[['Opciones','Mostrar en conjunto todas las alternativas disponibles.'],['Estados','Distinguir las opciones activas de las inactivas.']]},
 empty:{heading:'Estados vacíos',description:'Contenido alternativo para una lista o una búsqueda sin resultados.',rows:[['Mensaje','Explicar qué contenido falta.'],['Acción','Ofrecer una salida pertinente, cuando exista.']]},
 separator:{heading:'Variantes de separación',description:'División visual discreta entre regiones de contenido.',rows:[['Uso','Separar grupos de información con una jerarquía clara.'],['Semántica','No utilizarlo como único recurso para explicar una agrupación.']]},
 dialog:{heading:'Interacción modal',description:'Ventana superpuesta para realizar una acción sin abandonar la pantalla.',rows:[['Apertura','Presentar la capa y su contexto de forma clara.'],['Cierre','Permitir cancelar y regresar al contenido anterior.']]},
 'alert-dialog':{heading:'Confirmación',description:'Diálogo para decisiones que requieren una confirmación explícita.',rows:[['Mensaje','Explicar la consecuencia de confirmar.'],['Acciones','Diferenciar claramente confirmar y cancelar.']]},
 sheet:{heading:'Panel superpuesto',description:'Contenido contextual presentado desde un borde de la pantalla.',rows:[['Uso','Conservar el contexto de la vista principal.'],['Cierre','Permitir regresar sin perder el lugar anterior.']]},
 collapsible:{heading:'Expandido y contraído',description:'Dos estados del mismo bloque de contenido.',rows:[['Indicador','Comunicar claramente si la región está desplegada.'],['Acción','Alternar sin modificar el resto de la página.']]},
 'button-group':{heading:'Acciones agrupadas',description:'Botones relacionados presentados en una misma fila.',rows:[['Agrupación','Mantener próximas las acciones que pertenecen al mismo contexto.'],['Estados','Conservar la jerarquía y el estado de cada botón.']]}
};
export function AndyAdditionalComponent({id}:{id:AdditionalId}){
 if(id==='dialog')return <AndyDialogDocs/>;
 if(id==='alert-dialog')return <AndyAlertDialogDocs/>;
 const guidance=visualGuidance[id];
 const [visible,setVisible]=useState(false);
 const [value,setValue]=useState(45);
 const [page,setPage]=useState(1);
 const [on,setOn]=useState(false);
 const [selected,setSelected]=useState<string[]>(['Semana']);
 const [expanded,setExpanded]=useState(false);
 const [query,setQuery]=useState('');
 useEffect(()=>{if(!visible)return;const handler=(e:KeyboardEvent)=>{if(e.key==='Escape')setVisible(false)};document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler)},[visible]);
 const button=(label:string,action:()=>void)=><button type="button" className="andy-btn andy-btn-primary" onClick={action}>{label}</button>;
 const close=()=>setVisible(false);
 const rows=[['Natación','Casa de la Cultura','Activo'],['Yoga','Polideportivo','Activo'],['Danza','Centro Cultural','Pendiente'],['Gimnasia','Club Municipal','Activo']].filter(row=>row.join(' ').toLowerCase().includes(query.toLowerCase()));
 const table=<div className="andy-add-table-wrap"><table className="andy-add-table"><thead><tr><th>Actividad</th><th>Sede</th><th>Estado</th></tr></thead><tbody>{rows.map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>;
 let demo:React.ReactNode;
 switch(id){
  case 'toast': demo=null;break;
  case 'skeleton':demo=<div className="andy-add-skeleton" aria-label="Ejemplo de contenido cargando"><span/><span/><span/></div>;break;
  case 'data-table':demo=<div className="andy-add-stack"><label className="andy-field"><span>Filtrar registros</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar actividad o sede"/></label>{table}<small>{rows.length} registros visibles</small></div>;break;
  case 'tabla':demo=table;break;
  case 'paginacion':demo=<nav className="andy-add-inline" aria-label="Paginación">{button('Anterior',()=>setPage(Math.max(1,page-1)))}<span aria-live="polite">Página {page} de 5</span>{button('Siguiente',()=>setPage(Math.min(5,page+1)))}</nav>;break;
  case 'progreso':demo=<div className="andy-add-stack"><label htmlFor="andy-progress">Progreso: {value}%</label><progress id="andy-progress" max="100" value={value}/><input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} aria-label="Cambiar progreso"/></div>;break;
  case 'spinner':demo=<div role="status" className="andy-add-inline"><span className="andy-add-spinner" aria-hidden="true"/> Cargando información…</div>;break;
  case 'tooltip':demo=<div className="andy-add-tooltip-wrap"><button className="andy-btn andy-btn-outline" type="button" aria-describedby="andy-tooltip">Pasá el cursor o enfocá</button><span role="tooltip" id="andy-tooltip">Información adicional de la acción</span></div>;break;
  case 'slider':demo=null;break;
  case 'toggle':demo=<button className={'andy-btn '+(on?'andy-btn-primary':'andy-btn-outline')} type="button" aria-pressed={on} onClick={()=>setOn(!on)}>{on?'Activado':'Desactivado'}</button>;break;
  case 'toggle-group':demo=<div className="andy-add-inline" role="group" aria-label="Vista">{['Día','Semana','Mes'].map(v=><button key={v} className={'andy-btn '+(selected.includes(v)?'andy-btn-primary':'andy-btn-outline')} type="button" aria-pressed={selected.includes(v)} onClick={()=>setSelected(old=>old.includes(v)?old.filter(x=>x!==v):[...old,v])}>{v}</button>)}</div>;break;
  case 'empty':demo=<div className="andy-empty-context">
   <div className="andy-empty-search-context">
    <div><strong>Actividades deportivas</strong><span>Encontrá propuestas para participar en Lomas de Zamora.</span></div>
    <div className="andy-empty-search-filter"><MaterialIcon name="search" size={20}/><span>{on?'Todas las actividades':'Básquet acuático'}</span></div>
   </div>
   {on?<div className="andy-empty-results" role="status"><MaterialIcon name="check_circle" size={24}/><div><strong>Filtros restablecidos</strong><p>Se quitó el término de búsqueda. Ya podés explorar las actividades disponibles.</p></div><button type="button" className="andy-btn andy-btn-outline" onClick={()=>setOn(false)}>Probar estado vacío</button></div>
   :<div className="andy-empty"><MaterialIcon name="search" size={40}/><h3>No encontramos actividades</h3><p>No hay resultados para «Básquet acuático». Probá con otro término o restablecé los filtros para ver las actividades disponibles.</p><button type="button" className="andy-btn andy-btn-outline" onClick={()=>setOn(true)}>Limpiar filtros</button></div>}
  </div>;break;
  case 'separator':demo=<div className="andy-add-stack"><span>Primera sección</span><hr/><span>Segunda sección</span></div>;break;
  case 'collapsible':demo=<div className="andy-add-stack"><button className="andy-btn andy-btn-outline" type="button" aria-expanded={expanded} aria-controls="andy-collapsible-content" onClick={()=>setExpanded(!expanded)}>Información adicional {expanded?'−':'+'}</button>{expanded&&<div id="andy-collapsible-content" className="andy-add-panel">Contenido complementario expandido.</div>}</div>;break;
  case 'button-group':demo=<div className="andy-add-inline" role="group" aria-label="Alineación">{['Izquierda','Centro','Derecha'].map(v=><button key={v} className={'andy-btn '+(selected.includes(v)?'andy-btn-primary':'andy-btn-outline')} type="button" aria-pressed={selected.includes(v)} onClick={()=>setSelected([v])}>{v}</button>)}</div>;break;
  case 'sheet':demo=<>{button('Abrir panel',()=>setVisible(true))}{visible&&<div className="andy-add-overlay" onMouseDown={close}><div role="dialog" aria-modal="true" aria-labelledby="andy-add-dialog-title" className="andy-add-dialog is-sheet" onMouseDown={e=>e.stopPropagation()}><h3 id="andy-add-dialog-title">Panel lateral</h3><p>Ejemplo de contenido que se presenta en una capa independiente.</p><div className="andy-add-inline"><button className="andy-btn andy-btn-outline" type="button" onClick={close}>Cancelar</button>{button('Confirmar',close)}</div></div></div>}</>;break;
  default: demo=null;
 }
 if(id==='toast')return <AndyToastDocs/>;
 if(id==='slider')return <AndySliderDocs/>;
 return <>
 <DocSection title="Ejemplo interactivo" description="Probá el componente dentro de una demostración de la interfaz municipal."><DocPreview>{demo}</DocPreview></DocSection>
 {guidance&&<DocSection title={guidance.heading} description={guidance.description}><GuidelineTable rows={guidance.rows}/></DocSection>}
 </>;
}
