import type { ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { ActivityCard } from '../../modules/agenda/components/public/ActivityCard';
import { agendaActivities } from '../../modules/agenda/data/agenda';
import './andy-activity-cards.css';

/** Dos variaciones del mismo patrón: Deportes conserva su cabecera celeste;
 * Agenda utiliza la imagen real del catálogo público. */
type CardKind='sports'|'agenda';
type CardData={
 kind:'sports';
 category:string;
 title:string;
 chip:string;
 date:string;
 time:string;
 venue:string;
 address:string;
};
const sportsCard:CardData={
 kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Natación recreativa',chip:'De 6 a 12 años',
 date:'Lunes y miércoles',time:'10:00 a 11:00 h',
 venue:'Natatorio Gregorio «Guyo» Sember',address:'Lomas de Zamora'
};
const agendaSample=agendaActivities.find(activity=>activity.type==='Teatro')??agendaActivities[0];

function DataLine({icon,children}:{icon:'event_available'|'schedule'|'location_on';children:ReactNode}) {
 return <div className="andy-family-card-line"><MaterialIcon name={icon} size={20}/><div>{children}</div></div>;
}
export function AndyActivityCard({kind}:{kind:CardKind}){
 if(kind==='agenda')return <div className="andy-family-agenda-original" data-testid="andy-family-card-agenda">
  {agendaSample?<ActivityCard activity={agendaSample}/>:<p>No hay actividades de Agenda disponibles.</p>}
 </div>;
 const data=sportsCard;
 return <article className={'andy-family-card is-'+kind} data-testid={'andy-family-card-'+kind}>
  <div className="andy-family-card-sports-head" aria-hidden="true"/>
  <div className="andy-family-card-body">
   <div className="andy-family-card-intro">
    <span className="andy-family-card-category">{data.category}</span>
    <h3>{data.title}</h3>
    <div className="andy-family-card-tags"><span>{data.chip}</span></div>
   </div>
   <div className="andy-family-card-details">
    <DataLine icon="event_available"><strong>{data.date}</strong></DataLine>
    <DataLine icon="schedule"><strong>{data.time}</strong></DataLine>
    <DataLine icon="location_on"><strong>{data.venue}</strong><span>{data.address}</span></DataLine>
   </div>
   <div className="andy-family-card-action"><span>Preinscribirse</span><MaterialIcon name="chevron_right" size={24}/></div>
  </div>
 </article>;
}
export function AndyActivityCardGallery(){
 return <div className="andy-family-card-gallery">
  <div><h4>Deportes Anual</h4><p>Variante con cabecera celeste, sin fotografía.</p><AndyActivityCard kind="sports"/></div>
  <div><h4>Agenda de la Comunidad</h4><p>Variante con imagen del catálogo público.</p><AndyActivityCard kind="agenda"/></div>
 </div>;
}
