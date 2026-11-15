import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection, DocPreview } from './AndyDocsPrimitives';
import './andy-essential-components.css';

type EssentialId='toast'|'tabla'|'data-table'|'skeleton'|'slider'|'sidebar'|'tabs'|'progress'|'paginacion'|'dialog'|'tooltip'|'spinner'|'separator'|'breadcrumb'|'avatar';
export const essentialIds:EssentialId[]=['toast','tabla','data-table','skeleton','slider','sidebar','tabs','progress','paginacion','dialog','tooltip','spinner','separator','breadcrumb','avatar'];
type ToastKind='success'|'info'|'warning'|'error';
const toastKinds:{kind:ToastKind;title:string;message:string;icon:'check_circle'|'info'|'warning'|'error'}[]=[
 {kind:'success',title:'Operación exitosa',message:'Los cambios se guardaron correctamente.',icon:'check_circle'},
 {kind:'info',title:'Información',message:'La solicitud está siendo procesada.',icon:'info'},
 {kind:'warning',title:'Atención',message:'Revisá los datos antes de continuar.',icon:'warning'},
 {kind:'error',title:'No pudimos guardar',message:'Probá nuevamente en unos momentos.',icon:'error'},
];
function ToastDemo(){
 const [toasts,setToasts]=useState<{id:number;kind:ToastKind}[]>([]);
 const next=useRef(0),timeouts=useRef<ReturnType<typeof setTimeout>[]>([]);
 useEffect(()=>()=>timeouts.current.forEach(clearTimeout),[]);
 const add=(kind:ToastKind)=>{
  const id=++next.current;
  setToasts(prev=>[...prev,{id,kind}].slice(-3));
  timeouts.current.push(setTimeout(()=>setToasts(prev=>prev.filter(t=>t.id!==id)),5500));
 };
 return <>
  <DocSection title="Variantes semánticas" description="Notificación temporal de éxito, información, advertencia o error. Usa los mismos colores de Mensajes y alertas.">
   <DocPreview><div className="andy-essential-actions">{toastKinds.map(t=><button key={t.kind} className="andy-essential-button" type="button" onClick={()=>add(t.kind)}>{t.title}</button>)}</div></DocPreview>
  </DocSection>
  <DocSection title="Comportamiento" description="Aparece arriba a la derecha, se cierra automáticamente y puede descartarse antes. Nunca bloquea la interacción.">
   <DocPreview><button className="andy-essential-button is-primary" type="button" onClick={()=>add('success')}>Mostrar notificación</button>
    <p className="andy-essential-caption">Probá varios avisos para ver cómo se agrupan sin superponerse.</p></DocPreview>
  </DocSection>
  <div className="andy-toast-region" role="region" aria-label="Notificaciones">
   {toasts.map(item=>{
    const info=toastKinds.find(t=>t.kind===item.kind)!;
    return <div key={item.id} className={'andy-toast is-'+item.kind} role={item.kind==='error'?'alert':'status'}>
     <MaterialIcon name={info.icon} size={22}/><div><strong>{info.title}</strong><span>{info.message}</span></div>
     <button type="button" aria-label="Cerrar notificación" onClick={()=>setToasts(prev=>prev.filter(t=>t.id!==item.id))}><MaterialIcon name="close" size={20}/></button>
    </div>;
   })}
  </div>
 </>;
}
const entries=[
 {id:1,title:'Natación recreativa',type:'Deportes',place:'Banfield',status:'Disponible'},
 {id:2,title:'Encuentro de teatro',type:'Agenda',place:'Lomas de Zamora',status:'Disponible'},
 {id:3,title:'Gimnasia artística',type:'Deportes',place:'Temperley',status:'Inscripción cerrada'},
 {id:4,title:'Taller de cerámica',type:'Agenda',place:'Turdera',status:'Disponible'},
 {id:5,title:'Vóley recreativo',type:'Deportes',place:'Llavallol',status:'Disponible'},
 {id:6,title:'Muestra de danza',type:'Agenda',place:'Banfield',status:'Finalizado'},
 {id:7,title:'Hockey inicial',type:'Deportes',place:'Lomas de Zamora',status:'Disponible'},
 {id:8,title:'Festival comunitario',type:'Agenda',place:'Temperley',status:'Disponible'}
];
function TableDemo({advanced=false}:{advanced?:boolean}){
 const [search,setSearch]=useState('');
 const [sort,setSort]=useState<'asc'|'desc'>('asc');
 const [page,setPage]=useState(1);
 const filtered=entries.filter(x=>!advanced||[x.title,x.type,x.place,x.status].some(v=>v.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>sort==='asc'?a.title.localeCompare(b.title,'es'):b.title.localeCompare(a.title,'es'));
 const pages=Math.max(1,Math.ceil(filtered.length/4));
 const current=Math.min(page,pages);
 return <div className="andy-table-shell">
  {advanced&&<div className="andy-table-toolbar"><label>Buscar registros <input aria-label="Buscar registros de tabla" placeholder="Buscar..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}/></label><span>{filtered.length} resultados</span></div>}
  <div className="andy-table-scroll"><table className="andy-essential-table">
   <thead><tr><th scope="col">{advanced?<button type="button" onClick={()=>setSort(v=>v==='asc'?'desc':'asc')}>Actividad <MaterialIcon name="sort" size={18}/></button>:'Actividad'}</th><th scope="col">Tipo</th><th scope="col">Localidad</th><th scope="col">Estado</th></tr></thead>
   <tbody>{filtered.slice(advanced?(current-1)*4:0,advanced?current*4:4).map(entry=><tr key={entry.id}><td><strong>{entry.title}</strong></td><td>{entry.type}</td><td>{entry.place}</td><td><span className={'andy-table-status'+(entry.status==='Disponible'?' is-available':'')}>{entry.status}</span></td></tr>)}</tbody>
  </table></div>
  {!filtered.length&&<p className="andy-essential-caption">No se encontraron resultados.</p>}
  {advanced&&<div className="andy-table-pagination"><button disabled={current===1} onClick={()=>setPage(v=>Math.max(1,v-1))} type="button">Anterior</button><span>Página {current} de {pages}</span><button disabled={current===pages} onClick={()=>setPage(v=>Math.min(pages,v+1))} type="button">Siguiente</button></div>}
 </div>;
}
function TableDocs({advanced=false}:{advanced?:boolean}){
 return <><DocSection title={advanced?'Búsqueda y ordenamiento':'Tabla básica'} description={advanced?'Filtrá, ordená por actividad y recorré páginas. Los controles tienen tamaño y foco institucional.':'Estructura con encabezados, filas, texto legible y estados discretos.'}>
   <DocPreview align="start"><TableDemo advanced={advanced}/></DocPreview>
  </DocSection>
  <DocSection title="Criterios de uso" description={advanced?'Las tablas de consola necesitan búsqueda, ordenamiento, paginación y mensajes sin resultados.':'Se recomienda para datos comparables en columnas, no para reemplazar tarjetas en mobile.'}>
   <DocPreview><p className="andy-essential-guidance">Encabezados semánticos, separación de filas, scroll horizontal en pantallas pequeñas y jerarquía de información consistente.</p></DocPreview>
  </DocSection></>;
}
function SkeletonDocs(){
 const [loading,setLoading]=useState(true);
 return <><DocSection title="Carga de tarjeta" description="La estructura del skeleton anticipa el tamaño de la imagen, el título y los metadatos que va a ocupar el contenido.">
  <DocPreview><div className="andy-skeleton-card">{loading?<><div className="andy-skeleton-photo"/><div className="andy-skeleton-line is-short"/><div className="andy-skeleton-line"/><div className="andy-skeleton-line is-middle"/><div className="andy-skeleton-line is-short"/></>:<><div className="andy-skeleton-loaded-photo"><MaterialIcon name="calendar_month" size={34}/></div><strong>Encuentro comunitario</strong><p>Actividad disponible en Lomas de Zamora.</p></>}</div></DocPreview>
 </DocSection><DocSection title="Estado de carga" description="El skeleton se reemplaza al completarse la carga. Evitá usarlo para errores o pantallas sin resultados.">
  <DocPreview><button className="andy-essential-button is-primary" type="button" onClick={()=>setLoading(v=>!v)}>{loading?'Mostrar contenido':'Simular carga'}</button></DocPreview>
 </DocSection></>;
}
function SliderDocs(){
 const [age,setAge]=useState(18),[intensity,setIntensity]=useState(40);
 const control=(label:string,value:number,set:(v:number)=>void,min:number,max:number,unit:string)=><div className="andy-slider-control"><div><label htmlFor={'mlz-slider-'+label}>{label}</label><strong>{value}{unit}</strong></div><input id={'mlz-slider-'+label} aria-label={label} type="range" value={value} min={min} max={max} onChange={event=>set(Number(event.target.value))} style={{background:`linear-gradient(90deg,#236999 ${100*(value-min)/(max-min)}%,#e5f0f9 ${100*(value-min)/(max-min)}%)`}}/><div className="andy-slider-labels"><span>{min}{unit}</span><span>{max}{unit}</span></div></div>;
 return <><DocSection title="Valor único" description="Control continuo para magnitudes numéricas. Mantiene el valor visible y una zona de interacción accesible."><DocPreview>{control('Edad mínima',age,setAge,0,100,' años')}</DocPreview></DocSection>
  <DocSection title="Progreso de intensidad" description="Cuando el usuario ajusta una cantidad, el valor y la pista reflejan inmediatamente el cambio."><DocPreview>{control('Intensidad',intensity,setIntensity,0,100,'%')}</DocPreview></DocSection></>;
}
function SidebarDocs(){
 const [compact,setCompact]=useState(false),[active,setActive]=useState('Actividades');
 return <><DocSection title="Expandida y compacta" description="Navegación lateral de una consola. La vista compacta conserva los íconos y los títulos accesibles.">
  <DocPreview><div className="andy-sidebar-preview"><div className={'andy-sample-sidebar'+(compact?' is-compact':'')}><div className="andy-sample-sidebar-brand"><MaterialIcon name="groups" size={24}/>{!compact&&<strong>Consola MLZ</strong>}</div>
   {([{name:'Actividades',icon:'calendar_month'},{name:'Personas',icon:'groups'},{name:'Reportes',icon:'sort'}] as const).map(item=><button key={item.name} title={item.name} aria-label={item.name} type="button" className={active===item.name?'is-active':''} onClick={()=>setActive(item.name)}><MaterialIcon name={item.icon} size={22}/>{!compact&&<span>{item.name}</span>}</button>)}</div>
   <div className="andy-sidebar-preview-content"><button type="button" className="andy-essential-button" onClick={()=>setCompact(v=>!v)} aria-expanded={!compact}>{compact?'Expandir':'Contraer'} menú</button><strong>{active}</strong><p>El contenido se adapta al ancho libre sin taparse con la barra lateral.</p></div>
  </div></DocPreview>
 </DocSection><DocSection title="Reglas de navegación" description="Mantener la selección visible en Primario 600 y una navegación operable por teclado."><DocPreview><p className="andy-essential-guidance">En mobile la columna se convierte en panel temporal. En desktop puede quedar fija, expandida o compacta.</p></DocPreview></DocSection></>;
}
const tabContent={Información:'Datos generales de la actividad y su descripción.',Horarios:'Días, horarios y sedes donde se desarrolla la actividad.',Requisitos:'Documentación y condiciones necesarias para la inscripción.'};
function TabsDocs(){
 const [active,setActive]=useState<keyof typeof tabContent>('Información');
 return <><DocSection title="Pestañas horizontales" description="Secciones relacionadas que ocupan el mismo espacio y pueden consultarse sin abandonar la página.">
  <DocPreview><div className="andy-tabs-sample"><div className="andy-tabs-list" role="tablist" aria-label="Información de actividad">{(Object.keys(tabContent) as (keyof typeof tabContent)[]).map(tab=><button key={tab} type="button" role="tab" aria-selected={active===tab} onClick={()=>setActive(tab)}>{tab}</button>)}</div><div role="tabpanel" className="andy-tabs-panel"><strong>{active}</strong><p>{tabContent[active]}</p></div></div></DocPreview>
 </DocSection><DocSection title="Criterios de uso" description="Mantener pocas pestañas con títulos breves y contenido del mismo nivel."><DocPreview><p className="andy-essential-guidance">Si las secciones necesitan abrirse simultáneamente, conviene utilizar un acordeón en lugar de tabs.</p></DocPreview></DocSection></>;
}
function ProgressDocs(){
 const [value,setValue]=useState(50);
 return <><DocSection title="Progreso determinado" description="Muestra el porcentaje completado de una operación o un proceso."><DocPreview><div className="andy-progress-demo"><div><strong>Inscripciones procesadas</strong><span>{value}%</span></div><div role="progressbar" aria-label="Inscripciones procesadas" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="andy-progress-track"><span style={{width:value+'%'}}/></div><div className="andy-essential-actions"><button type="button" onClick={()=>setValue(v=>Math.max(0,v-10))}>− 10%</button><button type="button" onClick={()=>setValue(v=>Math.min(100,v+10))}>+ 10%</button></div></div></DocPreview></DocSection>
 <DocSection title="Progreso por etapas" description="Para formularios de varios pasos, indicar el paso actual y el total además de la barra."><DocPreview><div className="andy-progress-demo"><strong>Paso 2 de 4 · Datos personales</strong><div className="andy-progress-track"><span style={{width:'50%'}}/></div></div></DocPreview></DocSection></>;
}
function PaginationDocs(){
 const [page,setPage]=useState(2);
 return <><DocSection title="Paginación numerada" description="Permite navegar resultados en bloques, con el número actual destacado y acciones Anterior y Siguiente.">
  <DocPreview><nav className="andy-pagination" aria-label="Páginas de actividades"><button type="button" disabled={page===1} onClick={()=>setPage(v=>v-1)} aria-label="Página anterior"><MaterialIcon name="chevron_left" size={20}/></button>{[1,2,3,4,5].map(n=><button type="button" key={n} aria-label={'Página '+n} aria-current={page===n?'page':undefined} onClick={()=>setPage(n)}>{n}</button>)}<button type="button" disabled={page===5} aria-label="Página siguiente" onClick={()=>setPage(v=>v+1)}><MaterialIcon name="chevron_right" size={20}/></button></nav><p className="andy-essential-caption">Mostrando página {page} de 5.</p></DocPreview>
 </DocSection></>;
}
function DialogDocs(){
 const [open,setOpen]=useState(false);
 return <><DocSection title="Confirmación de acción" description="El diálogo interrumpe el flujo solo cuando se necesita una decisión importante, como descartar cambios.">
  <DocPreview><button type="button" className="andy-essential-button is-primary" onClick={()=>setOpen(true)}>Abrir diálogo</button></DocPreview>
 </DocSection>
 <DocSection title="Comportamiento" description="Acciones claramente diferenciadas; cerrar mediante Escape, cancelar o confirmar."><DocPreview><p className="andy-essential-guidance">Para acciones irreversibles, preferir una confirmación explícita. El foco debe permanecer dentro del diálogo hasta cerrarlo.</p></DocPreview></DocSection>
 {open&&<div className="andy-essential-backdrop" onMouseDown={event=>{if(event.currentTarget===event.target)setOpen(false);}}><div className="andy-essential-modal" role="dialog" aria-modal="true" aria-labelledby="andy-dialog-title"><div className="andy-essential-modal-head"><h3 id="andy-dialog-title">Descartar cambios</h3><button type="button" aria-label="Cerrar diálogo" onClick={()=>setOpen(false)}><MaterialIcon name="close" size={24}/></button></div><p>Si salís ahora, se perderán los cambios sin guardar.</p><div className="andy-essential-actions"><button type="button" onClick={()=>setOpen(false)}>Cancelar</button><button type="button" className="andy-essential-button is-primary" onClick={()=>setOpen(false)}>Descartar cambios</button></div></div></div>}
 </>;
}
function TooltipDocs(){
 return <><DocSection title="Ayuda contextual" description="Texto breve sobre un control. Aparece al pasar el puntero o enfocar con teclado.">
  <DocPreview><div className="andy-tooltip-row"><div className="andy-tooltip-wrapper"><button type="button" aria-describedby="andy-tooltip-help" className="andy-essential-iconbtn" aria-label="Información de inscripción"><MaterialIcon name="info" size={24}/></button><span role="tooltip" id="andy-tooltip-help" className="andy-tooltip-bubble">Consultá los requisitos antes de continuar.</span></div><span>Ayuda sobre la inscripción</span></div></DocPreview>
 </DocSection><DocSection title="Criterios de uso" description="Usar solo textos cortos. No ocultar instrucciones imprescindibles dentro de un tooltip."><DocPreview><p className="andy-essential-guidance">Dejar visible una etiqueta o nombre accesible incluso cuando el icono tenga tooltip.</p></DocPreview></DocSection></>;
}
function SpinnerDocs(){
 const [busy,setBusy]=useState(true);
 return <><DocSection title="Indicador de actividad" description="Muestra que hay un proceso activo sin prometer un tiempo exacto."><DocPreview><div className="andy-essential-actions"><span className="andy-spinner" role="status" aria-label="Cargando"/><span className="andy-spinner is-large" role="status" aria-label="Cargando"/><button type="button" disabled={busy} className="andy-essential-button is-primary">{busy&&<span className="andy-spinner is-light" aria-hidden="true"/>}{busy?'Guardando...':'Guardar'}</button></div></DocPreview></DocSection>
 <DocSection title="Estado de espera" description="Deshabilitá acciones repetidas y mostrá un indicador dentro del botón."><DocPreview><button type="button" className="andy-essential-button" onClick={()=>setBusy(v=>!v)}>{busy?'Simular finalización':'Simular carga'}</button></DocPreview></DocSection></>;
}
function SeparatorDocs(){
 return <><DocSection title="Separador horizontal" description="Organiza grupos de información sin introducir un contenedor nuevo."><DocPreview><div className="andy-separator-demo"><strong>Datos de la actividad</strong><div className="andy-essential-separator"/><p>Horarios, lugar y descripción.</p><strong>Requisitos</strong><div className="andy-essential-separator"/><p>Documentación necesaria.</p></div></DocPreview></DocSection>
 <DocSection title="Separador vertical" description="Adecuado para agrupar acciones en una barra."><DocPreview><div className="andy-separator-actions"><span>Ver grilla</span><div className="andy-essential-separator is-vertical"/><span>Ver mapa</span></div></DocPreview></DocSection></>;
}
function BreadcrumbDocs(){
 return <><DocSection title="Jerarquía de navegación" description="Permite reconocer dónde se encuentra la persona dentro de un flujo."><DocPreview><nav className="andy-breadcrumb" aria-label="Ruta de navegación"><a href="/mlz-muni/ui-kit-andy/componentes">Componentes</a><MaterialIcon name="chevron_right" size={18}/><span>Formularios</span><MaterialIcon name="chevron_right" size={18}/><strong aria-current="page">Inscripción</strong></nav></DocPreview></DocSection></>;
}
function AvatarDocs(){
 return <><DocSection title="Iniciales" description="Identificación compacta de personas en la consola cuando no se dispone de una fotografía."><DocPreview><div className="andy-avatar-row">{[{label:'MR',size:'sm'},{label:'AR',size:'md'},{label:'SG',size:'lg'}].map(x=><div className="andy-avatar-sample" key={x.size}><span className={'andy-avatar is-'+x.size} aria-label={'Usuario '+x.label}>{x.label}</span><small>{x.size==='sm'?'Small':x.size==='md'?'Medium':'Large'}</small></div>)}</div></DocPreview></DocSection><DocSection title="Grupos" description="La composición apilada permite representar varias personas sin introducir fotos ficticias."><DocPreview><div className="andy-avatar-group">{['MR','AR','SG','ML'].map(x=><span className="andy-avatar is-md" key={x}>{x}</span>)}</div></DocPreview></DocSection></>;
}
export function AndyEssentialComponents({id}:{id:EssentialId}){
 const screens:Record<EssentialId,()=>ReactNode>={
  toast:()=> <ToastDemo/>,tabla:()=> <TableDocs/>,'data-table':()=> <TableDocs advanced/>,skeleton:()=> <SkeletonDocs/>,
  slider:()=> <SliderDocs/>,sidebar:()=> <SidebarDocs/>,tabs:()=> <TabsDocs/>,
  progress:()=> <ProgressDocs/>,paginacion:()=> <PaginationDocs/>,dialog:()=> <DialogDocs/>,tooltip:()=> <TooltipDocs/>,
  spinner:()=> <SpinnerDocs/>,separator:()=> <SeparatorDocs/>,breadcrumb:()=> <BreadcrumbDocs/>,avatar:()=> <AvatarDocs/>
 };
 return <div className="andy-essential-docs">{screens[id]()}</div>;
}
