import { useEffect, useState } from 'react';
import { DocSection, DocPreview } from './AndyDocsPrimitives';
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
  case 'toast': demo=<>{button('Mostrar notificación',()=>setVisible(true))}{visible&&<div className="andy-add-toast" role="status"><strong>Acción completada</strong><span>Los cambios se guardaron en esta demostración.</span><button type="button" onClick={close} aria-label="Cerrar aviso">×</button></div>}</>;break;
  case 'skeleton':demo=<div className="andy-add-skeleton" aria-label="Ejemplo de contenido cargando"><span/><span/><span/></div>;break;
  case 'data-table':demo=<div className="andy-add-stack"><label className="andy-field"><span>Filtrar registros</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar actividad o sede"/></label>{table}<small>{rows.length} registros visibles</small></div>;break;
  case 'tabla':demo=table;break;
  case 'paginacion':demo=<nav className="andy-add-inline" aria-label="Paginación">{button('Anterior',()=>setPage(Math.max(1,page-1)))}<span aria-live="polite">Página {page} de 5</span>{button('Siguiente',()=>setPage(Math.min(5,page+1)))}</nav>;break;
  case 'progreso':demo=<div className="andy-add-stack"><label htmlFor="andy-progress">Progreso: {value}%</label><progress id="andy-progress" max="100" value={value}/><input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} aria-label="Cambiar progreso"/></div>;break;
  case 'spinner':demo=<div role="status" className="andy-add-inline"><span className="andy-add-spinner" aria-hidden="true"/> Cargando información…</div>;break;
  case 'tooltip':demo=<div className="andy-add-tooltip-wrap"><button className="andy-btn andy-btn-outline" type="button" aria-describedby="andy-tooltip">Pasá el cursor o enfocá</button><span role="tooltip" id="andy-tooltip">Información adicional de la acción</span></div>;break;
  case 'slider':demo=<div className="andy-add-stack"><label htmlFor="andy-slider">Intensidad: {value}%</label><input type="range" id="andy-slider" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))}/></div>;break;
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
 return <>
 <DocSection title="Vista previa" description="Ejemplo interactivo con la identidad visual actual del UI Kit municipal."><DocPreview>{demo}</DocPreview></DocSection>
 <DocSection title="Comportamiento" description="Criterios de interacción, estados y contenido."><div className="andy-add-guidance"><strong>Estados</strong><p>Reposo, hover, foco, selección y deshabilitado según corresponda al componente.</p><strong>Accesibilidad</strong><p>Usar etiquetas semánticas, navegación por teclado y señales visuales de foco. Los diálogos se cierran con Escape en esta demostración.</p></div></DocSection>
 </>;
}
