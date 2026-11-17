import { useEffect, useId, useState, type ChangeEvent } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-attachment-gallery.css';

type ExampleFile={name:string;meta:string;icon:'description'|'image'|'picture_as_pdf'};
const examples:ExampleFile[]=[
 {name:'certificado-deportista.pdf',meta:'PDF · 2,4 MB',icon:'picture_as_pdf'},
 {name:'autorizacion.docx',meta:'DOCX · 420 KB',icon:'description'},
 {name:'fotografia.png',meta:'PNG · 850 KB',icon:'image'},
];
function AttachmentItem({file,status,onRemove}:{file:ExampleFile;status?:string;onRemove?:()=>void}){
 const [preview,setPreview]=useState(false);
 return <div className="andy-attachment-item">
  <span className="andy-attachment-media" aria-hidden="true"><MaterialIcon name={file.icon} size={24}/></span>
  <div className="andy-attachment-content">
   <strong title={file.name}>{file.name}</strong>
   <span>{status||file.meta}</span>
  </div>
  {onRemove&&<>
   <button type="button" className="andy-attachment-action" aria-label={'Ver información de '+file.name}
     onClick={()=>setPreview(value=>!value)} aria-expanded={preview}><MaterialIcon name="visibility" size={20}/></button>
   <button type="button" className="andy-attachment-action" aria-label={'Quitar '+file.name}
     onClick={onRemove}><MaterialIcon name="close" size={20}/></button>
  </>}
  {preview&&<p className="andy-attachment-details">Archivo de demostración: {file.meta}. No se cargó ningún documento real.</p>}
 </div>;
}
export function AndyAttachmentGallery(){
 const [files,setFiles]=useState(examples);
 return <div className="andy-attachment-gallery">
  <div className="andy-attachment-list">
   {files.map(file=><AttachmentItem key={file.name} file={file} onRemove={()=>setFiles(current=>current.filter(item=>item.name!==file.name))}/>)}
   {files.length===0&&<p className="andy-attachment-empty">No hay archivos en esta demostración.</p>}
  </div>
  <button type="button" className="andy-system-button is-tertiary is-medium icon-start" onClick={()=>setFiles(examples)}>
   <MaterialIcon name="refresh" size={20}/>Restablecer ejemplo
  </button>
 </div>;
}
const statuses=[
 {label:'Pendiente',detail:'Seleccionado, todavía no enviado',icon:'schedule',name:'documentacion.pdf'},
 {label:'Cargando',detail:'Cargando · 64 % (simulación)',icon:'upload',name:'autorizacion.pdf'},
 {label:'Procesando',detail:'Validando documento (simulación)',icon:'hourglass_top',name:'certificado.pdf'},
 {label:'Error',detail:'No se pudo cargar. Intentá nuevamente.',icon:'error',name:'formulario.pdf'},
 {label:'Completado',detail:'Archivo cargado (simulación)',icon:'check_circle',name:'constancia.pdf'},
] as const;
export function AndyAttachmentStates(){
 return <div className="andy-attachment-states">
  {statuses.map(state=><div key={state.label} className={'andy-attachment-state is-'+state.label.toLowerCase()}>
   <span className="andy-attachment-status-icon" aria-hidden="true"><MaterialIcon name={state.icon} size={24}/></span>
   <div><strong>{state.label}</strong><p>{state.name}</p><small>{state.detail}</small></div>
  </div>)}
 </div>;
}


/** La misma secuencia de cinco estados en las tres presentaciones.
 * Son estados visuales simulados; nunca se informa una carga real.
 */
type AttachmentAppearance='standard'|'dashed'|'list';
type LifecycleState='uploading'|'processing'|'error'|'completed';
const lifecycleItems:{id:LifecycleState;name:string;detail:string;icon:'schedule'|'sync'|'description'|'error'|'check';statusIcon:'schedule'|'sync'|'description'|'error'|'check'}[]=[
 {id:'uploading',name:'diseno-sistema.zip',detail:'Subiendo · 64 %',icon:'sync',statusIcon:'sync'},
 {id:'processing',name:'investigacion.pdf',detail:'Procesando documento',icon:'description',statusIcon:'description'},
 {id:'error',name:'planilla-financiera.xlsx',detail:'Error al subir. Intentá nuevamente.',icon:'error',statusIcon:'error'},
 {id:'completed',name:'informe-cargado.pdf',detail:'Cargado · 1,8 MB',icon:'check',statusIcon:'check'},
];
export function AndyAttachmentLifecycle({appearance}:{appearance:AttachmentAppearance}){
 const [removed,setRemoved]=useState<LifecycleState[]>([]);
 const [retried,setRetried]=useState(false);
 const states=lifecycleItems.filter(item=>!removed.includes(item.id));
 return <div className={'andy-attachment-lifecycle is-'+appearance}>
  <div className="andy-attachment-lifecycle-list" role="list" aria-label="Estados de archivos adjuntos">
   {states.map(item=>{
    const recovered=item.id==='error'&&retried;
    const isError=item.id==='error'&&!retried;
    return <div key={item.id} role="listitem"
      className={'andy-attachment-lifecycle-row is-'+(recovered?'pending':item.id)}>
     <span className="andy-attachment-lifecycle-media" aria-hidden="true">
      <MaterialIcon name={recovered?'schedule':item.icon} size={20}/>
     </span>
     <div className="andy-attachment-lifecycle-copy">
      <strong title={item.name}>{item.name}</strong>
      <span>{recovered?'Nuevo intento pendiente (simulación)':item.detail}</span>
      {item.id==='uploading'&&<div className="andy-attachment-lifecycle-progress" role="progressbar" aria-label="Progreso de ejemplo" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100}><span/></div>}
     </div>
     {isError&&<button type="button" className="andy-attachment-lifecycle-action" onClick={()=>setRetried(true)}
       aria-label={'Reintentar '+item.name}><MaterialIcon name="refresh" size={19}/></button>}
     <button type="button" className="andy-attachment-lifecycle-action" aria-label={'Quitar '+item.name}
       onClick={()=>setRemoved(previous=>[...previous,item.id])}><MaterialIcon name="close" size={19}/></button>
    </div>;
   })}
   {states.length===0&&<p className="andy-attachment-empty">No quedan archivos en la demostración.</p>}
  </div>
  {(removed.length>0||retried)&&<button type="button" className="andy-system-button is-tertiary is-medium icon-start"
   onClick={()=>{setRemoved([]);setRetried(false);}}><MaterialIcon name="refresh" size={18}/>Restablecer ejemplo</button>}
 </div>;
}


/** Tercera variante: campo de selección con ícono.
 * La carga se simula únicamente para documentar la transición de estados.
 */
type IconUploadPhase='empty'|'uploading'|'processing'|'completed'|'error';
type IconDemoState='default'|'hover'|'focus'|'uploading'|'processing'|'completed'|'error'|'disabled';
const iconUploadStates:{id:IconDemoState;name:string;note:string}[]=[
 {id:'default',name:'Default',note:'Sin interacción'},
 {id:'hover',name:'Hover',note:'Cursor sobre el campo'},
 {id:'focus',name:'Focus / Activo',note:'Campo enfocado'},
 {id:'uploading',name:'Subiendo',note:'Progreso de carga'},
 {id:'processing',name:'Procesando',note:'Validación del archivo'},
 {id:'completed',name:'Completo',note:'Archivo cargado'},
 {id:'error',name:'Error',note:'Validación incorrecta'},
 {id:'disabled',name:'Disabled',note:'Interacción bloqueada'},
];

export function AndyIconUpload({demoState}:{demoState?:IconDemoState}={}){
 const [file,setFile]=useState<File|null>(null);
 const [phase,setPhase]=useState<IconUploadPhase>('empty');
 const [progress,setProgress]=useState(0);
 const id=useId();
 const simulated=demoState!==undefined;
 const current:IconUploadPhase=demoState==='uploading'?'uploading':
  demoState==='processing'?'processing':demoState==='completed'?'completed':
  demoState==='error'?'error':simulated?'empty':phase;
 const currentProgress=demoState==='uploading'?64:progress;
 const displayName=file?.name||(simulated&&current!=='empty'?'documentacion.pdf':'');
 // Progreso de demostración: misma fuente temporal para barra y porcentaje.
 useEffect(()=>{
  if(simulated||phase!=='uploading')return;
  const duration=2400;
  let frame=0;
  let startedAt:number|undefined;
  const animate=(timestamp:number)=>{
   if(startedAt===undefined)startedAt=timestamp;
   const fraction=Math.min(1,(timestamp-startedAt)/duration);
   setProgress(fraction*100);
   if(fraction<1){
    frame=window.requestAnimationFrame(animate);
   }else{
    setPhase('processing');
   }
  };
  frame=window.requestAnimationFrame(animate);
  return ()=>window.cancelAnimationFrame(frame);
 },[phase,simulated]);
 useEffect(()=>{
  if(simulated||phase!=='processing')return;
  const timeout=setTimeout(()=>setPhase('completed'),650);
  return ()=>clearTimeout(timeout);
 },[phase,simulated]);
 const onChange=(event:ChangeEvent<HTMLInputElement>)=>{
  const selected=event.currentTarget.files?.[0];
  if(!selected)return;
  event.currentTarget.value='';
  if(selected.size>10*1024*1024||!['pdf','doc','docx'].includes(selected.name.split('.').pop()?.toLowerCase()||'')){
   setFile(selected);setPhase('error');setProgress(0);return;
  }
  setFile(selected);setProgress(0);setPhase('uploading');
 };
 const reset=()=>{setFile(null);setProgress(0);setPhase('empty');};
 const startAgain=()=>{setProgress(0);setPhase('uploading');};
 return <div className="andy-icon-upload" data-state={demoState}>
  <label className="andy-dashed-upload-title" htmlFor={id}>Documentación adjunta</label>
  {current==='empty'?<div className="andy-icon-upload-trigger">
   <span className="andy-attachment-lifecycle-media" aria-hidden="true"><MaterialIcon name="attach_file" size={24} weight={400}/></span>
   <span className="andy-icon-upload-trigger-copy"><strong>Seleccionar archivo</strong><span>Seleccioná un documento</span></span>
   <input id={id} type="file" accept=".pdf,.doc,.docx" onChange={onChange}
    disabled={simulated} aria-label="Seleccionar documentación adjunta" aria-describedby={id+'-help'}/>
  </div>:<div className={'andy-attachment-lifecycle-row is-'+current}>
   <span className="andy-attachment-lifecycle-media" aria-hidden="true">
    <MaterialIcon name={current==='error'?'error':current==='completed'?'check_circle':'sync'} size={24} weight={400}/>
   </span>
   <div className="andy-attachment-lifecycle-copy">
    <strong title={displayName}>{displayName}</strong>
    <span role={simulated?undefined:'status'}>{current==='uploading'?'Subiendo · '+Math.floor(currentProgress)+' % (simulación)':
     current==='processing'?'Procesando documento (simulación)':
     current==='error'?'Archivo inválido o supera los 10 MB. Intentá nuevamente.':'Archivo cargado (simulación)'}</span>
    {current==='uploading'&&<div className="andy-attachment-lifecycle-progress" role="progressbar"
     aria-label="Progreso de demostración" aria-valuenow={Math.floor(currentProgress)} aria-valuemin={0} aria-valuemax={100}>
     <span style={{width:currentProgress+'%'}}/></div>}
   </div>
   {current==='error'&&<button type="button" className="andy-attachment-lifecycle-action" onClick={startAgain}
    disabled={simulated} aria-label="Reintentar carga de ejemplo"><MaterialIcon name="refresh" size={20} weight={400}/></button>}
   <button type="button" className="andy-attachment-lifecycle-action" onClick={reset}
    disabled={simulated} aria-label="Quitar archivo"><MaterialIcon name="close" size={20} weight={400}/></button>
  </div>}
  <p className="andy-dashed-upload-help" id={id+'-help'}>Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB. Demo sin envío real.</p>
 </div>;
}

export function AndyIconUploadStates(){
 return <div className="andy-state-matrix andy-icon-state-matrix">
  <div className="andy-matrix-grid">
   {iconUploadStates.map(state=><div className="andy-state-cell" key={state.id} data-state={state.id}>
    <div className="andy-state-label"><strong>{state.name}</strong><small>{state.note}</small></div>
    <AndyIconUpload demoState={state.id}/>
   </div>)}
  </div>
 </div>;
}
