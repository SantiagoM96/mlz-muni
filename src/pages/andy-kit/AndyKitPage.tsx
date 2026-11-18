import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import { SportsControlsGallery } from '../ui-kit/SportsControlsGallery';
import { FormStateMatrix } from './FormStateMatrix';
import { AndySportsFormExamples } from './AndySportsFormExamples';
import { DropdownVariantsGallery } from './DropdownVariantsGallery';
import { AndyCalendarDocs } from './AndyCalendarDocs';
import { AndyDatePickerDocs } from './AndyDatePickerDocs';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { ColorTokensGallery } from './ColorTokensGallery';
import { AndyActivityCardGallery } from './AndyActivityCards';
import { AndyMunicipalCardGallery } from './AndyMunicipalCards';
import { AndyScrollbarGallery } from './AndyScrollbarGallery';
import { AndyBadgeDocs } from './AndyBadgeDocs';
import { AndyButtonMatrix } from './AndyButtonMatrix';
import { AndyDashedUploadStates, AndySolidUploadStates, AndySolidUploadPreview, AndyDashedUpload } from './AndyDashedUpload';
import { AndyIconUpload, AndyIconUploadStates } from './AndyAttachmentGallery';
import { AndyAvatarDocs } from './AndyAvatarDocs';
import { AndyBreadcrumbDocs } from './AndyBreadcrumbDocs';
import { AndySpacingGuide, AndyRadiusGuide } from './AndyGeometryGuides';
import { MaterialIconLibrary } from './MaterialIconLibrary';
import { AndyAdditionalComponent, additionalComponents } from './AndyAdditionalComponents';
import { componentGroups, componentAliases, componentEntries, componentMeta, type ComponentId } from './andy-kit.registry';
import './andy-kit.css';
import './andy-scrollbars.css';

const reviewedComponentIds=new Set<ComponentId>(['acordeon','mensaje','dialog','alert-dialog','avatar','chips','breadcrumb','boton']);
const inProgressComponentIds=new Set<ComponentId>(['calendar','calendario']);

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
     <div className="andy-foundation-type-hero">
      <div className="andy-foundation-type-overline">FAMILIA TIPOGRÁFICA INSTITUCIONAL</div>
      <div className="andy-foundation-type-name">Geometria</div>
      <p>Una voz tipográfica consistente para la comunicación municipal: clara en títulos, cómoda en lectura y precisa en controles.</p>
      <div className="andy-foundation-weights"><span className="weight-400">Regular <small>400</small></span><span className="weight-500">Medium <small>500</small></span><span className="weight-700">Bold <small>700</small></span></div>
     </div>
     <div className="andy-foundation-type-list">
      <div className="andy-foundation-type-row"><div><span>Section · 24 / 30</span><code>--text-institutional-section</code></div><strong className="type-section">Título de sección</strong></div>
      <div className="andy-foundation-type-row"><div><span>Body · 18 / 26</span><code>--text-institutional-body</code></div><p className="type-body">Texto de lectura para contenido institucional y descripciones relevantes. Una composición de ejemplo que demuestra el ritmo de las líneas.</p></div>
      <div className="andy-foundation-type-row"><div><span>Control · 16 / 24</span><code>Uso recurrente, sin token global</code></div><span className="type-control">Etiqueta de campo y opciones</span></div>
      <div className="andy-foundation-type-row"><div><span>Helper · 13 / 20</span><code>Uso recurrente, sin token global</code></div><span className="type-helper">Texto de ayuda, aclaraciones y metadatos</span></div>
     </div>
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
type AlertTone='info'|'success'|'warning'|'error';
function AlertExample({tone,title,children,action}:{
 tone:AlertTone;title:string;children:ReactNode;action?:ReactNode;
}){
 const icons:Record<AlertTone,MaterialIconName>={info:'error',success:'check_circle',warning:'warning',error:'cancel'};
 return <div className={'andy-alert andy-alert-'+tone}>
  <Icon name={icons[tone]}/>
  <div className="andy-alert-body">
   <strong>{title}</strong><p>{children}</p>
  </div>
  {action&&<div className="andy-alert-action">{action}</div>}
 </div>;
}
function AlertActionExample(){
 const [resolved,setResolved]=useState(false);
 return <AlertExample tone={resolved?'success':'error'} title={resolved?'Datos revisados':'No se pudieron guardar los datos'}
  action={!resolved&&<button type="button" className="andy-alert-action-button" onClick={()=>setResolved(true)}>Reintentar</button>}>
  {resolved?'La operación se completó correctamente. Ya podés continuar con la inscripción.':'Ocurrió un problema al procesar la solicitud. Volvé a intentar para comprobar el estado de la operación.'}
 </AlertExample>;
}
function AlertDocs(){return <>
 <DocSection title="Descripción" description="Alert comunica información importante dentro del flujo de una página, sin interrumpir la tarea ni exigir que el usuario cierre una ventana.">
  <p className="andy-alert-doc-description">Usalo para explicar una condición relevante, confirmar una operación, advertir sobre requisitos o informar un error. A diferencia de un Toast, puede permanecer visible mientras esa información siga siendo necesaria. No reemplaza los mensajes de error asociados a un campo ni los estados vacíos de una lista.</p>
 </DocSection>
 <DocSection title="Básico" description="Composición de referencia: ícono, título y descripción. Utiliza la misma geometría y colores del mensaje destacado institucional.">
  <DocPreview><AlertExample tone="info" title="Antes de empezar">Revisá los requisitos de la actividad y tené a mano la documentación necesaria. Cuando tengas todo listo, completá los datos de la inscripción.</AlertExample></DocPreview>
 </DocSection>
 <DocSection title="Variantes" description="La intención del mensaje determina el color y el ícono. No cambies los colores de forma arbitraria: cada variante comunica un significado distinto.">
  <DocPreview>
   <div className="andy-alert-variants">
    <AlertExample tone="info" title="Información">Podés consultar los días, horarios y sedes disponibles antes de comenzar la inscripción.</AlertExample>
    <AlertExample tone="success" title="Datos completos">La información del formulario se guardó correctamente y ya podés continuar.</AlertExample>
    <AlertExample tone="warning" title="Atención">Algunas actividades requieren documentación adicional. Revisá los requisitos antes de confirmar.</AlertExample>
    <AlertExample tone="error" title="Revisá el formulario">Hay datos obligatorios pendientes. Completá los campos señalados para continuar.</AlertExample>
   </div>
  </DocPreview>
 </DocSection>
 <DocSection title="Con acción" description="Sumá una acción cuando el mensaje permita resolver una situación concreta. El botón debe indicar qué sucede al presionarlo.">
  <DocPreview><AlertActionExample/></DocPreview>
 </DocSection>

 <DocSection title="Anatomía" description="Partes comunes del mensaje y función de cada elemento.">
  <GuidelineTable rows={[
   ['Contenedor','Superficie que agrupa el contenido informativo y utiliza un tono semántico.'],
   ['Ícono','Símbolo Material Symbols que comunica el tipo de mensaje.'],
   ['Título','Descripción corta de la situación, en Geometria Bold.'],
   ['Descripción','Texto que explica el contexto y la acción que corresponde.'],
   ['Acción opcional','Botón visible cuando existe una forma concreta de resolver la situación.']
  ]}/>
 </DocSection>
 <DocSection title="Especificaciones" description="Valores reales de la implementación actual en el UI Kit. Se documenta la composición compartida y se conserva la paleta semántica ya establecida.">
  <GuidelineTable rows={[
   ['Contenedor','Borde sólido de 1 px; radio de 4 px (--mlz-radius-sm).'],
   ['Padding','16 px vertical y horizontal (--mlz-space-16).'],
   ['Espaciado','12 px entre ícono y contenido (--mlz-space-12); 4 px entre título y descripción (--mlz-space-4).'],
   ['Ícono','Material Symbols de 24 px; color según variante.'],
   ['Título','Geometria, 18 px / 26 px, peso 700 (bold).'],
   ['Descripción','Geometria, 18 px / 26 px, peso 400 (regular).'],
   ['Colores','Info: azul; Success: verde; Warning: amarillo; Error: rojo. Fondo, borde y texto dependen de la variante.'],
   ['Ancho','Fluido hasta el ancho del contenedor; en la preview se limita a 640 px.'],
   ['Acción','Opcional; botón integrado al mensaje, con etiqueta explícita y foco visible.']
  ]}/>
 </DocSection>
 <DocSection title="Comportamiento y accesibilidad" description="Alert comunica información persistente sin interrumpir el flujo ni exigir que se cierre el mensaje.">
  <GuidelineTable rows={[
   ['Persistencia','El mensaje permanece visible mientras la información sea relevante; no desaparece automáticamente como un Toast.'],
   ['Semántica','El ícono y el texto transmiten juntos el significado; no depender solo del color para comunicar el estado.'],
   ['Acción','Cuando hay botón, su etiqueta describe lo que sucederá y permite activación mediante teclado.'],
   ['Jerarquía','El mensaje complementa el contenido, sin sustituir errores asociados a campos específicos.'],
   ['Demostración','El ejemplo con acción simula un resultado sin enviar ni modificar datos reales.']
  ]}/>
 </DocSection>
</>}

function Messages(){return <AlertDocs/>}
function ComponentExample({title,description,children}:{title:string;description?:string;children:ReactNode}){
 return <DocSection title={title} description={description}><DocPreview>{children}</DocPreview></DocSection>;
}
type AccordionQuestion=[string,string,string];
function AccordionDemo({multiple=false,disabledMiddle=false,questions,initiallyOpen=true}:{multiple?:boolean;disabledMiddle?:boolean;questions?:AccordionQuestion[];initiallyOpen?:boolean}){
 const [open,setOpen]=useState<string[]>(initiallyOpen?['1']:[]);
 const defaultItems:AccordionQuestion[]=[
  ['1','¿Cómo puedo inscribirme?','Elegí la actividad que te interese y revisá los días, horarios y sedes disponibles. Después seleccioná una comisión, completá los datos solicitados y seguí los pasos indicados para finalizar tu preinscripción.'],
  ['2','¿Puedo cambiar el horario?','Antes de confirmar la preinscripción, podés volver a la ficha de la actividad y elegir otra comisión que tenga cupos disponibles. Revisá el nuevo día y horario para asegurarte de que se ajusten a tu disponibilidad.'],
  ['3','¿Dónde encuentro la sede?','En la ficha de cada actividad vas a encontrar el nombre de la sede, la dirección y la localidad correspondiente. Consultá esa información antes de inscribirte para comprobar que podés llegar al lugar en el horario elegido.']
 ];
 const items=questions??defaultItems;
 return <div className="andy-doc-accordion">{items.map(([id,title,content])=><div className="andy-doc-accordion-item" key={id}>
  <button type="button" disabled={disabledMiddle&&id==='2'} aria-expanded={open.includes(id)} onClick={()=>setOpen(prev=>prev.includes(id)?prev.filter(v=>v!==id):multiple?[...prev,id]:[id])}>
    <span className="andy-doc-accordion-trigger-label">{title}</span><Icon name="expand_more" size={24}/>
  </button>{open.includes(id)&&<div className="andy-doc-accordion-content">{content}</div>}
 </div>)}</div>;
}
function FormStates({family,title='Estados'}:{family:'text'|'dropdown'|'textarea'|'date'|'upload';title?:string}){
 return <DocSection title={title} description="Comparación simultánea de Default, Hover, Focus, Completo, Error y Disabled. Una única superficie contiene todos los controles.">
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
function ComponentDetails({id}:{id:ComponentId}){
 if(id==='field')return <FieldDocs/>;
 if(id==='input')return <InputDocs/>;
 if(id==='textarea')return <><FormStates family="textarea"/>
  <ComponentExample title="Texto multilínea" description="Permite escribir varias líneas y ajustar la altura.">
   <div className="andy-form-grid"><label className="andy-field"><span>Observaciones</span><textarea placeholder="Escribí una observación"/></label></div>
  </ComponentExample></>;
 if(id==='adjuntos')return <>
  <DocSection title="Descripción" description="Attachment permite incorporar un documento o representar archivos mediante un control consistente con los formularios de MLZ.">{null}</DocSection>
  <DocSection title="Estándar" description="Archivo único de 48 px con borde continuo: clip inicial, progreso de carga, procesamiento y archivo cargado con acción de quitar, todo dentro del mismo control.">
   <DocPreview><AndySolidUploadPreview/></DocPreview>
   <DocPreview align="start"><AndySolidUploadStates/></DocPreview>
  </DocSection>
  <DocSection title="Borde punteado" description="El mismo flujo de archivo único en 48 px, con un borde dashed nativo: selección, progreso, procesamiento y eliminación desde el campo.">
   <DocPreview><AndyDashedUpload kind="document"/></DocPreview>
   <DocPreview align="start"><AndyDashedUploadStates/></DocPreview>
  </DocSection>
  <DocSection title="Ícono" description="Seleccioná un documento desde toda la superficie del campo. Después se muestran sus estados de subida, procesamiento, error y completado, con iconografía y acciones propias.">
   <DocPreview><AndyIconUpload/></DocPreview>
   <DocPreview align="start"><AndyIconUploadStates/></DocPreview>
  </DocSection>
  <DocSection title="Anatomía" description="Composición reutilizable para el campo de carga y para la tarjeta del archivo, manteniendo las responsabilidades separadas.">
   <GuidelineTable rows={[
    ['Etiqueta','Nombre del campo. Sin asterisco cuando es obligatorio; «(opcional)» solo cuando corresponda.'],
    ['Control de carga','Superficie de 48 px que abre el selector nativo de un solo archivo en Estándar y Borde punteado.'],
    ['Archivo / Media','Ícono del formato o miniatura cuando hay una imagen disponible.'],
    ['Contenido','Nombre legible y metadatos: formato, tamaño y estado.'],
    ['Acciones','Ver o quitar archivo; cada acción debe ser independiente y accesible.'],
    ['Ayuda y error','Formatos, límite de tamaño y explicación textual del error; no depender únicamente del color.'],
   ]}/>
  </DocSection>
  <DocSection title="Especificaciones" description="Criterios de implementación de MLZ; los elementos reutilizan tamaños, colores y estados del Design System.">
   <GuidelineTable rows={[
    ['Variantes','Estándar y Borde punteado son controles de archivo único; Ícono combina selección y presentación de estados de archivo en una fila.'],
    ['Altura del control','48 px exactos en Estándar y Borde punteado; Ícono conserva 64 px de altura en todos sus estados.'],
    ['Formatos documentales','PDF, DOC y DOCX en los ejemplos actuales; imágenes JPG, PNG o WEBP en la variante de fotografía.'],
    ['Límite de ejemplo','10 MB por archivo; el producto debe validar también del lado del servidor.'],
    ['Colores','Primario 600 para valores completos, Info 500 para foco y Error para validaciones incorrectas.'],
    ['Estados','Las tres variantes tienen su propia matriz: Default, Hover, Focus, Subiendo, Procesando, Completo, Error y Disabled.'],
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento" description="La selección, lectura y eliminación deben ser operables con teclado, con mensajes precisos y sin acciones ambiguas.">
   <GuidelineTable rows={[
    ['Seleccionar','Abrir el selector nativo y actualizar el nombre visible cuando se elige un archivo válido.'],
    ['Reemplazar','Permitir seleccionar otro archivo sin conservar un error previo; validar formato y tamaño nuevamente.'],
    ['Quitar','Acción independiente de Abrir o Ver, con nombre accesible que identifica el archivo.'],
    ['Carga','En Estándar y Borde punteado, mostrar progreso y procesamiento dentro del mismo campo; los ejemplos del UI Kit son simulaciones, no confirmaciones del servidor.'],
    ['Error','Indicar por escrito la causa y cómo resolverla, con aviso accesible.'],
    ['Varios archivos','Usar una lista clara; recurrir a carrusel horizontal solo cuando la cantidad y el contexto lo justifiquen.'],
   ]}/>
  </DocSection>
 </>;
 if(id==='select')return <><FormStates family="dropdown"/>
  {([['simple','Selección normal','Una opción con marca de confirmación.'],['radio','Selección con radio','Una sola elección con un indicador circular.'],['checkbox','Selección múltiple','Varias opciones con indicadores independientes.'],['search','Con buscador','Filtrado de opciones dentro del menú.']] as const).map(([variant,title,description])=>
   <ComponentExample key={variant} title={title} description={description}><DropdownVariantsGallery only={variant}/></ComponentExample>)}
 </>;
 if(id==='calendar')return <AndyCalendarDocs/>;
 if(id==='calendario')return <AndyDatePickerDocs fieldStates={<FormStates family="date" title="Estados del campo"/>}/>;
 if(id==='checkbox'||id==='radio'||id==='switch')return <ComponentExample title="Ejemplo interactivo" description={id==='checkbox'?'Permití seleccionar varias opciones de forma independiente.':id==='radio'?'Solo una alternativa puede estar seleccionada.':'Activá o desactivá la configuración.'}>
  <SelectionGallery only={id}/>
 </ComponentExample>;
 if(id==='boton')return <Buttons/>;
 if(id==='chips')return <AndyBadgeDocs/>;
 if(id==='avatar')return <AndyAvatarDocs/>;
 if(id==='breadcrumb')return <AndyBreadcrumbDocs/>;
 if(id==='tarjeta')return <Cards/>;
 if(id==='mensaje')return <AlertDocs/>;
 if(additionalComponents.some(([key])=>key===id)) return <AndyAdditionalComponent key={id} id={id as typeof additionalComponents[number][0]}/>;
 if(id==='acordeon')return <>
  <DocSection title="Descripción" description="Accordion organiza información secundaria en paneles expandibles, para que las personas consulten los detalles que necesitan sin sobrecargar la pantalla.">
   <p className="andy-alert-doc-description">Utilizalo para preguntas frecuentes, aclaraciones sobre requisitos y contenido complementario. Cada encabezado es un botón: permite abrir o cerrar su contenido, funciona con teclado e indica si el panel está expandido. No lo uses para ocultar información imprescindible para completar una tarea.</p>
  </DocSection>
  <DocSection title="Básico" description="Apertura única: un panel abierto a la vez, con encabezados interactivos y chevron de estado.">
   <DocPreview><AccordionDemo/></DocPreview>
  </DocSection>
  <DocSection title="Apertura múltiple" description="Podés desplegar varios paneles a la vez. Cada encabezado conserva su estado y comportamiento de teclado.">
   <DocPreview><AccordionDemo multiple/></DocPreview>
  </DocSection>
  <DocSection title="Deshabilitado" description="El segundo ítem, «¿Puedo cambiar el horario?», está deshabilitado; los demás siguen siendo interactivos.">
   <DocPreview><AccordionDemo disabledMiddle/></DocPreview>
  </DocSection>
  <DocSection title="Anatomía" description="Partes estructurales presentes en todas las variantes del acordeón.">
   <GuidelineTable rows={[
    ['Grupo','Contenedor que organiza los paneles relacionados.'],
    ['Encabezado','Botón que ocupa toda la anchura y expone aria-expanded.'],
    ['Etiqueta','Pregunta o título que explica el contenido disponible.'],
    ['Indicador','Chevron al extremo derecho; indica si el panel está expandido.'],
    ['Panel','Contenido mostrado bajo el encabezado cuando se expande.'],
    ['Separadores','Líneas que distinguen ítems sin añadir tarjetas anidadas.']
   ]}/>
  </DocSection>
  <DocSection title="Especificaciones" description="Medidas, espaciados y estados de los acordeones implementados actualmente en el UI Kit MLZ.">
   <GuidelineTable rows={[
    ['Ancho','El grupo ocupa hasta 670 px en los ejemplos. Cada encabezado utiliza el 100 % del ancho disponible.'],
    ['Área clickeable','Altura mínima de 48 px por encabezado, en toda su anchura; sin borde ni relleno de fondo.'],
    ['Padding del encabezado','16 px horizontales (--mlz-space-16); el contenido se centra verticalmente.'],
    ['Tipografía del encabezado','Geometria, 16 px / 24 px, peso 700 (bold), color primario #236999.'],
    ['Chevron','Material Symbols de 24 px, alineado a la derecha. Gira 180° al expandirse el panel.'],
    ['Separadores','Línea de 1 px (#dbe6ef) entre ítems; también al inicio del primer ítem.'],
    ['Espaciado entre ítems','8 px arriba y abajo del encabezado (--mlz-space-8).'],
    ['Contenido expandido','Geometria, 15 px / 24 px. Padding: 8 px arriba y abajo, 16 px a ambos lados.'],
    ['Hover','Solo se subraya el texto del encabezado; no se aplica fondo ni borde. La zona clickeable no cambia.'],
    ['Focus visible','Contorno de 2 px, separado 2 px del encabezado, al navegar con teclado.'],
    ['Deshabilitado','Misma geometría y peso tipográfico; texto e ícono grisados, sin interacción.'],
    ['Comportamiento','Apertura única o múltiple; el botón expone el estado abierto/cerrado con aria-expanded.']
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento y accesibilidad" description="Las variantes comparten manejo de teclado, estados y reglas de uso.">
   <GuidelineTable rows={[
    ['Apertura única','Al abrir un panel, se cierra el anterior.'],
    ['Apertura múltiple','Cada panel se abre y se cierra de forma independiente.'],
    ['Teclado','Enter y Espacio activan el encabezado; Tab recorre los botones disponibles.'],
    ['Estado','El botón informa abierto o cerrado mediante aria-expanded.'],
    ['Deshabilitado','El botón no recibe clics ni responde al teclado mientras está deshabilitado.'],
    ['Contenido','No ocultar información imprescindible para completar una gestión.']
   ]}/>
  </DocSection>
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
        className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}><span className="andy-nav-component-name">{title}</span>{reviewedComponentIds.has(id)?<span className="andy-nav-review-mark" title="Componente revisado" aria-label="Revisado"><Icon name="check_circle" size={17}/></span>:inProgressComponentIds.has(id)?<span className="andy-nav-review-mark andy-nav-progress-mark" title="En revisión · pendiente de refinar" aria-label="En revisión"><Icon name="pending_actions" size={17}/></span>:null}</NavLink>)}
     </div>)}
     <div className="andy-nav-divider"/>
     <div className="andy-nav-group"><span className="andy-nav-heading">Patterns · Composiciones</span>
      {categories.filter(c=>c.id!=='fundamentos').map(c=><NavLink to={'/ui-kit-andy/'+c.id} key={c.id} onClick={()=>setNavOpen(false)} className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>{c.name}</NavLink>)}
     </div>
    </nav>
   </aside>
   <main className="andy-doc-main" id="andy-content">
    <div className="andy-main-heading">
     <div className="andy-main-heading-title"><p>{isComponent?'Components / '+meta?.category:(categoria==='fundamentos'?'Foundations':'Patterns')+' / '+(legacy?.name||'Foundations')}</p>
      <h2>{displayName}</h2>
     </div>
     {isComponent&&<div className="andy-doc-page-actions"><button type="button" onClick={()=>{void navigator.clipboard?.writeText(window.location.href).then(()=>setCopied(true)).catch(()=>setCopied(false))}}><Icon name="content_copy" size={18}/>{copied?'Copiado':'Copiar enlace'}</button><span className="andy-doc-step-links">{previousComponent&&<NavLink to={'/ui-kit-andy/componentes/'+previousComponent[0]} aria-label={'Componente anterior: '+previousComponent[1]}><Icon name="arrow_back" size={20}/></NavLink>}{nextComponent&&<NavLink to={'/ui-kit-andy/componentes/'+nextComponent[0]} aria-label={'Componente siguiente: '+nextComponent[1]}><Icon name="arrow_forward" size={20}/></NavLink>}</span></div>}
     {meta&&<div className="andy-doc-description">{meta.description}</div>}
    </div>
    {isComponent?<div className={'andy-doc-page'+(reviewedComponentIds.has(componentEntry[0])?' is-reviewed':'')}><ComponentDetails id={componentEntry[0]}/></div>:
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

