import { useEffect, useState } from 'react';
import { DocSection, DocPreview } from './AndyDocsPrimitives';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
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
   <div className="andy-add-guidance"><strong>Semántica</strong><p>Success confirma una acción; Info proporciona contexto; Alert advierte; Error informa un problema que requiere atención.</p>
   <strong>Cierre</strong><p>La notificación se puede cerrar desde su botón. El ejemplo interactivo se anuncia como actualización de estado.</p></div>
  </DocSection>
 </>;
}

function AndySliderDocs(){
 const [intensity,setIntensity]=useState(45);
 const [start,setStart]=useState(20);
 const [end,setEnd]=useState(75);
 const fill=(value:number)=>({'--andy-slider-fill':value+'%'} as React.CSSProperties);
 return <>
  <DocSection title="Slider básico" description="Pista fina de 6 px y thumb de 16 px según la escala MLZ. En reposo, blanco con borde Primario 600; al arrastrar, relleno Info 600.">
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
   <div className="andy-add-guidance"><strong>Interacción</strong><p>Arrastrar el indicador o usar las flechas del teclado para modificar el valor. En rango, el mínimo no puede superar al máximo.</p><strong>Foco</strong><p>Indicador de foco Info 500 visible para navegación con teclado, sin alterar el tamaño del componente.</p></div>
  </DocSection>
 </>;
}

export function AndyAdditionalComponent({id}:{id:AdditionalId}){
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
  case 'empty':demo=<div className="andy-empty"><h3>No hay resultados</h3><p>Modificá los filtros para volver a buscar.</p>{button('Volver a intentar',()=>setOn(!on))}{on&&<small>Se actualizó la búsqueda de demostración.</small>}</div>;break;
  case 'separator':demo=<div className="andy-add-stack"><span>Primera sección</span><hr/><span>Segunda sección</span></div>;break;
  case 'collapsible':demo=<div className="andy-add-stack"><button className="andy-btn andy-btn-outline" type="button" aria-expanded={expanded} aria-controls="andy-collapsible-content" onClick={()=>setExpanded(!expanded)}>Información adicional {expanded?'−':'+'}</button>{expanded&&<div id="andy-collapsible-content" className="andy-add-panel">Contenido complementario expandido.</div>}</div>;break;
  case 'button-group':demo=<div className="andy-add-inline" role="group" aria-label="Alineación">{['Izquierda','Centro','Derecha'].map(v=><button key={v} className={'andy-btn '+(selected.includes(v)?'andy-btn-primary':'andy-btn-outline')} type="button" aria-pressed={selected.includes(v)} onClick={()=>setSelected([v])}>{v}</button>)}</div>;break;
  case 'dialog':
  case 'alert-dialog':
  case 'sheet':demo=<>{button('Abrir '+(id==='sheet'?'panel':id==='alert-dialog'?'confirmación':'diálogo'),()=>setVisible(true))}{visible&&<div className="andy-add-overlay" onMouseDown={close}><div role="dialog" aria-modal="true" aria-labelledby="andy-add-dialog-title" className={'andy-add-dialog '+(id==='sheet'?'is-sheet':'')} onMouseDown={e=>e.stopPropagation()}><h3 id="andy-add-dialog-title">{id==='alert-dialog'?'¿Confirmar la acción?':id==='sheet'?'Panel lateral':'Detalle'}</h3><p>{id==='alert-dialog'?'Esta acción modifica únicamente el estado de esta demostración.':'Ejemplo de contenido que se presenta en una capa independiente.'}</p><div className="andy-add-inline"><button className="andy-btn andy-btn-outline" type="button" onClick={close}>Cancelar</button>{button('Confirmar',close)}</div></div></div>}</>;break;
  default: demo=null;
 }
 if(id==='toast')return <AndyToastDocs/>;
 if(id==='slider')return <AndySliderDocs/>;
 return <>
 <DocSection title="Vista previa" description="Ejemplo interactivo con la identidad visual actual del UI Kit municipal."><DocPreview>{demo}</DocPreview></DocSection>
 <DocSection title="Comportamiento" description="Criterios de interacción, estados y contenido."><div className="andy-add-guidance"><strong>Estados</strong><p>Reposo, hover, foco, selección y deshabilitado según corresponda al componente.</p><strong>Accesibilidad</strong><p>Usar etiquetas semánticas, navegación por teclado y señales visuales de foco. Los diálogos se cierran con Escape en esta demostración.</p></div></DocSection>
 </>;
}
