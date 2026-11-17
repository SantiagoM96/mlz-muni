import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type Dispatch, type KeyboardEvent, type SetStateAction } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-schedule-dialog-form.css';

export type ScheduleDraft={
 activity:string;
 days:string[];
 start:string;
 end:string;
 capacity:string;
 location:string;
};
export const defaultSchedule:ScheduleDraft={
 activity:'Entrenamiento funcional',days:['Lunes','Miércoles'],start:'09:00',end:'10:00',capacity:'20',location:'Polideportivo Municipal'
};
const timeSlots=Array.from({length:97},(_,i)=>{const minutes=i*15;return String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0')});
const durations=[30,45,60,90,120,180,240];
const toMinutes=(time:string)=>{const [h,m]=time.split(':').map(Number);return (h??0)*60+(m??0)};
const fromMinutes=(minutes:number)=>String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');

type TimeOption={value:string;label:string;disabled?:boolean};
function ScheduleDropdown({id,label,value,options,onChange}:{id:string;label:string;value:string;options:TimeOption[];onChange:(next:string)=>void}){
 const [open,setOpen]=useState(false);
 const [active,setActive]=useState(0);
 const [placement,setPlacement]=useState<CSSProperties>({});
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const listId=id+'-options';
 const selected=options.findIndex(option=>option.value===value);
 const position=useCallback(()=>{
  const rect=trigger.current?.getBoundingClientRect();
  if(!rect)return;
  const vw=window.innerWidth,vh=window.innerHeight;
  const width=Math.min(vw-32,Math.max(rect.width,240));
  const left=Math.max(16,Math.min(rect.left,vw-width-16));
  const below=vh-rect.bottom-16,above=rect.top-16;
  const upwards=below<230&&above>below;
  const height=Math.max(80,Math.min(280,upwards?above-8:below-8));
  setPlacement({position:'fixed',left,top:upwards?Math.max(8,rect.top-height-6):rect.bottom+6,width,maxHeight:height});
 },[]);
 useEffect(()=>{
  if(!open)return;
  position();
  const outside=(event:PointerEvent)=>{if(root.current&&!root.current.contains(event.target as Node))setOpen(false);};
  const refresh=()=>position();
  document.addEventListener('pointerdown',outside);
  window.addEventListener('resize',refresh);
  window.addEventListener('scroll',refresh,true);
  return ()=>{document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',refresh);window.removeEventListener('scroll',refresh,true);};
 },[open,position]);
 const show=()=>{const first=selected>=0&&!options[selected]?.disabled?selected:options.findIndex(option=>!option.disabled);setActive(Math.max(0,first));setOpen(true);};
 const choose=(index:number)=>{const option=options[index];if(!option||option.disabled)return;onChange(option.value);setOpen(false);trigger.current?.focus();};
 const move=(direction:number)=>{let index=active;for(let i=0;i<options.length;i++){index=(index+direction+options.length)%options.length;if(!options[index]?.disabled){setActive(index);break;}}};
 const key=(event:KeyboardEvent)=>{
  if(event.key==='Escape'&&open){event.preventDefault();event.stopPropagation();setOpen(false);trigger.current?.focus();return;}
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){
   event.preventDefault();if(!open){show();return;}move(event.key==='ArrowDown'?1:-1);return;
  }
  if(event.key==='Home'&&open){event.preventDefault();setActive(Math.max(0,options.findIndex(option=>!option.disabled)));return;}
  if(event.key==='End'&&open){event.preventDefault();setActive(Math.max(0,options.findLastIndex(option=>!option.disabled)));return;}
  if((event.key==='Enter'||event.key===' ')&&open){event.preventDefault();choose(active);}
 };
 return <div className="andy-schedule-select-wrap" ref={root} onKeyDown={key}>
  <button id={id} ref={trigger} type="button" className={'andy-dropdown-variant-trigger'+(open?' is-open':'')}
   role="combobox" aria-label={label} aria-haspopup="listbox" aria-expanded={open}
   aria-controls={open?listId:undefined} aria-activedescendant={open?listId+'-'+active:undefined}
   onClick={()=>open?setOpen(false):show()}>
   <span>{options[selected]?.label??value}</span><MaterialIcon name="expand_more" size={24}/>
  </button>
  {open&&<div className="andy-dropdown-variant-menu andy-schedule-dropdown-menu" style={placement}>
   <div id={listId} role="listbox" aria-label={label} className="andy-dropdown-variant-options">
    {options.map((option,index)=><button id={listId+'-'+index} key={option.value} type="button"
     role="option" aria-selected={value===option.value} disabled={option.disabled}
     className={'andy-dropdown-variant-option'+(value===option.value?' selected':'')+(active===index?' is-keyboard-active':'')}
     onPointerEnter={()=>setActive(index)} onClick={()=>choose(index)}>
      <span>{option.label}</span>
      {value===option.value&&<span className="andy-dropdown-mark" aria-hidden="true"><MaterialIcon name="check" size={24}/></span>}
     </button>)}
   </div>
  </div>}
 </div>;
}
export function AndyScheduleDialogForm({value,onChange,error}:{value:ScheduleDraft;onChange:Dispatch<SetStateAction<ScheduleDraft>>;error?:string}){
 const id=useId();
 const duration=toMinutes(value.end)-toMinutes(value.start);
 const set=<K extends keyof ScheduleDraft>(key:K,next:ScheduleDraft[K])=>onChange(previous=>({...previous,[key]:next}));
 return <div className="andy-schedule-form">
  <div className="andy-schedule-field">
   <label htmlFor={id+'-activity'}>Actividad <span aria-hidden="true">*</span></label>
   <input id={id+'-activity'} value={value.activity} onChange={e=>set('activity',e.target.value)} placeholder="Nombre de la actividad"/>
  </div>
  <div className="andy-schedule-field"><label htmlFor={id+'-capacity'}>Cupos disponibles</label>
   <input id={id+'-capacity'} inputMode="numeric" type="number" min="1" max="999" value={value.capacity} onChange={e=>set('capacity',e.target.value)} placeholder="Ej. 20"/>
  </div>
  <div className="andy-schedule-time-grid">
   <div className="andy-schedule-field"><label id={id+'-start-label'}>Hora de inicio <span aria-hidden="true">*</span></label>
    <ScheduleDropdown id={id+'-start'} label="Hora de inicio" value={value.start}
     options={timeSlots.slice(0,-2).map(time=>({value:time,label:time}))}
     onChange={start=>onChange(previous=>({...previous,start,end:fromMinutes(Math.min(1440,toMinutes(start)+Math.max(30,toMinutes(previous.end)-toMinutes(previous.start))))}))}/>
   </div>
   <div className="andy-schedule-field"><label id={id+'-end-label'}>Hora de finalización <span aria-hidden="true">*</span></label>
    <ScheduleDropdown id={id+'-end'} label="Hora de finalización" value={value.end}
     options={timeSlots.filter(time=>toMinutes(time)>toMinutes(value.start)).map(time=>({value:time,label:time}))}
     onChange={end=>set('end',end)}/>
   </div>
   <div className="andy-schedule-field"><label id={id+'-duration-label'}>Duración <span aria-hidden="true">*</span></label>
    <ScheduleDropdown id={id+'-duration'} label="Duración"
     value={durations.includes(duration)?String(duration):'custom'}
     options={[...(!durations.includes(duration)?[{value:'custom',label:'Personalizada',disabled:true}]:[]),
      ...durations.map(minutes=>({value:String(minutes),label:minutes<60?minutes+' minutos':minutes/60+' '+(minutes===60?'hora':'horas'),disabled:toMinutes(value.start)+minutes>1440}))]}
     onChange={next=>onChange(previous=>({...previous,end:fromMinutes(toMinutes(previous.start)+Number(next))}))}/>
   </div>
  </div>
  <div className="andy-schedule-field"><label htmlFor={id+'-location'}>Sede</label>
   <input id={id+'-location'} value={value.location} onChange={e=>set('location',e.target.value)} placeholder="Ingresá una sede"/>
  </div>
  {error&&<p className="andy-schedule-error" role="alert"><MaterialIcon name="error" size={18}/>{error}</p>}
 </div>;
}
