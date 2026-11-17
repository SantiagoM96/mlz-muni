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

function BadgePlayground(){
 const [tone,setTone]=useState<BadgeTone>('primary');
 const [appearance,setAppearance]=useState<BadgeAppearance>('soft');
 const [size,setSize]=useState<BadgeSize>('md');
 const [position,setPosition]=useState<BadgeIconPosition>('none');
 const label=tones.find(item=>item.id===tone)?.name||'Default';
 return <>
  <div className="andy-doc-example-controls andy-badge-controls">
   <ChoiceGroup label="Apariencia de Badge" items={appearances} value={appearance} onChange={setAppearance}/>
   <ChoiceGroup label="Color de Badge" items={tones} value={tone} onChange={setTone}/>
   <ChoiceGroup label="Tamaño de Badge" items={sizes} value={size} onChange={setSize}/>
   <ChoiceGroup label="Posición del ícono" items={positions} value={position} onChange={setPosition}/>
  </div>
  <DocPreview className="andy-badge-basic-preview">
   <Badge tone={tone} appearance={appearance} size={size} icon="info"
    iconPosition={position}>{label}</Badge>
  </DocPreview>
 </>;
}

function PaletteGallery({appearance}:{appearance:'soft'|'outline'}){
 return <DocPreview align="start">
  <div className="andy-badge-palette">
   <div className="andy-badge-palette-head" aria-hidden="true">
    <span>Color</span><span>Sin ícono</span><span>Con ícono</span>
   </div>
   {tones.map(tone=><div className="andy-badge-palette-row" key={tone.id}>
    <div className="andy-badge-palette-name">
     <span className={'andy-badge-color-dot tone-'+tone.id} aria-hidden="true"/>
     <span>{tone.name}</span>
    </div>
    <div><Badge tone={tone.id} appearance={appearance} size="md">{tone.name}</Badge></div>
    <div><Badge tone={tone.id} appearance={appearance} size="md" icon="info" iconPosition="start">{tone.name}</Badge></div>
   </div>)}
  </div>
 </DocPreview>;
}

function AdditionalVariants(){
 return <DocPreview>
  <div className="andy-badge-example-row">
   <Badge appearance="solid">Default</Badge>
   <Badge appearance="solid" tone="warning">Alert</Badge>
   <Badge appearance="solid" tone="error">Error</Badge>
   <Badge appearance="solid" tone="success">Success</Badge>
   <Badge appearance="solid" tone="neutral">Neutral</Badge>
   <Badge appearance="ghost" tone="primary">Ghost</Badge>
   <Badge appearance="ghost" tone="purple">Violeta</Badge>
  </div>
 </DocPreview>;
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
function IconGallery(){
 return <DocPreview><div className="andy-badge-example-row">
  <Badge tone="success">Sin ícono</Badge>
  <Badge tone="success" icon="check_circle" iconPosition="start">Confirmado</Badge>
  <Badge tone="success" icon="check_circle" iconPosition="end">Confirmado</Badge>
  <Badge tone="primary" appearance="outline" icon="bookmark" iconPosition="start">Guardado</Badge>
  <Badge tone="primary" appearance="outline" icon="bookmark" iconPosition="end">Guardado</Badge>
 </div></DocPreview>;
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
  <DocSection title="Básico" description="Probá las apariencias, los siete colores, los tres tamaños y la ubicación del ícono. Los controles corresponden a la demostración, no al componente.">
   <BadgePlayground/>
  </DocSection>
  <DocSection title="Fondo suave" description="Las seis familias de color de Figma y una opción neutral. Fondo tenue y texto legible; cada tono se presenta con y sin ícono.">
   <PaletteGallery appearance="soft"/>
  </DocSection>
  <DocSection title="Outline" description="Mismos tonos, con fondo blanco y borde semántico. El contenido mantiene el contraste de lectura.">
   <PaletteGallery appearance="outline"/>
  </DocSection>
  <DocSection title="Variantes adicionales" description="Solid para énfasis puntual, Ghost cuando no se necesita superficie y Neutral para metadatos sin protagonismo.">
   <AdditionalVariants/>
  </DocSection>
  <DocSection title="Tamaños" description="Tres alturas institucionales conservadas: Chico, Mediano y Grande.">
   <SizeGallery/>
  </DocSection>
  <DocSection title="Con íconos" description="Material Symbols Outlined de peso 400: sin ícono, a la izquierda o a la derecha, según el contexto.">
   <IconGallery/>
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
    ['Contraste','Usar tonos de texto intensos del sistema; en Amarillo, texto Grey 900 en lugar de amarillo claro sobre amarillo.'],
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
