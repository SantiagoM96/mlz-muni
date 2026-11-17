import { useEffect, useId, useState, type ChangeEvent } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-dashed-upload.css';

type FileKind='photo'|'document'|'pdf';
type UploadState='default'|'hover'|'focus'|'uploading'|'processing'|'completed'|'error'|'disabled';
type BorderStyle='solid'|'dashed';
type UploadPhase='empty'|'uploading'|'processing'|'completed'|'error';
const uploadStates:{id:UploadState;name:string;note:string}[]=[
 {id:'default',name:'Default',note:'Sin interacción'},
 {id:'hover',name:'Hover',note:'Cursor sobre el campo'},
 {id:'focus',name:'Focus / Activo',note:'Campo enfocado'},
 {id:'uploading',name:'Subiendo',note:'Progreso de carga'},
 {id:'processing',name:'Procesando',note:'Validación del archivo'},
 {id:'completed',name:'Completo',note:'Archivo cargado'},
 {id:'error',name:'Error',note:'Validación incorrecta'},
 {id:'disabled',name:'Disabled',note:'Interacción bloqueada'},
];
const configs:Record<FileKind,{label:string;hint:string;accept:string;help:string;extensions:string[]}>={
 photo:{label:'Fotografía',hint:'Seleccioná una foto',accept:'image/jpeg,image/png,image/webp',extensions:['jpg','jpeg','png','webp'],help:'Formatos permitidos: JPG, PNG o WEBP. Tamaño máximo: 10 MB.'},
 document:{label:'Documentación adjunta',hint:'Seleccioná un documento',accept:'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',extensions:['pdf','doc','docx'],help:'Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB.'},
 pdf:{label:'Archivo PDF',hint:'Seleccioná un PDF',accept:'.pdf,application/pdf',extensions:['pdf'],help:'Formato permitido: PDF. Tamaño máximo: 10 MB.'},
};
const MAX_BYTES=10*1024*1024;
const UPLOAD_DEMO_MS=2400;
const PROCESS_DEMO_MS=650;

/** Un único archivo por campo. Demo: el progreso no representa transferencia a un servidor. */
export function AndySingleUpload({appearance='solid',kind='document',demoState}:{
 appearance?:BorderStyle;kind?:FileKind;demoState?:UploadState
}){
 const id=useId(),helpId=id+'-help',feedbackId=id+'-feedback';
 const [file,setFile]=useState<File|null>(null);
 const [phase,setPhase]=useState<UploadPhase>('empty');
 const [progress,setProgress]=useState(0);
 const [error,setError]=useState('');
 const config=configs[kind];
 const simulated=demoState!==undefined;
 const state:UploadPhase=simulated
  ? demoState==='uploading'?'uploading':demoState==='processing'?'processing':
   demoState==='completed'?'completed':demoState==='error'?'error':'empty'
  :phase;
 const percent=simulated&&state==='uploading'?64:progress;
 const displayName=file?.name||(simulated&&['uploading','processing','completed'].includes(state)?'documentacion.pdf':'');
 const currentError=error||(demoState==='error'?'Adjuntá el archivo solicitado.':'');
 const selecting=state==='empty'||state==='error';
 useEffect(()=>{
  if(phase!=='uploading'||simulated)return;
  let frame=0;
  let first:number|undefined;
  const tick=(now:number)=>{
   if(first===undefined)first=now;
   const ratio=Math.min(1,(now-first)/UPLOAD_DEMO_MS);
   setProgress(ratio*100);
   if(ratio===1)setPhase('processing');
   else frame=window.requestAnimationFrame(tick);
  };
  frame=window.requestAnimationFrame(tick);
  return()=>window.cancelAnimationFrame(frame);
 },[phase,simulated]);
 useEffect(()=>{
  if(phase!=='processing'||simulated)return;
  const timer=window.setTimeout(()=>setPhase('completed'),PROCESS_DEMO_MS);
  return()=>window.clearTimeout(timer);
 },[phase,simulated]);
 const select=(event:ChangeEvent<HTMLInputElement>)=>{
  const next=event.currentTarget.files?.[0];
  if(!next)return;
  event.currentTarget.value='';
  const extension=next.name.split('.').pop()?.toLowerCase()||'';
  if(next.size>MAX_BYTES||!config.extensions.includes(extension)){
   setFile(null);
   setError(next.size>MAX_BYTES?'El archivo supera los 10 MB. Seleccioná uno más pequeño.':'El formato no es compatible con este campo.');
   setProgress(0);
   setPhase('error');
   return;
  }
  setFile(next);
  setError('');
  setProgress(0);
  setPhase('uploading');
 };
 const remove=()=>{setFile(null);setError('');setProgress(0);setPhase('empty');};
 return <div className={'andy-dashed-upload andy-single-upload is-'+appearance} data-state={demoState}>
  <label className="andy-dashed-upload-title" htmlFor={id}>{config.label}</label>
  <div className={'andy-dashed-upload-control is-'+state+(currentError?' is-error':'')}>
   <span className={'andy-upload-inline-icon'+(['uploading','processing'].includes(state)?' is-spinning':'')} aria-hidden="true">
    <MaterialIcon name={state==='uploading'||state==='processing'?'sync':'attach_file'} size={20} weight={400}/>
   </span>
   <span className="andy-dashed-upload-action">Seleccionar archivo</span>
   <span className={'andy-dashed-upload-value'+(displayName?' has-file':'')} title={displayName||config.hint} role="status">
    {state==='uploading'?<span className="andy-upload-inline-progress" role="progressbar" aria-label="Progreso de demostración" aria-valuenow={Math.floor(percent)} aria-valuemin={0} aria-valuemax={100}><span style={{width:percent+'%'}}/></span>:
     state==='processing'?'Procesando…':
     state==='completed'?displayName:config.hint}
   </span>
   {state==='completed'&&<button type="button" className="andy-upload-inline-remove"
     aria-label={'Quitar '+displayName} disabled={simulated} onClick={remove}><MaterialIcon name="close" size={20} weight={400}/></button>}
   {selecting&&<input id={id} type="file" accept={config.accept} onChange={select}
    disabled={simulated||demoState==='disabled'} aria-describedby={currentError?feedbackId:helpId}
    aria-invalid={Boolean(currentError)} aria-label={'Seleccionar '+config.label.toLowerCase()}/>}
  </div>
  <p className="andy-dashed-upload-help" id={helpId}>{config.help}</p>
  {currentError&&<p className="andy-dashed-upload-error" id={feedbackId} role={simulated?undefined:'alert'}>{currentError}</p>}
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
