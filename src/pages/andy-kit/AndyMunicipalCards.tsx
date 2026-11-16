import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import './andy-municipal-cards.css';

const image = (filename:string) => import.meta.env.BASE_URL + 'assets/agenda/' + filename;

type ReferenceCardProps = {
 title:string;
 description:string;
 children:React.ReactNode;
};
function ReferenceCard({title,description,children}:ReferenceCardProps){
 return <section className="andy-municipal-card-reference">
  <div className="andy-municipal-card-heading">
   <h4>{title}</h4><p>{description}</p>
  </div>
  {children}
 </section>;
}
function PreviewAction({children,icon}:{children:string;icon?:MaterialIconName}){
 return <span className="andy-municipal-card-cta">{children}{icon&&<MaterialIcon name={icon} size={18}/>}</span>;
}

/** Variantes ilustrativas adaptadas a los tokens del UI Kit. Los CTAs no navegan. */
export function AndyMunicipalCardGallery(){
 return <div className="andy-municipal-card-gallery" data-testid="andy-municipal-card-gallery">
  <ReferenceCard title="Noticias" description="Fotografía, categoría superpuesta, título destacado, fecha y enlace de lectura.">
   <article className="andy-municipal-card andy-municipal-news">
    <div className="andy-municipal-news-media">
     <img src={image('home-hero.jpg')} alt="Imagen de ejemplo para una noticia municipal" loading="lazy"/>
     <span className="andy-municipal-news-tag">Comunidad</span>
    </div>
    <div className="andy-municipal-news-body">
     <h3>Actividades para encontrarnos en comunidad</h3>
     <p className="andy-municipal-news-date"><MaterialIcon name="calendar_month" size={20}/>13 nov 2026</p>
     <PreviewAction>Leer más</PreviewAction>
    </div>
   </article>
  </ReferenceCard>

  <ReferenceCard title="Áreas y servicios" description="Imagen de fondo y panel claro superpuesto, con el nombre del área como foco.">
   <article className="andy-municipal-card andy-municipal-service">
    <img src={image('home-cafe.jpg')} alt="Imagen ilustrativa de un espacio comunitario" loading="lazy"/>
    <div className="andy-municipal-service-panel">
     <h3>Atención a la Comunidad</h3>
     <PreviewAction>Ver más</PreviewAction>
    </div>
   </article>
  </ReferenceCard>

  <ReferenceCard title="Turnos online" description="Tarjeta informativa compacta para describir una gestión y su acceso.">
   <article className="andy-municipal-card andy-municipal-appointment">
    <h3>Salud</h3>
    <p>Clínica médica, especialidades y vacunación</p>
    <PreviewAction>Ingresar</PreviewAction>
   </article>
  </ReferenceCard>

  <ReferenceCard title="Trámites destacados" description="Superficie primaria, pictograma y descripción con acción al pie.">
   <article className="andy-municipal-card andy-municipal-procedure">
    <div className="andy-municipal-procedure-icon"><MaterialIcon name="badge" size={28}/></div>
    <h3>Licencias</h3>
    <p>Realizá los trámites de tu licencia de conducir</p>
    <PreviewAction>Ingresar</PreviewAction>
   </article>
  </ReferenceCard>

  <ReferenceCard title="Accesos rápidos" description="Banner gráfico con título corto y una única acción implícita.">
   <article className="andy-municipal-card andy-municipal-shortcut">
    <div className="andy-municipal-shortcut-pattern" aria-hidden="true"/>
    <h3>Turnos de salud</h3>
    <span className="andy-municipal-shortcut-arrow" aria-hidden="true"><MaterialIcon name="arrow_forward" size={24}/></span>
   </article>
  </ReferenceCard>

  <ReferenceCard title="Eventos con fecha" description="Imagen de cabecera, fecha destacada y metadatos separados para lectura rápida.">
   <article className="andy-municipal-card andy-municipal-event">
    <div className="andy-municipal-event-media">
     <img src={image('home-theater.jpg')} alt="Imagen de ejemplo de una actividad cultural" loading="lazy"/>
     <div className="andy-municipal-event-date"><strong>21</strong><span>NOV</span></div>
    </div>
    <div className="andy-municipal-event-body">
     <span className="andy-municipal-event-category">MÚSICA</span>
     <h3>Jazz Internacional</h3>
     <div className="andy-municipal-event-detail">
      <MaterialIcon name="event_available" size={20}/>
      <div><strong>Próxima fecha</strong><span>Sábado 21 de noviembre</span></div>
     </div>
     <div className="andy-municipal-event-detail">
      <MaterialIcon name="schedule" size={20}/>
      <div><strong>Horario</strong><span>21:00 h</span></div>
     </div>
     <PreviewAction icon="chevron_right">Ver evento</PreviewAction>
    </div>
   </article>
  </ReferenceCard>
  <p className="andy-municipal-card-note">Ejemplos ilustrativos de componentes. Las fotografías son recursos existentes del proyecto; los títulos y datos son demostrativos y las acciones no realizan navegación.</p>
 </div>;
}
