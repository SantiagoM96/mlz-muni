import { useState } from 'react';
import { CalendarMonthGrid } from '../../shared/calendar/CalendarMonthGrid';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './sports-calendar-picker.css';
import './andy-calendar-showcase.css';
import './andy-button-matrix.css';
import { DocPreview } from './AndyDocsPrimitives';

type Mode='single'|'range';
type Picker='month'|'year'|null;
const months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const readable=(date:string)=>{const [y,m,d]=date.split('-').map(Number);return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;};
const optionYears=Array.from({length:new Date().getFullYear()-1899},(_,i)=>new Date().getFullYear()-i);

function CalendarExample({mode,restricted=false}:{mode:Mode;restricted?:boolean}){
 const [view,setView]=useState({year:2008,month:10});
 const [dropdown,setDropdown]=useState<Picker>(null);
 const [single,setSingle]=useState('2008-11-13');
 const [range,setRange]=useState<{start:string;end:string}>({start:'2008-11-10',end:'2008-11-14'});
 const [confirmed,setConfirmed]=useState('');
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
    <CalendarMonthGrid view={view} mode={mode} selected={single} range={range}
     minDate={restricted?'2008-11-06':undefined} maxDate={restricted?'2008-11-25':undefined}
     disabledDates={restricted?['2008-11-19','2008-11-20']:[]}
     today="2008-11-17" onViewChange={setView} onSelect={select}
     label={mode==='single'?'Días para seleccionar una fecha':'Días para seleccionar un rango'}/>
    <div className="sports-cal-actions">
     <button type="button" className="sports-cal-clear andy-system-button is-tertiary is-small icon-none" onClick={clear}>Borrar {mode==='single'?'fecha':'rango'}</button>
     <button type="button" disabled={!canConfirm} className="sports-cal-confirm andy-system-button is-primary is-small icon-none" onClick={confirm}>Confirmar</button>
    </div>
   </div>
  </div>
  <div className="andy-cal-selection" role="status"><strong>{mode==='single'?'Día seleccionado':'Rango seleccionado'}</strong><span>{confirmed?`Confirmado: ${confirmed}`:selectedText}</span></div>
 </div>;
}
export function AndyCalendarShowcase({only,restricted=false}:{only?:Mode;restricted?:boolean}={}){
 return <div className="andy-cal-gallery">
  {(!only||only==='single')&&<DocPreview className="andy-cal-preview">
   <CalendarExample mode="single" restricted={restricted}/>
  </DocPreview>}
  {(!only||only==='range')&&<DocPreview className="andy-cal-preview">
   <CalendarExample mode="range" restricted={restricted}/>
  </DocPreview>}
 </div>;
}
