import { useState } from 'react';
import { Carousel, type CarouselAlign, type CarouselStep, type CarouselVisible } from '../../shared/ui/Carousel';
import { AndyActivityCard, type CardData } from './AndyActivityCards';
import { DocPreview, DocSection, GuidelineTable } from './AndyDocsPrimitives';
import './andy-carousel-docs.css';

const placeholders=[
 {fill:'var(--color-grey-200)',label:'Banner 01'},
 {fill:'var(--color-grey-100)',label:'Banner 02'},
 {fill:'var(--color-grey-400)',label:'Banner 03'},
 {fill:'var(--color-grey-50)',label:'Banner 04'},
] as const;
const bannerSlides=placeholders.map((item,index)=>
 <div className={'andy-carousel-placeholder is-'+index} key={item.label}
  style={{background:item.fill}}>
  <div className="andy-carousel-placeholder-content">
   <strong>{item.label}</strong>
   <span>Imagen provisional</span>
  </div>
 </div>
);

const sportExamples:readonly CardData[]=[
 {kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Natación recreativa',chip:'De 6 a 12 años',
  date:'Lunes, miércoles y viernes',time:'10:00 a 11:00 h',
  venue:'Natatorio municipal',address:'Lomas de Zamora'},
 {kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Fútbol infantil',chip:'De 8 a 14 años',
  date:'Martes y jueves',time:'16:00 a 17:00 h',
  venue:'Polideportivo municipal',address:'Lomas de Zamora'},
 {kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Vóley recreativo',chip:'Desde 13 años',
  date:'Lunes y jueves',time:'17:00 a 18:00 h',
  venue:'Gimnasio municipal',address:'Lomas de Zamora'},
 {kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Gimnasia',chip:'Todas las edades',
  date:'Martes y viernes',time:'09:00 a 10:00 h',
  venue:'Centro deportivo',address:'Lomas de Zamora'},
 {kind:'sports',category:'DEPORTE Y RECREACIÓN',title:'Atletismo',chip:'De 10 a 17 años',
  date:'Miércoles y sábados',time:'09:00 a 10:00 h',
  venue:'Pista municipal',address:'Lomas de Zamora'},
];
const sportSlides=sportExamples.map((data,i)=><AndyActivityCard key={i} kind="sports" data={data}/>);

function BannerDemo({autoplayMs=5000}:{autoplayMs?:number}){
 return <Carousel label="Banner principal municipal" variant="banner" slides={bannerSlides}
  showNavigation showIndicators loop autoplayMs={autoplayMs}/>;
}
function SportsDemo({visible='auto',gap=16,align='start',showNavigation=true,
 loop=false,step='item'}:{
 visible?:CarouselVisible;gap?:8|12|16|24;align?:CarouselAlign;
 showNavigation?:boolean;loop?:boolean;step?:CarouselStep;
}){
 return <Carousel label="Galería de actividades deportivas" variant="gallery"
  slides={sportSlides} visible={visible} gap={gap} align={align}
  showNavigation={showNavigation} step={step} loop={loop}/>;
}
function ControlGroup<T extends string|number>({label,options,value,onChange}:{
 label:string;options:readonly {value:T;label:string}[];value:T;onChange:(value:T)=>void;
}){
 return <div className="andy-carousel-setting">
  <span className="andy-carousel-setting-label">{label}</span>
  <div className="andy-doc-example-group" role="group" aria-label={label}>
   {options.map(option=><button type="button" key={option.value}
    aria-pressed={value===option.value} onClick={()=>onChange(option.value)}>
    {option.label}
   </button>)}
  </div>
 </div>;
}

export function AndyCarouselDocs(){
 const [visible,setVisible]=useState<CarouselVisible>('auto');
 const [gap,setGap]=useState<8|12|16|24>(16);
 const [align,setAlign]=useState<CarouselAlign>('start');
 const [navigation,setNavigation]=useState(true);
 const [step,setStep]=useState<CarouselStep>('item');
 const [loop,setLoop]=useState(false);

 return <div className="andy-carousel-docs" data-testid="andy-carousel-docs">
  <DocSection title="Introducción"
   description="Carrusel presenta una secuencia de contenidos relacionados en una misma región. El banner de referencia avanza cada 5 segundos; las imágenes grises son provisionales y se reemplazarán por los artes reales.">
   <DocPreview><BannerDemo/></DocPreview>
  </DocSection>

  <DocSection title="Anatomía"
   description="La estructura del desplazamiento es independiente de lo que contiene cada diapositiva. Las tarjetas mantienen sus propios estilos, dimensiones relativas y contenido.">
   <GuidelineTable rows={[
    ['Contenedor','Región con nombre accesible: reúne viewport, navegación, indicadores y comportamiento.'],
    ['Viewport','Área visible que recorta la secuencia; admite desplazamiento horizontal nativo y táctil.'],
    ['Track','Secuencia horizontal flexible con separación configurable y scroll-snap.'],
    ['Ítem / diapositiva','Unidad individual, sin un ancho fijo impuesto a la tarjeta que contiene.'],
    ['Navegación','Botones anterior/siguiente del sistema Button; disabled en los límites cuando no hay loop.'],
    ['Indicadores (opcionales)','Guiones que permiten ir directamente a una diapositiva; el activo se expande.'],
    ['Pausa (banner)','Control que detiene y reanuda el avance automático, sin alterar la posición elegida.'],
   ]}/>
  </DocSection>

  <DocSection title="Variantes"
   description="Dos patrones de uso municipales: el banner automático de encabezado y la galería horizontal de actividades deportivas. No son tamaños de Card.">
   <div className="andy-carousel-variant-stack">
    <div className="andy-carousel-variant-item">
     <div className="andy-doc-variant-caption">
      <h4>Banner automático</h4>
      <p>Una diapositiva visible, flechas laterales, guiones inferiores que indican la posición y autoplay de 5 s. Los tonos grises son temporales.</p>
     </div>
     <DocPreview><BannerDemo/></DocPreview>
    </div>
    <div className="andy-carousel-variant-item">
     <div className="andy-doc-variant-caption">
      <h4>Galería de actividades deportivas</h4>
      <p>Desplazamiento horizontal manual con las mismas tarjetas que utiliza la documentación de Deportes. En mobile se muestra una tarjeta por vez; las actividades son datos de demostración.</p>
     </div>
     <DocPreview><SportsDemo/></DocPreview>
    </div>
   </div>
  </DocSection>

  <DocSection title="Configuración"
   description="Estos controles modifican el carrusel, no la tarjeta: cantidad visible, separación, alineación, navegación, paso y repetición. El autoplay no se habilita por defecto y se limita al ejemplo de banner.">
   <div className="andy-carousel-settings" data-testid="andy-carousel-settings">
    <ControlGroup label="Elementos visibles" value={visible} onChange={setVisible}
     options={[{value:'auto',label:'Auto'},{value:1,label:'1'},{value:2,label:'2'},{value:3,label:'3'}]}/>
    <ControlGroup label="Separación" value={gap} onChange={setGap}
     options={[{value:8,label:'8 px'},{value:12,label:'12 px'},{value:16,label:'16 px'},{value:24,label:'24 px'}]}/>
    <ControlGroup label="Alineación" value={align} onChange={setAlign}
     options={[{value:'start',label:'Inicio'},{value:'center',label:'Centro'}]}/>
    <ControlGroup label="Navegación" value={navigation?'yes':'no'}
     onChange={value=>setNavigation(value==='yes')}
     options={[{value:'yes',label:'Con flechas'},{value:'no',label:'Sin flechas'}]}/>
    <ControlGroup label="Desplazamiento" value={step} onChange={setStep}
     options={[{value:'item',label:'Por ítem'},{value:'page',label:'Por página'}]}/>
    <ControlGroup label="Repetición" value={loop?'yes':'no'}
     onChange={value=>setLoop(value==='yes')}
     options={[{value:'no',label:'Sin loop'},{value:'yes',label:'Con loop'}]}/>
   </div>
   <DocPreview><SportsDemo visible={visible} gap={gap} align={align}
    showNavigation={navigation} step={step} loop={loop}/></DocPreview>
  </DocSection>

  <DocSection title="Estados e interacción"
   description="En el inicio, la flecha anterior está deshabilitada; en una posición intermedia funcionan ambas y en el final se deshabilita la siguiente. Hover y focus pertenecen a cada control. El viewport admite swipe táctil y navegación con las flechas del teclado.">
   <DocPreview><SportsDemo/></DocPreview>
   <GuidelineTable rows={[
    ['Inicio','El índice inicial es 1; anterior queda deshabilitado si loop está desactivado.'],
    ['Intermedio','Ambas flechas están habilitadas mientras hay contenido a cada lado.'],
    ['Final','Siguiente queda deshabilitado si loop está desactivado.'],
    ['Hover','El botón de navegación responde con superficie Grey 50.'],
    ['Focus','El foco de teclado usa Info 500, 2 px, sin desplazar el layout.'],
    ['Táctil','El viewport utiliza desplazamiento horizontal nativo con scroll-snap.'],
    ['Autoplay','Solo el banner avanza cada 5 s. Se pausa con hover, foco o botón y no se inicia con movimiento reducido.'],
   ]}/>
  </DocSection>

  <DocSection title="Responsive"
   description="La galería adapta la cantidad de tarjetas visibles al espacio real del viewport: hasta tres cuando hay ancho suficiente, dos en espacios intermedios y una en mobile. Las Card nunca reciben tamaños rígidos nuevos.">
   <DocPreview><SportsDemo/></DocPreview>
   <GuidelineTable rows={[
    ['Pantalla amplia','Hasta 3 elementos visibles, dependiendo del ancho disponible y de la configuración.'],
    ['Ancho intermedio','Hasta 2 elementos visibles, con las mismas reglas de separación.'],
    ['Mobile','1 elemento visible con swipe horizontal; flechas y scroll nativo siguen disponibles.'],
    ['Contenido','El texto puede crecer sin recortarse; la altura de la tarjeta responde a su contenido.'],
   ]}/>
  </DocSection>

  <DocSection title="Buenas prácticas"
   description="Elegí el carrusel cuando exista una secuencia realmente útil para explorar. Nunca debe ocultar información imprescindible ni convertir el movimiento automático en una obligación para el usuario.">
   <GuidelineTable rows={[
    ['Accesibilidad','Región con nombre, diapositivas identificadas, flechas con aria-label y estado disabled nativo.'],
    ['Teclado','Tab accede a controles; izquierda/derecha navegan al enfocar el viewport, Home y End saltan al principio y al final.'],
    ['Indicadores','Dar nombre accesible a cada guion. La posición activa debe distinguirse también por longitud.'],
    ['Autoplay','Desactivado por defecto. La variante de banner usa 5000 ms y ofrece pausa; respeta prefers-reduced-motion y visibilidad de pestaña.'],
    ['Interacción','Pausar mientras se usa mouse o teclado para evitar cambios inesperados.'],
    ['Scroll','No depender exclusivamente del gesto; mantener controles alternativos.'],
    ['Cards','Separar el desplazamiento y los breakpoints de la presentación del contenido.'],
    ['Contenido','Usar el banner para comunicación destacada y la galería para descubrir actividades; no insertar formularios complejos dentro de diapositivas móviles.'],
   ]}/>
  </DocSection>
 </div>;
}
