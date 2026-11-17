import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export type CalendarView={year:number;month:number};
export type CalendarRange={start:string;end:string};
export type CalendarMode='single'|'range';
const WEEKDAYS=[
 {short:'L',label:'Lunes'},{short:'M',label:'Martes'},{short:'M',label:'Miércoles'},
 {short:'J',label:'Jueves'},{short:'V',label:'Viernes'},{short:'S',label:'Sábado'},{short:'D',label:'Domingo'},
];
const MONTHS=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const pad=(value:number)=>String(value).padStart(2,'0');
export const dateToCalendarISO=(date:Date)=>[date.getFullYear(),pad(date.getMonth()+1),pad(date.getDate())].join('-');
export const calendarISO=(year:number,month:number,day:number)=>[year,pad(month+1),pad(day)].join('-');
const parseCalendarISO=(iso:string)=>{const [year=2000,month=1,day=1]=iso.split('-').map(Number);return new Date(year,month-1,day)};
const monthStart=(date:string)=>date.slice(0,7);
const weekdayIndex=(date:Date)=>(date.getDay()+6)%7;

export interface CalendarMonthGridProps {
 view:CalendarView;
 mode?:CalendarMode;
 selected?:string;
 range?:CalendarRange;
 onSelect:(iso:string)=>void;
 onViewChange?:(view:CalendarView)=>void;
 minDate?:string;
 maxDate?:string;
 disabledDates?:readonly string[];
 today?:string;
 /** Nombre accesible contextual para la grilla de días. */
 label?:string;
}
export function CalendarMonthGrid({
 view,mode='single',selected='',range={start:'',end:''},onSelect,onViewChange,
 minDate,maxDate,disabledDates=[],today=dateToCalendarISO(new Date()),label='Días del mes',
}:CalendarMonthGridProps){
 const first=new Date(view.year,view.month,1);
 const offset=weekdayIndex(first);
 const daysInMonth=new Date(view.year,view.month+1,0).getDate();
 const [focusISO,setFocusISO]=useState<string>('');
 const gridRef=useRef<HTMLDivElement>(null);
 const moveFocus=useRef(false);
 const disallowed=(iso:string)=>Boolean((minDate&&iso<minDate)||(maxDate&&iso>maxDate)||disabledDates.includes(iso));
 const possible=Array.from({length:daysInMonth},(_,index)=>calendarISO(view.year,view.month,index+1));
 const focusCandidate=possible.includes(focusISO)&&!disallowed(focusISO)?focusISO:
  [selected,range.start,today,...possible].find(iso=>iso&&possible.includes(iso)&&!disallowed(iso))||'';

 useEffect(()=>{
  if(!moveFocus.current||!focusISO)return;
  const target=[...gridRef.current?.querySelectorAll<HTMLButtonElement>('[data-calendar-date]')||[]]
   .find(element=>element.dataset.calendarDate===focusISO);
  if(target){target.focus();moveFocus.current=false;}
 },[focusISO,view.year,view.month]);

 const handleKey=(event:KeyboardEvent<HTMLButtonElement>,iso:string)=>{
  const current=parseCalendarISO(iso);
  let next:Date;
  switch(event.key){
   case 'ArrowLeft':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()-1);break;
   case 'ArrowRight':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()+1);break;
   case 'ArrowUp':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()-7);break;
   case 'ArrowDown':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()+7);break;
   case 'Home':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()-weekdayIndex(current));break;
   case 'End':next=new Date(current.getFullYear(),current.getMonth(),current.getDate()+6-weekdayIndex(current));break;
   case 'PageUp':next=new Date(current.getFullYear(),current.getMonth()-(event.shiftKey?12:1),Math.min(current.getDate(),new Date(current.getFullYear(),current.getMonth()-(event.shiftKey?12:1)+1,0).getDate()));break;
   case 'PageDown':next=new Date(current.getFullYear(),current.getMonth()+(event.shiftKey?12:1),Math.min(current.getDate(),new Date(current.getFullYear(),current.getMonth()+(event.shiftKey?12:1)+1,0).getDate()));break;
   default:return;
  }
  event.preventDefault();
  const increment=['ArrowLeft','ArrowUp','Home','PageUp'].includes(event.key)?-1:1;
  let nextISO=dateToCalendarISO(next);
  // No pasar el foco a una fecha deshabilitada: buscar el día disponible más próximo.
  for(let attempt=0;attempt<366&&disallowed(nextISO);attempt++){
   next=new Date(next.getFullYear(),next.getMonth(),next.getDate()+increment);
   nextISO=dateToCalendarISO(next);
   if((minDate&&nextISO<minDate)||(maxDate&&nextISO>maxDate))return;
  }
  if(disallowed(nextISO))return;
  const nextView={year:next.getFullYear(),month:next.getMonth()};
  if(monthStart(nextISO)!==calendarISO(view.year,view.month,1).slice(0,7)){
   if(!onViewChange)return;
   onViewChange(nextView);
  }
  moveFocus.current=true;
  setFocusISO(nextISO);
 };

 const rows:({iso:string;day:number}|null)[]=[
  ...Array.from({length:offset},()=>null),
  ...possible.map((iso,idx)=>({iso,day:idx+1})),
 ];
 while(rows.length%7!==0)rows.push(null);

 return <div className="mlz-calendar-grid" role="grid" aria-label={label}
  aria-multiselectable={mode==='range'?true:undefined} ref={gridRef}>
  <div className="sports-cal-week" role="row">
   {WEEKDAYS.map(day=><span role="columnheader" aria-label={day.label} key={day.label}>{day.short}</span>)}
  </div>
  <div className={'sports-cal-days has-calendar-rows'+(mode==='range'?' is-range-grid':'')} role="presentation">
   {Array.from({length:rows.length/7},(_,rowIndex)=><div className="sports-cal-row" role="row" key={rowIndex}>
    {rows.slice(rowIndex*7,rowIndex*7+7).map((item,colIndex)=>{
     if(!item)return <span key={'blank-'+colIndex} role="gridcell" aria-hidden="true"/>;
     const {iso,day}=item;
     const start=mode==='range'&&range.start===iso;
     const end=mode==='range'&&Boolean(range.end)&&range.end===iso;
     const inRange=mode==='range'&&Boolean(range.start&&range.end)&&iso>range.start&&iso<range.end;
     const chosen=mode==='single'?selected===iso:start||end;
     const disabled=disallowed(iso);
     return <button key={iso} type="button" role="gridcell"
      data-calendar-date={iso} aria-label={day+' de '+MONTHS[view.month]+' de '+view.year}
      aria-selected={chosen||inRange} aria-current={today===iso?'date':undefined}
      disabled={disabled} tabIndex={iso===focusCandidate?0:-1}
      className={'sports-cal-day'+(chosen?' is-selected':'')+(inRange?' is-in-range':'')+
       (start?' is-range-start':'')+(end?' is-range-end':'')+
       (today===iso?' is-today':'')}
      onFocus={()=>setFocusISO(iso)}
      onKeyDown={event=>handleKey(event,iso)}
      onClick={()=>{setFocusISO(iso);onSelect(iso)}}>{day}</button>;
    })}
   </div>)}
  </div>
 </div>;
}
