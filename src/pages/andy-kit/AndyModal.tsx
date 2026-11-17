import { useEffect, useId, useRef, type ReactNode } from 'react';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import './andy-modal.css';
import './andy-button-matrix.css';

export type ModalSize = 'default' | 'sm';
export type ModalIntent = 'normal' | 'destructive';

type ModalProps = {
 open: boolean;
 onClose: () => void;
 onConfirm: () => void;
 title: string;
 description: string;
 confirmLabel: string;
 cancelLabel?: string;
 size?: ModalSize;
 intent?: ModalIntent;
 media?: MaterialIconName;
 kind?: 'dialog' | 'alert';
 schedule?: boolean;
 disabledConfirm?: boolean;
 children?: ReactNode;
};

/** Uses the browser top-layer dialog: background inertness, tab confinement and Escape. */
export function AndyModal({
 open,onClose,onConfirm,title,description,confirmLabel,cancelLabel='Cancelar',
 size='default',intent='normal',media,kind='alert',schedule=false,disabledConfirm=false,children,
}:ModalProps){
 const ref=useRef<HTMLDialogElement>(null);
 const cancelRef=useRef<HTMLButtonElement>(null);
 const closeRef=useRef(onClose);
 useEffect(()=>{closeRef.current=onClose;},[onClose]);
 const titleId=useId();
 const descriptionId=useId();
 useEffect(()=>{
  const node=ref.current;
  if(!open||!node)return;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  if(!node.open)node.showModal();
  cancelRef.current?.focus();
  const onCancel=(event:Event)=>{event.preventDefault();closeRef.current();};
  node.addEventListener('cancel',onCancel);
  return ()=>{
   node.removeEventListener('cancel',onCancel);
   if(node.open)node.close();
   previous?.focus();
  };
 },[open]);
 if(!open)return null;
 return <dialog
  ref={ref}
  className={'andy-modal is-'+size+' is-'+intent+' is-'+kind+(schedule?' is-schedule':'')}
  role={kind==='alert'?'alertdialog':'dialog'}
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={descriptionId}
  onMouseDown={event=>{
   // Deliberate outside clicks close a regular Dialog, never an Alert Dialog.
   if(kind==='dialog'&&event.target===event.currentTarget)onClose();
  }}
 >
  <div className="andy-modal-content">
   {kind==='dialog'&&<button type="button" className="andy-modal-dismiss" aria-label="Cerrar diálogo" onClick={onClose}><MaterialIcon name="close" size={20}/></button>}
   <div className="andy-modal-header">
    {media&&<span className={'andy-modal-media'+(intent==='destructive'?' is-danger':'')} aria-hidden="true"><MaterialIcon name={media} size={26}/></span>}
    <h3 id={titleId}>{title}</h3>
    <p id={descriptionId}>{description}</p>
   </div>
   {children&&<div className="andy-modal-body">{children}</div>}
   <div className="andy-modal-footer">
    <button type="button" ref={cancelRef} className="andy-system-button is-tertiary is-medium" onClick={onClose}>{cancelLabel}</button>
    <button type="button" className={'andy-system-button is-medium '+(intent==='destructive'?'andy-modal-danger':'is-primary')} disabled={disabledConfirm} onClick={onConfirm}>{confirmLabel}</button>
   </div>
  </div>
 </dialog>;
}
