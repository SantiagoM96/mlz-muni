import { useId, useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';
import './andy-dashed-upload.css';

type FileKind = 'photo' | 'document' | 'pdf';
const configs: Record<FileKind, { label: string; hint: string; accept: string; help: string }> = {
 photo: {label:'Fotografía',hint:'Seleccioná una foto',accept:'image/jpeg,image/png,image/webp',help:'Formatos permitidos: JPG, PNG o WEBP. Tamaño máximo: 10 MB.'},
 document: {label:'Documentación',hint:'Seleccioná un documento',accept:'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',help:'Formatos permitidos: PDF, DOC o DOCX. Tamaño máximo: 10 MB.'},
 pdf: {label:'Archivo PDF',hint:'Seleccioná un PDF',accept:'.pdf,application/pdf',help:'Formato permitido: PDF. Tamaño máximo: 10 MB.'},
};
const MAX_BYTES = 10 * 1024 * 1024;

export function AndyDashedUpload({kind}:{kind:FileKind}){
 const id=useId();
 const descriptionId=id+'-description';
 const feedbackId=id+'-feedback';
 const config=configs[kind];
 const [file,setFile]=useState<File|null>(null);
 const [error,setError]=useState('');
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
 return <div className="andy-dashed-upload">
  <label className="andy-dashed-upload-title" htmlFor={id}>{config.label}</label>
  <div ref={controlRef} className={'andy-dashed-upload-control'+(file?' is-filled':'')+(error?' is-error':'')}>
   {borderSize.width>2&&borderSize.height>2&&<svg className="andy-dashed-upload-border"
    viewBox={`0 0 ${borderSize.width} ${borderSize.height}`}
    width="100%" height="100%" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width={borderSize.width-2} height={borderSize.height-2}
     rx={Math.max(0,borderSize.radius-1)} fill="none"
     stroke="currentColor" strokeWidth="var(--upload-border-width)"
     strokeDasharray="8 4"/>
   </svg>}
   <span className="andy-dashed-upload-action">{file?'Cambiar':'Seleccionar archivo'}</span>
   <span className={'andy-dashed-upload-value'+(file?' has-file':'')} title={file?.name||config.hint}>
    {file?.name||config.hint}
   </span>
   <input id={id} type="file" accept={config.accept} onChange={onChange}
    aria-describedby={error?feedbackId:descriptionId} aria-invalid={Boolean(error)}
    aria-label={(file?'Cambiar':'Seleccionar')+' '+config.label.toLowerCase()} />
  </div>
  <p className="andy-dashed-upload-help" id={descriptionId}>{config.help}</p>
  {error&&<p className="andy-dashed-upload-error" id={feedbackId} role="alert">{error}</p>}
 </div>;
}

export function AndyDashedUploadGallery(){
 return <div className="andy-dashed-upload-gallery">
  <AndyDashedUpload kind="photo"/>
  <AndyDashedUpload kind="document"/>
  <AndyDashedUpload kind="pdf"/>
 </div>;
}
