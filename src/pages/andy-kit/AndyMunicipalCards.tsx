import type { ReactNode } from 'react';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import './andy-municipal-cards.css';

const image = (filename: string) => import.meta.env.BASE_URL + 'assets/andy-cards/' + filename;

function CardExample({title, children}: {title: string; children: ReactNode}) {
 return <section className="andy-municipal-card-example" aria-label={title}>
  <h4>{title}</h4>
  {children}
 </section>;
}

function Action({label, icon}: {label: string; icon?: MaterialIconName}) {
 return <span className="andy-municipal-card-action">{label}{icon && <MaterialIcon name={icon} size={20}/>}</span>;
}

function EmptyImage({label}: {label: string}) {
 return <div className="andy-municipal-card-placeholder" role="img" aria-label={label}/>;
}

/** Ejemplos de anatomía: no son enlaces reales ni corresponden a turnos o eventos publicados. */
export function AndyMunicipalCardGallery() {
 return <div className="andy-municipal-card-gallery" data-testid="andy-municipal-card-gallery">
  <CardExample title="Noticias">
   <article className="andy-municipal-card andy-municipal-card-news">
    <div className="andy-municipal-card-media">
     <img className="andy-municipal-card-news-image" src={image("noticia-obras.webp")} alt="Refugio de transporte intervenido en Lomas de Zamora" loading="lazy"/>
     <span className="andy-municipal-card-tag">Obras</span>
    </div>
    <div className="andy-municipal-card-content">
     <h3>El Municipio realizó trabajos de mantenimiento en más de 100 refugios</h3>
     <div className="andy-municipal-card-meta"><MaterialIcon name="calendar_month" size={20}/><span>13 nov 2026</span></div>
     <Action label="Leer más"/>
    </div>
   </article>
  </CardExample>

  <CardExample title="Áreas y servicios">
   <article className="andy-municipal-card andy-municipal-card-service">
    <img className="andy-municipal-card-service-image" src={image('salud-lomas.webp')} alt="Profesional de salud atendiendo en un consultorio odontológico municipal" loading="lazy"/>
    <div className="andy-municipal-card-service-panel">
     <h3>Salud Lomas</h3>
     <Action label="Ver más"/>
    </div>
   </article>
  </CardExample>

  <CardExample title="Turnos online">
   <article className="andy-municipal-card andy-municipal-card-appointment">
    <div className="andy-municipal-card-content">
     <h3>Salud</h3>
     <p>Clínica médica, especialidades y vacunación</p>
     <Action label="Ingresar"/>
    </div>
   </article>
  </CardExample>

  <CardExample title="Trámites destacados">
   <article className="andy-municipal-card andy-municipal-card-procedure">
    <span className="andy-municipal-card-procedure-icon"><MaterialIcon name="badge" size={24}/></span>
    <h3>Licencias</h3>
    <p>Realizá los trámites de tu licencia de conducir</p>
    <Action label="Ingresar"/>
   </article>
  </CardExample>

  <CardExample title="Accesos rápidos">
   <article className="andy-municipal-card andy-municipal-card-shortcut">
    <EmptyImage label="Imagen pendiente para acceso rápido"/>
    <div className="andy-municipal-card-shortcut-content"><h3>Turnos de salud</h3></div>
   </article>
  </CardExample>

  <CardExample title="Eventos con fecha">
   <article className="andy-municipal-card andy-municipal-card-event">
    <div className="andy-municipal-card-media">
     <EmptyImage label="Imagen pendiente para evento"/>
     <div className="andy-municipal-card-date"><strong>21</strong><span>NOV</span></div>
    </div>
    <div className="andy-municipal-card-content">
     <span className="andy-municipal-card-category">MÚSICA</span>
     <h3>Jazz Internacional</h3>
     <div className="andy-municipal-card-info">
      <MaterialIcon name="event_available" size={20}/>
      <div><strong>Próxima fecha</strong><span>Sábado 21 de noviembre</span></div>
     </div>
     <div className="andy-municipal-card-info">
      <MaterialIcon name="schedule" size={20}/>
      <div><strong>Horario</strong><span>21:00 h</span></div>
     </div>
     <Action label="Ver evento" icon="chevron_right"/>
    </div>
   </article>
  </CardExample>
 </div>;
}
