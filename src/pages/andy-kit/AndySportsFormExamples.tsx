import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection } from './AndyDocsPrimitives';
import { SportsCalendarPicker } from './SportsCalendarPicker';
import { SportsMobileSheet, useSportsMobile } from './SportsMobileSheet';
import './andy-button-matrix.css';
import './dropdown-variants-gallery.css';
import './andy-sports-form-examples.css';

/** Ejemplos de composición basados en el formulario de inscripción Deportes Anual.
 *  No hay envío de datos, persistencia ni conexión con una inscripción real. */
const localities=['Lomas de Zamora','Banfield','Temperley','Llavallol','Turdera','San José','Villa Fiorito','Ingeniero Budge','Albertina','Santa Marta','Parque Barón','Otra'];
const medicalConditions=['Asma','Hepatitis','Hipertensión','Sobrepeso','Diabetes','Te dializás','Epilepsia','Hernias','Trastornos osteoarticulares','Trastornos cardíacos'];

function TextField({label,placeholder,type='text',full=false}:{label:string;placeholder:string;type?:string;full?:boolean}){
 const id=useId();
 return <div className={'andy-field'+(full?' is-full':'')}>
  <label htmlFor={id}>{label}</label>
  <input id={id} type={type} placeholder={placeholder}/>
 </div>;
}
function SelectField({label,options,full=false}:{label:string;options:string[];full?:boolean}){
 const id=useId();
 const mobile=useSportsMobile();
 const root=useRef<HTMLDivElement>(null);
 const [selected,setSelected]=useState('');
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  if(!open||mobile)return;
  const onPointer=(event:PointerEvent)=>{if(root.current&&!root.current.contains(event.target as Node))setOpen(false);};
  const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
  document.addEventListener('pointerdown',onPointer);
  document.addEventListener('keydown',onKey);
  return ()=>{document.removeEventListener('pointerdown',onPointer);document.removeEventListener('keydown',onKey);};
 },[open,mobile]);
 const choices=<div className="andy-dropdown-variant-options" role="radiogroup" aria-label={label}>
  {options.map(option=><label className={'andy-dropdown-variant-option'+(selected===option?' selected':'')} key={option}>
   <span>{option}</span>
   <input type="radio" name={id} checked={selected===option} onChange={()=>{setSelected(option);if(!mobile)setOpen(false);}}/>
   <span className="andy-dropdown-mark" aria-hidden="true">{selected===option&&<MaterialIcon name="check" size={24}/>}</span>
  </label>)}
 </div>;
 return <div className={'andy-field andy-sports-form-select'+(full?' is-full':'')} ref={root}>
  <label id={id+'-label'}>{label}</label>
  <div className="andy-sports-form-select-wrap">
   <button type="button" className={'andy-dropdown-variant-trigger'+(open?' is-open':'')}
    aria-labelledby={id+'-label'} aria-expanded={open} aria-haspopup={mobile?'dialog':'listbox'}
    onClick={()=>setOpen(value=>!value)}>
    <span className={selected?'':'andy-sports-form-placeholder'}>{selected||'Seleccionar opción'}</span>
    <MaterialIcon name="expand_more" size={24}/>
   </button>
   {open&&!mobile&&<div className="andy-dropdown-variant-menu andy-sports-form-select-menu">{choices}</div>}
  </div>
  {mobile&&open&&<SportsMobileSheet open={open} title={label} actions="form"
   onClose={()=>setOpen(false)} primaryLabel="Confirmar" secondaryLabel="Limpiar"
   onPrimary={()=>setOpen(false)} onSecondary={()=>setSelected('')}>{choices}</SportsMobileSheet>}
 </div>;
}
function RadioQuestion({label,options=['Sí','No']}:{label:string;options?:string[]}){
 const name=useId();
 const [choice,setChoice]=useState('');
 return <fieldset className="andy-sports-form-question">
  <legend>{label}</legend>
  <div className="andy-sports-form-choices">{options.map(value=><label key={value} className="andy-sports-form-choice">
   <input type="radio" name={name} checked={choice===value} onChange={()=>setChoice(value)}/>
   <MaterialIcon name={choice===value?'radio_button_checked':'radio_button_unchecked'} size={24}/><span>{value}</span>
  </label>)}</div>
 </fieldset>;
}
function FileExample({label,accept}:{label:string;accept:string}){
 const id=useId();const [file,setFile]=useState('');
 return <div className="andy-sports-form-upload">
  <label htmlFor={id}>{label}</label>
  <div className="andy-sports-form-upload-control">
   <span className="andy-system-button is-primary is-small icon-start"><MaterialIcon name="attach_file" size={16} weight={400}/>Adjuntar</span>
   <span className="andy-sports-form-upload-value">{file||'Ningún archivo seleccionado'}</span>
   <input id={id} type="file" accept={accept} onChange={e=>setFile(e.target.files?.[0]?.name||'')}/>
  </div>
 </div>;
}
function ExampleSection({title,description,children}:{title:string;description:string;children:ReactNode}){
 return <DocSection title={title} description={description}>
  <div className="andy-sports-form-preview"><div className="andy-sports-form-preview-heading">{title.toUpperCase()}</div>{children}</div>
 </DocSection>;
}
export function AndySportsFormExamples(){
 const [minor,setMinor]=useState(false);
 const [conditions,setConditions]=useState<string[]>([]);
 return <div className="andy-sports-form-docs">
  <p className="andy-sports-form-intro">Ejemplos de composición tomados de los bloques del formulario de inscripción de Deportes Anual. La documentación individual de Field, Input, Dropdown, Radio, Checkbox y Adjuntos conserva los estados y especificaciones de cada componente.</p>
  <ExampleSection title="Información personal" description="Datos básicos y domicilio: combinación de campos de dos columnas, ancho completo y controles de selección.">
   <label className="andy-sports-form-switch-row"><input type="checkbox" role="switch" checked={minor} onChange={e=>setMinor(e.target.checked)}/><span className="andy-sports-form-switch-track"/><span>El trámite es para un menor de 18 años</span></label>
   <div className="andy-sports-form-fields">
    <TextField label="Nombre" placeholder="Ingresar nombre"/>
    <TextField label="Apellido" placeholder="Ingresar apellido"/>
    <TextField label="DNI" placeholder="Ingresá documento" full/>
    <div className="andy-sports-form-date is-full"><SportsCalendarPicker label="Fecha de nacimiento"/></div>
    <SelectField label="Género" options={['Femenino','Masculino','No binario','Prefiero no responder']} full/>
    <TextField label="Teléfono" placeholder="Ingresar teléfono" type="tel"/>
    <TextField label="Teléfono alternativo" placeholder="Ingresar teléfono alternativo" type="tel"/>
    <TextField label="Correo electrónico" placeholder="Ingresar correo electrónico" type="email" full/>
    <SelectField label="Localidad" options={localities} full/>
    <TextField label="Calle" placeholder="Ingresar calle" full/>
    <TextField label="Altura" placeholder="Ingresar altura"/>
    <TextField label="Piso" placeholder="Ingresar piso"/>
    <TextField label="Departamento" placeholder="Ingresar departamento"/>
   </div>
   <RadioQuestion label="¿Autoriza la difusión de imágenes?"/>
  </ExampleSection>
  <ExampleSection title="Información deportiva" description="Selecciones y una pregunta binaria en un bloque completo.">
   <div className="andy-sports-form-fields">
    <SelectField label="Tipo de deportista" options={['Recreativo','Competitivo','Federado']} full/>
    <SelectField label="Condición del participante" options={['Principiante','Intermedio','Avanzado']} full/>
   </div>
   <RadioQuestion label="¿Contás con Certificado de Discapacidad?"/>
  </ExampleSection>
  <ExampleSection title="Contacto de emergencia" description="Ejemplo de agrupación de datos de una persona de contacto.">
   <div className="andy-sports-form-fields">
    <TextField label="Nombre" placeholder="Ingresar nombre"/>
    <TextField label="Apellido" placeholder="Ingresar apellido"/>
    <TextField label="Teléfono" placeholder="Ingresar teléfono" type="tel" full/>
   </div>
  </ExampleSection>
  <ExampleSection title="Datos médicos relevantes" description="Campos numéricos, texto libre y selección múltiple, como en Deportes Anual.">
   <div className="andy-sports-form-fields">
    <TextField label="Altura" placeholder="Ingresar altura"/>
    <TextField label="Peso" placeholder="Ingresar peso"/>
    <TextField label="Tensión arterial" placeholder="Ingresar tensión arterial"/>
    <TextField label="Pulso" placeholder="Ingresar pulso"/>
    <TextField label="Grupo sanguíneo" placeholder="Ingresar grupo sanguíneo"/>
    <TextField label="Factor RH" placeholder="Ingresar factor RH"/>
    <div className="andy-field is-full"><label htmlFor="andy-sports-diagnosis">Diagnóstico médico</label><textarea id="andy-sports-diagnosis" placeholder="Ingresar diagnóstico médico"/></div>
    <div className="andy-field is-full"><label htmlFor="andy-sports-indications">Indicaciones del especialista</label><textarea id="andy-sports-indications" placeholder="Ingresar indicaciones"/></div>
   </div>
   <RadioQuestion label="¿Autoriza la asistencia médica de emergencia?"/>
   <fieldset className="andy-sports-form-question">
    <legend>Condiciones médicas preexistentes (marcá todas las que correspondan)</legend>
    <div className="andy-sports-form-check-grid">{medicalConditions.map(value=><label key={value} className="andy-sports-form-choice">
     <input type="checkbox" checked={conditions.includes(value)} onChange={e=>setConditions(current=>e.target.checked?[...current,value]:current.filter(v=>v!==value))}/>
     <MaterialIcon name={conditions.includes(value)?'check_box':'check_box_outline_blank'} size={24}/><span>{value}</span>
    </label>)}</div>
   </fieldset>
  </ExampleSection>
  <ExampleSection title="Documentación a adjuntar" description="Ejemplo de varios campos de adjunto dentro de una misma sección.">
   <div className="andy-sports-form-uploads">
    <FileExample label="Frente DNI" accept="image/*,.pdf"/>
    <FileExample label="Dorso DNI" accept="image/*,.pdf"/>
    <FileExample label="Certificado único de discapacidad (CUD)" accept=".pdf,image/*"/>
   </div>
  </ExampleSection>
  <p className="andy-sports-form-disclaimer">Prototipo visual interactivo: no envía, almacena ni procesa datos personales o médicos. No realiza una inscripción real.</p>
 </div>;
}
