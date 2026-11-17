import { useState } from 'react';
import { Breadcrumbs, type BreadcrumbItem, type BreadcrumbSeparator } from '../../shared/navigation/Breadcrumbs';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-breadcrumb-docs.css';

const basicItems:readonly BreadcrumbItem[]=[
 {label:'Inicio',to:'/'},
 {label:'Agenda de la Comunidad',to:'/agenda-de-la-comunidad'},
 {label:'Actividades',to:'/agenda-de-la-comunidad/actividades'},
 {label:'Yoga'},
];
const shortItems:readonly BreadcrumbItem[]=[
 {label:'Inicio',to:'/'},
 {label:'Actividades',to:'/agenda-de-la-comunidad/actividades'},
 {label:'Yoga'},
];
const longItems:readonly BreadcrumbItem[]=[
 {label:'Inicio',to:'/'},
 {label:'Agenda de la Comunidad',to:'/agenda-de-la-comunidad'},
 {label:'Cultura',to:'/agenda-de-la-comunidad'},
 {label:'Talleres',to:'/agenda-de-la-comunidad/actividades'},
 {label:'Actividades',to:'/agenda-de-la-comunidad/actividades'},
 {label:'Yoga'},
];
const separatorChoices:{id:BreadcrumbSeparator;name:string}[]=[
 {id:'chevron',name:'Chevron'},
 {id:'slash',name:'Barra'},
];

function ExampleChoices<T extends string>({items,value,label,onChange}:{
 items:readonly {id:T;name:string}[];
 value:T;
 label:string;
 onChange:(next:T)=>void;
}){
 return <div className="andy-doc-example-controls">
  <div className="andy-doc-example-group" role="group" aria-label={label}>
   {items.map(item=><button type="button" key={item.id} aria-pressed={value===item.id}
    onClick={()=>onChange(item.id)}>{item.name}</button>)}
  </div>
 </div>;
}

function BasicDemo(){
 const [levels,setLevels]=useState<'three'|'four'>('four');
 const items=levels==='four'?basicItems:shortItems;
 return <>
  <ExampleChoices value={levels} label="Cantidad de niveles"
   onChange={setLevels}
   items={[{id:'three',name:'3 niveles'},{id:'four',name:'4 niveles'}]}/>
  <DocPreview align="start" className="andy-breadcrumb-preview">
   <Breadcrumbs items={items} className="andy-breadcrumb-doc-instance" disableNavigation/>
  </DocPreview>
 </>;
}

function SeparatorDemo(){
 const [separator,setSeparator]=useState<BreadcrumbSeparator>('chevron');
 return <>
  <ExampleChoices value={separator} label="Separador"
   onChange={setSeparator} items={separatorChoices}/>
  <DocPreview align="start" className="andy-breadcrumb-preview">
   <Breadcrumbs items={shortItems} separator={separator} className="andy-breadcrumb-doc-instance" disableNavigation/>
  </DocPreview>
 </>;
}

function CollapsedDemo(){
 return <DocPreview align="start" className="andy-breadcrumb-preview">
  <Breadcrumbs items={longItems} collapseMiddle className="andy-breadcrumb-doc-instance" disableNavigation/>
 </DocPreview>;
}

function ResponsiveDemo(){
 return <DocPreview align="start" className="andy-breadcrumb-preview">
  <div className="andy-breadcrumb-responsive-gallery">
   <div className="andy-breadcrumb-responsive-row">
    <strong>Desktop</strong>
    <Breadcrumbs items={basicItems} mobileParentOnly className="andy-breadcrumb-doc-instance" disableNavigation/>
   </div>
   <div className="andy-breadcrumb-responsive-row">
    <strong>Mobile</strong>
    <div className="andy-breadcrumb-mobile-sample">
     <Breadcrumbs items={basicItems} mobileParentOnly className="andy-breadcrumb-doc-instance" disableNavigation/>
    </div>
   </div>
  </div>
 </DocPreview>;
}

export function AndyBreadcrumbDocs(){
 return <>
  <DocSection title="Descripción" description="Breadcrumb muestra la ubicación de una página dentro de una jerarquía y permite volver a sus niveles anteriores. No reemplaza el título ni la navegación principal.">{null}</DocSection>

  <DocSection title="Básico" description="Tres o cuatro niveles. Los enlaces se ven y reaccionan como hipervínculos, pero no navegan dentro del UI Kit; en el producto conducen a sus destinos reales.">
   <BasicDemo/>
  </DocSection>

  <DocSection title="Separadores" description="Chevron es el separador institucional predeterminado. Barra es la única alternativa disponible cuando la composición lo requiere.">
   <SeparatorDemo/>
  </DocSection>

  <DocSection title="Colapsado" description="En jerarquías de cinco niveles o más, los niveles intermedios pueden agruparse en un menú. Tocá los puntos suspensivos para ver las páginas ocultas.">
   <CollapsedDemo/>
  </DocSection>

  <DocSection title="Responsive" description="El Breadcrumb de producto conserva su patrón mobile «Volver» cuando el nivel padre tiene un destino real. Comparación de ambas vistas en una misma muestra.">
   <ResponsiveDemo/>
  </DocSection>

  <DocSection title="Anatomía" description="Partes estructurales del componente compartido, adaptadas de la composición de shadcn/ui al sistema MLZ.">
   <GuidelineTable rows={[
    ['Breadcrumbs','Navegación semántica con aria-label «Ruta de navegación».'],
    ['BreadcrumbList','Lista ordenada que representa el camino jerárquico.'],
    ['BreadcrumbItem','Nivel con texto, enlace opcional y separador si no es el primero.'],
    ['BreadcrumbLink','Link de React Router hacia un nivel anterior real.'],
    ['BreadcrumbPage','Último nivel no navegable, con aria-current="page" y truncamiento cuando es necesario.'],
    ['BreadcrumbSeparator','Chevron de Material Symbols por defecto, o Barra (slash) como alternativa.'],
    ['BreadcrumbCollapse','Resumen de puntos suspensivos con menú de niveles intermedios y vínculos reales.'],
    ['MobileBack','Enlace «Volver» hacia el padre explícito; no inventa rutas de navegación.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Reglas visuales del Breadcrumb institucional, reutilizadas en el producto y en esta documentación.">
   <GuidelineTable rows={[
    ['Tipografía','Geometria 18 px / 24 px; enlaces en peso 500 y página actual en 700.'],
    ['Color de enlaces','Primario 600 (#236999) en todos los niveles, incluidos los vínculos visitados y el enlace móvil Volver.'],
    ['Color de página actual','Primario 600 (#236999), peso 700 para diferenciarla de los enlaces de peso 500.'],
    ['Separadores','Material Symbols Outlined de 20 px, peso 400; siempre Primario 600 (#236999).'],
    ['Espaciado','8 px entre elementos y dentro de cada nivel; basado en --mlz-space-8.'],
    ['Opciones de separador','Chevron (predeterminado) o Barra (slash).'],
    ['Colapsado','Disponible a partir de cinco niveles; conserva Inicio, padre y página actual visibles.'],
    ['Menú','El disparador mide 28 × 26 px: solo tres puntos en Primario 600 en reposo, sin borde ni fondo; en hover aparece fondo Primario 100 (#E5F0F9). El desplegable conserva fondo blanco, radio 8 px y foco visible.'],
    ['Responsive','Por debajo de 640 px, «Volver» sustituye la ruta cuando mobileParentOnly está activo y existe padre navegable.'],
    ['Ejemplos','Una sola caja blanca. Los enlaces de ejemplo tienen cursor de mano, hover con subrayado y foco visible, pero no redirigen; el botón de puntos suspensivos sí despliega los niveles ocultos.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="El Breadcrumb es navegación secundaria, no una sucesión de botones de acción.">
   <GuidelineTable rows={[
    ['Orden','Las rutas se presentan desde el nivel superior hasta la página actual.'],
    ['Estado actual','Última etiqueta sin enlace, con aria-current="page". Nunca utilizarla como botón.'],
    ['Enlaces','En el UI Kit los niveles anteriores son enlaces demostrativos con cursor de mano, hover subrayado y foco visible, sin navegación. En producto conservan los destinos reales.'],
    ['Separadores','Elementos decorativos ocultos a tecnología asistiva con aria-hidden.'],
    ['Menú colapsado','Se abre con Enter o Espacio y se cierra con Escape o al presionar fuera. En el UI Kit los niveles del menú se comportan visualmente como enlaces sin redirigir; en el producto navegan a sus destinos.'],
    ['Mobile','Utilizar «Volver» si existe padre con URL explícita; de lo contrario, mantener la ruta y no fabricar enlaces.'],
    ['Texto extenso','Truncar visualmente solo el último nivel si el ancho no alcanza; mantener el texto completo en title.'],
    ['Producto','Componente compartido src/shared/navigation/Breadcrumbs.tsx, ya utilizado por Agenda de la Comunidad.'],
    ['Referencia','shadcn/ui Breadcrumb Base UI, adaptado a los tokens institucionales de MLZ.'],
   ]}/>
  </DocSection>
 </>;
}
