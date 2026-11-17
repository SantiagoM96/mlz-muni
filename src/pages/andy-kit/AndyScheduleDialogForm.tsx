import { useId, type Dispatch, type SetStateAction } from 'react';
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
   <div className="andy-schedule-field"><label htmlFor={id+'-start'}>Hora de inicio <span aria-hidden="true">*</span></label>
    <div className="andy-schedule-select-wrap"><select id={id+'-start'} value={value.start} onChange={e=>{const start=e.target.value;onChange(previous=>({...previous,start,end:fromMinutes(Math.min(1440,toMinutes(start)+Math.max(30,toMinutes(previous.end)-toMinutes(previous.start))))}))}}>{timeSlots.slice(0,-2).map(time=><option key={time} value={time}>{time}</option>)}</select><MaterialIcon name="expand_more" size={20}/></div>
   </div>
   <div className="andy-schedule-field"><label htmlFor={id+'-end'}>Hora de finalización <span aria-hidden="true">*</span></label>
    <div className="andy-schedule-select-wrap"><select id={id+'-end'} value={value.end} onChange={e=>set('end',e.target.value)}>
     {timeSlots.filter(time=>toMinutes(time)>toMinutes(value.start)).map(time=><option key={time} value={time}>{time}</option>)}
    </select><MaterialIcon name="expand_more" size={20}/></div>
   </div>
   <div className="andy-schedule-field"><label htmlFor={id+'-duration'}>Duración <span aria-hidden="true">*</span></label>
    <div className="andy-schedule-select-wrap"><select id={id+'-duration'} value={durations.includes(duration)?duration:'custom'} onChange={e=>{const minutes=Number(e.target.value);if(Number.isFinite(minutes))onChange(previous=>({...previous,end:fromMinutes(toMinutes(previous.start)+minutes)}))}}>
      {!durations.includes(duration)&&<option value="custom" disabled>Personalizada</option>}
      {durations.map(minutes=><option key={minutes} value={minutes} disabled={toMinutes(value.start)+minutes>1440}>{minutes<60?minutes+' minutos':minutes/60+' '+(minutes===60?'hora':'horas')}</option>)}
     </select><MaterialIcon name="expand_more" size={20}/></div>
   </div>
  </div>
  <div className="andy-schedule-field"><label htmlFor={id+'-location'}>Sede</label>
   <input id={id+'-location'} value={value.location} onChange={e=>set('location',e.target.value)} placeholder="Ingresá una sede"/>
  </div>
  {error&&<p className="andy-schedule-error" role="alert"><MaterialIcon name="error" size={18}/>{error}</p>}
 </div>;
}
