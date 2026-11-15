import { useId, useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-dashed-upload.css';

type FileKind = 'photo' | 'document' | 'pdf';
type UploadState = 'default' | 'hover' | 'focus' | 'completed' | 'error' | 'disabled';
const uploadStates: {id:UploadState;name:string;note:string}[] = [
 {id:'default',name:'Default',note:'Sin interacción'},
 {id:'hover',name:'Hover',note:'Cursor sobre el campo'},
 {id:'focus',name:'Focus / Activo',note:'Campo enfocado'},
 {id:'completed',name:'Completo',note:'Archivo seleccionado'},
 {id:'error',name:'Error',note:'Validación incorrecta'},
 {id:'disabled',name:'Disabled',note:'Interacción bloqueada'},
];
const configs: Record<FileKind, { label: string; hint: string; accept: string; help: string }> = {
 photo: {label:'Fotografía',hint:'Seleccioná una foto',accept:'image/jpeg,image/png,image/webp',help:'Formatos permitidos: JPG, PNG o WEBP. Tamaño máximo: 10 MB.'},
 document: {label:'Documentación',hint:'Seleccioná un documento',accept:'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',help:'Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB.'},
 pdf: {label:'Archivo PDF',hint:'Seleccioná un PDF',accept:'.pdf,application/pdf',help:'Formato permitido: PDF. Tamaño máximo: 10 MB.'},
};
const MAX_BYTES = 10 * 1024 * 1024;

export function AndyDashedUpload({kind,demoState}:{kind:FileKind;demoState?:UploadState}){
 const id=useId();
 const descriptionId=id+'-description';
 const feedbackId=id+'-feedback';
 const config=configs[kind];
 const [file,setFile]=useState<File|null>(null);
 const [error,setError]=useState('');
 const simulated=Boolean(demoState);
 const displayName=file?.name||(demoState==='completed'?'documentacion.pdf':'');
 const currentError=error||(demoState==='error'?'Adjuntá el archivo solicitado.':'');
 const controlRef=useRef<HTMLDivElement>(null);
 const [borderSize,setBorderSize]=useState({width:0,height:0,radius:0});
 useLayoutEffect(()=>{
  const element=controlRef.current;
  if(!element)return;
  const measure=()=>{
   const computed=window.getComputedStyle(element);
   setBorderSize({
    width:element.clientWidth,
    height:element.clientHeight,
    radius:Number.parseFloat(computed.borderTopLeftRadius)||0,
   });
  };
  measure();
  const observer=new ResizeObserver(measure);
  observer.observe(element);
  return()=>observer.disconnect();
 },[]);
 function onChange(event:ChangeEvent<HTMLInputElement>){
  const next=event.currentTarget.files?.[0];
  if(!next)return;
  if(next.size>MAX_BYTES){
   setError('El archivo supera los 10 MB. Seleccioná uno más pequeño.');
   event.currentTarget.value='';
   return;
  }
  const suffix=next.name.split('.').pop()?.toLowerCase();
  const valid=kind==='photo'?['jpg','jpeg','png','webp'].includes(suffix||''):
   kind==='pdf'?suffix==='pdf':['pdf','doc','docx'].includes(suffix||'');
  if(!valid){
   setError('El formato no es compatible con este campo.');
   event.currentTarget.value='';
   return;
  }
  setFile(next);
  setError('');
 }
 return <div className="andy-dashed-upload" data-state={demoState}>
  <label className="andy-dashed-upload-title" htmlFor={id}>{config.label}</label>
  <div ref={controlRef} className={'andy-dashed-upload-control'+(displayName?' is-filled':'')+(currentError?' is-error':'')}>
   {borderSize.width>2&&borderSize.height>2&&<svg className="andy-dashed-upload-border"
    viewBox={`0 0 ${borderSize.width} ${borderSize.height}`}
    width="100%" height="100%" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width={borderSize.width-2} height={borderSize.height-2}
     rx={Math.max(0,borderSize.radius-1)} fill="none"
     stroke="currentColor" strokeWidth="var(--upload-border-width)"
     strokeDasharray="8 4"/>
   </svg>}
   <span className="andy-dashed-upload-action">{displayName?'Cambiar':'Seleccionar archivo'}</span>
   <span className={'andy-dashed-upload-value'+(displayName?' has-file':'')} title={displayName||config.hint}>
    {displayName||config.hint}
   </span>
   <input id={id} type="file" accept={config.accept} onChange={onChange} disabled={simulated||demoState==='disabled'}
    aria-describedby={currentError?feedbackId:descriptionId} aria-invalid={Boolean(currentError)}
    aria-label={(displayName?'Cambiar':'Seleccionar')+' '+config.label.toLowerCase()} />
  </div>
  <p className="andy-dashed-upload-help" id={descriptionId}>{config.help}</p>
  {currentError&&<p className="andy-dashed-upload-error" id={feedbackId} role={simulated?undefined:'alert'}>{currentError}</p>}
 </div>;
}

export function AndyDashedUploadGallery(){
 return <div className="andy-dashed-upload-gallery">
  <AndyDashedUpload kind="photo"/>
  <AndyDashedUpload kind="document"/>
  <AndyDashedUpload kind="pdf"/>
 </div>;
}

/** Los mismos seis estados del adjunto original, como referencia visual persistente. */
export function AndyDashedUploadStates(){
 return <div className="andy-state-matrix andy-dashed-state-matrix">
  <div className="andy-matrix-grid">
   {uploadStates.map(state=><div className="andy-state-cell" key={state.id} data-state={state.id}>
    <div className="andy-state-label"><strong>{state.name}</strong><small>{state.note}</small></div>
    <AndyDashedUpload kind="document" demoState={state.id}/>
   </div>)}
  </div>
 </div>;
}

/** Variante sólida: misma bandeja y botón Adjuntar que la matriz de estados. */
export function AndySolidUploadPreview(){
 const id=useId();
 const [file,setFile]=useState<File|null>(null);
 const [error,setError]=useState('');
 const onChange=(event:ChangeEvent<HTMLInputElement>)=>{
  const next=event.currentTarget.files?.[0];
  if(!next)return;
  if(next.size>MAX_BYTES){setError('El archivo supera los 10 MB. Seleccioná uno más pequeño.');event.currentTarget.value='';return;}
  if(!['pdf','doc','docx'].includes(next.name.split('.').pop()?.toLowerCase()||'')){
   setError('El formato no es compatible con este campo.');event.currentTarget.value='';return;
  }
  setFile(next);setError('');
 };
 return <div className="andy-solid-upload-preview">
  <label className="andy-dashed-upload-title" htmlFor={id}>Documentación adjunta</label>
  <div className={'andy-solid-upload-control'+(error?' is-error':'')}>
   <span className="andy-solid-upload-button"><MaterialIcon name="attach_file" size={24}/>{file?'Cambiar':'Adjuntar'}</span>
   <span className={'andy-solid-upload-file'+(file?' has-file':'')} title={file?.name||'Ningún archivo'}>{file?.name||'Ningún archivo'}</span>
   <input id={id} type="file" accept=".pdf,.doc,.docx" onChange={onChange}
    aria-label="Adjuntar documentación" aria-invalid={Boolean(error)}/>
  </div>
  <p className="andy-dashed-upload-help">Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB.</p>
  {error&&<p className="andy-dashed-upload-error" role="alert">{error}</p>}
 </div>;
}

export function AndyUploadPreviews(){
 return <div className="andy-upload-preview-pair">
  <div className="andy-upload-preview-case"><strong className="andy-upload-preview-heading">Adjuntar · variante original</strong><AndySolidUploadPreview/></div>
  <div className="andy-upload-preview-case"><strong className="andy-upload-preview-heading">Adjuntar · borde punteado</strong><AndyDashedUpload kind="document"/></div>
 </div>;
}
