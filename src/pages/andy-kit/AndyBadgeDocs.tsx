import { useState } from 'react';
import { Badge, RemovableChip, type BadgeAppearance, type BadgeIconPosition, type BadgeSize, type BadgeTone } from '../../shared/ui/Badge';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-badge-docs.css';

const tones:{id:BadgeTone;name:string;description:string}[]=[
 {id:'primary',name:'Default',description:'Identificación institucional'},
 {id:'warning',name:'Amarillo',description:'Precaución o atención'},
 {id:'error',name:'Rojo',description:'Error o incidencia'},
 {id:'success',name:'Verde',description:'Estado satisfactorio'},
 {id:'info',name:'Azul',description:'Información contextual'},
 {id:'purple',name:'Violeta',description:'Clasificación secundaria'},
 {id:'neutral',name:'Neutral',description:'Metadatos sin prioridad'},
];
const appearances:{id:BadgeAppearance;name:string}[]=[
 {id:'soft',name:'Fondo suave'},{id:'outline',name:'Outline'},
 {id:'solid',name:'Solid'},{id:'ghost',name:'Ghost'},
];
const sizes:{id:BadgeSize;name:string;px:string}[]=[
 {id:'sm',name:'Chico',px:'24 px'},
 {id:'md',name:'Mediano',px:'28 px'},
 {id:'lg',name:'Grande',px:'32 px'},
];
const positions:{id:BadgeIconPosition;name:string}[]=[
 {id:'none',name:'Sin ícono'},{id:'start',name:'Izquierda'},{id:'end',name:'Derecha'},
];

function ChoiceGroup<T extends string>({label,items,value,onChange}:{
 label:string;
 items:readonly {id:T;name:string}[];
 value:T;
 onChange:(next:T)=>void;
}) {
 return <div className="andy-doc-example-group" role="group" aria-label={label}>
  {items.map(item=><button type="button" key={item.id} aria-pressed={value===item.id}
   onClick={()=>onChange(item.id)}>{item.name}</button>)}
 </div>;
}

function BadgeAppearanceDemo(){
 const [appearance,setAppearance]=useState<BadgeAppearance>('soft');
 return <>
  <div className="andy-doc-example-controls andy-badge-controls">
   <ChoiceGroup label="Apariencia de Badge" items={appearances} value={appearance} onChange={setAppearance}/>
  </div>
  <DocPreview className="andy-badge-basic-preview">
   <div className="andy-badge-example-row">
    <Badge tone="primary" appearance={appearance}>Default</Badge>
    <Badge tone="info" appearance={appearance}>Información</Badge>
    <Badge tone="neutral" appearance={appearance}>Neutral</Badge>
   </div>
  </DocPreview>
 </>;
}
function BadgeColorDemo(){
 return <DocPreview align="start">
  <div className="andy-badge-palette" role="list" aria-label="Todos los colores y apariencias en tamaño mediano">
   {tones.map(tone=><div className="andy-badge-palette-item" role="listitem" key={tone.id}>
    <strong className="andy-badge-palette-name">{tone.name}</strong>
    <div className="andy-badge-palette-examples">
     {appearances.map(appearance=><Badge key={appearance.id} tone={tone.id} appearance={appearance.id} size="md" title={appearance.name}>
      {tone.name}
     </Badge>)}
    </div>
   </div>)}
  </div>
 </DocPreview>;
}
function BadgeSizeDemo(){
 const [size,setSize]=useState<BadgeSize>('md');
 return <>
  <div className="andy-doc-example-controls andy-badge-controls">
   <ChoiceGroup label="Tamaño de Badge" items={sizes} value={size} onChange={setSize}/>
  </div>
  <DocPreview className="andy-badge-basic-preview">
   <div className="andy-badge-example-row">
    <Badge size={size}>Default</Badge>
    <Badge size={size} tone="success" icon="check_circle" iconPosition="start">Confirmado</Badge>
    <Badge size={size} tone="neutral" appearance="outline">Neutral</Badge>
   </div>
  </DocPreview>
  <SizeGallery/>
 </>;
}
function BadgeIconDemo(){
 const [position,setPosition]=useState<BadgeIconPosition>('start');
 return <>
  <div className="andy-doc-example-controls andy-badge-controls">
   <ChoiceGroup label="Posición del ícono" items={positions} value={position} onChange={setPosition}/>
  </div>
  <DocPreview className="andy-badge-basic-preview">
   <div className="andy-badge-example-row">
    <Badge tone="primary" icon="info" iconPosition={position}>Información</Badge>
    <Badge tone="success" icon="check_circle" iconPosition={position}>Confirmado</Badge>
    <Badge tone="error" icon="error" iconPosition={position}>Revisar</Badge>
   </div>
  </DocPreview>
 </>;
}

function SizeGallery(){
 return <DocPreview>
  <div className="andy-badge-sizes">
   {sizes.map(size=><div className="andy-badge-size-item" key={size.id}>
    <Badge size={size.id} tone="primary">{size.name}</Badge>
    <strong>{size.name}</strong><span>{size.px}</span>
   </div>)}
  </div>
 </DocPreview>;
}
function SpinnerGallery(){
 return <DocPreview><div className="andy-badge-example-row">
  <Badge tone="info" loading>Procesando…</Badge>
  <Badge tone="primary" appearance="outline" loading iconPosition="end">Generando…</Badge>
  <Badge tone="neutral" loading>Actualizando…</Badge>
 </div></DocPreview>;
}
function LinkGallery(){
 return <DocPreview>
  <Badge href="#anatomia" tone="primary" appearance="outline" icon="arrow_forward" iconPosition="end">
   Ver anatomía
  </Badge>
 </DocPreview>;
}
function ChipGallery(){
 const initial=['Lunes','Casa Ari','Recreativo'];
 const [chips,setChips]=useState<string[]>(initial);
 return <>
  <div className="andy-doc-example-controls">
   <button type="button" className="andy-badge-reset" onClick={()=>setChips(initial)}
    disabled={chips.length===initial.length}>Restablecer ejemplo</button>
  </div>
  <DocPreview>
   <div className="andy-badge-example-row" aria-label="Chips seleccionados">
    {chips.length
      ? chips.map(chip=><RemovableChip key={chip} label={chip} onRemove={()=>setChips(items=>items.filter(item=>item!==chip))}/>)
      : <span className="andy-badge-empty" role="status">No hay filtros seleccionados.</span>}
   </div>
  </DocPreview>
 </>;
}

export function AndyBadgeDocs(){
 return <>
  <DocSection title="Descripción" description="Badge identifica estados, categorías o información breve. Es informativo por defecto; las acciones y la navegación se implementan con elementos semánticos diferentes.">{null}</DocSection>
  <DocSection title="Apariencias" description="Elegí entre Fondo suave, Outline, Solid y Ghost. Cada presentación usa los mismos tokens de color institucionales.">
   <BadgeAppearanceDemo/>
  </DocSection>
  <DocSection title="Colores" description="Todos los colores del Design System en Fondo suave, Outline, Solid y Ghost, en tamaño Mediano (28 px).">
   <BadgeColorDemo/>
  </DocSection>
  <DocSection title="Tamaños" description="Probá los tres tamaños institucionales: Chico 24 px, Mediano 28 px y Grande 32 px.">
   <BadgeSizeDemo/>
  </DocSection>
  <DocSection title="Íconos" description="Visualizá Material Symbols Outlined a la izquierda, a la derecha o sin ícono.">
   <BadgeIconDemo/>
  </DocSection>
  <DocSection title="Con spinner" description="Un indicador de operación en curso acompaña el texto. No comunica por sí solo un porcentaje de avance.">
   <SpinnerGallery/>
  </DocSection>
  <DocSection title="Como enlace" description="Para navegar, el Badge debe renderizar un enlace real, con destino, foco visible y respuesta al teclado.">
   <LinkGallery/>
  </DocSection>
  <DocSection title="Chip removible" description="El chip con acción de quitar es un componente distinto del Badge informativo. Su botón tiene un nombre accesible y no anida acciones.">
   <ChipGallery/>
  </DocSection>
  <DocSection title="Anatomía" description="Separación de elementos de presentación y comportamiento para favorecer su reutilización.">
   <GuidelineTable rows={[
    ['Badge','Contenedor informativo con tono, apariencia y tamaño, sin interacción por defecto.'],
    ['Texto','Etiqueta corta que comunica estado o categoría y que no depende exclusivamente del color.'],
    ['Ícono opcional','Material Symbols Outlined, peso 400, a la izquierda o derecha del texto.'],
    ['Spinner opcional','Ícono sync animado; se detiene cuando la persona prefiere reducir movimiento.'],
    ['Badge como enlace','Elemento <a> real, con atributo href, hover y foco visible.'],
    ['RemovableChip','Composición separada que expone un botón de cierre con aria-label específico.'],
   ]}/>
  </DocSection>
  <DocSection title="Especificaciones" description="Escala de Badge alineada con los tokens de geometría, tipografía y color de MLZ.">
   <GuidelineTable rows={[
    ['Alturas','Chico 24 px, Mediano 28 px y Grande 32 px.'],
    ['Radio','6 px (Radius MD), el mismo en todas las apariencias.'],
    ['Padding horizontal','Chico 6 px, Mediano 8 px y Grande 10 px.'],
    ['Espaciado ícono-texto','6 px, token --mlz-space-6.'],
    ['Tipografía','Geometria 500: 14/18 px, 16/20 px y 18/22 px para cada tamaño.'],
    ['Colores','Primario, Amarillo, Rojo, Verde, Azul y Violeta de Figma; Neutral basado en Natural/Grey.'],
    ['Contraste','Los colores reproducen fielmente los tokens de Figma. En usos con texto informativo extenso, verificar contraste WCAG y acompañar el color con una etiqueta clara.'],
    ['Iconografía','Material Symbols Outlined, peso 400, con tamaños 14, 16 y 18 px.'],
    ['Vista previa','Una única caja blanca con al menos 40 px de padding; controles de ejemplo por fuera y encima.'],
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento" description="Badge comunica información; solo las composiciones explícitamente interactivas responden a acciones.">
   <GuidelineTable rows={[
    ['Informativo','Usar span, sin hover de botón ni foco de teclado. El color complementa el texto.'],
    ['Como enlace','Usar un enlace real, subrayado en hover y foco visible de 2 px, sin simular un botón.'],
    ['Spinner','Mostrarlo únicamente durante una operación activa; respetar prefers-reduced-motion.'],
    ['Removible','El botón Quitar es un control independiente, operable con teclado y nombre accesible.'],
    ['Semántica','No convertir automáticamente un Badge en Toggle o Button; usar componentes específicos.'],
    ['Referencia','shadcn/ui Badge (Base UI): variantes, posición de ícono, spinner y enlace, adaptados a MLZ.'],
   ]}/>
  </DocSection>
 </>;
}
