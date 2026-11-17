import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { CalendarMonthGrid } from '../../shared/calendar/CalendarMonthGrid';
import { useSportsMobile } from './SportsMobileSheet';
import './sports-calendar-picker.css';
import './andy-button-matrix.css';

const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const pad=(n:number)=>String(n).padStart(2,'0');
const toISO=(y:number,m:number,d:number)=>`${y}-${pad(m+1)}-${pad(d)}`;
const formatISO=(v:string)=>{const [y,m,d]=v.split('-').map(Number);return `${pad(d!)} / ${pad(m!)} / ${y}`;};
const parseISO=(v:string)=>{const [y,m]=v.split('-').map(Number);return {year:y!,month:m!-1};};
type PickerMode='calendar'|'month'|'year';
type Gesture={pointerId:number,start:number,height:number,startTime:number,delta:number};
type Props={label?:string;initialValue?:string;onChange?:(value:string)=>void};

export function SportsCalendarPicker({label='Fecha de nacimiento',initialValue='',onChange}:Props){
 const mobile=useSportsMobile();
 const today=new Date();
 const todayYear=today.getFullYear(),todayMonth=today.getMonth();
 const initial=initialValue?parseISO(initialValue):{year:todayYear-18,month:todayMonth};
 const [value,setValue]=useState(initialValue);
 const [pending,setPending]=useState(initialValue);
 const [view,setView]=useState(initial);
 const [open,setOpen]=useState(false);
 const [mode,setMode]=useState<PickerMode>('calendar');
 const [drawerY,setDrawerY]=useState(0);
 const [dragging,setDragging]=useState(false);
 const [panelHeight,setPanelHeight]=useState(500);
 const [exit,setExit]=useState(false);
 const [transition,setTransition]=useState(false);
 const ref=useRef<HTMLDivElement>(null);
 const panel=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const gesture=useRef<Gesture|null>(null);
 const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
 const id=useId();
 const max=toISO(todayYear,todayMonth,today.getDate());
 const yearOptions=Array.from({length:todayYear-1899},(_,i)=>todayYear-i);
 const monthOptions=MONTHS.map((name,index)=>({name,index})).filter(x=>view.year<todayYear||x.index<=todayMonth);
 const canPrevious=view.year>1900||(view.year===1900&&view.month>0);
 const canNext=view.year<todayYear||(view.year===todayYear&&view.month<todayMonth);
 const clearTimer=()=>{if(timeout.current){clearTimeout(timeout.current);timeout.current=null;}};
 const finish=()=>{clearTimer();setOpen(false);setMode('calendar');setExit(false);setDrawerY(0);setTransition(false);setDragging(false);trigger.current?.focus({preventScroll:true});};
 const close=(animate=true)=>{
   if(!open||exit)return;
   setMode('calendar');
   if(!mobile||!animate){finish();return;}
   setExit(true);setDrawerY(0);
   clearTimer();timeout.current=setTimeout(finish,290);
 };
 const show=()=>{
   if(open){close();return;}
   clearTimer();setMode('calendar');setExit(false);setTransition(false);setDrawerY(0);
   setPending(value);setView(value?parseISO(value):{year:todayYear-18,month:todayMonth});setOpen(true);
 };
 const update=(next:string)=>{setValue(next);onChange?.(next);};
 const reset=()=>{update('');setPending('');close(false);};
 const confirm=()=>{if(!pending)return;update(pending);close(false);};
 const changeMonth=(step:number)=>{
   const d=new Date(view.year,view.month+step,1);
   if(d.getFullYear()<1900||d>new Date(todayYear,todayMonth,1))return;
   setView({year:d.getFullYear(),month:d.getMonth()});
 };
 const pickView=(kind:'month'|'year',option:number)=>{
   setView(old=>{
     const year=kind==='year'?option:old.year;
     const month=kind==='month'?option:year===todayYear?Math.min(old.month,todayMonth):old.month;
     return {year,month};
   });setMode('calendar');
 };
 useEffect(()=>{
   if(!open)return;
   const key=(event:KeyboardEvent)=>{
     if(event.key==='Escape'){event.preventDefault();if(mode!=='calendar')setMode('calendar');else close();}
     if(event.key==='Tab'&&mobile&&panel.current){
       const els=[...panel.current.querySelectorAll<HTMLElement>('button:not([disabled])')];
       if(els.length&&event.shiftKey&&document.activeElement===els[0]){event.preventDefault();els[els.length-1]?.focus();}
       else if(els.length&&!event.shiftKey&&document.activeElement===els[els.length-1]){event.preventDefault();els[0]?.focus();}
     }
   };
   const outside=(event:PointerEvent)=>{if(!mobile&&ref.current&&!ref.current.contains(event.target as Node))close(false);};
   document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
   const originalOverflow=document.body.style.overflow;
   if(mobile)document.body.style.overflow='hidden';
   return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);document.body.style.overflow=originalOverflow;};
 },[open,mobile,mode]); // The modal is governed by React state; event listeners are removed on close.
 useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current);},[]);

 const dragStart=(event:ReactPointerEvent<HTMLButtonElement>)=>{
   if(!mobile||exit||(event.pointerType==='mouse'&&event.button!==0))return;
   const height=panel.current?.offsetHeight||500;
   gesture.current={pointerId:event.pointerId,start:event.clientY,height,startTime:performance.now(),delta:0};
   setPanelHeight(height);
   setTransition(false);setDragging(true);
   event.currentTarget.setPointerCapture(event.pointerId);event.preventDefault();
 };
 const dragMove=(event:ReactPointerEvent<HTMLButtonElement>)=>{
   const g=gesture.current;if(!g||g.pointerId!==event.pointerId)return;
   g.delta=Math.max(0,event.clientY-g.start);
   setDrawerY(g.delta);event.preventDefault();
 };
 const dragEnd=(event:ReactPointerEvent<HTMLButtonElement>)=>{
   const g=gesture.current;if(!g||g.pointerId!==event.pointerId)return;
   gesture.current=null;setDragging(false);
   if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
   const duration=Math.max(1,performance.now()-g.startTime);
   if(g.delta>Math.min(168,Math.max(120,g.height*.24))||(g.delta>55&&g.delta/duration>.8)){
     close();
   }else{
     setTransition(true);setDrawerY(0);
     clearTimer();timeout.current=setTimeout(()=>setTransition(false),310);
   }
   event.preventDefault();
 };
 const choices=(kind:'month'|'year')=><div className="sports-cal-choices" role="listbox" aria-label={kind==='month'?'Seleccionar mes':'Seleccionar año'}>
   {kind==='month'?monthOptions.map(x=><button key={x.index} type="button" role="option"
       aria-selected={view.month===x.index} className="sports-cal-choice-option"
       onClick={()=>pickView('month',x.index)}><span>{x.name}</span>
       <MaterialIcon name={view.month===x.index?'radio_button_checked':'radio_button_unchecked'} size={24}/></button>)
     :yearOptions.map(year=><button key={year} type="button" role="option"
       aria-selected={view.year===year} className="sports-cal-choice-option"
       onClick={()=>pickView('year',year)}><span>{year}</span>
       <MaterialIcon name={view.year===year?'radio_button_checked':'radio_button_unchecked'} size={24}/></button>)}
 </div>;
 const body=<div className={'sports-cal-popup'+(mobile?' is-mobile':'')+(exit?' is-exiting':'')+(transition?' is-rebounding':'')+(dragging?' is-dragging':'')} ref={panel}
   role="dialog" aria-modal={mobile} aria-label={mode==='calendar'?'Seleccionar fecha':mode==='month'?'Seleccionar mes':'Seleccionar año'}
   style={{'--cal-y':drawerY+'px','--cal-opacity':Math.max(0,1-drawerY/Math.max(panelHeight,1))} as CSSProperties}>
   {mobile&&<button type="button" className="sports-cal-grab" aria-label="Arrastrá hacia abajo para cerrar calendario"
     onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd}>
     <span/>
   </button>}
   <div className="sports-cal-top">
     {mode!=='calendar'&&<button type="button" className="sports-cal-back" aria-label="Volver al calendario" onClick={()=>setMode('calendar')}><MaterialIcon name="arrow_back" size={24}/></button>}
     <strong>{mode==='calendar'?'Seleccionar fecha':mode==='month'?'Seleccionar mes':'Seleccionar año'}</strong>
     {!mobile&&<button type="button" className="sports-cal-x" aria-label="Cerrar calendario" onClick={()=>close(false)}><MaterialIcon name="close_small" size={24}/></button>}
   </div>
   {mode!=='calendar'&&mobile?choices(mode):<div className="sports-cal-content">
     <div className="sports-cal-bar">
       <div className="sports-cal-period">
         {(['month','year'] as const).map(kind=><div className="sports-cal-choice-holder" key={kind}>
           <button type="button" className={'sports-cal-choice-trigger andy-calendar-select '+(mobile?'is-medium':'is-small')} aria-expanded={mode===kind}
             aria-label={kind==='month'?'Seleccionar mes':'Seleccionar año'}
             onClick={()=>setMode(mode===kind?'calendar':kind)}>
             <span>{kind==='month'?MONTHS[view.month]:view.year}</span><MaterialIcon name="expand_more" size={24}/>
           </button>
           {!mobile&&mode===kind&&<div className="sports-cal-choice-menu">{choices(kind)}</div>}
         </div>)}
       </div>
       <div className="sports-cal-nav">
         <button type="button" aria-label="Mes anterior" disabled={!canPrevious} onClick={()=>changeMonth(-1)}><MaterialIcon name="chevron_left" size={24}/></button>
         <button type="button" aria-label="Mes siguiente" disabled={!canNext} onClick={()=>changeMonth(1)}><MaterialIcon name="chevron_right" size={24}/></button>
       </div>
     </div>
     <CalendarMonthGrid view={view} selected={pending} onSelect={setPending} onViewChange={setView}
      minDate="1900-01-01" maxDate={max} today={max} label="Días disponibles para fecha de nacimiento"/>
     <div className="sports-cal-actions">
       <button type="button" className={'sports-cal-clear andy-system-button is-tertiary icon-none '+(mobile?'is-medium':'is-small')} onClick={reset}>Borrar fecha</button>
       <button type="button" className={'sports-cal-confirm andy-system-button is-primary icon-none '+(mobile?'is-medium':'is-small')} disabled={!pending} onClick={confirm}>Confirmar</button>
     </div>
   </div>}
 </div>;
 const popup=mobile?createPortal(<div className="sports-cal-layer">
   <button type="button" className="sports-cal-overlay" aria-label="Cerrar calendario"
     style={{opacity:exit?0:Math.max(0,1-drawerY/Math.max(panelHeight,1))}} onClick={()=>close()}/>
   {body}
 </div>,document.body):body;
 return <div className="sports-cal-field" ref={ref}>
   <label className="sports-cal-label" htmlFor={id}>{label}</label>
   <div className="sports-cal-trigger-wrap">
     <button id={id} type="button" className="sports-cal-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
       <span>{value?formatISO(value):'Seleccionar fecha'}</span><MaterialIcon name="calendar_month" size={24}/>
     </button>
     {value&&<button type="button" className="sports-cal-inline-clear" aria-label="Borrar fecha de nacimiento" onClick={reset}><MaterialIcon name="close" size={24}/></button>}
   </div>
   {open&&popup}
 </div>;
}
