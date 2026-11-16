import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import { SportsControlsGallery } from '../ui-kit/SportsControlsGallery';
import { FormStateMatrix } from './FormStateMatrix';
import { AndySportsFormExamples } from './AndySportsFormExamples';
import { DropdownVariantsGallery } from './DropdownVariantsGallery';
import { AndyCalendarShowcase } from './AndyCalendarShowcase';
import { SportsCalendarPicker } from './SportsCalendarPicker';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { ColorTokensGallery } from './ColorTokensGallery';
import { AndyActivityCardGallery } from './AndyActivityCards';
import { AndyMunicipalCardGallery } from './AndyMunicipalCards';
import { AndyScrollbarGallery } from './AndyScrollbarGallery';
import { AndyTagPaletteGallery } from './AndyTagPaletteGallery';
import { AndyButtonMatrix } from './AndyButtonMatrix';
import { AndyDashedUploadStates, AndyUploadPreviews } from './AndyDashedUpload';
import { AndySpacingGuide, AndyRadiusGuide } from './AndyGeometryGuides';
import { MaterialIconLibrary } from './MaterialIconLibrary';
import { AndyAdditionalComponent, additionalComponents } from './AndyAdditionalComponents';
import { componentGroups, componentAliases, componentEntries, componentMeta, type ComponentId } from './andy-kit.registry';
import './andy-kit.css';

const categories = [
  { id:'fundamentos', name:'Foundations' },
  { id:'filtros', name:'Search & Filters' },
  { id:'formularios', name:'Form Layouts' },
  { id:'seleccion', name:'Selection Groups' },
  { id:'tarjetas', name:'Cards & Summaries' },
  { id:'mensajes', name:'Feedback States' },
] as const;
type Category = typeof categories[number]['id'];
const commit = import.meta.env.VITE_MLZ_COMMIT_SHA ?? 'local';
const buildTimestamp = import.meta.env.VITE_MLZ_BUILD_TIME;
const buildDate = new Date(buildTimestamp);
const buildParts = new Intl.DateTimeFormat('es-AR', {
 timeZone:'America/Argentina/Buenos_Aires',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false,
}).formatToParts(buildDate).reduce<Record<string,string>>((parts,part)=>({...parts,[part.type]:part.value}),{});
const buildDateLabel = `${buildParts.day}/${buildParts.month}/${buildParts.year}`;
const buildTimeLabel = `${buildParts.hour}:${buildParts.minute}`;

function DemoSection({ title, description, children }: {title:string;description?:string;children:ReactNode}) {
 return <section className="andy-section"><div className="andy-section-head"><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</section>;
}
function Icon({name,size=24}: {name:MaterialIconName;size?:number}) { return <MaterialIcon name={name} size={size} />; }
function Foundations() {
 return <>
  <div id="foundation-colors" className="andy-foundation-module">
   <DemoSection title="01 · Color">
    <ColorTokensGallery/>
   </DemoSection>
  </div>
  <div id="foundation-type" className="andy-foundation-module">
   <DemoSection title="02 · Typography" description="Geometria es la familia institucional del sistema. La escala distingue estilos globales declarados como tokens de tamaños recurrentes usados por los controles.">
    <div className="andy-foundation-type">
     <div className="andy-foundation-type-row"><div><span>Section · 24 / 30</span><code>--text-institutional-section</code></div><strong className="type-section">Título de sección</strong></div>
     <div className="andy-foundation-type-row"><div><span>Body · 18 / 26</span><code>--text-institutional-body</code></div><p className="type-body">Texto de lectura para contenido institucional y descripciones relevantes.</p></div>
     <div className="andy-foundation-type-row"><div><span>Control · 16 / 24</span><code>Uso recurrente · no token independiente</code></div><span className="type-control">Etiqueta de campo y opciones</span></div>
     <div className="andy-foundation-type-row"><div><span>Helper · 13 / 20</span><code>Uso recurrente · no token independiente</code></div><span className="type-helper">Texto de ayuda, aclaraciones y metadatos</span></div>
     <div className="andy-foundation-weights"><span className="weight-400">Regular · 400</span><span className="weight-500">Medium · 500</span><span className="weight-700">Bold · 700</span></div>
    </div>
    <p className="andy-foundation-note">Solo Section y Body están declarados como tokens tipográficos globales en tokens.css. Control y Helper describen usos recurrentes observados; no deben presentarse como variables oficiales hasta que se definan como tales.</p>
   </DemoSection>
  </div>
  <div id="foundation-geometry" className="andy-foundation-module">
   <DemoSection title="03 · Geometry" description="Dos escalas independientes que resuelven necesidades distintas: spacing controla la distancia entre elementos; radius define el redondeo de superficies y controles.">
    <div className="andy-foundation-submodule">
     <div className="andy-foundation-subhead"><strong>Spacing · separación</strong><span>Padding · margin · gap</span></div>
     <p className="andy-foundation-explainer">Usá la escala compartida para construir ritmo y alineación. Elegí el valor según la relación entre elementos, no agregando medidas arbitrarias.</p>
     <AndySpacingGuide/>
    </div>
    <div className="andy-foundation-submodule">
     <div className="andy-foundation-subhead"><strong>Border radius · superficies</strong><span>Controles · tarjetas · paneles</span></div>
     <p className="andy-foundation-explainer">El radio responde a la función del elemento: controles compactos, tarjetas, paneles y superficies superpuestas mantienen niveles diferenciados.</p>
     <AndyRadiusGuide/>
    </div>
   </DemoSection>
  </div>
  <div id="foundation-icons" className="andy-foundation-module">
   <DemoSection title="04 · Iconography">
    <MaterialIconLibrary/>
   </DemoSection>
  </div>
  <div id="foundation-layout" className="andy-foundation-module">
   <DemoSection title="05 · Layout" description="Reglas de estructura compartidas para mantener alineación, ancho de lectura y adaptación entre desktop y mobile.">
    <div className="andy-foundation-layout">
     <div className="layout-measure"><span>Contenedor máximo</span><strong>1200 px</strong><div><i style={{width:'100%'}}/></div></div>
     <div className="layout-measure"><span>Gutter horizontal</span><strong>24 px</strong><div><i style={{width:'24px'}}/></div></div>
     <div className="layout-measure"><span>Breakpoint mobile</span><strong>680 px</strong><div><i style={{width:'56.7%'}}/></div></div>
    </div>
    <p className="andy-foundation-note">El contenedor de contenido no supera los 1200 px. El gutter horizontal es de 24 px. 680 px es el breakpoint principal documentado para esta vista; los componentes pueden definir ajustes responsive específicos cuando su comportamiento lo requiera.</p>
   </DemoSection>
  </div>
  <div id="foundation-scroll" className="andy-foundation-module">
   <DemoSection title="06 · Scrollbars" description="Reglas de desplazamiento del sistema. Las demostraciones utilizan contenido neutro para que la atención se concentre en la barra y su comportamiento.">
    <AndyScrollbarGallery/>
   </DemoSection>
  </div>
 </>;
}
function Filters() {return <>
 <DemoSection title="Buscador, Sede, Edad y Más filtros" description="Patrones interactivos recuperados del prototipo de Deportes. Filtros de catálogo independientes de los dropdowns de inscripción.">
  <div className="andy-search-field"><input aria-label="Buscar actividad" placeholder="¿Qué estás buscando?" /><Icon name="search" size={24}/></div>
 </DemoSection>
 <div className="andy-embedded-sports"><SportsControlsGallery mode="filters"/></div>
 <DemoSection title="Filtros aplicados" description="Chips de selección múltiples y acción para limpiar el conjunto."><ChipGallery compact /></DemoSection>
 </>}
function Forms(){
 return <AndySportsFormExamples/>;
}
function SelectionGallery({embedded=false,only}:{embedded?:boolean;only?:'checkbox'|'radio'|'switch'}){
 const [days,setDays]=useState(['Lunes']),[athlete,setAthlete]=useState('Recreativo'),[minor,setMinor]=useState(false);
 return <div className="andy-selection-grid">
 {(!only||only==="checkbox")&&<div><h3>Días de cursada</h3><div className="andy-choices">{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(day=><label key={day} className="andy-choice"><input type="checkbox" checked={days.includes(day)} onChange={()=>setDays(prev=>prev.includes(day)?prev.filter(x=>x!==day):[...prev,day])}/><span className="andy-choice-symbol andy-checkbox-symbol"><Icon name={days.includes(day)?'check_box':'check_box_outline_blank'} size={24}/></span>{day}</label>)}</div></div>}
 {(!only||only==="radio")&&<div><h3>Tipo de deportista</h3><div className="andy-choices">{['Recreativo','Competitivo','Federado'].map(item=><label className="andy-choice" key={item}><input type="radio" name={embedded?'athlete-embedded':'athlete-main'} checked={athlete===item} onChange={()=>setAthlete(item)}/><span className="andy-choice-symbol andy-radio-symbol"><Icon name={athlete===item?'radio_button_checked':'radio_button_unchecked'} size={24}/></span>{item}</label>)}</div></div>}
 {(!only||only==="switch")&&<div className="andy-switch-card"><label className="andy-switch"><input type="checkbox" checked={minor} onChange={e=>setMinor(e.target.checked)}/><span className="andy-switch-track"/></label><div><strong>Inscribir a una persona menor de edad</strong><p>Activá esta opción para visualizar el estado seleccionado.</p></div></div>}
 </div>;
}
function Selection(){return <DemoSection title="Checkbox, radio y switch" description="Controles de selección reales e interactivos, sin duplicar los estados de Formularios."><SelectionGallery/></DemoSection>}
function Buttons(){return <AndyButtonMatrix/>;}
function ChipGallery({compact=false}:{compact?:boolean}){
 const [chips,setChips]=useState(['Lunes','Casa Ari','Recreativo']);
 return <div className="andy-chip-demo">{chips.map(t=><span className="andy-chip" key={t}>{t}<button type="button" aria-label={'Quitar '+t} onClick={()=>setChips(v=>v.filter(c=>c!==t))}><Icon name="close" size={18}/></button></span>)}<button type="button" className="andy-chip-clear" onClick={()=>setChips(compact?['Lunes','Casa Ari','Recreativo']:[])}>{compact?'Restablecer':'Limpiar filtros'}</button></div>;
}
function Cards(){return <div className="andy-cards-unified">
 <AndyActivityCardGallery/>
 <AndyMunicipalCardGallery/>
</div>}
function Messages(){return <>
 <DemoSection title="Mensajes destacados" description="Cuatro variantes semánticas de Figma · mensaje_destacado. Mismos tokens para desktop y mobile.">
  <div className="andy-messages">
   <div className="andy-alert andy-alert-success"><Icon name="check_circle"/><div><strong>Datos completos</strong><p>El formulario de demostración está listo para continuar.</p></div></div>
   <div className="andy-alert andy-alert-info"><Icon name="error"/><div><strong>Antes de empezar</strong><p>Completá los datos para continuar con la inscripción.</p></div></div>
   <div className="andy-alert andy-alert-warning"><Icon name="warning"/><div><strong>Información importante</strong><p>Revisá los requisitos de la actividad antes de inscribirte.</p></div></div>
   <div className="andy-alert andy-alert-error"><Icon name="cancel"/><div><strong>Revisá el formulario</strong><p>Hay campos obligatorios pendientes.</p></div></div>
  </div>
 </DemoSection>
 <DemoSection title="Estado sin resultados"><div className="andy-empty"><Icon name="search" size={42}/><h3>No encontramos actividades</h3><p>Probá con otros filtros o cambiá el término de búsqueda.</p><button className="andy-btn andy-btn-outline" type="button">Limpiar filtros</button></div></DemoSection>
</>}
function ComponentExample({title,description,children}:{title:string;description?:string;children:ReactNode}){
 return <DocSection title={title} description={description}><DocPreview>{children}</DocPreview></DocSection>;
}
function AccordionDemo({multiple=false,disabledMiddle=false}:{multiple?:boolean;disabledMiddle?:boolean}){
 const [open,setOpen]=useState<string[]>(['1']);
 const items:[string,string,string][]=[
  ['1','¿Cómo puedo inscribirme?','Elegí la actividad que te interese y revisá los días, horarios y sedes disponibles. Después seleccioná una comisión, completá los datos solicitados y seguí los pasos indicados para finalizar tu preinscripción.'],
  ['2','¿Puedo cambiar el horario?','Antes de confirmar la preinscripción, podés volver a la ficha de la actividad y elegir otra comisión que tenga cupos disponibles. Revisá el nuevo día y horario para asegurarte de que se ajusten a tu disponibilidad.'],
  ['3','¿Dónde encuentro la sede?','En la ficha de cada actividad vas a encontrar el nombre de la sede, la dirección y la localidad correspondiente. Consultá esa información antes de inscribirte para comprobar que podés llegar al lugar en el horario elegido.']
 ];
 return <div className="andy-doc-accordion">{items.map(([id,title,content])=><div className="andy-doc-accordion-item" key={id}>
  <button type="button" disabled={disabledMiddle&&id==='2'} aria-expanded={open.includes(id)} onClick={()=>setOpen(prev=>prev.includes(id)?prev.filter(v=>v!==id):multiple?[...prev,id]:[id])}>
    <span className="andy-doc-accordion-trigger-label">{title}</span><Icon name="expand_more" size={24}/>
  </button>{open.includes(id)&&<div className="andy-doc-accordion-content">{content}</div>}
 </div>)}</div>;
}
function FormStates({family}:{family:'text'|'dropdown'|'textarea'|'date'|'upload'}){
 return <DocSection title="Estados" description="Comparación simultánea de Default, Hover, Focus, Completo, Error y Disabled. Una única superficie contiene todos los controles.">
  <DocPreview align="start"><FormStateMatrix onlyFamily={family} showExtras={false}/></DocPreview>
 </DocSection>;
}
function FieldDocs(){
 return <>
  <ComponentExample title="Ejemplo básico" description="Un campo completo con etiqueta y texto de ayuda, tal como aparece en los formularios.">
   <div className="andy-form-grid">
    <label className="andy-field"><span>Correo electrónico</span><input type="email" placeholder="nombre@ejemplo.com"/><small className="andy-help">Usaremos esta dirección para enviarte novedades de la inscripción.</small></label>
   </div>
  </ComponentExample>
  <ComponentExample title="Field Group" description="Agrupa campos relacionados y conserva el mismo ritmo vertical entre cada bloque.">
   <div className="andy-form-grid">
    <label className="andy-field"><span>Nombre</span><input placeholder="Ingresá tu nombre"/></label>
    <label className="andy-field"><span>Apellido</span><input placeholder="Ingresá tu apellido"/></label>
   </div>
  </ComponentExample>
  <DocSection title="Field Set" description="Usá un conjunto semántico cuando varios controles respondan a una misma consigna.">
   <DocPreview align="start"><div className="andy-form-composition"><h3>Disponibilidad semanal</h3><SelectionGallery embedded only="checkbox"/></div></DocPreview>
  </DocSection>
  <ComponentExample title="Responsive Layout" description="Los campos pueden apilarse en mobile y distribuirse en columnas cuando el espacio lo permite.">
   <div className="andy-form-grid">
    <label className="andy-field"><span>Localidad</span><input placeholder="Ingresá tu localidad"/></label>
    <label className="andy-field"><span>Código postal</span><input inputMode="numeric" placeholder="Ingresá el código postal"/></label>
   </div>
  </ComponentExample>
  <ComponentExample title="Validación y errores" description="El control usa aria-invalid y el mensaje explica cómo corregir el dato.">
   <div className="andy-form-grid"><label className="andy-field"><span>Correo electrónico</span><input type="email" aria-invalid="true" defaultValue="correo-incompleto" aria-describedby="field-email-error"/><small id="field-email-error">Ingresá una dirección de correo válida.</small></label></div>
  </ComponentExample>
  <DocSection title="Accesibilidad" description="La asociación semántica debe mantenerse aunque cambien el control o la disposición visual.">
   <GuidelineTable rows={[["Etiqueta","Usar label y htmlFor, o envolver directamente el control."],["Ayuda","Vincular las descripciones mediante aria-describedby cuando corresponda."],["Error","Combinar aria-invalid con un mensaje que indique cómo resolverlo."],["Agrupación","Usar fieldset y legend para opciones que compartan una consigna."]]}/>
  </DocSection>
 </>;
}
function InputDocs(){
 return <>
  <ComponentExample title="Básico" description="Control de una línea sin composición adicional.">
   <div className="andy-search-field"><input aria-label="Texto" placeholder="Ingresá un texto"/></div>
  </ComponentExample>
  <ComponentExample title="Field" description="Combiná Input con Field cuando necesites etiqueta y texto de ayuda.">
   <div className="andy-form-grid"><label className="andy-field"><span>Nombre y apellido</span><input placeholder="Ingresá tu nombre y apellido"/><small className="andy-help">Escribilo como figura en tu documento.</small></label></div>
  </ComponentExample>
  <FormStates family="text"/>
  <ComponentExample title="Disabled" description="El atributo disabled bloquea la interacción y comunica el estado a las tecnologías de asistencia.">
   <div className="andy-form-grid"><label className="andy-field"><span>Correo electrónico</span><input disabled placeholder="Campo no disponible"/><small className="andy-help">Este dato no puede editarse en este paso.</small></label></div>
  </ComponentExample>
  <ComponentExample title="Invalid" description="Usá aria-invalid y un mensaje específico para explicar el problema.">
   <div className="andy-form-grid"><label className="andy-field"><span>Correo electrónico</span><input type="email" aria-invalid="true" defaultValue="correo-incompleto" aria-describedby="input-email-error"/><small id="input-email-error">Ingresá una dirección de correo válida.</small></label></div>
  </ComponentExample>
  <ComponentExample title="Required" description="Indicá visual y semánticamente cuándo el dato es obligatorio.">
   <div className="andy-form-grid"><label className="andy-field"><span>Documento *</span><input required aria-required="true" placeholder="Ingresá tu documento"/><small className="andy-help">Este campo es obligatorio.</small></label></div>
  </ComponentExample>
  <ComponentExample title="Inline" description="El input puede compartir una fila con una acción relacionada.">
   <div className="andy-form-grid"><label className="andy-field"><span>Buscar actividad</span><div className="andy-button-grid"><input type="search" placeholder="Natación"/><button type="button" className="andy-btn andy-btn-primary">Buscar</button></div></label></div>
  </ComponentExample>
  <ComponentExample title="Grid" description="Dos inputs relacionados pueden compartir columnas y apilarse en pantallas pequeñas.">
   <div className="andy-form-grid"><label className="andy-field"><span>Nombre</span><input placeholder="María"/></label><label className="andy-field"><span>Apellido</span><input placeholder="González"/></label></div>
  </ComponentExample>
 </>;
}
const notices=[
 {id:'success',title:'Success',heading:'Datos completos',body:'El formulario de demostración está listo para continuar.',icon:'check_circle' as const},
 {id:'info',title:'Info',heading:'Antes de empezar',body:'Completá los datos para continuar con la inscripción.',icon:'error' as const},
 {id:'warning',title:'Alert',heading:'Información importante',body:'Revisá los requisitos de la actividad antes de inscribirte.',icon:'warning' as const},
 {id:'error',title:'Error',heading:'Revisá el formulario',body:'Hay campos obligatorios pendientes.',icon:'cancel' as const}
];
function ComponentDetails({id}:{id:ComponentId}){
 if(id==='field')return <FieldDocs/>;
 if(id==='input')return <InputDocs/>;
 if(id==='textarea')return <><FormStates family="textarea"/>
  <ComponentExample title="Texto multilínea" description="Permite escribir varias líneas y ajustar la altura.">
   <div className="andy-form-grid"><label className="andy-field"><span>Observaciones</span><textarea placeholder="Escribí una observación"/></label></div>
  </ComponentExample></>;
 if(id==='adjuntos')return <>
  <DocSection title="Adjuntar · estados" description="Variante original con bandeja celeste y botón sólido. Comparación de Default, Hover, Focus, Completo, Error y Disabled.">
   <DocPreview align="start"><FormStateMatrix onlyFamily="upload" showExtras={false}/></DocPreview>
  </DocSection>
  <DocSection title="Borde punteado · estados" description="La variante alternativa usa los mismos seis estados y mantiene siempre un trazo de 1 px, con guiones de 8 px y espacios de 4 px.">
   <DocPreview align="start"><AndyDashedUploadStates/></DocPreview>
  </DocSection>
  <DocSection title="Vista previa · ambas variantes" description="Dos casos interactivos de documentación. Seleccioná un archivo para ver su nombre y reemplazarlo; formatos PDF, DOC y DOCX, hasta 10 MB.">
   <DocPreview><AndyUploadPreviews/></DocPreview>
  </DocSection>
  <DocSection title="Criterios de uso" description="Las dos variantes conservan la selección nativa de archivos y la validación de tamaño y formato.">
   <GuidelineTable rows={[["Adjuntar original","Bandeja celeste con acción sólida y nombre de archivo."],["Borde punteado","Acción de seleccionar o cambiar integrada al campo."],["Estados","Default, Hover, Focus, Completo, Error y Disabled; comparar ambas matrices antes de usarlas."]]}/>
  </DocSection>
 </>;
 if(id==='select')return <><FormStates family="dropdown"/>
  {([['simple','Selección normal','Una opción con marca de confirmación.'],['radio','Selección con radio','Una sola elección con un indicador circular.'],['checkbox','Selección múltiple','Varias opciones con indicadores independientes.'],['search','Con buscador','Filtrado de opciones dentro del menú.']] as const).map(([variant,title,description])=>
   <ComponentExample key={variant} title={title} description={description}><DropdownVariantsGallery only={variant}/></ComponentExample>)}
 </>;
 if(id==='calendario')return <><FormStates family="date"/>
  <DocSection title="Selección de un día" description="Calendario abierto con un día seleccionado. Se puede navegar por meses y años, elegir otro día, borrar o confirmar.">
   <AndyCalendarShowcase only="single"/>
  </DocSection>
  <DocSection title="Selección de un rango" description="Calendario abierto con inicio, fin y días intermedios resaltados. Se seleccionan dos fechas y se confirma el período.">
   <AndyCalendarShowcase only="range"/>
  </DocSection>
  <ComponentExample title="Campo desplegable" description="El campo del formulario abre un popover en desktop o un drawer en mobile; conserva el mismo calendario y los controles del UI Kit.">
   <div className="andy-matrix-calendar-sample andy-calendar-dropdown-sample"><SportsCalendarPicker/></div>
  </ComponentExample>
 </>;
 if(id==='checkbox'||id==='radio'||id==='switch')return <ComponentExample title="Ejemplo interactivo" description={id==='checkbox'?'Permití seleccionar varias opciones de forma independiente.':id==='radio'?'Solo una alternativa puede estar seleccionada.':'Activá o desactivá la configuración.'}>
  <SelectionGallery only={id}/>
 </ComponentExample>;
 if(id==='boton')return <Buttons/>;
 if(id==='chips')return <>
  <DocSection title="Fondo suave" description="Seis colores de Figma con fondo claro y texto intenso. Cada color se muestra con y sin ícono.">
   <DocPreview align="start"><AndyTagPaletteGallery onlyAppearance="fill"/></DocPreview>
  </DocSection>
  <DocSection title="Outline" description="Los mismos seis tonos con borde intenso, fondo blanco y texto del color semántico.">
   <DocPreview align="start"><AndyTagPaletteGallery onlyAppearance="outline"/></DocPreview>
  </DocSection>
 </>;
 if(id==='tarjeta')return <Cards/>;
 if(id==='mensaje')return <>
  {notices.map(item=><ComponentExample key={item.id} title={item.title} description="Colores de texto, borde, fondo e ícono tomados del componente mensaje_destacado de Figma.">
   <div className={'andy-alert andy-alert-'+item.id}><Icon name={item.icon}/><div><strong>{item.heading}</strong><p>{item.body}</p></div></div>
  </ComponentExample>)}
  <ComponentExample title="Estado vacío" description="Se muestra cuando no hay resultados para los filtros actuales.">
   <div className="andy-empty"><Icon name="search" size={42}/><h3>No encontramos actividades</h3><p>Probá con otros filtros o cambiá el término de búsqueda.</p><button type="button" className="andy-btn andy-btn-outline">Limpiar filtros</button></div>
  </ComponentExample>
 </>;
 if(additionalComponents.some(([key])=>key===id)) return <AndyAdditionalComponent key={id} id={id as typeof additionalComponents[number][0]}/>;
 if(id==='acordeon')return <>
  <ComponentExample title="Apertura única" description="Solo un panel abierto a la vez."><AccordionDemo/></ComponentExample>
  <ComponentExample title="Apertura múltiple" description="Podés desplegar varios paneles a la vez."><AccordionDemo multiple/></ComponentExample>
  <ComponentExample title="Deshabilitado" description="El segundo ítem, «¿Puedo cambiar el horario?», está deshabilitado; los demás siguen siendo interactivos."><AccordionDemo disabledMiddle/></ComponentExample>
 </>;
 return null;
}
const EMPTY_TOC_ITEMS:{id:string;title:string}[]=[];
function HeadingToc({items}:{items:{id:string;title:string}[]}){
 const [links,setLinks]=useState<{id:string;title:string}[]>(items);
 const [active,setActive]=useState(items[0]?.id??'');
 useEffect(()=>{
  const next=[...document.querySelectorAll<HTMLElement>(
   '.andy-doc-main .andy-doc-section-heading > h3, .andy-doc-main .andy-section-head > h2, .andy-doc-main .andy-scrollbar-section > h3, .andy-doc-main .andy-palette-variant-heading > h3, .andy-doc-main .andy-button-section-intro > h3'
  )].map((heading,index)=>{
   const target=heading.closest<HTMLElement>('.andy-doc-section, .andy-button-doc-section')||heading;
   const id=target.id||'andy-toc-'+index;
   if(!target.id)target.id=id;
   return {id,title:heading.textContent?.trim()||'Sección'};
  });
  const frame=window.requestAnimationFrame(()=>{setLinks(next);setActive(next[0]?.id??'');});
  const targets=next.map(item=>document.getElementById(item.id)).filter((el):el is HTMLElement=>!!el);
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((left,right)=>left.boundingClientRect.top-right.boundingClientRect.top);
   if(visible[0])setActive(visible[0].target.id);
  },{rootMargin:'-15% 0px -68% 0px',threshold:0});
  targets.forEach(target=>observer.observe(target));
  return()=>{window.cancelAnimationFrame(frame);observer.disconnect();};
 },[items]);
 if(!links.length)return null;
 return <aside className="andy-doc-toc" aria-label="En esta página"><strong>En esta página</strong>
  <nav>{links.map(item=><a key={item.id} className={active===item.id?'is-active':''} href={'#'+item.id} aria-current={active===item.id?'location':undefined}
   onClick={event=>{
    const target=document.getElementById(item.id);
    if(!target)return;
    event.preventDefault();
    setActive(item.id);
    target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    window.history.replaceState(window.history.state,'','#'+item.id);
   }}>{item.title}</a>)}</nav>
 </aside>;
}
const views:Record<Category,()=>ReactNode>={fundamentos:Foundations,filtros:Filters,formularios:Forms,seleccion:Selection,tarjetas:Cards,mensajes:Messages};
export function AndyKitPage(){
 const {categoria,componente}=useParams<{categoria?:string;componente?:string}>();
 const aliasedComponent=componente?componentAliases[componente]:undefined;
 const [navOpen,setNavOpen]=useState(false);
 const [componentSearch,setComponentSearch]=useState('');
 const [copied,setCopied]=useState(false);
 const [showBackToTop,setShowBackToTop]=useState(false);
 const normalizedSearch=componentSearch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
 const filteredGroups=componentGroups.map(group=>({...group,items:group.items.filter(([id,title])=>!normalizedSearch||[title,id,componentMeta[id].description,group.title].some(value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(normalizedSearch)))})).filter(group=>group.items.length>0);
 const legacy=categories.find(c=>c.id===(categoria??'fundamentos'));
 const componentEntry=componentEntries.find(([id])=>id===componente);
 const isComponent=categoria==='componentes'&&!!componentEntry;
 const isDirectory=categoria==='componentes'&&!componente;
 const componentIndex=componentEntries.findIndex(([id])=>id===componente);
 const previousComponent=componentIndex>0?componentEntries[componentIndex-1]:null;
 const nextComponent=componentIndex>=0?componentEntries[componentIndex+1]:null;
 const displayName=isComponent?componentEntry[1]:isDirectory?'Componentes':legacy?.name;
 const meta=isComponent?componentMeta[componentEntry[0]]:null;
 useEffect(()=>{document.title='MLZ UI Kit - Andy'+(displayName?' · '+displayName:'');},[displayName]);
 useEffect(()=>{
  const updateVisibility=()=>setShowBackToTop(window.scrollY>360);
  updateVisibility();
  window.addEventListener('scroll',updateVisibility,{passive:true});
  return()=>window.removeEventListener('scroll',updateVisibility);
 },[]);

 if(categoria==='componentes'&&aliasedComponent)return <Navigate to={'/ui-kit-andy/'+aliasedComponent} replace/>;
 if(!isComponent&&!isDirectory&&!legacy)return <Navigate to="/ui-kit-andy/fundamentos" replace/>;
 const Gallery=legacy?views[legacy.id]:null;
 return <div className="andy-kit andy-doc-layout" data-testid="andy-ui-kit">
  <a href="#andy-content" className="skip-link">Ir al contenido</a>
  <header className="andy-header"><div className="andy-container andy-topbar">
   <div className="andy-topbar-heading"><h1>MLZ UI Kit - Andy</h1>
     <span className="andy-eyebrow"><span>Municipio de Lomas de Zamora</span><span className="andy-eyebrow-divider"> · </span><span className="andy-design-system-label">Design System</span></span></div>
   <p className="andy-version">{commit==='local'?<b><span className="andy-version-prefix">Desarrollo </span>local</b>:<a href={'https://github.com/SantiagoM96/mlz-muni/commit/'+commit} target="_blank" rel="noopener noreferrer" aria-label={'Versión '+commit.slice(-3).toUpperCase()}><b><span className="andy-version-prefix">Versión </span>{commit.slice(-3).toUpperCase()}</b></a>}<span className="andy-version-updated"><span className="andy-version-updated-label">Actualizado</span><span className="andy-version-date">{buildDateLabel}</span><time dateTime={buildTimestamp}>{buildTimeLabel}</time></span></p>
   <button type="button" className="andy-sidebar-toggle" aria-label={navOpen?'Cerrar menú de componentes':'Abrir menú de componentes'} aria-expanded={navOpen} aria-controls="andy-component-nav" onClick={()=>setNavOpen(v=>!v)}>
     <Icon name="menu" size={24}/><span className="andy-sidebar-toggle-label">Componentes</span>
   </button>
  </div></header>
  {navOpen&&<button type="button" className="andy-sidebar-backdrop" aria-label="Cerrar navegación" onClick={()=>setNavOpen(false)}/>}
  <div className="andy-doc-body andy-container">
   <aside className={'andy-sidebar'+(navOpen?' is-open':'')} id="andy-component-nav" aria-label="Navegación del Design System">
    <nav>
     <div className="andy-nav-group"><span className="andy-nav-heading">Foundations</span>
      <NavLink end to="/ui-kit-andy/fundamentos" onClick={()=>setNavOpen(false)} className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>Fundamentos y tokens</NavLink>
     </div>
     <div className="andy-nav-divider"/>
     <NavLink end to="/ui-kit-andy/componentes" onClick={()=>setNavOpen(false)} className={({isActive})=>"andy-nav-label andy-nav-label-link"+(isActive?" active":"")}>Components</NavLink>
     <div className="andy-component-search">
      <Icon name="search" size={20}/>
      <input type="search" aria-label="Buscar componentes" placeholder="Buscar componentes" value={componentSearch}
        onChange={event=>setComponentSearch(event.target.value)}/>
      {componentSearch&&<button type="button" className="andy-component-search-clear" onClick={()=>setComponentSearch('')} aria-label="Limpiar búsqueda"><Icon name="close" size={18}/></button>}
     </div>
     {filteredGroups.length===0&&<p className="andy-component-search-empty" role="status">No encontramos componentes.</p>}
     {filteredGroups.map(group=><div className="andy-nav-group" key={group.title}>
      <span className="andy-nav-heading">{group.title}</span>
      {group.items.map(([id,title])=><NavLink key={id} to={'/ui-kit-andy/componentes/'+id} onClick={()=>setNavOpen(false)}
        className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>{title}</NavLink>)}
     </div>)}
     <div className="andy-nav-divider"/>
     <div className="andy-nav-group"><span className="andy-nav-heading">Patterns · Composiciones</span>
      {categories.filter(c=>c.id!=='fundamentos').map(c=><NavLink to={'/ui-kit-andy/'+c.id} key={c.id} onClick={()=>setNavOpen(false)} className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>{c.name}</NavLink>)}
     </div>
    </nav>
   </aside>
   <main className="andy-doc-main" id="andy-content">
    <div className="andy-main-heading">
     <div><p>{isComponent?'Components / '+meta?.category:(categoria==='fundamentos'?'Foundations':'Patterns')+' / '+(legacy?.name||'Foundations')}</p>
      <h2>{displayName}</h2>
      {meta&&<div className="andy-doc-description">{meta.description}</div>}
     </div>
     {isComponent&&<div className="andy-doc-page-actions"><button type="button" onClick={()=>{void navigator.clipboard?.writeText(window.location.href).then(()=>setCopied(true)).catch(()=>setCopied(false))}}><Icon name="content_copy" size={18}/>{copied?'Copiado':'Copiar enlace'}</button><span className="andy-doc-step-links">{previousComponent&&<NavLink to={'/ui-kit-andy/componentes/'+previousComponent[0]} aria-label={'Componente anterior: '+previousComponent[1]}><Icon name="arrow_back" size={20}/></NavLink>}{nextComponent&&<NavLink to={'/ui-kit-andy/componentes/'+nextComponent[0]} aria-label={'Componente siguiente: '+nextComponent[1]}><Icon name="arrow_forward" size={20}/></NavLink>}</span></div>}
    </div>
    {isComponent?<div className="andy-doc-page"><ComponentDetails id={componentEntry[0]}/></div>:
     isDirectory?<div className="andy-component-directory">{componentGroups.map(group=><section key={group.title}>
       <h3>{group.title}</h3><div className="andy-directory-grid">{group.items.map(([id,title])=><NavLink to={'/ui-kit-andy/componentes/'+id} key={id}>
        <strong>{title}</strong><span>{componentMeta[id].description}</span><Icon name="chevron_right" size={24}/>
       </NavLink>)}</div></section>)}</div>:
     Gallery&&<Gallery/>}
   </main>
   <HeadingToc key={displayName} items={EMPTY_TOC_ITEMS}/>
  </div>
  <button type="button" className={'andy-back-to-top'+(showBackToTop?' is-visible':'')} aria-label="Volver al inicio de la página" title="Volver arriba" tabIndex={showBackToTop?0:-1} onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}>
   <Icon name="arrow_upward" size={22}/>
  </button>
  <footer className="andy-footer">Catálogo de trabajo. Las demostraciones no registran inscripciones ni modifican datos reales.</footer>
 </div>;
}

