import { useId, useState, type ChangeEvent } from 'react';
import './andy-dashed-upload.css';

type FileKind='photo'|'document'|'pdf';
type UploadState='default'|'hover'|'focus'|'completed'|'error'|'disabled';
type BorderStyle='solid'|'dashed';
const uploadStates:{id:UploadState;name:string;note:string}[]=[
 {id:'default',name:'Default',note:'Sin interacción'},
 {id:'hover',name:'Hover',note:'Cursor sobre el campo'},
 {id:'focus',name:'Focus / Activo',note:'Campo enfocado'},
 {id:'completed',name:'Completo',note:'Archivo seleccionado'},
 {id:'error',name:'Error',note:'Validación incorrecta'},
 {id:'disabled',name:'Disabled',note:'Interacción bloqueada'},
];
const configs:Record<FileKind,{label:string;hint:string;accept:string;help:string;extensions:string[]}>={
 photo:{label:'Fotografía',hint:'Seleccioná una foto',accept:'image/jpeg,image/png,image/webp',extensions:['jpg','jpeg','png','webp'],help:'Formatos permitidos: JPG, PNG o WEBP. Tamaño máximo: 10 MB.'},
 document:{label:'Documentación adjunta',hint:'Seleccioná un documento',accept:'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',extensions:['pdf','doc','docx'],help:'Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB.'},
 pdf:{label:'Archivo PDF',hint:'Seleccioná un PDF',accept:'.pdf,application/pdf',extensions:['pdf'],help:'Formato permitido: PDF. Tamaño máximo: 10 MB.'},
};
const MAX_BYTES=10*1024*1024;

/** Campo de archivo único: mismo contenido, distinta geometría del borde. */
export function AndySingleUpload({appearance='solid',kind='document',demoState}:{
 appearance?:BorderStyle;kind?:FileKind;demoState?:UploadState
}){
 const id=useId(),helpId=id+'-help',errorId=id+'-error';
 const [file,setFile]=useState<File|null>(null);
 const [error,setError]=useState('');
 const config=configs[kind];
 const simulated=demoState!==undefined;
 const displayName=file?.name||(demoState==='completed'?'documentacion.pdf':'');
 const currentError=error||(demoState==='error'?'Adjuntá el archivo solicitado.':'');
 const select=(event:ChangeEvent<HTMLInputElement>)=>{
  const next=event.currentTarget.files?.[0];
  if(!next)return;
  const extension=next.name.split('.').pop()?.toLowerCase()||'';
  if(next.size>MAX_BYTES){
   setError('El archivo supera los 10 MB. Seleccioná uno más pequeño.');
   event.currentTarget.value='';
   return;
  }
  if(!config.extensions.includes(extension)){
   setError('El formato no es compatible con este campo.');
   event.currentTarget.value='';
   return;
  }
  setFile(next);
  setError('');
 };
 return <div className={'andy-dashed-upload andy-single-upload is-'+appearance} data-state={demoState}>
  <label className="andy-dashed-upload-title" htmlFor={id}>{config.label}</label>
  <div className={'andy-dashed-upload-control'+(displayName?' is-filled':'')+(currentError?' is-error':'')}>
   <span className="andy-dashed-upload-action">{displayName?'Cambiar archivo':'Seleccionar archivo'}</span>
   <span className={'andy-dashed-upload-value'+(displayName?' has-file':'')} title={displayName||config.hint}>{displayName||config.hint}</span>
   <input id={id} type="file" accept={config.accept} onChange={select}
    disabled={simulated} aria-describedby={currentError?errorId:helpId}
    aria-invalid={Boolean(currentError)}
    aria-label={(displayName?'Cambiar':'Seleccionar')+' '+config.label.toLowerCase()}/>
  </div>
  <p className="andy-dashed-upload-help" id={helpId}>{config.help}</p>
  {currentError&&<p className="andy-dashed-upload-error" id={errorId} role={simulated?undefined:'alert'}>{currentError}</p>}
 </div>;
}
export function AndyDashedUpload({kind,demoState}:{kind:FileKind;demoState?:UploadState}){
 return <AndySingleUpload appearance="dashed" kind={kind} demoState={demoState}/>;
}
export function AndySolidUploadPreview({demoState}:{demoState?:UploadState}={}){
 return <AndySingleUpload appearance="solid" kind="document" demoState={demoState}/>;
}
export function AndyDashedUploadGallery(){
 return <div className="andy-dashed-upload-gallery">
  <AndyDashedUpload kind="photo"/>
  <AndyDashedUpload kind="document"/>
  <AndyDashedUpload kind="pdf"/>
 </div>;
}
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
export function AndySolidUploadStates(){
 return <div className="andy-state-matrix andy-solid-state-matrix">
  <div className="andy-matrix-grid">
   {uploadStates.map(state=><div className="andy-state-cell" key={state.id} data-state={state.id}>
    <div className="andy-state-label"><strong>{state.name}</strong><small>{state.note}</small></div>
    <AndySolidUploadPreview demoState={state.id}/>
   </div>)}
  </div>
 </div>;
}
export function AndyUploadPreviews(){
 return <div className="andy-upload-preview-pair">
  <div className="andy-upload-preview-case"><strong className="andy-upload-preview-heading">Estándar</strong><AndySolidUploadPreview/></div>
  <div className="andy-upload-preview-case"><strong className="andy-upload-preview-heading">Borde punteado</strong><AndyDashedUpload kind="document"/></div>
 </div>;
}
