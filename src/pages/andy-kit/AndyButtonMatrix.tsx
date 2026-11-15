import { useState, type CSSProperties } from 'react';
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
function SizeTabs({size,setSize}:{size:Size;setSize:(size:Size)=>void}){
 return <div className="andy-button-sizebar">
  <div><strong>Tamaños</strong><p>Escala MLZ: Large 48 px · Medium 40 px · Small 32 px</p></div>
  <div className="andy-button-size-options" role="group" aria-label="Tamaño de botones">
   {sizes.map(opt=><button key={opt.id} type="button" aria-pressed={size===opt.id}
    onClick={()=>setSize(opt.id)}>{opt.label}<small>{opt.description}</small></button>)}
  </div>
 </div>;
}
export function AndyButtonMatrix(){
 const [size,setSize]=useState<Size>('large');
 const [lastClicked,setLastClicked]=useState('');
 const [icon,setIcon]=useState<IconPlacement>('none');
 return <div className="andy-button-documentation" style={{'--andy-button-demo-height':size==='large'?'48px':size==='medium'?'40px':'32px'} as CSSProperties}>
  <SizeTabs size={size} setSize={setSize}/>
  <section className="andy-button-doc-section">
   <h3>Estados por tipo</h3>
   <p>Comparación de los cinco tipos en Default, Hover, Focus, Pressed, Active y Disabled. Los estados se representan de forma persistente para inspeccionar los estilos.</p>
   <div className="andy-button-preview andy-button-states-preview">
    <div className="andy-button-matrix">
     <div className="andy-button-matrix-heading" aria-hidden="true"><span>Estado</span>{kinds.map(k=><strong key={k.id}>{k.label}</strong>)}</div>
     {states.map(state=><div className="andy-button-state-row" key={state.id}>
      <div className="andy-button-state-name">{state.label}</div>
      {kinds.map(kind=><div className="andy-button-sample-slot" key={kind.id}><ButtonSample kind={kind.id} size={size} state={state.id}/></div>)}
     </div>)}
    </div>
   </div>
  </section>
  <section className="andy-button-doc-section">
   <h3>Opciones de iconografía</h3>
   <p>Sin ícono, con ícono inicial, con ícono final y botón de solo ícono. Cada variante se aplica a los cinco tipos y tres tamaños.</p>
   <div className="andy-button-preview">
    <div className="andy-button-icon-matrix">
     {placements.map(place=><div className="andy-button-icon-row" key={place.id}>
      <strong>{place.label}</strong>
      <div>{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size={size} icon={place.id}/>)}</div>
     </div>)}
    </div>
   </div>
  </section>
  <section className="andy-button-doc-section">
   <h3>Ejemplos interactivos</h3>
   <p>Probá los estilos reales de hover, foco y presión. Podés seleccionar la ubicación del ícono para comparar el comportamiento.</p>
   <div className="andy-button-placement-options" role="group" aria-label="Posición de ícono">
    {placements.map(p=><button type="button" key={p.id} aria-pressed={icon===p.id}
     onClick={()=>setIcon(p.id)}>{p.label}</button>)}
   </div>
   <div className="andy-button-preview">
    <div className="andy-button-interactive-row">{kinds.map(kind=><ButtonSample key={kind.id} kind={kind.id} size={size} icon={icon} onClick={()=>setLastClicked(kind.label)}/>)}</div>
    {lastClicked&&<p className="andy-button-feedback" role="status">Última acción: {lastClicked}</p>}
   </div>
  </section>
 </div>;
}
