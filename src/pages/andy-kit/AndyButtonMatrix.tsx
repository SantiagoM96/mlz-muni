import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-button-matrix.css';

type Kind='primary'|'secondary'|'tertiary'|'ghost'|'link';
type Size='large'|'medium'|'small';
type State='default'|'hover'|'focus'|'pressed'|'active'|'disabled';
type IconPlacement='none'|'start'|'end'|'only';

const kinds:{id:Kind;label:string;description:string}[]=[
 {id:'primary',label:'Primario',description:'La acción más importante del contexto. Utilizá una sola acción primaria por bloque de decisión.'},
 {id:'secondary',label:'Secundario',description:'Complementa la acción principal sin competir con ella en prominencia visual.'},
 {id:'tertiary',label:'Terciario',description:'Alternativa con borde para volver, cancelar o limpiar un valor sin protagonismo principal.'},
 {id:'ghost',label:'Ghost',description:'Acción auxiliar sin fondo permanente; la superficie aparece al interactuar.'},
 {id:'link',label:'Link',description:'Acción de apariencia textual. Para navegar de página, utilizá un enlace semántico.'},
];
const sizes:{id:Size;label:string;description:string}[]=[
 {id:'small',label:'Small',description:'32 px'},
 {id:'medium',label:'Medium',description:'40 px'},
 {id:'large',label:'Large',description:'48 px'},
];
const states:{id:State;label:string}[]=[
 {id:'default',label:'Default'},
 {id:'hover',label:'Hover'},
 {id:'focus',label:'Focus'},
 {id:'pressed',label:'Pressed'},
 {id:'active',label:'Active'},
 {id:'disabled',label:'Disabled'},
];
const placements:{id:IconPlacement;label:string}[]=[
 {id:'none',label:'Sin ícono'},
 {id:'start',label:'Ícono a la izquierda'},
 {id:'end',label:'Ícono a la derecha'},
 {id:'only',label:'Solo ícono'},
];

function ButtonSample({kind,size,state='default',icon='none',loading=false,onClick}:{
 kind:Kind;size:Size;state?:State;icon?:IconPlacement;loading?:boolean;onClick?:()=>void;
}){
 const label=kinds.find(item=>item.id===kind)?.label??'Acción';
 const iconSize=size==='small'?16:size==='medium'?18:20;
 return <button type="button" disabled={state==='disabled'||loading} onClick={onClick}
  className={'andy-system-button is-'+kind+' is-'+size+' state-'+state+' icon-'+icon+(loading?' is-loading':'')}
  data-kind={kind} data-state={state} data-size={size} data-icon={icon}
  aria-label={loading?'Procesando '+label:icon==='only'?label:undefined}
  aria-busy={loading||undefined}>
  {loading&&<MaterialIcon name="sync" size={iconSize} className="andy-button-spinner"/>}
  {!loading&&(icon==='start'||icon==='only')&&<MaterialIcon name="check" size={iconSize} weight={400}/>}
  {icon!=='only'&&<span>{loading?'Procesando…':label}</span>}
  {!loading&&icon==='end'&&<MaterialIcon name="arrow_forward" size={iconSize} weight={400}/>}
 </button>;
}

function ExampleControls<T extends string>({label,items,value,onChange}:{
 label:string;items:readonly {id:T;label:string}[];value:T;onChange:(value:T)=>void;
}){
 return <div className="andy-doc-example-controls">
  <div className="andy-doc-example-group" role="group" aria-label={label}>
   {items.map(item=><button key={item.id} type="button" aria-pressed={value===item.id}
    onClick={()=>onChange(item.id)}>{item.label}</button>)}
  </div>
 </div>;
}
function Preview({children}:{children:React.ReactNode}){
 return <DocPreview className="andy-button-showcase">
  <div className="andy-button-floating-samples">{children}</div>
 </DocPreview>;
}

export function AndyButtonMatrix(){
 const [stateKind,setStateKind]=useState<Kind>('primary');
 const [iconKind,setIconKind]=useState<Kind>('primary');
 const [iconSize,setIconSize]=useState<Size>('medium');
 const [iconPlacement,setIconPlacement]=useState<IconPlacement>('start');
 const [loading,setLoading]=useState(false);
 const [lastClicked,setLastClicked]=useState('');

 return <>
  <DocSection title="Descripción" description="Button representa una acción que una persona puede ejecutar. La jerarquía entre Primario, Secundario, Terciario, Ghost y Link debe ser consistente con la importancia de cada acción.">{null}</DocSection>

  <DocSection title="Básico" description="Ejemplo de una acción principal junto a una alternativa de menor jerarquía. Conservan la geometría, los colores y la tipografía institucional.">
   <Preview>
    <ButtonSample kind="primary" size="large"/>
    <ButtonSample kind="tertiary" size="large"/>
   </Preview>
  </DocSection>

  {kinds.map(kind=><DocSection key={kind.id} title={kind.label} description={kind.description}>
   <Preview><ButtonSample kind={kind.id} size="large"/></Preview>
  </DocSection>)}

  <DocSection title="Tamaños" description="Los tres tamaños conservan el radio de 4 px. Small mide 32 px, Medium 40 px y Large 48 px de altura; la tipografía y el padding siguen la misma escala.">
   <Preview>
    {sizes.map(size=><div className="andy-button-size-example" key={size.id}>
     <ButtonSample kind="primary" size={size.id}/>
     <strong>{size.label}</strong>
     <span>{size.description}</span>
    </div>)}
   </Preview>
  </DocSection>

  <DocSection title="Estados" description="Compará Default, Hover, Focus, Pressed, Active y Disabled. Elegí el estilo de botón para ver cómo responde cada estado.">
   <ExampleControls label="Estilo de botón" items={kinds} value={stateKind} onChange={setStateKind}/>
   <DocPreview className="andy-button-showcase">
    <div className="andy-button-state-gallery">
     {states.map(state=><div className="andy-button-state-example" key={state.id}>
      <strong>{state.label}</strong>
      <ButtonSample kind={stateKind} size="medium" state={state.id}/>
     </div>)}
    </div>
   </DocPreview>
  </DocSection>

  <DocSection title="Íconos" description="La posición y el tamaño del ícono cambian, pero no alteran la altura del botón. Usamos Material Symbols Outlined de peso 400.">
   <div className="andy-button-icon-controls">
    <ExampleControls label="Posición del ícono" items={placements} value={iconPlacement} onChange={setIconPlacement}/>
    <ExampleControls label="Tamaño del botón" items={sizes} value={iconSize} onChange={setIconSize}/>
    <ExampleControls label="Estilo del botón" items={kinds} value={iconKind} onChange={setIconKind}/>
   </div>
   <Preview><ButtonSample kind={iconKind} size={iconSize} icon={iconPlacement}/></Preview>
  </DocSection>

  <DocSection title="Loading / Spinner" description="El estado Loading comunica que una operación está procesándose e impide activaciones repetidas. Conserva el estilo y el tamaño de cada botón.">
   <ExampleControls label="Estado de carga" items={[{id:'default',label:'Default'},{id:'loading',label:'Loading'}] as const}
    value={loading?'loading':'default'} onChange={next=>setLoading(next==='loading')}/>
   <Preview>
    <ButtonSample kind="primary" size="large" loading={loading}/>
    <ButtonSample kind="secondary" size="medium" loading={loading}/>
    <ButtonSample kind="tertiary" size="small" loading={loading}/>
   </Preview>
  </DocSection>

  <DocSection title="Como enlace" description="Si la acción cambia de página, corresponde usar un enlace real. Esta muestra conserva su apariencia, foco y hover, pero no navega fuera del Design System.">
   <Preview>
    <a className="andy-system-button is-link is-medium icon-end" href="#como-enlace" onClick={event=>event.preventDefault()}>
     Ver detalles<MaterialIcon name="arrow_forward" size={18} weight={400}/>
    </a>
   </Preview>
  </DocSection>

  <DocSection title="Interacción" description="Probá los estados reales de hover, focus y pressed. Al hacer clic, el ejemplo indica qué botón se activó sin modificar información.">
   <Preview>
    {kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size="medium" onClick={()=>setLastClicked(kind.label)}/>)}
   </Preview>
   {lastClicked&&<p className="andy-button-feedback" role="status">Última acción de demostración: {lastClicked}</p>}
  </DocSection>

  <DocSection title="Anatomía" description="Partes del componente compartidas por todas las variantes de Button.">
   <GuidelineTable rows={[
    ['Contenedor','Botón nativo o enlace semántico con superficie interactiva y radio de 4 px.'],
    ['Etiqueta','Texto descriptivo de acción, centrado y con tipografía Geometria Bold.'],
    ['Ícono opcional','Material Symbols Outlined de peso 400, al inicio, al final o sin texto.'],
    ['Indicador Loading','Spinner que representa la operación en curso y evita clics repetidos.'],
    ['Área interactiva','Altura y padding definidos por Small, Medium o Large, independientemente del estado.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Valores de diseño institucionales que conserva el componente en todos sus estilos y estados.">
   <GuidelineTable rows={[
    ['Estilos','Primario, Secundario, Terciario, Ghost y Link.'],
    ['Tamaños','Small 32 px · Medium 40 px · Large 48 px.'],
    ['Radio','4 px, sin redondeo pill predeterminado.'],
    ['Tipografía','Geometria Bold: 14 px Small, 16 px Medium y 18 px Large.'],
    ['Estados','Default, Hover, Focus, Pressed, Active, Disabled y Loading.'],
    ['Focus','Contorno de 2 px, visible al navegar con teclado.'],
    ['Íconos','Material Symbols Outlined: 16 px Small, 18 px Medium y 20 px Large.'],
    ['Loading','Spinner animado, respetando prefers-reduced-motion y sin perder la prominencia cromática.'],
    ['Acción destructiva','Se documenta en contextos que requieren confirmación; no es un sexto estilo base.'],
    ['Button Group','Se documenta de manera independiente en Actions.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="El estilo debe reflejar la función real de cada control y comunicar sus estados sin depender exclusivamente del color.">
   <GuidelineTable rows={[
    ['Acción','Usar type="button" para acciones generales y type="submit" al enviar un formulario.'],
    ['Navegación','Usar enlaces a o Link para cambiar de pantalla, incluso cuando tienen aspecto de botón.'],
    ['Disabled','Un botón deshabilitado no puede activarse y no recibe el foco mediante Tab.'],
    ['Loading','Evita envíos duplicados y comunica aria-busy durante el proceso.'],
    ['Solo ícono','Debe incluir un nombre accesible como aria-label.'],
    ['Toggle','aria-pressed solo corresponde a botones de selección real.'],
    ['Jerarquía','Evitar dos acciones primarias compitiendo en el mismo bloque.'],
   ]}/>
  </DocSection>
 </>;
}
