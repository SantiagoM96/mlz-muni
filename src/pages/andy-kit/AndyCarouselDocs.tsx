import { Carousel } from '../../shared/ui/Carousel';
import { DocPreview, DocSection, GuidelineTable } from './AndyDocsPrimitives';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-carousel-docs.css';

/** Contenidos ilustrativos; las fotografías no son registros de actividades de MLZ. */
const banners=[
 {
  id:'comunidad',eyebrow:'COMUNIDAD LOMAS',title:'Una ciudad para disfrutar',subtitle:'Actividades, servicios y propuestas para vos.',
  cta:'CONOCÉ MÁS',tone:'blue',
  photo:'https://images.unsplash.com/photo-1790486784363-8746f5d45d4a?auto=format&fit=crop&w=1440&q=78',
  alt:'Presentación musical con público en un encuentro comunitario',
 },
 {
  id:'cultura',eyebrow:'CULTURA EN COMUNIDAD',title:'El arte nos encuentra',subtitle:'Talleres, propuestas y experiencias para compartir.',
  cta:'VER ACTIVIDADES',tone:'violet',
  photo:'https://images.unsplash.com/photo-1770739879041-22f0dfc37301?auto=format&fit=crop&w=1440&q=78',
  alt:'Personas pintando durante un taller artístico al aire libre',
 },
 {
  id:'deportes',eyebrow:'DEPORTE Y BIENESTAR',title:'Nos movemos juntos',subtitle:'Más oportunidades de disfrutar el deporte en tu barrio.',
  cta:'DESCUBRÍ MÁS',tone:'green',
  photo:'https://images.unsplash.com/photo-1686243694059-0d5333940670?auto=format&fit=crop&w=1440&q=78',
  alt:'Personas participando de una clase de actividad física al aire libre',
 },
 {
  id:'servicios',eyebrow:'SERVICIOS MUNICIPALES',title:'Gestiones más cerca',subtitle:'Información y atención para vos.',
  cta:'VER SERVICIOS',tone:'coral',
  photo:'https://images.unsplash.com/photo-1759143545924-beb85b33c0f1?auto=format&fit=crop&w=1440&q=80',
  alt:'Recepcionista trabajando con una tableta para atender consultas',
 },
] as const;

const galleryPhotos=[
 {
  id:'arte',src:'https://images.unsplash.com/photo-1777659261650-c710b00fa04a?auto=format&fit=crop&w=800&h=490&q=80',
  alt:'Taller de arte y pintura con niños al aire libre',
 },
 {
  id:'deporte',src:'https://images.unsplash.com/photo-1777489689168-497290f235d5?auto=format&fit=crop&w=800&h=490&q=80',
  alt:'Chicos jugando al fútbol en una plaza',
 },
 {
  id:'feria',src:'https://images.unsplash.com/photo-1793788230300-df4f3d4d176a?auto=format&fit=crop&w=800&h=490&q=80',
  alt:'Feria comunitaria al aire libre con puestos y visitantes',
 },
 {
  id:'musica',src:'https://images.unsplash.com/photo-1776539788630-3ecd301d0e5d?auto=format&fit=crop&w=800&h=490&q=80',
  alt:'Encuentro cultural con música y público al aire libre',
 },
] as const;

const bannerSlides=banners.map(banner=>
 <article key={banner.id} className={'andy-carousel-hero is-'+banner.tone}>
  <img className="andy-carousel-hero-photo" src={banner.photo} alt={banner.alt} loading="lazy"/>
  <div className="andy-carousel-hero-copy">
   <span className="andy-carousel-hero-eyebrow">{banner.eyebrow}</span>
   <strong className="andy-carousel-hero-title">{banner.title}</strong>
   <span className="andy-carousel-hero-description">{banner.subtitle}</span>
   <span className="andy-carousel-hero-cta" aria-hidden="true">
    {banner.cta}<MaterialIcon name="arrow_forward" size={18}/>
   </span>
  </div>
 </article>
);

const gallerySlides=galleryPhotos.map(photo=>
 <figure key={photo.id} className="andy-carousel-photo">
  <img src={photo.src} alt={photo.alt} loading="lazy"/>
 </figure>
);

function BannerHome(){
 return <Carousel label="Banner Home municipal" variant="banner" slides={bannerSlides}
  showNavigation showIndicators loop autoplayMs={4000}/>;
}

function Gallery(){
 return <Carousel label="Galería de actividades en la plaza" variant="gallery"
  slides={gallerySlides} visible="auto" gap={12} showNavigation
  showIndicators={false} loop={false}/>;
}

export function AndyCarouselDocs(){
 return <div className="andy-carousel-docs" data-testid="andy-carousel-docs">
  <DocSection title="Introducción"
   description="Carrusel permite recorrer imágenes o mensajes relacionados dentro de una misma superficie. El ejemplo principal utiliza el patrón Banner Home, con flechas circulares translúcidas, indicadores inferiores y avance automático.">
   <DocPreview><BannerHome/></DocPreview>
  </DocSection>

  <DocSection title="Banner Home"
   description="Carrusel principal de portada. Muestra un banner por vez con navegación lateral circular, guiones que indican la posición y avance automático cada 4 segundos. Las cuatro piezas son demostraciones ilustrativas y pueden reemplazarse por artes municipales.">
   <DocPreview><BannerHome/></DocPreview>
  </DocSection>

  <DocSection title="Galería"
   description="Secuencia horizontal de fotografías de actividades comunitarias en una plaza. Muestra varias imágenes y deja asomar la siguiente; se desplaza manualmente mediante flechas translúcidas, trackpad o gesto táctil.">
   <DocPreview><Gallery/></DocPreview>
   <p className="andy-carousel-photo-note">Fotografías ilustrativas para mostrar el comportamiento del componente. No representan actividades municipales concretas.</p>
  </DocSection>

  <DocSection title="Anatomía"
   description="El carrusel controla la navegación y el desplazamiento; el contenido de cada imagen o banner conserva su estructura y estilo propios.">
   <GuidelineTable rows={[
    ['Contenedor','Región identificada que reúne la navegación, el viewport y los indicadores cuando corresponden.'],
    ['Viewport','Área visible por la que se desplazan las imágenes; recorta el contenido y permite interacción táctil.'],
    ['Track','Secuencia horizontal con separación entre elementos y alineación mediante scroll-snap.'],
    ['Elementos','Cada banner o fotografía dentro del carrusel, sin tamaños rígidos impuestos a su contenido.'],
    ['Navegación','Botones circulares translúcidos a los costados; se deshabilitan en los extremos de la galería.'],
    ['Indicadores','Guiones clickeables del Banner Home: el indicador activo se expande y marca la posición actual.'],
    ['Comportamiento','Banner Home avanza cada 4 s y se pausa al interactuar; Galería se desplaza manualmente. Ambos admiten teclado y respetan movimiento reducido.'],
   ]}/>
  </DocSection>
 </div>;
}
