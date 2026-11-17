import { useState } from 'react';
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
type LifecycleState='pending'|'uploading'|'processing'|'error'|'completed';
const lifecycleItems:{id:LifecycleState;name:string;detail:string;icon:'schedule'|'sync'|'description'|'error'|'check';statusIcon:'schedule'|'sync'|'description'|'error'|'check'}[]=[
 {id:'pending',name:'archivo-seleccionado.pdf',detail:'Listo para subir',icon:'schedule',statusIcon:'schedule'},
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
