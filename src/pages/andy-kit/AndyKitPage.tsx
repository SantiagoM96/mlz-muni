import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { MaterialIcon, type MaterialIconName } from '../../shared/ui/MaterialIcon';
import { SportsControlsGallery } from '../ui-kit/SportsControlsGallery';
import { FormStateMatrix } from './FormStateMatrix';
import { ColorTokensGallery } from './ColorTokensGallery';
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
function SelectionGallery({embedded=false}:{embedded?:boolean}){
 const [days,setDays]=useState(['Lunes']),[athlete,setAthlete]=useState('Recreativo'),[minor,setMinor]=useState(false);
 return <div className="andy-selection-grid">
 <div><h3>Días de cursada</h3><div className="andy-choices">{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map(day=><label key={day} className="andy-choice"><input type="checkbox" checked={days.includes(day)} onChange={()=>setDays(prev=>prev.includes(day)?prev.filter(x=>x!==day):[...prev,day])}/><span className="andy-choice-symbol andy-checkbox-symbol"><Icon name={days.includes(day)?'check_box':'check_box_outline_blank'} size={24}/></span>{day}</label>)}</div></div>
 <div><h3>Tipo de deportista</h3><div className="andy-choices">{['Recreativo','Competitivo','Federado'].map(item=><label className="andy-choice" key={item}><input type="radio" name={embedded?'athlete-embedded':'athlete-main'} checked={athlete===item} onChange={()=>setAthlete(item)}/><span className="andy-choice-symbol andy-radio-symbol"><Icon name={athlete===item?'radio_button_checked':'radio_button_unchecked'} size={24}/></span>{item}</label>)}</div></div>
 <div className="andy-switch-card"><label className="andy-switch"><input type="checkbox" checked={minor} onChange={e=>setMinor(e.target.checked)}/><span className="andy-switch-track"/></label><div><strong>Inscribir a una persona menor de edad</strong><p>Activá esta opción para visualizar el estado seleccionado.</p></div></div>
 </div>;
}
function Selection(){return <DemoSection title="Checkbox, radio y switch" description="Controles de selección reales e interactivos, sin duplicar los estados de Formularios."><SelectionGallery/></DemoSection>}
function Buttons(){const [clicked,setClicked]=useState(false);return <><DemoSection title="Botones de acciones" description="Primario institucional y secundario de contorno. Altura de referencia 48 px.">
 <div className="andy-button-grid"><button type="button" className="andy-btn andy-btn-primary" onClick={()=>setClicked(!clicked)}>{clicked?'Acción ejecutada':'Continuar'}</button><button type="button" className="andy-btn andy-btn-outline">Volver</button><button type="button" className="andy-btn andy-btn-ghost">Limpiar</button><button type="button" className="andy-btn andy-btn-primary" disabled>Deshabilitado</button><button type="button" className="andy-btn andy-btn-icon"><Icon name="search" size={22}/> Buscar</button><button type="button" className="andy-btn andy-btn-outline"><Icon name="tune" size={22}/> Más filtros</button><button type="button" className="andy-btn andy-btn-primary">Ver resultados (3)</button></div>
 </DemoSection><DemoSection title="Acciones de página" description="Enlaces, iconografía Material Symbols y variantes pequeñas."><div className="andy-button-grid"><button type="button" className="andy-inline-action"><Icon name="grid_view" size={20}/> Ver grilla</button><button type="button" className="andy-inline-action"><Icon name="map" size={20}/> Ver mapa</button><button type="button" className="andy-inline-action"><Icon name="sort" size={20}/> Ordenar por fecha</button><button type="button" className="andy-inline-action"><Icon name="arrow_back" size={20}/> Anterior</button></div></DemoSection></>}
function ChipGallery({compact=false}:{compact?:boolean}){
 const [chips,setChips]=useState(['Lunes','Casa Ari','Recreativo']);
 return <div className="andy-chip-demo">{chips.map(t=><span className="andy-chip" key={t}>{t}<button type="button" aria-label={'Quitar '+t} onClick={()=>setChips(v=>v.filter(c=>c!==t))}><Icon name="close" size={18}/></button></span>)}<button type="button" className="andy-chip-clear" onClick={()=>setChips(compact?['Lunes','Casa Ari','Recreativo']:[])}>{compact?'Restablecer':'Limpiar filtros'}</button></div>;
}
function Tags(){return <><DemoSection title="Filtros activos"><ChipGallery/></DemoSection><DemoSection title="Etiquetas de actividad" description="Metadatos para edades, tipos de actividades, accesibilidad y disponibilidad."><div className="andy-tags"><span className="andy-tag">Hasta 2 años</span><span className="andy-tag">Actividad recreativa</span><span className="andy-tag andy-tag-success">Personas con discapacidad</span><span className="andy-tag andy-tag-outline">Cupos limitados</span><span className="andy-tag andy-tag-muted">Deporte</span></div></DemoSection></>}
function Cards(){return <><DemoSection title="Tarjeta de actividad" description="Familia visual del catálogo de Deportes: categoría, título, metadata, etiqueta y acceso a detalle."><div className="andy-cards"><article className="andy-card"><div className="andy-card-visual"><Icon name="groups" size={40}/></div><div className="andy-card-body"><span className="andy-card-category">DEPORTE Y RECREACIÓN</span><h3>Natación recreativa</h3><span className="andy-tag">6 a 12 años</span><p><Icon name="calendar_month" size={20}/> Lunes y miércoles</p><p><Icon name="schedule" size={20}/> 10:00 a 11:00 h</p><p><Icon name="location_on" size={20}/> Natatorio Gregorio «Guyo» Sember</p><button type="button" className="andy-inline-action">Ver más <Icon name="arrow_forward" size={18}/></button></div></article><article className="andy-summary"><h3>Resumen de inscripción</h3><p><strong>Actividad</strong> Natación recreativa</p><p><strong>Sede</strong> Natatorio Gregorio «Guyo» Sember</p><p><strong>Días y horario</strong> Lunes y miércoles, 10:00 h</p><button type="button" className="andy-btn andy-btn-primary">Continuar inscripción</button></article></div></DemoSection>
 <DemoSection title="Selección de comisión"><CommissionPreview/></DemoSection></>}
function CommissionPreview(){const [sel,setSel]=useState('1');return <div className="andy-commissions">{[['1','Lunes y miércoles','10:00 a 11:00 h'],['2','Martes y jueves','16:00 a 17:00 h']].map(([id,day,time])=><button key={id} type="button" className={'andy-commission '+(sel===id?'chosen':'')} onClick={()=>setSel(id ?? '')}><span className="andy-commission-radio"/><span><strong>{day}</strong><small>{time}</small><small>Profesor/a a confirmar</small></span><span className="andy-tag">Disponible</span></button>)}</div>}
function Messages(){return <><DemoSection title="Mensajes informativos" description="Avisos y validaciones para inscripción deportiva."><div className="andy-messages"><div className="andy-alert andy-alert-info"><Icon name="info"/><div><strong>Antes de empezar</strong><p>Completá los datos para continuar con la inscripción.</p></div></div><div className="andy-alert andy-alert-error"><Icon name="info"/><div><strong>Revisá el formulario</strong><p>Hay campos obligatorios pendientes.</p></div></div><div className="andy-alert andy-alert-success"><Icon name="check"/><div><strong>Datos completos</strong><p>El formulario de demostración está listo para continuar.</p></div></div></div></DemoSection><DemoSection title="Estado sin resultados"><div className="andy-empty"><Icon name="search" size={42}/><h3>No encontramos actividades</h3><p>Probá con otros filtros o cambiá el término de búsqueda.</p><button className="andy-btn andy-btn-outline" type="button">Limpiar filtros</button></div></DemoSection></>}
const views:Record<Category,()=>ReactNode>={fundamentos:Foundations,filtros:Filters,formularios:Forms,seleccion:Selection,botones:Buttons,etiquetas:Tags,tarjetas:Cards,mensajes:Messages};
export function AndyKitPage(){
 const {categoria}=useParams<{categoria?:string}>();
 const active=categories.find(c=>c.id===(categoria??'fundamentos'));
 useEffect(()=>{document.title='MLZ UI Kit - Andy'+(active?' · '+active.name:'');},[active]);
 if(!active)return <Navigate to="/ui-kit-andy/fundamentos" replace/>;
 const Gallery=views[active.id];
 return <div className="andy-kit" data-testid="andy-ui-kit"><a href="#andy-content" className="skip-link">Ir al contenido</a>
 <header className="andy-header"><div className="andy-container"><span className="andy-eyebrow">Municipio de Lomas de Zamora · Laboratorio de componentes</span><h1>MLZ UI Kit - Andy</h1><p className="andy-version">Versión publicada: {commit==='local'?<b>Desarrollo local</b>:<a href={'https://github.com/SantiagoM96/mlz-muni/commit/'+commit} target="_blank" rel="noopener noreferrer"><b>Versión {commit.slice(-3)}</b></a>}</p>
 <nav className="andy-tabs" aria-label="Categorías del UI Kit de Andy">{categories.map(c=><NavLink key={c.id} to={'/ui-kit-andy/'+c.id} className={({isActive})=>'andy-tab'+(isActive?' active':'')}>{c.name}</NavLink>)}</nav></div></header>
 <main className="andy-container andy-main" id="andy-content"><div className="andy-main-heading"><div><p>Biblioteca visual independiente · Deportes Anual y Consola</p><h2>{active.name}</h2></div><a href={import.meta.env.BASE_URL + 'ui-kit/formularios'} className="andy-original-link">UI Kit institucional</a></div><Gallery/></main>
 <footer className="andy-footer">Catálogo de trabajo. Las demostraciones no registran inscripciones ni modifican datos reales.</footer>
 </div>;
}
