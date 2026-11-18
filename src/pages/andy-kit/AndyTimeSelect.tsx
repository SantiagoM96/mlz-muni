import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';

const pad=(value:number)=>String(value).padStart(2,'0');
const HOURS=Array.from({length:24},(_,i)=>pad(i));
const MINUTES=Array.from({length:60},(_,i)=>pad(i));

type PartProps={
 label:'Hora'|'Minutos';
 values:readonly string[];
 value:string;
 onChange:(value:string)=>void;
};
function TimePartDropdown({label,values,value,onChange}:PartProps){
 const [open,setOpen]=useState(false);
 const id=useId();
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const list=useRef<HTMLDivElement>(null);
 const close=(restoreFocus=false)=>{
  setOpen(false);
  if(restoreFocus)trigger.current?.focus({preventScroll:true});
 };
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{
   if(event.target instanceof Node&&!root.current?.contains(event.target))setOpen(false);
  };
  const escape=(event:globalThis.KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();close(true);}
  };
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  const selected=[...list.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')||[]]
   .find(option=>option.getAttribute('aria-selected')==='true');
  selected?.focus({preventScroll:true});
  // Desplazar solo las opciones, no la página ni el contenedor del ejemplo.
  if(selected&&list.current){
   const options=list.current;
   const center=selected.offsetTop-options.offsetTop-selected.offsetHeight;
   options.scrollTop=Math.max(0,center);
  }
  return()=>{
   document.removeEventListener('pointerdown',outside);
   document.removeEventListener('keydown',escape);
  };
 },[open]);
 const navigate=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  let next=index;
  if(event.key==='ArrowDown')next=Math.min(values.length-1,index+1);
  else if(event.key==='ArrowUp')next=Math.max(0,index-1);
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=values.length-1;
  else if(event.key==='Tab'){setOpen(false);return;}
  else return;
  event.preventDefault();
  list.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[next]?.focus();
 };
 return <div className="andy-dpv-time-field" ref={root}>
  <span className="andy-dpv-time-label">{label}</span>
  <button type="button" className="andy-dpv-time-trigger"
   ref={trigger} aria-haspopup="listbox" aria-controls={id} aria-expanded={open}
   aria-label={'Seleccionar '+label.toLowerCase()}
   onClick={()=>setOpen(previous=>!previous)}
   onKeyDown={event=>{
    if(!open&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
     event.preventDefault();setOpen(true);
    }
   }}>
   <span>{value}</span><MaterialIcon name="expand_more" size={24} weight={400}/>
  </button>
  {open&&<div className="andy-dpv-time-menu">
   <div id={id} className="andy-dpv-time-options" role="listbox" aria-label={label==='Hora'?'Horas':'Minutos'} ref={list}>
    {values.map((option,index)=><button type="button" key={option}
     role="option" aria-selected={value===option} tabIndex={value===option?0:-1}
     className="andy-dpv-time-option"
     onKeyDown={event=>navigate(event,index)}
     onClick={()=>{onChange(option);close(true);}}>
     <span>{option}</span>
     <MaterialIcon name={value===option?'radio_button_checked':'radio_button_unchecked'}
      size={24} weight={400}/>
    </button>)}
   </div>
  </div>}
 </div>;
}
export function AndyTimeSelect({value,onChange}:{value:string;onChange:(clock:string)=>void}){
 const [hours='09',minutes='00']=value.split(':');
 return <div className="andy-dpv-time-outside" role="group" aria-label="Hora y minutos">
  <TimePartDropdown label="Hora" values={HOURS} value={hours}
   onChange={next=>onChange(next+':'+minutes)}/>
  <TimePartDropdown label="Minutos" values={MINUTES} value={minutes}
   onChange={next=>onChange(hours+':'+next)}/>
 </div>;
}
