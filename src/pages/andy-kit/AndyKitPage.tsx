import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import { SportsControlsGallery } from '../ui-kit/SportsControlsGallery';
import { FormStateMatrix } from './FormStateMatrix';
import { DropdownVariantsGallery } from './DropdownVariantsGallery';
import { AndyCalendarShowcase } from './AndyCalendarShowcase';
import { SportsCalendarPicker } from './SportsCalendarPicker';
import { DocSection, DocPreview } from './AndyDocsPrimitives';
import { AndyActivityCard } from './AndyActivityCards';
import { ColorTokensGallery } from './ColorTokensGallery';
import { AndyActivityCardGallery } from './AndyActivityCards';
import { AndyScrollbarGallery } from './AndyScrollbarGallery';
import { AndyTagPaletteGallery } from './AndyTagPaletteGallery';
import { AndyButtonMatrix } from './AndyButtonMatrix';
import { AndySpacingGuide, AndyRadiusGuide } from './AndyGeometryGuides';
import { AndyAdditionalComponent, additionalComponents } from './AndyAdditionalComponents';
import './andy-kit.css';

const categories = [
  { id:'fundamentos', name:'Fundamentos' },
  { id:'filtros', name:'Buscador y filtros' },
  { id:'formularios', name:'Formularios' },
  { id:'seleccion', name:'Selección y estados' },
  { id:'botones', name:'Botones' },
  { id:'etiquetas', name:'Chips y etiquetas' },
  { id:'tarjetas', name:'Tarjetas y resúmenes' },
  { id:'mensajes', name:'Mensajes' },
] as const;
type Category = typeof categories[number]['id'];
const componentGroups=[
 {title:'Fundamentos',items:[['espaciados','Espaciados'],['border-radius','Border radius']]}, 
 {title:'Campos de formulario',items:[['input','Input / Text field'],['select','Dropdown / Select'],['textarea','Text area'],['calendario','Calendario / Date Picker'],['adjuntos','Adjuntar archivos']]},
 {title:'Selección',items:[['checkbox','Checkbox'],['radio','Radio button'],['switch','Switch']]},
 {title:'Filtros y navegación',items:[['buscador','Buscador'],['seleccion-unica','Selección única'],['seleccion-multiple','Selección múltiple'],['filtros-avanzados','Filtros avanzados'],['ordenamiento','Ordenamiento'],['scrollbars','Barras de scroll']]},
 {title:'Acciones y contenido',items:[['boton','Botones'],['chips','Chips y etiquetas'],['tarjeta','Tarjetas y resúmenes'],['mensaje','Mensajes y alertas'],['acordeon','Acordeón']]},
 {title:'Componentes adicionales',items:additionalComponents}
] as const;
type ComponentId=typeof componentGroups[number]['items'][number][0];
const componentAliases:Record<string,string>={sede:'seleccion-multiple',edad:'seleccion-unica','mas-filtros':'filtros-avanzados',ordenar:'ordenamiento'};
const componentEntries:ReadonlyArray<readonly [ComponentId,string]>=componentGroups.flatMap(group=>group.items as ReadonlyArray<readonly [ComponentId,string]>);
const componentMeta:Record<ComponentId,{description:string;category:string}>={
 espaciados:{description:'Escala oficial 2–64 px de gaps, márgenes y padding de todos los componentes.',category:'Fundamentos'},
 'border-radius':{description:'Escala semántica de redondeos para controles, paneles, tarjetas y drawers.',category:'Fundamentos'},
 input:{description:'Campos de una línea con estados de reposo, hover, foco, completo, error y deshabilitado.',category:'Campos de formulario'},
 select:{description:'Selección única, múltiple y con búsqueda; menús desktop y drawers mobile.',category:'Campos de formulario'},
 textarea:{description:'Campos de texto multilínea y sus estados.',category:'Campos de formulario'},
 calendario:{description:'Selector de fechas del producto Deportes Anual, con vistas de mes y año.',category:'Campos de formulario'},
 adjuntos:{description:'Adjunto de documentación y sus estados visuales.',category:'Campos de formulario'},
 checkbox:{description:'Selección múltiple con Material Symbols Outlined.',category:'Selección'},
 radio:{description:'Selección exclusiva entre varias alternativas.',category:'Selección'},
 switch:{description:'Activar o desactivar una configuración.',category:'Selección'},
 buscador:{description:'Campo de búsqueda con ícono y estados institucionales.',category:'Filtros y navegación'},
 'seleccion-unica':{description:'Filtro de una sola elección, con radio button, estados y drawer mobile.',category:'Filtros y navegación'},
 'seleccion-multiple':{description:'Filtro que permite combinar varias opciones con checkbox y contador.',category:'Filtros y navegación'},
 'filtros-avanzados':{description:'Secciones desplegables, selección mixta, acciones y estados.',category:'Filtros y navegación'},
 ordenamiento:{description:'Selección exclusiva de criterio de orden y comportamiento del menú.',category:'Filtros y navegación'},
 scrollbars:{description:'Barras de scroll de página, dropdowns y menú lateral sin barra visible.',category:'Filtros y navegación'},
 boton:{description:'Acciones primarias, secundarias, de texto y con íconos.',category:'Acciones y contenido'},
 chips:{description:'Etiquetas y chips removibles.',category:'Acciones y contenido'},
 tarjeta:{description:'Tarjetas de actividad y resúmenes de inscripción.',category:'Acciones y contenido'},
 mensaje:{description:'Avisos informativos, estados de validación y vacíos.',category:'Acciones y contenido'},
 acordeon:{description:'Secciones expandibles de contenido, con apertura única o múltiple.',category:'Acciones y contenido'},
 'toast':{description:'Notificación temporal y descartable.',category:'Componentes adicionales'},
 'skeleton':{description:'Representación del contenido durante la carga.',category:'Componentes adicionales'},
 'data-table':{description:'Tabla de registros con filtrado y estados.',category:'Componentes adicionales'},
 'tabla':{description:'Presentación tabular de datos estructurados.',category:'Componentes adicionales'},
 'paginacion':{description:'Navegación entre páginas de registros.',category:'Componentes adicionales'},
 'progreso':{description:'Indicador de porcentaje de avance.',category:'Componentes adicionales'},
 'spinner':{description:'Indicador de operación en curso.',category:'Componentes adicionales'},
 'tooltip':{description:'Ayuda contextual accesible.',category:'Componentes adicionales'},
 'slider':{description:'Selección de un valor dentro de un rango.',category:'Componentes adicionales'},
 'toggle':{description:'Control de acción persistente con estado presionado.',category:'Componentes adicionales'},
 'toggle-group':{description:'Conjunto de acciones seleccionables.',category:'Componentes adicionales'},
 'empty':{description:'Estado vacío de una lista o vista.',category:'Componentes adicionales'},
 'separator':{description:'Separación semántica de contenidos.',category:'Componentes adicionales'},
 'dialog':{description:'Panel modal de contenido.',category:'Componentes adicionales'},
 'alert-dialog':{description:'Diálogo de confirmación.',category:'Componentes adicionales'},
 'sheet':{description:'Panel lateral superpuesto.',category:'Componentes adicionales'},
 'collapsible':{description:'Región de contenido expandible.',category:'Componentes adicionales'},
 'button-group':{description:'Grupo de botones relacionados.',category:'Componentes adicionales'}
};

const commit = import.meta.env.VITE_MLZ_COMMIT_SHA ?? 'local';
const colors = [
 ['Primario 600','#236999','Acciones, títulos e íconos'],
 ['Primario 500','#358DC2','Variación institucional'],
 ['Primario 700','#19577F','Hover primario'],
 ['Info / selección','#006EFF','Foco, selección, contador'],
 ['Borde de control','#5BA8D5','Input o filtro en reposo'],
 ['Texto 900','#3D3D3D','Texto principal'],
 ['Panel deshabilitado','#E5F0F9','Campos disabled / adjuntos'],
 ['Divisor','#E1E7EB','Separadores'],
 ['Error','#EF284C','Validaciones'],
 ['Éxito','#2ABB5B','Estados positivos'],
] as const;
function DemoSection({ title, description, children }: {title:string;description?:string;children:ReactNode}) {
 return <section className="andy-section"><div className="andy-section-head"><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</section>;
}
function Icon({name,size=24}: {name:MaterialIconName;size?:number}) { return <MaterialIcon name={name} size={size} />; }
function Foundations() {
 return <>
  <DemoSection title="Paleta cromática completa de Figma" description="Las 91 variables originales de Color Styles, agrupadas por familia, con nombres exactos y valores HEX. Tocá una muestra para copiar su código.">
    <ColorTokensGallery/>
  </DemoSection>
  <DemoSection title="Colores utilizados actualmente en Deportes" description="Selección de valores presentes en el producto. No todos tienen el mismo rol que una variable semántica global.">
    <div className="andy-swatches">{colors.map(([name,color,desc])=><div className="andy-swatch" key={name}><span style={{backgroundColor:color}}/><strong>{name}</strong><code>{color}</code><small>{desc}</small></div>)}</div>
  </DemoSection>
  <DemoSection title="Tipografía y geometría" description="Geometria en pesos 400, 500 y 700. Contenedores de hasta 1200 px.">
   <div className="andy-type"><h2>Agenda de deportes 2026</h2><p>Conocé todas las actividades deportivas y recreativas de la comunidad.</p><strong>Etiqueta de formulario</strong><span>Texto de contenido y ayuda</span></div>
   <div className="andy-metrics">{['Control 48 px','Borde 1 px','Activo 2 px','Radio 4 px','Gap opciones 2 px','Breakpoint móvil 680 px','Scrollbar 6 px','Material Symbols Outlined'].map(t=><span key={t}>{t}</span>)}</div>
  </DemoSection>
  <DemoSection title="Iconografía" description="Material Symbols Outlined, trazo sin relleno, vinculados a la fuente local del proyecto.">
   <div className="andy-icons">{(['search','expand_more','tune','check','calendar_month','schedule','location_on','visibility','visibility_off','attach_file','info','arrow_back','arrow_forward','close','sort','grid_view','map','edit','delete','add','content_copy','link'] as MaterialIconName[]).map(name=><div key={name}><Icon name={name}/><small>{name}</small></div>)}</div>
  </DemoSection>
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
 return <DemoSection title="Componentes de formulario" description="Una sola referencia por familia, con todos sus estados visibles. Dropdown reúne aquí las cuatro variantes abiertas, sin duplicarlas en otros bloques.">
   <FormStateMatrix/>
 </DemoSection>;
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
function Tags(){return <AndyTagPaletteGallery/>;}
function Cards(){return <DemoSection title="Tarjetas de actividad · Deportes y Agenda" description="Dos variantes hermanas: Deportes utiliza la banda degradada original (34 px desktop y 32 px mobile) y Agenda conserva su fotografía de 154 px. Comparten tipografía, espaciados, metadatos y tratamiento de bordes.">
 <AndyActivityCardGallery/>
</DemoSection>}
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
function AccordionDemo({multiple=false}:{multiple?:boolean}){
 const [open,setOpen]=useState<string[]>(['1']);
 const items:[string,string,string][]=[['1','¿Cómo puedo inscribirme?','Elegí una actividad, seleccioná el horario disponible y completá los datos solicitados.'],['2','¿Puedo cambiar el horario?','Podés volver a la ficha de la actividad para elegir otra comisión disponible.'],['3','¿Dónde encuentro la sede?','La dirección y los detalles se muestran en la ficha de cada actividad.']];
 return <div className="andy-doc-accordion">{items.map(([id,title,content])=><div className="andy-doc-accordion-item" key={id}>
  <button type="button" aria-expanded={open.includes(id)} onClick={()=>setOpen(prev=>prev.includes(id)?prev.filter(v=>v!==id):multiple?[...prev,id]:[id])}>
    {title}<Icon name="expand_more" size={24}/>
  </button>{open.includes(id)&&<div className="andy-doc-accordion-content">{content}</div>}
 </div>)}</div>;
}
function FilterExample({kind}:{kind:'sede'|'edad'|'mas-filtros'|'ordenar'}){
 return <SportsControlsGallery mode="filters" only={kind}/>;
}
function FormStates({family}:{family:'text'|'dropdown'|'textarea'|'date'|'upload'}){
 return <DocSection title="Estados" description="Comparación simultánea de Default, Hover, Focus, Completo, Error y Disabled. Una única superficie contiene todos los controles.">
  <DocPreview align="start"><FormStateMatrix onlyFamily={family} showExtras={false}/></DocPreview>
 </DocSection>;
}
function FilterDocs({id}:{id:'seleccion-unica'|'seleccion-multiple'|'filtros-avanzados'|'ordenamiento'}){
 if(id==='seleccion-unica')return <>
  <ComponentExample title="Selección única" description="El usuario elige una opción a la vez. Edad es el ejemplo real del producto; en mobile se abre como drawer.">
   <FilterExample kind="edad"/>
  </ComponentExample>
  <ComponentExample title="Opciones con radio" description="La opción en reposo utiliza Primario 600; al seleccionarla, el fondo pasa a Info 500 y el control a blanco.">
   <DropdownVariantsGallery only="radio"/>
  </ComponentExample>
 </>;
 if(id==='seleccion-multiple')return <>
  <ComponentExample title="Selección múltiple" description="Permite combinar varias sedes. El contador refleja la cantidad de opciones elegidas.">
   <FilterExample kind="sede"/>
  </ComponentExample>
  <ComponentExample title="Opciones con checkbox" description="Íconos de selección en Primario 600 en reposo y blancos sobre el estado seleccionado.">
   <DropdownVariantsGallery only="checkbox"/>
  </ComponentExample>
 </>;
 if(id==='filtros-avanzados')return <>
  <ComponentExample title="Filtros combinados" description="Reúne checkbox, radio y switch en secciones desplegables, sin fragmentar el flujo.">
   <FilterExample kind="mas-filtros"/>
  </ComponentExample>
  <ComponentExample title="Selección con buscador" description="Cuando las opciones son numerosas, se incorpora búsqueda dentro del menú.">
   <DropdownVariantsGallery only="search"/>
  </ComponentExample>
 </>;
 return <ComponentExample title="Ordenamiento" description="Una opción activa a la vez; el control funciona como un filtro de orden, no como un campo de formulario.">
  <FilterExample kind="ordenar"/>
 </ComponentExample>;
}
const notices=[
 {id:'success',title:'Success',heading:'Datos completos',body:'El formulario de demostración está listo para continuar.',icon:'check_circle' as const},
 {id:'info',title:'Info',heading:'Antes de empezar',body:'Completá los datos para continuar con la inscripción.',icon:'error' as const},
 {id:'warning',title:'Alert',heading:'Información importante',body:'Revisá los requisitos de la actividad antes de inscribirte.',icon:'warning' as const},
 {id:'error',title:'Error',heading:'Revisá el formulario',body:'Hay campos obligatorios pendientes.',icon:'cancel' as const}
];
function ComponentDetails({id}:{id:ComponentId}){
 if(id==='espaciados')return <>
  <DocSection title="Escala" description="Los espacios se documentan como tokens, desde 2 px hasta 64 px."><AndySpacingGuide/></DocSection>
  <DocSection title="Criterios de uso" description="Aplicación consistente de padding, gap y margin en botones, campos y contenedores.">
   <DocPreview><div className="andy-doc-guideline"><strong>Pequeños · 2–8 px</strong><span>Separación entre ícono y etiqueta.</span><strong>Medios · 10–16 px</strong><span>Padding de controles y distancia entre campos.</span><strong>Grandes · 24–64 px</strong><span>Separación de bloques y secciones.</span></div></DocPreview>
  </DocSection>
 </>;
 if(id==='border-radius')return <>
  <DocSection title="Escala de radios" description="Radios semánticos para cada familia de superficies."><AndyRadiusGuide/></DocSection>
  <DocSection title="Dónde utilizar cada radio" description="Se prioriza un radio de 4 px para controles, 6 px para chips y 8 px para tarjetas.">
   <DocPreview><div className="andy-doc-guideline"><strong>4 px · Controles</strong><span>Input, dropdown y botones.</span><strong>6–8 px · Superficies</strong><span>Chips, popovers y tarjetas.</span><strong>12–16 px · Contenedores</strong><span>Paneles y drawers móviles.</span></div></DocPreview>
  </DocSection>
 </>;
 if(id==='input')return <><FormStates family="text"/>
  <ComponentExample title="Campo interactivo" description="Escribí para observar cómo se comporta el campo con contenido y foco.">
   <div className="andy-search-field"><input aria-label="Nombre y apellido" placeholder="Ingresá tu nombre y apellido"/></div>
  </ComponentExample></>;
 if(id==='textarea')return <><FormStates family="textarea"/>
  <ComponentExample title="Texto multilínea" description="Permite escribir varias líneas y ajustar la altura.">
   <div className="andy-form-grid"><label className="andy-field"><span>Observaciones</span><textarea placeholder="Escribí una observación"/></label></div>
  </ComponentExample></>;
 if(id==='adjuntos')return <><FormStates family="upload"/>
  <DocSection title="Criterios de uso" description="La acción de adjuntar se acompaña del nombre del archivo y de mensajes de validación.">
   <DocPreview><div className="andy-doc-guideline"><strong>Adjuntar</strong><span>La acción se mantiene diferenciada del nombre del archivo.</span><strong>Error y deshabilitado</strong><span>Conservar su semántica y el espacio del contenido.</span></div></DocPreview>
  </DocSection></>;
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
   <div className="andy-matrix-calendar-sample"><SportsCalendarPicker/></div>
  </ComponentExample>
 </>;
 if(id==='checkbox'||id==='radio'||id==='switch')return <>
  <ComponentExample title="Ejemplo interactivo" description={id==='checkbox'?'Permití seleccionar varias opciones de forma independiente.':id==='radio'?'Solo una alternativa puede estar seleccionada.':'Activá o desactivá la configuración.'}>
   <SelectionGallery only={id}/>
  </ComponentExample>
  <ComponentExample title="Comportamiento y estados" description="Probá la interacción y los indicadores de reposo y seleccionado.">
   <SelectionGallery embedded only={id}/>
  </ComponentExample>
 </>;
 if(['seleccion-unica','seleccion-multiple','filtros-avanzados','ordenamiento'].includes(id))
  return <FilterDocs id={id as 'seleccion-unica'|'seleccion-multiple'|'filtros-avanzados'|'ordenamiento'}/>;
 if(id==='buscador')return <>
  <ComponentExample title="Vacío" description="Campo de búsqueda con placeholder y símbolo de búsqueda.">
   <div className="andy-search-field"><input aria-label="Buscar actividad" placeholder="¿Qué estás buscando?"/><Icon name="search"/></div>
  </ComponentExample>
  <ComponentExample title="Con contenido" description="El valor ingresado conserva el aspecto del campo.">
   <div className="andy-search-field"><input aria-label="Búsqueda de muestra" defaultValue="Natación"/><Icon name="search"/></div>
  </ComponentExample>
 </>;
 if(id==='scrollbars')return <DocSection title="Tipos de barras de scroll" description="Tres patrones según dónde se desplaza el contenido: página, dropdown y navegación lateral."><AndyScrollbarGallery/></DocSection>;
 if(id==='boton')return <Buttons/>;
 if(id==='chips')return <>
  <DocSection title="Fondo suave" description="Seis colores de Figma con fondo claro y texto intenso. Cada color se muestra con y sin ícono.">
   <DocPreview align="start"><AndyTagPaletteGallery onlyAppearance="fill"/></DocPreview>
  </DocSection>
  <DocSection title="Outline" description="Los mismos seis tonos con borde intenso, fondo blanco y texto del color semántico.">
   <DocPreview align="start"><AndyTagPaletteGallery onlyAppearance="outline"/></DocPreview>
  </DocSection>
 </>;
 if(id==='tarjeta')return <>
  <ComponentExample title="Deportes Anual" description="Cabecera degradada de 34 px y contenido compacto, con metadatos e íconos del producto deportivo.">
   <div className="andy-single-card-demo"><AndyActivityCard kind="sports"/></div>
  </ComponentExample>
  <ComponentExample title="Agenda de la Comunidad" description="Fotografía de 154 px y la misma jerarquía interior que Deportes.">
   <div className="andy-single-card-demo"><AndyActivityCard kind="agenda"/></div>
  </ComponentExample>
 </>;
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
  <ComponentExample title="Deshabilitado" description="El panel no responde a interacciones."><div className="andy-doc-accordion"><button type="button" disabled>Sección no disponible <Icon name="expand_more"/></button></div></ComponentExample>
 </>;
 return null;
}
const tocByComponent:Partial<Record<ComponentId,{id:string;title:string}[]>>={
 calendario:[{id:'estados',title:'Estados'},{id:'seleccion-de-un-dia',title:'Selección de un día'},{id:'seleccion-de-un-rango',title:'Selección de un rango'},{id:'campo-desplegable',title:'Campo desplegable'}],
 boton:[{id:'variantes',title:'Variantes'},{id:'tamanos',title:'Tamaños'},{id:'estados',title:'Estados'},{id:'iconografia',title:'Íconos'},{id:'uso',title:'Uso y comportamiento'}],
 acordeon:[{id:'apertura-unica',title:'Apertura única'},{id:'apertura-multiple',title:'Apertura múltiple'},{id:'deshabilitado',title:'Deshabilitado'}],
 buscador:[{id:'buscador',title:'Buscador'},{id:'buscador-con-contenido',title:'Buscador con contenido'}]
};
const EMPTY_TOC_ITEMS:{id:string;title:string}[]=[];
function HeadingToc({items}:{items:{id:string;title:string}[]}){
 const [links,setLinks]=useState(items);
 const [active,setActive]=useState(items[0]?.id??'');
 useEffect(()=>{
  const next=items.length?items:[...document.querySelectorAll<HTMLElement>(
   '.andy-doc-main .andy-doc-section-heading > h3, .andy-doc-main .andy-section-head > h2, .andy-doc-main .andy-scrollbar-section > h3, .andy-doc-main .andy-palette-variant-heading > h3, .andy-doc-main .andy-button-section-intro > h3'
  )].map((heading,index)=>{
   const target=heading.closest<HTMLElement>('.andy-doc-section')||heading;
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
   onClick={()=>setActive(item.id)}>{item.title}</a>)}</nav>
 </aside>;
}
const views:Record<Category,()=>ReactNode>={fundamentos:Foundations,filtros:Filters,formularios:Forms,seleccion:Selection,botones:Buttons,etiquetas:Tags,tarjetas:Cards,mensajes:Messages};
export function AndyKitPage(){
 const {categoria,componente}=useParams<{categoria?:string;componente?:string}>();
 const aliasedComponent=componente?componentAliases[componente]:undefined;
 const [navOpen,setNavOpen]=useState(false);
 const [componentSearch,setComponentSearch]=useState('');
 const normalizedSearch=componentSearch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
 const filteredGroups=componentGroups.map(group=>({...group,items:group.items.filter(([id,title])=>!normalizedSearch||[title,id,componentMeta[id].description,group.title].some(value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(normalizedSearch)))})).filter(group=>group.items.length>0);
 const legacy=categories.find(c=>c.id===(categoria??'fundamentos'));
 const componentEntry=componentEntries.find(([id])=>id===componente);
 const isComponent=categoria==='componentes'&&!!componentEntry;
 const isDirectory=categoria==='componentes'&&!componente;
 const displayName=isComponent?componentEntry[1]:isDirectory?'Componentes':legacy?.name;
 const meta=isComponent?componentMeta[componentEntry[0]]:null;
 useEffect(()=>{document.title='MLZ UI Kit - Andy'+(displayName?' · '+displayName:'');},[displayName]);
 if(categoria==='componentes'&&aliasedComponent)return <Navigate to={'/ui-kit-andy/componentes/'+aliasedComponent} replace/>;
 if(!isComponent&&!isDirectory&&!legacy)return <Navigate to="/ui-kit-andy/fundamentos" replace/>;
 const Gallery=legacy?views[legacy.id]:null;
 return <div className="andy-kit andy-doc-layout" data-testid="andy-ui-kit">
  <a href="#andy-content" className="skip-link">Ir al contenido</a>
  <header className="andy-header"><div className="andy-container andy-topbar">
   <div className="andy-topbar-heading"><h1>MLZ UI Kit - Andy</h1>
     <span className="andy-eyebrow">Municipio de Lomas de Zamora · Design System</span></div>
   <div className="andy-topbar-actions">
    <p className="andy-version">{commit==='local'?<b>Desarrollo local</b>:<a href={'https://github.com/SantiagoM96/mlz-muni/commit/'+commit} target="_blank" rel="noopener noreferrer"><b>Versión {commit.slice(-3)}</b></a>}</p>
    <button type="button" className="andy-sidebar-toggle" aria-expanded={navOpen} aria-controls="andy-component-nav" onClick={()=>setNavOpen(v=>!v)}>
      <Icon name="menu" size={24}/> Componentes
    </button>
   </div>
  </div></header>
  {navOpen&&<button type="button" className="andy-sidebar-backdrop" aria-label="Cerrar navegación" onClick={()=>setNavOpen(false)}/>}
  <div className="andy-doc-body andy-container">
   <aside className={'andy-sidebar'+(navOpen?' is-open':'')} id="andy-component-nav" aria-label="Navegación del Design System">
    <nav>
     <div className="andy-nav-group"><span className="andy-nav-heading">Empezar</span>
      <NavLink end to="/ui-kit-andy/fundamentos" onClick={()=>setNavOpen(false)} className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>Fundamentos</NavLink>
     </div>
     <div className="andy-nav-divider"/>
     <NavLink end to="/ui-kit-andy/componentes" onClick={()=>setNavOpen(false)} className={({isActive})=>"andy-nav-label andy-nav-label-link"+(isActive?" active":"")}>Componentes</NavLink>
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
     <div className="andy-nav-group"><span className="andy-nav-heading">Vistas generales</span>
      {categories.filter(c=>c.id!=='fundamentos').map(c=><NavLink to={'/ui-kit-andy/'+c.id} key={c.id} onClick={()=>setNavOpen(false)} className={({isActive})=>'andy-nav-link'+(isActive?' active':'')}>{c.name}</NavLink>)}
     </div>
    </nav>
   </aside>
   <main className="andy-doc-main" id="andy-content">
    <div className="andy-main-heading">
     <div><p>{isComponent?'Componentes / '+meta?.category:'Biblioteca visual / '+(legacy?.name||'Fundamentos')}</p>
      <h2>{displayName}</h2>
      {meta&&<div className="andy-doc-description">{meta.description}</div>}
     </div>
    </div>
    {isComponent?<div className="andy-doc-page"><ComponentDetails id={componentEntry[0]}/></div>:
     isDirectory?<div className="andy-component-directory">{componentGroups.map(group=><section key={group.title}>
       <h3>{group.title}</h3><div className="andy-directory-grid">{group.items.map(([id,title])=><NavLink to={'/ui-kit-andy/componentes/'+id} key={id}>
        <strong>{title}</strong><span>{componentMeta[id].description}</span><Icon name="chevron_right" size={24}/>
       </NavLink>)}</div></section>)}</div>:
     Gallery&&<Gallery/>}
   </main>
   <HeadingToc key={displayName} items={isComponent?tocByComponent[componentEntry[0]]??EMPTY_TOC_ITEMS:EMPTY_TOC_ITEMS}/>
  </div>
  <footer className="andy-footer">Catálogo de trabajo. Las demostraciones no registran inscripciones ni modifican datos reales.</footer>
 </div>;
}
