import { useState, type CSSProperties, type MouseEvent } from 'react';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyCardAnatomySwitcher, AndyCardSpecimen } from './AndyCardAnatomySwitcher';
import './andy-card-foundation-docs.css';

type VisualState='default'|'hover'|'focus';
type CardWidth='regular'|'compact';
type Spacing=16|20|24|32;
type ImageExample='news'|'agenda';

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
 id:'appointment'|'news'|'agenda';
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
 const [size,setSize]=useState<CardWidth>('regular');
 const [spacing,setSpacing]=useState<Spacing>(24);
 const [image,setImage]=useState<ImageExample>('news');
 const [state,setState]=useState<VisualState>('default');

 return <div className="andy-card-foundation-docs">
  <DocSection title="Descripción" description="Card agrupa información y acciones relacionadas dentro de una superficie con identidad propia. Nuestras composiciones de Deportes, Agenda, Noticias y gestiones municipales son los ejemplos de referencia; no inventamos una tarjeta ficticia para representarlas.">{null}</DocSection>

  <DocSection title="Básico" description="La tarjeta de Turnos online es una muestra existente de Card informativa con título, descripción y acceso. Sirve como punto de partida para estudiar la estructura más sencilla de esta familia.">
   <DocPreview><RealCardSample id="appointment"/></DocPreview>
  </DocSection>

  <DocSection title="Composición" description="Seleccioná cualquiera de las ocho tarjetas municipales. Los fondos casi imperceptibles y las líneas punteadas finas señalan Header, Content y Footer directamente sobre los elementos reales. No se agregan piezas inexistentes.">
   <AndyCardAnatomySwitcher/>
  </DocSection>

  <DocSection title="Tamaños" description="Comprobá cómo responde una tarjeta real de Turnos online a dos anchos de contenedor. No se inventan variantes visuales ni se modifica la escala tipográfica original: cambia únicamente el espacio horizontal disponible.">
   <ExampleControls label="Ancho de Card" value={size} onChange={setSize}
    items={[{id:'regular',label:'420 px'},{id:'compact',label:'340 px'}]}/>
   <DocPreview>
    <RealCardSample id="appointment"
     className={'andy-card-real-size is-'+size}/>
   </DocPreview>
  </DocSection>

  <DocSection title="Espaciado" description="Probá 16, 20, 24 y 32 px sobre la misma tarjeta de Turnos online. Solo la muestra modifica temporalmente su padding y separación internos; la tarjeta municipal original de abajo conserva sus valores aprobados.">
   <ExampleControls label="Espaciado de Card" value={String(spacing)}
    onChange={value=>setSpacing(Number(value) as Spacing)}
    items={([16,20,24,32] as const).map(value=>({id:String(value),label:value+' px'}))}/>
   <DocPreview>
    <RealCardSample id="appointment" className="andy-card-real-spacing"
     style={{'--andy-inspection-spacing':spacing+'px'} as CSSProperties}/>
   </DocPreview>
  </DocSection>

  <DocSection title="Imagen" description="Las fotografías reales de Noticias y Agenda muestran la cabecera visual de 154 px, el recorte con object-fit: cover y la relación con el cuerpo. En otras variantes una imagen puede funcionar como fondo.">
   <ExampleControls label="Tarjeta con imagen" value={image} onChange={setImage}
    items={[{id:'news',label:'Noticias'},{id:'agenda',label:'Agenda de la Comunidad'}]}/>
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
    ['Superficie','Blanco y borde Grey 100 de 1 px para tarjetas estándar; hay superficies primarias como Trámites.'],
    ['Radio','8 px de radio de tarjeta en los ejemplos existentes.'],
    ['Anchos','Las muestras admiten hasta 420 px; 340 px se usa aquí para verificar la adaptación.'],
    ['Espaciado','24 px de padding usual en contenidos municipales; 16, 20 y 32 px son valores de comparación en la demo.'],
    ['Título','Geometria Bold, generalmente 22/29, Primario 600; contraste específico en fondos oscuros.'],
    ['Texto secundario','Grey 900 / Grey 500 según función, manteniendo jerarquía y legibilidad.'],
    ['Imagen','154 px de alto en Noticias y Agenda; las imágenes de fondo tienen tratamientos independientes.'],
    ['Deportes Anual','Cabecera blanca de 50 px en desktop y 48 px en mobile, 16 px más alta que antes.'],
    ['Acción','Aplicar las reglas de Button o Link cuando la tarjeta tenga una acción real.'],
    ['Focus','El foco sigue al enlace o control interactivo real; no se dibuja en tarjetas informativas sin acción.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Las ocho tarjetas originales siguen siendo la referencia visual. Los estados de inspección no crean acciones nuevas ni reemplazan los enlaces, botones y estructuras semánticas reales de cada producto.">
   <GuidelineTable rows={[
    ['Semántica','Usar article para agrupar una unidad de contenido; no hacer clickeable una tarjeta informativa sin destino.'],
    ['Navegación','Si toda la tarjeta abre un detalle, ofrecer un enlace real y evitar controles interactivos anidados.'],
    ['Hover','Aplicar solo a tarjetas con acción; la vista de Estados muestra un ejemplo real de Agenda.'],
    ['Teclado','Conservar foco visible en el enlace o botón que corresponda.'],
    ['Tamaños','Mantener las medidas internas del componente y verificar su ancho responsive.'],
    ['Imágenes','Alt descriptivo cuando aportan información; vacío cuando son decorativas.'],
    ['Contenido','Permitir crecimiento vertical cuando los textos necesiten más líneas.'],
    ['Demostraciones','Las muestras de inspección no navegan ni procesan gestiones; las versiones inferiores conservan su comportamiento.'],
   ]}/>
  </DocSection>
 </div>;
}
