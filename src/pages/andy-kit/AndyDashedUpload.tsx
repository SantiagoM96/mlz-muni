import { useId, useState, type ChangeEvent } from 'react';
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
  <div className={'andy-dashed-upload-control'+(file?' is-filled':'')+(error?' is-error':'')}>
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
