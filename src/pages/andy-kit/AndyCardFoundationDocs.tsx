import { useState, type CSSProperties, type MouseEvent } from 'react';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyCardAnatomySwitcher, AndyCardSpecimen } from './AndyCardAnatomySwitcher';
import './andy-card-foundation-docs.css';

type VisualState='default'|'hover'|'focus';
type Spacing='small'|'medium'|'large';
type ImageExample='news'|'agenda'|'event';

function ExampleControls<T extends string>({label,items,value,onChange}:{
 label:string;items:readonly {id:T;label:string}[];value:T;onChange:(id:T)=>void;
}){
 return <div className="andy-doc-example-controls">
  <div className="andy-doc-example-group" role="group" aria-label={label}>
   {items.map(item=><button key={item.id} type="button"
    aria-pressed={item.id===value} onClick={()=>onChange(item.id)}>
    {item.label}
   </button>)}
  </div>
 </div>;
}

/** Una muestra real: ninguna tarjeta se recrea como maqueta en la documentación.
 * El enlace de Agenda queda desactivado únicamente dentro del visor educativo. */
function RealCardSample({id,className='',style,state}:{
 id:'appointment'|'news'|'agenda'|'event';
 className?:string;
 style?:CSSProperties;
 state?:VisualState;
}){
 const preventPreviewNavigation=(event:MouseEvent<HTMLDivElement>)=>{
  if(event.target instanceof Element&&event.target.closest('a[href]')){
   event.preventDefault();
   event.stopPropagation();
  }
 };
 return <div className={'andy-card-real-sample '+className}
  data-preview-state={state} style={style} onClickCapture={preventPreviewNavigation}>
  <AndyCardSpecimen id={id}/>
 </div>;
}

const stateItems:readonly {id:VisualState;label:string}[]=[
 {id:'default',label:'Default'},
 {id:'hover',label:'Hover'},
 {id:'focus',label:'Focus'},
];

export function AndyCardFoundationDocs(){
 const [spacing,setSpacing]=useState<Spacing>('medium');
 const [image,setImage]=useState<ImageExample>('news');
 const [state,setState]=useState<VisualState>('default');

 return <div className="andy-card-foundation-docs">
  <DocSection title="Descripción" description="Card agrupa información y acciones relacionadas dentro de una superficie con identidad propia. Las seis tarjetas seleccionadas —Deportes, Agenda, Noticias, Turnos, Licencias y Eventos— son los ejemplos de referencia, todas con superficie blanca y jerarquía de contenido consistente.">{null}</DocSection>

  <DocSection title="Básico" description="La tarjeta de Turnos online es una muestra existente de Card informativa con título, descripción y acceso. Sirve como punto de partida para estudiar la estructura más sencilla de esta familia.">
   <DocPreview><RealCardSample id="appointment"/></DocPreview>
  </DocSection>

  <DocSection title="Composición" description="Recorré las seis tarjetas municipales seleccionadas. Las cajas punteadas tienen mayor aire alrededor del contenido y agrupan elementos contiguos de una misma región; el footer rodea solamente la acción.">
   <AndyCardAnatomySwitcher/>
  </DocSection>

  <DocSection title="Espaciado" description="Compará tres escalas proporcionales sobre la tarjeta real de Turnos online. El padding interior de la tarjeta se mantiene siempre en 24 px: solo se modifican las distancias entre título, descripción y acción. La muestra original del producto permanece intacta.">
   <ExampleControls label="Espaciado de Card" value={spacing}
    onChange={setSpacing}
    items={[{id:'small',label:'Small'},{id:'medium',label:'Medium'},{id:'large',label:'Large'}]}/>
   <DocPreview>
    <RealCardSample id="appointment" className="andy-card-real-spacing"
     style={{'--andy-inspection-gap':({small:'8px',medium:'12px',large:'16px'} as const)[spacing]} as CSSProperties}/>
   </DocPreview>
  </DocSection>

  <DocSection title="Imagen" description="Las tarjetas reales de Noticias, Agenda de la Comunidad y Eventos muestran diferentes formas de integrar fotografías: cabecera, recorte y fecha superpuesta en el caso de Eventos.">
   <ExampleControls label="Tarjeta con imagen" value={image} onChange={setImage}
    items={[{id:'news',label:'Noticias'},{id:'agenda',label:'Agenda de la Comunidad'},{id:'event',label:'Eventos'}]}/>
   <DocPreview><RealCardSample id={image}/></DocPreview>
  </DocSection>

  <DocSection title="Estados" description="Usamos la tarjeta real y navegable de Agenda de la Comunidad para comparar Default, Hover y Focus. Los estados son una simulación visual limitada a esta vista; la tarjeta del producto no se altera. No mostramos Disabled porque no es una variante existente de Card.">
   <ExampleControls label="Estado de Card" value={state} onChange={setState} items={stateItems}/>
   <DocPreview><RealCardSample id="agenda" className="andy-card-real-states" state={state}/></DocPreview>
  </DocSection>

  <DocSection title="Anatomía" description="Estas son las responsabilidades conceptuales de las zonas de Card. Cada tarjeta municipal compone sus partes de manera diferente; por eso el visor anterior las destaca sobre su DOM real, sin imponer un esquema único.">
   <GuidelineTable rows={[
    ['Card','Superficie que contiene información y eventualmente una acción.'],
    ['Header','Identidad: categoría, título, etiquetas y/o presentación principal.'],
    ['Title','Título informativo o nombre de la gestión, con jerarquía clara.'],
    ['Description','Texto breve de contexto cuando la tarjeta lo necesita.'],
    ['Content','Información complementaria: fechas, horarios, ubicación y detalles.'],
    ['Footer','Acción o enlace de acceso cuando existe una región diferenciada.'],
    ['Media (opcional)','Imagen superior, cabecera decorativa o fotografía de fondo según el patrón.'],
    ['Acción contextual','Indicador o acceso adicional solo cuando la tarjeta lo requiere.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="La composición base propone reglas compartidas, pero las tarjetas municipales publicadas mantienen sus medidas y estilos particulares. Los controles de esta página son instrumentos de inspección, no nuevas variantes productivas.">
   <GuidelineTable rows={[
    ['Superficie','Fondo blanco y borde Grey 100 de 1 px en las seis tarjetas seleccionadas; textos y acciones conservan jerarquía primaria.'],
    ['Radio','8 px de radio de tarjeta en los ejemplos existentes.'],
    ['Adaptación','El ancho de cada tarjeta depende de su contenido, contenedor y contexto; no se definen tamaños Small/Default para Card.'],
    ['Espaciado','Padding constante de 24 px. Small: 8 px entre título y descripción / 16 px hasta la acción; Medium: 12 / 24 px; Large: 16 / 32 px.'],
    ['Título','Geometria Bold, generalmente 22/29, Primario 600; contraste específico en fondos oscuros.'],
    ['Texto secundario','Grey 900 / Grey 500 según función, manteniendo jerarquía y legibilidad.'],
    ['Imagen','154 px de alto en Noticias, Agenda y Eventos; Eventos utiliza una fotografía ilustrativa de jazz.'],
    ['Deportes Anual','Cabecera celeste degradada de 50 px en desktop y 48 px en mobile; cuerpo con fondo blanco.'],
    ['Acción','Aplicar las reglas de Button o Link cuando la tarjeta tenga una acción real.'],
    ['Focus','El foco sigue al enlace o control interactivo real; no se dibuja en tarjetas informativas sin acción.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Las seis tarjetas seleccionadas se pueden consultar en Composición y los ejemplos se distribuyen en los bloques superiores, sin repetir una galería al final. Los estados de inspección no crean acciones nuevas ni reemplazan los enlaces o botones reales.">
   <GuidelineTable rows={[
    ['Semántica','Usar article para agrupar una unidad de contenido; no hacer clickeable una tarjeta informativa sin destino.'],
    ['Navegación','Si toda la tarjeta abre un detalle, ofrecer un enlace real y evitar controles interactivos anidados.'],
    ['Hover','Aplicar solo a tarjetas con acción; la vista de Estados muestra un ejemplo real de Agenda.'],
    ['Teclado','Conservar foco visible en el enlace o botón que corresponda.'],
    ['Responsive','Adaptar el ancho al contexto sin convertirlo en variantes de tamaño fijas.'],
    ['Imágenes','Alt descriptivo cuando aportan información; vacío cuando son decorativas.'],
    ['Contenido','Permitir crecimiento vertical cuando los textos necesiten más líneas.'],
    ['Demostraciones','Las muestras de inspección no navegan ni procesan gestiones; las versiones inferiores conservan su comportamiento.'],
   ]}/>
  </DocSection>
 </div>;
}
