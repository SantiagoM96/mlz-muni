import { useState, type ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { GuidelineTable } from './AndyDocsPrimitives';
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
function ButtonSample({kind,size,state='default',icon='none',loading=false,onClick}:{
 kind:Kind;size:Size;state?:State;icon?:IconPlacement;loading?:boolean;onClick?:()=>void
}){
 const label=kinds.find(v=>v.id===kind)?.label??'Acción';
 const iconSize=size==='small'?16:size==='medium'?18:20;
 return <button type="button" disabled={state==='disabled'||loading} onClick={onClick}
  className={`andy-system-button is-${kind} is-${size} state-${state} icon-${icon}${loading?' is-loading':''}`}
  data-kind={kind} data-state={state} data-size={size} data-icon={icon}
  aria-label={loading?'Procesando '+label:icon==='only'?label:undefined}
  aria-busy={loading||undefined}>
   {loading&&<MaterialIcon name="sync" size={iconSize} className="andy-button-spinner"/>}
   {!loading&&(icon==='start'||icon==='only')&&<MaterialIcon name="check" size={iconSize}/>}
   {icon!=='only'&&<span>{loading?'Procesando…':label}</span>}
   {!loading&&icon==='end'&&<MaterialIcon name="arrow_forward" size={iconSize}/>}
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
 const [loading,setLoading]=useState(false);
 return <div className="andy-button-documentation">
  <div className="andy-button-introduction">
   <p>Las acciones deben transmitir una jerarquía clara. Estas muestras utilizan los colores, la tipografía, las alturas y los íconos de MLZ.</p>
   <Preview><ButtonSample kind="primary" size="large" onClick={()=>setLastClicked('Continuar')}/>
    <ButtonSample kind="tertiary" size="large" onClick={()=>setLastClicked('Volver')}/></Preview>
  </div>
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
   <div className="andy-doc-example-controls">
   <div className="andy-doc-example-group" role="group" aria-label="Tipo de botón para estados">
    {kinds.map(kind=><button key={kind.id} type="button" aria-pressed={stateKind===kind.id} onClick={()=>setStateKind(kind.id)}>{kind.label}</button>)}
   </div></div>
   <div className="andy-button-preview andy-button-states-preview"><div className="andy-button-state-gallery">
    {states.map(state=><div className="andy-button-state-example" key={state.id}>
     <strong>{state.label}</strong><span>{state.id==='default'?'En reposo':state.id==='hover'?'Puntero encima':state.id==='focus'?'Foco de teclado':state.id==='pressed'?'Durante el clic':state.id==='active'?'Seleccionado':'No interactivo'}</span>
     <ButtonSample kind={stateKind} size="medium" state={state.id}/>
    </div>)}
   </div></div>
   <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>Focus debe verse al navegar por teclado. Disabled mantiene una indicación visual clara de indisponibilidad.</p>
  </DocSection>
  <DocSection id="iconografia" title="Íconos" description="La compensación óptica reduce el padding únicamente del lado del ícono, sin cambiar la altura ni el estilo del botón.">
   <div className="andy-doc-example-controls">
   <div className="andy-doc-example-group" role="group" aria-label="Tamaño para opciones de ícono">
    {sizes.map(size=><button type="button" key={size.id} aria-pressed={iconSize===size.id} onClick={()=>setIconSize(size.id)}>{size.label} · {size.description}</button>)}
   </div></div>
   {placements.map(place=><div className="andy-button-variant-example" key={place.id}>
    <h4>{place.label}</h4>
    <Preview>{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size={iconSize} icon={place.id}/>)}</Preview>
   </div>)}
  </DocSection>
  <DocSection id="loading" title="Loading / Spinner" description="Informa que una acción está procesándose y evita envíos duplicados. El ícono de carga conserva la escala Material Symbols Outlined.">
   <div className="andy-doc-example-controls">
    <div className="andy-doc-example-group" role="group" aria-label="Estado de carga">
     <button type="button" aria-pressed={!loading} onClick={()=>setLoading(false)}>Default</button>
     <button type="button" aria-pressed={loading} onClick={()=>setLoading(true)}>Loading</button>
    </div>
   </div>
   <Preview>
    <ButtonSample kind="primary" size="large" loading={loading} onClick={()=>setLoading(true)}/>
    <ButtonSample kind="secondary" size="medium" loading={loading} onClick={()=>setLoading(true)}/>
    <ButtonSample kind="tertiary" size="small" loading={loading} onClick={()=>setLoading(true)}/>
   </Preview>
   <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>En carga, el botón mantiene su color, informa aria-busy y bloquea clics repetidos. La muestra se restablece seleccionando Default.</p>
  </DocSection>
  <DocSection id="enlace" title="Como enlace" description="Una acción cambia de pantalla mediante un enlace semántico, no mediante un botón con apariencia de link.">
   <Preview>
    <a className="andy-system-button is-link is-medium icon-end" href="#enlace" onClick={event=>event.preventDefault()}>Ver detalles<MaterialIcon name="arrow_forward" size={18}/></a>
   </Preview>
   <p className="andy-button-guidance"><MaterialIcon name="info" size={16}/>En esta demostración el enlace no navega fuera del UI Kit. En el producto usá un enlace real (&lt;a&gt; o Link del router) para la navegación.</p>
  </DocSection>
  <DocSection id="uso" title="Uso y comportamiento" description="Ejemplos interactivos para probar hover, focus y pressed reales.">
   <div className="andy-doc-example-controls">
   <div className="andy-doc-example-group" role="group" aria-label="Posición de ícono">
    {placements.map(place=><button type="button" key={place.id} aria-pressed={placement===place.id} onClick={()=>setPlacement(place.id)}>{place.label}</button>)}
   </div></div>
   <Preview>{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size="medium" icon={placement} onClick={()=>setLastClicked(kind.label)}/>)}</Preview>
   {lastClicked&&<p className="andy-button-feedback" role="status">Última acción de demostración: {lastClicked}</p>}
   <div className="andy-button-usage-notes"><p><strong>Jerarquía.</strong> Evitar dos primarios compitiendo en el mismo bloque.</p>
    <p><strong>Íconos.</strong> Material Symbols Outlined, con menor padding del lado del pictograma.</p>
    <p><strong>Accesibilidad.</strong> Los botones de solo ícono requieren un nombre accesible.</p></div>
  </DocSection>
  <DocSection id="anatomia" title="Anatomía" description="Composición del botón: una única superficie interactiva con contenido alineado y estados predecibles.">
   <GuidelineTable rows={[
    ['Contenedor','Elemento button nativo; el enlace usa elemento a o Link del router con apariencia de botón.'],
    ['Etiqueta','Texto de acción breve en Geometria Bold, centrado y legible.'],
    ['Ícono opcional','Material Symbols Outlined, peso 400; al inicio, al final o solo ícono con nombre accesible.'],
    ['Indicador Loading','Spinner dentro del botón, con aria-busy y prevención de nuevos clics.'],
    ['Área interactiva','La altura y el padding cambian con la escala, no con el estado visual.'],
   ]}/>
  </DocSection>
  <DocSection id="especificaciones" title="Especificaciones" description="Reglas del Button MLZ. La referencia shadcn se adapta a los estilos y tokens institucionales existentes.">
   <GuidelineTable rows={[
    ['Variantes','Primario, Secundario, Terciario (con borde), Ghost y Link.'],
    ['Tamaños','Small 32 px / Medium 40 px / Large 48 px.'],
    ['Radio','4 px en todas las variantes; no adoptar rounded-full como valor predeterminado.'],
    ['Tipografía','Geometria Bold: 14 px Small, 16 px Medium y 18 px Large.'],
    ['Estados','Default, Hover, Focus, Pressed, Active, Disabled y Loading.'],
    ['Foco','Contorno visible de 2 px, separado del borde del botón.'],
    ['Íconos','Material Symbols Outlined; 16 px Small, 18 px Medium y 20 px Large.'],
    ['Cargando','Spinner con animación respetando prefers-reduced-motion, sin alterar el color base.'],
    ['Acción destructiva','No se agrega como sexto tipo base hasta definir su tratamiento institucional; las operaciones críticas requieren confirmación.'],
    ['Button Group','Se documenta como componente separado en Actions.'],
   ]}/>
  </DocSection>
  <DocSection id="accesibilidad" title="Accesibilidad y comportamiento" description="Distinguir activación, navegación y estados para conservar una semántica consistente.">
   <GuidelineTable rows={[
    ['Tipo','Usar type="button" para acciones generales y submit solo cuando corresponde enviar un formulario.'],
    ['Navegación','Usar enlaces semánticos para cambiar de página; el estilo Link no cambia su semántica por sí mismo.'],
    ['Disabled','El botón deshabilitado no responde a clics ni recibe foco.'],
    ['Loading','Deshabilitar activaciones repetidas, comunicar aria-busy y mantener un texto comprensible.'],
    ['Solo ícono','Incluir aria-label descriptivo; no depender del pictograma para comunicar la acción.'],
    ['Toggle','aria-pressed se reserva para botones con estado de selección real, no para simular visualmente Active.'],
    ['Jerarquía','Priorizar una sola acción Primaria por bloque de decisión.'],
   ]}/>
  </DocSection>
 </div>;
}
