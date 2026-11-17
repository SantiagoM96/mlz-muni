import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react';
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
export function AndyIconUpload(){
 const [file,setFile]=useState<File|null>(null);
 const [phase,setPhase]=useState<'empty'|'uploading'|'processing'|'completed'|'error'>('empty');
 const [progress,setProgress]=useState(0);
 const timer=useRef<ReturnType<typeof setInterval>|null>(null);
 const id=useId();
 useEffect(()=>{
  if(phase!=='uploading')return;
  timer.current=setInterval(()=>setProgress(previous=>Math.min(100,previous+10)),160);
  return ()=>{if(timer.current)clearInterval(timer.current);timer.current=null;};
 },[phase]);
 useEffect(()=>{
  if(phase!=='uploading'||progress<100)return;
  setPhase('processing');
 },[progress,phase]);
 useEffect(()=>{
  if(phase!=='processing')return;
  const timeout=setTimeout(()=>setPhase('completed'),650);
  return ()=>clearTimeout(timeout);
 },[phase]);
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
 return <div className="andy-icon-upload">
  <label className="andy-dashed-upload-title" htmlFor={id}>Documentación adjunta</label>
  {phase==='empty'?<div className="andy-icon-upload-trigger">
   <span className="andy-attachment-lifecycle-media" aria-hidden="true"><MaterialIcon name="touch_app" size={24}/></span>
   <span className="andy-icon-upload-trigger-copy"><strong>Seleccionar archivo</strong><span>Seleccioná un documento</span></span>
   <input id={id} type="file" accept=".pdf,.doc,.docx" onChange={onChange}
    aria-label="Seleccionar documentación adjunta" aria-describedby={id+'-help'}/>
  </div>:<div className={'andy-attachment-lifecycle-row is-'+phase}>
   <span className="andy-attachment-lifecycle-media" aria-hidden="true">
    <MaterialIcon name={phase==='error'?'error':phase==='completed'?'check_circle':phase==='processing'?'hourglass_top':'upload'} size={24}/>
   </span>
   <div className="andy-attachment-lifecycle-copy">
    <strong title={file?.name}>{file?.name}</strong>
    <span role="status">{phase==='uploading'?'Subiendo · '+progress+' % (simulación)':phase==='processing'?'Procesando documento (simulación)':phase==='error'?'Archivo inválido o supera los 10 MB. Intentá nuevamente.':'Archivo seleccionado (simulación)'}</span>
    {phase==='uploading'&&<div className="andy-attachment-lifecycle-progress" role="progressbar"
     aria-label="Progreso de demostración" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{width:progress+'%'}}/></div>}
   </div>
   {phase==='error'&&<button type="button" className="andy-attachment-lifecycle-action" onClick={startAgain} aria-label="Reintentar carga de ejemplo">
    <MaterialIcon name="refresh" size={20}/></button>}
   <button type="button" className="andy-attachment-lifecycle-action" onClick={reset} aria-label="Quitar archivo">
    <MaterialIcon name="close" size={20}/></button>
  </div>}
  <p className="andy-dashed-upload-help" id={id+'-help'}>Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB. Demo sin envío real.</p>
 </div>;
}
