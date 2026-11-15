import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './sports-calendar-picker.css';
import './andy-calendar-showcase.css';
import './andy-button-matrix.css';
import { DocPreview } from './AndyDocsPrimitives';

type Mode='single'|'range';
type Picker='month'|'year'|null;
const months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const days=['L','M','M','J','V','S','D'];
const iso=(y:number,m:number,d:number)=>[y,String(m+1).padStart(2,'0'),String(d).padStart(2,'0')].join('-');
const readable=(date:string)=>{const [y,m,d]=date.split('-').map(Number);return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;};
const optionYears=Array.from({length:41},(_,i)=>2026-i);

function CalendarExample({mode}:{mode:Mode}){
 const [view,setView]=useState({year:2008,month:10});
 const [dropdown,setDropdown]=useState<Picker>(null);
 const [single,setSingle]=useState('2008-11-13');
 const [range,setRange]=useState<{start:string;end:string}>({start:'2008-11-10',end:'2008-11-14'});
 const [confirmed,setConfirmed]=useState('');
 const startOffset=(new Date(view.year,view.month,1).getDay()+6)%7;
 const length=new Date(view.year,view.month+1,0).getDate();
 const changeMonth=(direction:number)=>{
  const next=new Date(view.year,view.month+direction,1);
  setView({year:next.getFullYear(),month:next.getMonth()});setDropdown(null);
 };
 const select=(date:string)=>{
  if(mode==='single'){setSingle(date);setConfirmed('');return;}
  setRange(current=>!current.start||current.end||date<current.start?{start:date,end:''}:{start:current.start,end:date});
  setConfirmed('');
 };
 const clear=()=>{setSingle('');setRange({start:'',end:''});setConfirmed('');};
 const confirm=()=>{
  const text=mode==='single'?(single?readable(single):''):range.start&&range.end?`${readable(range.start)} al ${readable(range.end)}`:'';
  setConfirmed(text);
 };
 const canConfirm=mode==='single'?!!single:!!range.start&&!!range.end;
 const selectedText=mode==='single'?(single?readable(single):'Sin fecha seleccionada'):
   !range.start?'Sin rango seleccionado':range.end?`${readable(range.start)} — ${readable(range.end)}`:`${readable(range.start)} — Seleccioná la fecha final`;
 return <div className="andy-cal-example">
  <div className="sports-cal-popup is-inline" aria-label={mode==='single'?'Calendario de un día':'Calendario de rango'}>
   <div className="sports-cal-top"><strong>{mode==='single'?'Seleccionar fecha':'Seleccionar rango'}</strong></div>
   <div className="sports-cal-content">
    <div className="sports-cal-bar">
     <div className="sports-cal-period">
      {(['month','year'] as const).map(kind=><div className="sports-cal-choice-holder" key={kind}>
       <button type="button" className="sports-cal-choice-trigger andy-calendar-select" aria-expanded={dropdown===kind}
        aria-label={kind==='month'?'Seleccionar mes':'Seleccionar año'} onClick={()=>setDropdown(x=>x===kind?null:kind)}>
        <span>{kind==='month'?months[view.month]:view.year}</span><MaterialIcon name="expand_more" size={20}/>
       </button>
       {dropdown===kind&&<div className="sports-cal-choice-menu">
        <div className="sports-cal-choices" role="listbox" aria-label={kind==='month'?'Meses':'Años'}>
         {(kind==='month'?months.map((name,index)=>({name,value:index})):optionYears.map(y=>({name:String(y),value:y}))).map(option=>{
          const selected=(kind==='month'?view.month:view.year)===option.value;
          return <button key={option.value} type="button" role="option" aria-selected={selected} className="sports-cal-choice-option"
           onClick={()=>{setView(old=>kind==='month'?{...old,month:option.value}:{...old,year:option.value});setDropdown(null);}}>
            <span>{option.name}</span><MaterialIcon name={selected?'radio_button_checked':'radio_button_unchecked'} size={24}/>
           </button>;
         })}
        </div>
       </div>}
      </div>)}
     </div>
     <div className="sports-cal-nav">
      <button type="button" aria-label="Mes anterior" onClick={()=>changeMonth(-1)}><MaterialIcon name="chevron_left" size={24}/></button>
      <button type="button" aria-label="Mes siguiente" onClick={()=>changeMonth(1)}><MaterialIcon name="chevron_right" size={24}/></button>
     </div>
    </div>
    <div className="sports-cal-week" aria-hidden="true">{days.map((day,index)=><span key={index}>{day}</span>)}</div>
    <div className={mode==='range'?'sports-cal-days is-range-grid':'sports-cal-days'} role="grid" aria-label="Días del mes">
     {Array.from({length:startOffset},(_,index)=><span key={'blank'+index} aria-hidden="true"/>)}
     {Array.from({length},(_,index)=>{
       const date=iso(view.year,view.month,index+1);
       const isStart=mode==='range'&&date===range.start;
       const isEnd=mode==='range'&&!!range.end&&date===range.end;
       const chosen=mode==='single'?date===single:isStart||isEnd;
       const between=mode==='range'&&!!range.end&&date>range.start&&date<range.end;
       return <button type="button" key={date} role="gridcell" aria-label={`${index+1} de ${months[view.month]} de ${view.year}`}
        aria-selected={chosen} className={`sports-cal-day${chosen?' is-selected':''}${between?' is-in-range':''}${isStart?' is-range-start':''}${isEnd?' is-range-end':''}`}
        onClick={()=>select(date)}>{index+1}</button>;
     })}
    </div>
    <div className="sports-cal-actions">
     <button type="button" className="sports-cal-clear andy-system-button is-tertiary is-small icon-none" onClick={clear}>Borrar {mode==='single'?'fecha':'rango'}</button>
     <button type="button" disabled={!canConfirm} className="sports-cal-confirm andy-system-button is-primary is-small icon-none" onClick={confirm}>Confirmar</button>
    </div>
   </div>
  </div>
  <div className="andy-cal-selection" role="status"><strong>{mode==='single'?'Día seleccionado':'Rango seleccionado'}</strong><span>{confirmed?`Confirmado: ${confirmed}`:selectedText}</span></div>
 </div>;
}
export function AndyCalendarShowcase({only}:{only?:Mode}={}){
 return <div className="andy-cal-gallery">
  {(!only||only==='single')&&<DocPreview className="andy-cal-preview">
   <CalendarExample mode="single"/>
  </DocPreview>}
  {(!only||only==='range')&&<DocPreview className="andy-cal-preview">
   <CalendarExample mode="range"/>
  </DocPreview>}
 </div>;
}
