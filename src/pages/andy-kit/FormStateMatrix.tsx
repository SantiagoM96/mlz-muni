import { useState, type ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DropdownVariantsGallery } from './DropdownVariantsGallery';
import './form-state-matrix.css';

type FieldState = 'default' | 'hover' | 'focus' | 'completed' | 'error' | 'disabled';
type Family = 'text' | 'dropdown' | 'textarea' | 'date' | 'upload';
const states: { id: FieldState; name: string; note: string }[] = [
  { id: 'default', name: 'Default', note: 'Sin interacción' },
  { id: 'hover', name: 'Hover', note: 'Cursor sobre el campo' },
  { id: 'focus', name: 'Focus / Activo', note: 'Campo enfocado' },
  { id: 'completed', name: 'Completo', note: 'Valor ingresado' },
  { id: 'error', name: 'Error', note: 'Validación incorrecta' },
  { id: 'disabled', name: 'Disabled', note: 'Interacción bloqueada' },
];
const families: { id: Family; name: string; desc: string }[] = [
  { id:'text', name:'Text field', desc:'Input de una línea' },
  { id:'dropdown', name:'Dropdown', desc:'Selección única del formulario' },
  { id:'textarea', name:'Text area', desc:'Texto de varias líneas' },
  { id:'date', name:'Fecha', desc:'Selector de fecha' },
  { id:'upload', name:'Adjuntar', desc:'Documentación' },
];
function StateCell({children, state, title, note}:{children:ReactNode;state:FieldState;title:string;note:string}) {
  return <div className="andy-state-cell" data-state={state}>
    <div className="andy-state-label"><strong>{title}</strong><small>{note}</small></div>
    {children}
  </div>;
}
function StateField({family, state}:{family:Family;state:FieldState}) {
  const [value,setValue]=useState('');
  const isDone=state==='completed',isError=state==='error',isDisabled=state==='disabled';
  const label=family==='text'?'Nombre y apellido':family==='dropdown'?'Tipo de documento':family==='textarea'?'Observaciones':family==='date'?'Fecha de nacimiento':'Documentación adjunta';
  const content=isDone?(family==='text'?'María González':family==='dropdown'?'DNI':family==='textarea'?'Información adicional de la inscripción':family==='date'?'15/06/2000':'documentacion.pdf'):'';
  return <div className="andy-matrix-field">
    <label className="andy-matrix-field-label">{label}</label>
    {family==='text'&&<input aria-label={label+' — '+state} value={isDone?content:value}
      placeholder="Ingresá tu nombre" disabled={isDisabled} aria-invalid={isError}
      onChange={e=>setValue(e.target.value)} />}
    {family==='dropdown'&&<button type="button" className="andy-matrix-select" disabled={isDisabled} aria-label={label+' — '+state}>
      <span>{content||'Seleccionar'}</span><MaterialIcon name="expand_more" size={24}/>
    </button>}
    {family==='textarea'&&<textarea aria-label={label+' — '+state} value={isDone?content:value}
      placeholder="Escribí una observación" disabled={isDisabled} aria-invalid={isError}
      onChange={e=>setValue(e.target.value)} />}
    {family==='date'&&<button type="button" className="andy-matrix-select" disabled={isDisabled} aria-label={label+' — '+state}>
      <span>{content||'Seleccionar fecha'}</span><MaterialIcon name="calendar_month" size={24}/>
    </button>}
    {family==='upload'&&<div className="andy-matrix-upload">
      <span className="andy-matrix-upload-button"><MaterialIcon name="attach_file" size={24}/>Adjuntar</span>
      <span className="andy-matrix-upload-filename">{content||'Ningún archivo'}</span>
    </div>}
    {isError&&<small className="andy-matrix-error">{family==='upload'?'Adjuntá el archivo solicitado.':'Revisá este campo para continuar.'}</small>}
  </div>;
}
export function FormStateMatrix(){
 return <div className="andy-state-matrix">
  <p className="andy-matrix-intro">Cada familia aparece una sola vez, con sus seis estados simultáneos para comparar bordes, fondos, íconos, textos y dimensiones. El dropdown incluye además sus cuatro variantes abiertas e interactivas.</p>
  {families.map(family=><section key={family.id} className="andy-matrix-family">
    <div className="andy-matrix-family-head"><h3>{family.name}</h3><span>{family.desc}</span></div>
    <div className="andy-matrix-grid">
      {states.map(state=><StateCell key={state.id} state={state.id} title={state.name} note={state.note}>
        <StateField family={family.id} state={state.id}/>
      </StateCell>)}

    </div>
    {family.id==='dropdown'&&<div className="andy-matrix-dropdown-types">
      <h4>Variantes de menú abierto</h4>
      <DropdownVariantsGallery/>
    </div>}
  </section>)}
  <p className="andy-matrix-footnote">Referencia: estados Default, Hovered, Focus, Completo, Disable y Error de los controles de Deportes; los cuatro tipos de dropdown abierto aparecen dentro de esa misma familia. Las vistas de Hover y Focus están representadas de forma persistente para facilitar la inspección. El calendario nativo y el adjunto son referencias visuales; sus interacciones avanzadas requieren una implementación específica.</p>
 </div>;
}
