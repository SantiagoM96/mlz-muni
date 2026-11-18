import {
 useEffect, useId, useRef, useState,
 type CSSProperties, type KeyboardEvent as ReactKeyboardEvent,
 type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';
import {
 CalendarMonthGrid, dateToCalendarISO,
 type CalendarRange, type CalendarView,
} from '../../shared/calendar/CalendarMonthGrid';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { AndyTimeSelect } from './AndyTimeSelect';
import { useSportsMobile } from './SportsMobileSheet';
import './sports-calendar-picker.css';
import './andy-button-matrix.css';
import './andy-date-picker-variants.css';

export type DatePickerDemoVariant='basic'|'range'|'input'|'time'|'natural';
type Period='calendar'|'month'|'year';
const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const WEEKDAYS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const readable=(value:string)=>{
 const [year,month,day]=value.split('-');
 return value?day+'/'+month+'/'+year:'';
};
const parseDate=(text:string):string|null=>{
 const match=text.trim().match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
 if(!match)return null;
 const day=Number(match[1]),month=Number(match[2]),year=Number(match[3]);
 const date=new Date(year,month-1,day);
 if(year<1900||year>2100||date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null;
 return dateToCalendarISO(date);
};
function interpretDate(text:string,today:Date):string|null{
 const original=text.trim();
 const typed=parseDate(original);
 if(typed)return typed;
 const normalized=original.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
 let offset:number|null=null;
 if(normalized==='hoy')offset=0;
 if(normalized==='manana')offset=1;
 if(normalized==='pasado manana')offset=2;
 const days=normalized.match(/^en (\d{1,3}) dias?$/);
 if(days)offset=Number(days[1]);
 const week=normalized.match(/^(?:proximo |el proximo |el )?(lunes|martes|miercoles|jueves|viernes|sabado|domingo)(?: que viene)?$/);
 if(week){
  const target=['domingo','lunes','martes','miercoles','jueves','viernes','sabado'].indexOf(week[1]||'');
  offset=(target-today.getDay()+7)%7||7;
 }
 if(offset===null)return null;
 const parsed=new Date(today.getFullYear(),today.getMonth(),today.getDate()+offset);
 return dateToCalendarISO(parsed);
}
const parseView=(iso:string):CalendarView=>{
 const [y,m]=iso.split('-').map(Number);
 return {year:y||new Date().getFullYear(),month:(m||1)-1};
};
const addDays=(delta:number)=>{
 const date=new Date();date.setHours(12,0,0,0);date.setDate(date.getDate()+delta);
 return dateToCalendarISO(date);
};

type PickerProps={variant:DatePickerDemoVariant};
export function AndyDatePickerVariants({variant}:PickerProps){
 const mobile=useSportsMobile();
 const rangeMode=variant==='range';
 const editable=variant==='input'||variant==='natural';
 const natural=variant==='natural';
 const timeMode=variant==='time';
 const id=useId(),hintId=useId();
 const label=({
  basic:'Fecha',range:'Período de fechas',input:'Fecha de suscripción',
  time:'Fecha',natural:'Fecha de publicación',
 } as const)[variant];
 const title=rangeMode?'Seleccionar rango':'Seleccionar fecha';
 const placeholder=rangeMode?'Seleccionar rango':'Seleccionar fecha';
 const minYear=1900,maxYear=new Date().getFullYear()+10;
 const minDate=minYear+'-01-01',maxDate=maxYear+'-12-31';
 const todayISO=dateToCalendarISO(new Date());
 const [value,setValue]=useState('');
 const [range,setRange]=useState<CalendarRange>(()=>rangeMode?{start:addDays(-5),end:addDays(4)}:{start:'',end:''});
 const [pending,setPending]=useState('');
 const [pendingRange,setPendingRange]=useState<CalendarRange>({start:'',end:''});
 const [view,setView]=useState<CalendarView>(()=>parseView(todayISO));
 const [clock,setClock]=useState('09:00');
 const [draft,setDraft]=useState('');
 const [error,setError]=useState('');
 const [open,setOpen]=useState(false);
 const [period,setPeriod]=useState<Period>('calendar');
 const [dragY,setDragY]=useState(0);
 const root=useRef<HTMLDivElement>(null);
 const panel=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const gesture=useRef<{id:number;start:number}|null>(null);
 const yearOptions=Array.from({length:maxYear-minYear+1},(_,index)=>maxYear-index);
 const monthOptions=MONTHS.map((name,index)=>({name,index}));
 const isFirst=view.year<=minYear&&view.month===0;
 const isLast=view.year>=maxYear&&view.month===11;
 const canConfirm=rangeMode?Boolean(pendingRange.start&&pendingRange.end):Boolean(pending);
 const valueLabel=rangeMode
  ?range.start&&range.end?readable(range.start)+' – '+readable(range.end):placeholder
  :value?readable(value):placeholder;

 const close=()=>{
  setOpen(false);setPeriod('calendar');setDragY(0);gesture.current=null;
  trigger.current?.focus({preventScroll:true});
 };
 const show=()=>{
  if(open){close();return;}
  const base=rangeMode?range.start:value;
  setPending(value);setPendingRange({...range});
  setView(parseView(base||todayISO));setPeriod('calendar');setDragY(0);setOpen(true);
 };
 const select=(iso:string)=>{
  if(!rangeMode){setPending(iso);return;}
  setPendingRange(current=>!current.start||current.end||iso<current.start
   ?{start:iso,end:''}:{start:current.start,end:iso});
 };
 const clear=()=>{
  setValue('');setPending('');
  setRange({start:'',end:''});setPendingRange({start:'',end:''});
  setDraft('');setError('');close();
 };
 const confirm=()=>{
  if(!canConfirm)return;
  if(rangeMode){setRange({...pendingRange});}
  else{
   setValue(pending);
   if(editable)setDraft(readable(pending));
  }
  setError('');close();
 };
 const changeMonth=(delta:number)=>{
  const next=new Date(view.year,view.month+delta,1);
  if(next.getFullYear()<minYear||next.getFullYear()>maxYear)return;
  setView({year:next.getFullYear(),month:next.getMonth()});
  setPeriod('calendar');
 };
 const choosePeriod=(kind:'month'|'year',next:number)=>{
  setView(current=>({year:kind==='year'?next:current.year,
   month:kind==='month'?next:current.month}));
  setPeriod('calendar');
 };
 const commitTyped=()=>{
  if(!editable)return;
  if(!draft.trim()){setValue('');setPending('');setError('');return;}
  const found=natural?interpretDate(draft,new Date()):parseDate(draft);
  if(!found){setError(natural?'No reconocimos la fecha. Probá «mañana» o DD/MM/AAAA.':'Ingresá una fecha válida con formato DD/MM/AAAA.');return;}
  setError('');setValue(found);setPending(found);setView(parseView(found));
  if(!natural)setDraft(readable(found));
 };
 useEffect(()=>{
  if(!open)return;
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();if(period!=='calendar')setPeriod('calendar');else close();}
   if(mobile&&event.key==='Tab'&&panel.current){
    const elements=[...panel.current.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled])')];
    if(!elements.length)return;
    if(event.shiftKey&&document.activeElement===elements[0]){event.preventDefault();elements[elements.length-1]?.focus();}
    else if(!event.shiftKey&&document.activeElement===elements[elements.length-1]){event.preventDefault();elements[0]?.focus();}
   }
  };
  const outside=(event:PointerEvent)=>{
   if(!mobile&&root.current&&event.target instanceof Node&&!root.current.contains(event.target))close();
  };
  document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
  const previous=document.body.style.overflow;
  if(mobile)document.body.style.overflow='hidden';
  return()=>{
   document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);
   document.body.style.overflow=previous;
  };
 },[open,mobile,period]);
 useEffect(()=>{
  if(!open||!mobile)return;
  panel.current?.querySelector<HTMLElement>('button:not([disabled])')?.focus({preventScroll:true});
 },[open,mobile,period]);
 const pointerDown=(event:ReactPointerEvent<HTMLButtonElement>)=>{
  if(!mobile||(event.pointerType==='mouse'&&event.button!==0))return;
  gesture.current={id:event.pointerId,start:event.clientY};
  event.currentTarget.setPointerCapture(event.pointerId);event.preventDefault();
 };
 const pointerMove=(event:ReactPointerEvent<HTMLButtonElement>)=>{
  if(!gesture.current||gesture.current.id!==event.pointerId)return;
  setDragY(Math.max(0,event.clientY-gesture.current.start));event.preventDefault();
 };
 const pointerEnd=(event:ReactPointerEvent<HTMLButtonElement>)=>{
  if(!gesture.current||gesture.current.id!==event.pointerId)return;
  const delta=Math.max(0,event.clientY-gesture.current.start);
  gesture.current=null;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  if(delta>120)close();
  else setDragY(0);
  event.preventDefault();
 };

 const periodChoices=(kind:'month'|'year')=><div className="sports-cal-choices" role="listbox"
  aria-label={kind==='month'?'Meses':'Años'}>
  {(kind==='month'?monthOptions.map(m=>({label:m.name,num:m.index})):yearOptions.map(y=>({label:String(y),num:y})))
   .map(option=>{
    const selected=(kind==='month'?view.month:view.year)===option.num;
    return <button key={option.num} type="button" role="option" aria-selected={selected}
     className="sports-cal-choice-option" onClick={()=>choosePeriod(kind,option.num)}>
     <span>{option.label}</span>
     <MaterialIcon name={selected?'radio_button_checked':'radio_button_unchecked'} size={24}/>
    </button>;
   })}
 </div>;

 const popup=<div className={'sports-cal-popup andy-dpv-popup'+(mobile?' is-mobile':'')+
  (dragY?' is-dragging':'')} role="dialog" aria-modal={mobile} ref={panel}
  aria-label={period==='calendar'?title:period==='month'?'Seleccionar mes':'Seleccionar año'}
  style={{'--cal-y':dragY+'px'} as CSSProperties}>
  {mobile&&<button type="button" className="sports-cal-grab"
   aria-label="Arrastrar hacia abajo para cerrar calendario"
   onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd}><span/></button>}
  <div className="sports-cal-top">
   {period!=='calendar'&&<button type="button" className="sports-cal-back"
    aria-label="Volver al calendario" onClick={()=>setPeriod('calendar')}>
    <MaterialIcon name="arrow_back" size={24}/>
   </button>}
   <strong>{period==='calendar'?title:period==='month'?'Seleccionar mes':'Seleccionar año'}</strong>
   {!mobile&&<button className="sports-cal-x" type="button" aria-label="Cerrar calendario" onClick={close}>
    <MaterialIcon name="close_small" size={24}/>
   </button>}
  </div>
  {period!=='calendar'&&mobile?periodChoices(period):<div className="sports-cal-content">
   <div className="sports-cal-bar">
    <div className="sports-cal-period">
     {(['month','year'] as const).map(kind=><div className="sports-cal-choice-holder" key={kind}>
      <button type="button" className={'sports-cal-choice-trigger andy-calendar-select '+(mobile?'is-medium':'is-small')}
       aria-label={kind==='month'?'Seleccionar mes':'Seleccionar año'} aria-expanded={period===kind}
       onClick={()=>setPeriod(old=>old===kind?'calendar':kind)}>
       <span>{kind==='month'?MONTHS[view.month]:view.year}</span><MaterialIcon name="expand_more" size={24}/>
      </button>
      {!mobile&&period===kind&&<div className="sports-cal-choice-menu">{periodChoices(kind)}</div>}
     </div>)}
    </div>
    <div className="sports-cal-nav">
     <button type="button" aria-label="Mes anterior" disabled={isFirst} onClick={()=>changeMonth(-1)}>
      <MaterialIcon name="chevron_left" size={24}/>
     </button>
     <button type="button" aria-label="Mes siguiente" disabled={isLast} onClick={()=>changeMonth(1)}>
      <MaterialIcon name="chevron_right" size={24}/>
     </button>
    </div>
   </div>
   <CalendarMonthGrid view={view} mode={rangeMode?'range':'single'} selected={pending} range={pendingRange}
    today={todayISO} minDate={minDate} maxDate={maxDate}
    label={rangeMode?'Días para seleccionar un período':'Días para seleccionar una fecha'}
    onViewChange={setView} onSelect={select}/>
   <div className="sports-cal-actions">
    <button type="button" className={'sports-cal-clear andy-system-button is-tertiary icon-none '+(mobile?'is-medium':'is-small')}
     onClick={clear}>Borrar {rangeMode?'rango':'fecha'}</button>
    <button type="button" className={'sports-cal-confirm andy-system-button is-primary icon-none '+(mobile?'is-medium':'is-small')}
     disabled={!canConfirm} onClick={confirm}>Confirmar</button>
   </div>
  </div>}
 </div>;
 const floating=mobile?createPortal(<div className="sports-cal-layer">
  <button type="button" className="sports-cal-overlay" aria-label="Cerrar calendario" onClick={close}/>
  {popup}
 </div>,document.body):popup;

 return <div className="sports-cal-field andy-dpv" ref={root}>
  <label className="sports-cal-label" htmlFor={id}>{label}</label>
  {editable?
   <div className="andy-dpv-input-row">
    <input id={id} className="andy-dpv-input" type="text"
     value={draft} onChange={event=>{setDraft(event.target.value);setError('');}}
     onKeyDown={(event:ReactKeyboardEvent<HTMLInputElement>)=>{if(event.key==='Enter'){event.preventDefault();commitTyped();}}}
     onBlur={commitTyped} aria-invalid={Boolean(error)} aria-describedby={error?hintId:undefined}
     placeholder={natural?'Mañana, próximo lunes o DD/MM/AAAA':'DD/MM/AAAA'}/>
    <button type="button" className="andy-dpv-icon-trigger" ref={trigger} onClick={show}
     aria-expanded={open} aria-haspopup="dialog" aria-label={'Abrir calendario de '+label}>
     <MaterialIcon name="calendar_month" size={24}/>
    </button>
   </div>:
   <button type="button" id={id} ref={trigger} className="sports-cal-trigger"
    onClick={show} aria-expanded={open} aria-haspopup="dialog">
    <span>{valueLabel}</span><MaterialIcon name="calendar_month" size={24}/>
   </button>}
  {error&&<p className="andy-dpv-error" id={hintId} role="alert">{error}</p>}
  {natural&&value&&!error&&<p className="andy-dpv-result" role="status">
   Fecha interpretada: <strong>{WEEKDAYS[new Date(value+'T12:00:00').getDay()]}, {readable(value)}</strong>
  </p>}
  {timeMode&&<AndyTimeSelect value={clock} onChange={setClock}/>}
  {timeMode&&value&&<p className="andy-dpv-result" role="status">Fecha y hora: {readable(value)} · {clock}</p>}
  {open&&floating}
 </div>;
}
