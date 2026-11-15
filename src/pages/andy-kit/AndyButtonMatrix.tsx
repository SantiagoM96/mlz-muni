import { useState, type ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-button-matrix.css';

type Kind='primary'|'secondary'|'tertiary'|'ghost'|'link';
type Size='large'|'medium'|'small';
type State='default'|'hover'|'focus'|'pressed'|'active'|'disabled';
type IconPlacement='none'|'start'|'end'|'only';
const kinds:{id:Kind;label:string}[]=[
  {id:'primary',label:'Primario'},
  {id:'secondary',label:'Secundario'},
  {id:'tertiary',label:'Terciario'},
  {id:'ghost',label:'Ghost'},
  {id:'link',label:'Link'}
];
const states:{id:State;label:string}[]=[
  {id:'default',label:'Default'},
  {id:'hover',label:'Hover'},
  {id:'focus',label:'Focus'},
  {id:'pressed',label:'Pressed'},
  {id:'active',label:'Active'},
  {id:'disabled',label:'Disabled'}
];
const sizes:{id:Size;label:string;description:string}[]=[
  {id:'large',label:'Large',description:'48 px'},
  {id:'medium',label:'Medium',description:'40 px'},
  {id:'small',label:'Small',description:'32 px'}
];
const placements:{id:IconPlacement;label:string}[]=[
  {id:'none',label:'Sin ícono'},
  {id:'start',label:'Ícono a la izquierda'},
  {id:'end',label:'Ícono a la derecha'},
  {id:'only',label:'Solo ícono'}
];
function ButtonSample({kind,size,state='default',icon='none',onClick}:{
 kind:Kind;size:Size;state?:State;icon?:IconPlacement;onClick?:()=>void
}){
 const label=kinds.find(v=>v.id===kind)?.label??'Acción';
 return <button type="button" disabled={state==='disabled'} onClick={onClick}
  className={`andy-system-button is-${kind} is-${size} state-${state} icon-${icon}`}
  data-kind={kind} data-state={state} data-size={size} data-icon={icon}
  aria-label={icon==='only'?label:undefined} aria-pressed={state==='active'||undefined}>
   {(icon==='start'||icon==='only')&&<MaterialIcon name="check" size={size==='small'?16:size==='medium'?18:20}/>}
   {icon!=='only'&&<span>{label}</span>}
   {icon==='end'&&<MaterialIcon name="arrow_forward" size={size==='small'?16:size==='medium'?18:20}/>}
 </button>;
}
const variantDetails: Record<Kind,{purpose:string;example:string;guidance:string}>={
 primary:{purpose:'Acción principal de la pantalla.',example:'Continuar',guidance:'Usar un solo primario por bloque de decisión.'},
 secondary:{purpose:'Alternativa complementaria a la principal.',example:'Ver resultados',guidance:'Ideal cuando la acción no debe competir con la principal.'},
 tertiary:{purpose:'Opción con borde y peso visual menor.',example:'Borrar fecha',guidance:'Útil para limpiar, volver o cancelar un paso.'},
 ghost:{purpose:'Acción auxiliar sin superficie permanente.',example:'Limpiar filtros',guidance:'Usar en herramientas o acciones poco prominentes.'},
 link:{purpose:'Acción de aspecto textual.',example:'Ver detalles',guidance:'Para navegar realmente, utilizar un enlace semántico.'}
};
function DocSection({id,title,description,children}:{id:string;title:string;description:string;children:ReactNode}){
 return <section id={id} className="andy-button-doc-section">
  <div className="andy-button-section-intro"><h3>{title}</h3><p>{description}</p></div>
  {children}
 </section>;
}
function Preview({children}:{children:ReactNode}){
 return <div className="andy-button-preview"><div className="andy-button-floating-samples">{children}</div></div>;
}
export function AndyButtonMatrix(){
 const [stateKind,setStateKind]=useState<Kind>('primary');
 const [iconSize,setIconSize]=useState<Size>('medium');
 const [placement,setPlacement]=useState<IconPlacement>('none');
 const [lastClicked,setLastClicked]=useState('');
 return <div className="andy-button-documentation">
  <div className="andy-button-introduction">
   <p>Las acciones deben transmitir una jerarquía clara. Estas muestras utilizan los colores, la tipografía, las alturas y los íconos de MLZ.</p>
   <Preview><ButtonSample kind="primary" size="large" onClick={()=>setLastClicked('Continuar')}/>
    <ButtonSample kind="tertiary" size="large" onClick={()=>setLastClicked('Volver')}/></Preview>
  </div>
  <nav className="andy-button-on-this-page" aria-label="En esta página">
   <strong>En esta página</strong><a href="#variantes">Variantes</a><a href="#tamanos">Tamaños</a><a href="#estados">Estados</a><a href="#iconografia">Íconos</a><a href="#uso">Uso</a>
  </nav>
  <DocSection id="variantes" title="Variantes" description="Cada tipo aparece en una caja independiente y centrado, para evaluar su peso visual sin mezclarlo con otros tipos.">
   {kinds.map(kind=><div key={kind.id} className="andy-button-variant-example">
    <h4>{kind.label}</h4><p>{variantDetails[kind.id].purpose}</p>
    <Preview><ButtonSample kind={kind.id} size="large" onClick={()=>setLastClicked(kind.label)}/></Preview>
    <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>{variantDetails[kind.id].guidance}</p>
   </div>)}
  </DocSection>
  <DocSection id="tamanos" title="Tamaños" description="Small, Medium y Large mantienen el mismo radio de 4 px. La escala modifica alto, cuerpo, padding e íconos.">
   <Preview>{sizes.map(size=><div key={size.id} className="andy-button-size-example">
    <ButtonSample kind="primary" size={size.id}/>
    <strong>{size.label}</strong><span>{size.description}</span>
   </div>)}</Preview>
   <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>Small 32 px · Medium 40 px · Large 48 px. Elegí según la densidad del contexto.</p>
  </DocSection>
  <DocSection id="estados" title="Estados" description="Compará los seis estados de forma persistente. Elegí el tipo de botón que querés inspeccionar.">
   <div className="andy-button-control-row" role="group" aria-label="Tipo de botón para estados">
    {kinds.map(kind=><button key={kind.id} type="button" aria-pressed={stateKind===kind.id} onClick={()=>setStateKind(kind.id)}>{kind.label}</button>)}
   </div>
   <div className="andy-button-preview andy-button-states-preview"><div className="andy-button-state-gallery">
    {states.map(state=><div className="andy-button-state-example" key={state.id}>
     <strong>{state.label}</strong><span>{state.id==='default'?'En reposo':state.id==='hover'?'Puntero encima':state.id==='focus'?'Foco de teclado':state.id==='pressed'?'Durante el clic':state.id==='active'?'Seleccionado':'No interactivo'}</span>
     <ButtonSample kind={stateKind} size="medium" state={state.id}/>
    </div>)}
   </div></div>
   <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>Focus debe verse al navegar por teclado. Disabled mantiene una indicación visual clara de indisponibilidad.</p>
  </DocSection>
  <DocSection id="iconografia" title="Íconos" description="La compensación óptica reduce el padding únicamente del lado del ícono, sin cambiar la altura ni el estilo del botón.">
   <div className="andy-button-control-row" role="group" aria-label="Tamaño para opciones de ícono">
    {sizes.map(size=><button type="button" key={size.id} aria-pressed={iconSize===size.id} onClick={()=>setIconSize(size.id)}>{size.label} · {size.description}</button>)}
   </div>
   {placements.map(place=><div className="andy-button-variant-example" key={place.id}>
    <h4>{place.label}</h4>
    <Preview>{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size={iconSize} icon={place.id}/>)}</Preview>
   </div>)}
  </DocSection>
  <DocSection id="uso" title="Uso y comportamiento" description="Ejemplos interactivos para probar hover, focus y pressed reales.">
   <div className="andy-button-control-row" role="group" aria-label="Posición de ícono">
    {placements.map(place=><button type="button" key={place.id} aria-pressed={placement===place.id} onClick={()=>setPlacement(place.id)}>{place.label}</button>)}
   </div>
   <Preview>{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size="medium" icon={placement} onClick={()=>setLastClicked(kind.label)}/>)}</Preview>
   {lastClicked&&<p className="andy-button-feedback" role="status">Última acción de demostración: {lastClicked}</p>}
   <div className="andy-button-usage-notes"><p><strong>Jerarquía.</strong> Evitar dos primarios compitiendo en el mismo bloque.</p>
    <p><strong>Íconos.</strong> Material Symbols Outlined, con menor padding del lado del pictograma.</p>
    <p><strong>Accesibilidad.</strong> Los botones de solo ícono requieren un nombre accesible.</p></div>
  </DocSection>
 </div>;
}
