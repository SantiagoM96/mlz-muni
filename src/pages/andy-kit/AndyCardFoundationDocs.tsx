import { useState } from 'react';
import {
 Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader,
 CardMedia, CardTitle, type CardSize, type CardSpacing,
} from '../../shared/ui/Card';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-card-foundation-docs.css';

const imageUrl=import.meta.env.BASE_URL+'assets/andy-cards/noticia-obras.webp';
const spacingOptions:readonly CardSpacing[]=[16,20,24,32];

function SampleCard({onAction,size='default',spacing,image=false,disabled=false}:{
 onAction:(action:string)=>void;
 size?:CardSize;
 spacing?:CardSpacing;
 image?:boolean;
 disabled?:boolean;
}){
 return <Card size={size} spacing={spacing} className="andy-card-foundation-sample"
  data-testid="andy-card-base-sample">
  {image&&<CardMedia src={imageUrl} alt="Refugio de transporte municipal intervenido" loading="lazy"/>}
  <CardHeader>
   <CardTitle>{image?'Mejoras en espacios públicos':'Información de un servicio'}</CardTitle>
   <CardDescription>{image?'Conocé las novedades de la comunidad.':'Consultá los datos antes de iniciar una gestión.'}</CardDescription>
   <CardAction><span className="andy-card-foundation-chip">{image?'Noticias':'Servicio'}</span></CardAction>
  </CardHeader>
  <CardContent><p>{image?'El Municipio continúa con tareas de mantenimiento para mejorar los espacios de uso cotidiano.':'Encontrá requisitos, horarios de atención y los canales disponibles para hacer tu consulta.'}</p></CardContent>
  <CardFooter>
   <button type="button" disabled={disabled}
    className="andy-system-button is-primary is-medium icon-none"
    onClick={()=>onAction(image?'Leer noticia':'Consultar servicio')}>
    {image?'Leer noticia':'Consultar servicio'}
   </button>
  </CardFooter>
 </Card>;
}

type VisualState='default'|'hover'|'focus'|'disabled';
const states:readonly {id:VisualState;label:string;explanation:string}[]=[
 {id:'default',label:'Default',explanation:'Superficie en reposo.'},
 {id:'hover',label:'Hover',explanation:'Solo para una tarjeta navegable.'},
 {id:'focus',label:'Focus',explanation:'Indicador visible al navegar con teclado.'},
 {id:'disabled',label:'Disabled',explanation:'La acción no está disponible; el contenido se lee.'},
];

function StateCard({state,onAction}:{state:typeof states[number];onAction:(action:string)=>void}){
 const disabled=state.id==='disabled';
 return <div className="andy-card-foundation-state">
  <div className="andy-card-foundation-state-label"><strong>{state.label}</strong><span>{state.explanation}</span></div>
  <Card size="sm" data-testid={'andy-card-state-'+state.id}
   className={'andy-card-foundation-state-card is-'+state.id}>
   <CardHeader>
    <CardTitle>Servicio municipal</CardTitle>
    <CardDescription>Información y acceso al servicio.</CardDescription>
   </CardHeader>
   <CardContent><p>Consultá los detalles disponibles.</p></CardContent>
   <CardFooter><button type="button" disabled={disabled}
    className="andy-system-button is-tertiary is-small icon-none"
    onClick={()=>onAction('Consultar en estado '+state.label)}>Consultar</button></CardFooter>
  </Card>
 </div>;
}

export function AndyCardFoundationDocs(){
 const [size,setSize]=useState<CardSize>('default');
 const [spacing,setSpacing]=useState<CardSpacing>(24);
 const [action,setAction]=useState('');
 const onAction=(message:string)=>setAction('Demostración: '+message+'. No se realizó ninguna gestión.');
 return <div className="andy-card-foundation-docs">
  <DocSection title="Descripción" description="Card organiza contenido y acciones relacionadas dentro de una superficie con identidad propia. Puede ser informativa o interactiva: usarla cuando los datos formen una unidad que necesite distinguirse del resto. No reemplaza un Alert, un elemento de lista ni un diálogo.">{null}</DocSection>

  <DocSection title="Básico" description="Una tarjeta genérica sin estilos específicos de un producto. Se construye combinando cabecera, título, descripción, contenido y pie; la acción se ejecuta solo desde su botón.">
   <DocPreview><SampleCard onAction={onAction}/></DocPreview>
  </DocSection>

  <DocSection title="Composición" description="Las partes son independientes y opcionales. CardHeader agrupa la identificación, CardContent contiene la información principal y CardFooter aloja acciones. CardAction reserva una posición junto al título, sin reemplazar el contenido.">
   <DocPreview>
    <Card className="andy-card-foundation-composition" size="default" aria-label="Esquema de composición de Card">
     <CardHeader>
      <CardTitle>CardTitle</CardTitle>
      <CardDescription>CardDescription</CardDescription>
      <CardAction><span>CardAction</span></CardAction>
     </CardHeader>
     <CardContent><div className="andy-card-foundation-composition-slot">CardContent</div></CardContent>
     <CardFooter><div className="andy-card-foundation-composition-slot">CardFooter</div></CardFooter>
    </Card>
   </DocPreview>
  </DocSection>

  <DocSection title="Tamaños" description="Dos densidades de referencia: Default para contenido completo y Small para espacios reducidos. La estructura es la misma, pero se ajustan el espaciado y la escala tipográfica secundaria.">
   <DocPreview>
    <div className="andy-card-foundation-controls" role="group" aria-label="Tamaño de Card">
     <button type="button" aria-pressed={size==='default'} onClick={()=>setSize('default')}>Default</button>
     <button type="button" aria-pressed={size==='sm'} onClick={()=>setSize('sm')}>Small</button>
    </div>
    <SampleCard size={size} onAction={onAction}/>
    <p className="andy-card-foundation-caption">Tamaño seleccionado: {size==='default'?'Default · padding 24 px':'Small · padding 16 px'}.</p>
   </DocPreview>
  </DocSection>

  <DocSection title="Espaciado" description="Una misma variable de espaciado gobierna el padding interior y el espacio entre las secciones de la tarjeta. Podés comparar 16, 20, 24 y 32 px sin modificar cada parte por separado.">
   <DocPreview>
    <div className="andy-card-foundation-controls" role="group" aria-label="Espaciado de Card">
     {spacingOptions.map(value=><button key={value} type="button" aria-pressed={spacing===value}
      onClick={()=>setSpacing(value)}>{value} px</button>)}
    </div>
    <SampleCard spacing={spacing} onAction={onAction}/>
    <p className="andy-card-foundation-caption">Variable compartida: <code>--mlz-card-spacing</code> = {spacing} px.</p>
   </DocPreview>
  </DocSection>

  <DocSection title="Imagen" description="Una imagen de cabecera ocupa el ancho completo sin duplicar padding ni romper el radio de la superficie. Los 154 px son la altura de referencia que ya usamos en varias tarjetas municipales; cada producto puede justificar otra proporción.">
   <DocPreview><SampleCard image onAction={onAction}/></DocPreview>
  </DocSection>

  <DocSection title="Estados" description="La interacción debe ser inequívoca: una tarjeta solamente informativa no necesita efectos que sugieran clic. Hover se reserva para tarjetas navegables; el foco se mantiene visible sobre la acción o enlace que realmente recibe teclado.">
   <DocPreview>
    <div className="andy-card-foundation-states">
     {states.map(state=><StateCard key={state.id} state={state} onAction={onAction}/>)}
    </div>
   </DocPreview>
  </DocSection>

  <DocSection title="Anatomía" description="Los slots permiten componer tarjetas distintas sin redefinir su estructura. Las piezas que no se necesitan se omiten; no se agregan contenedores vacíos.">
   <GuidelineTable rows={[
    ['Card','Superficie raíz: fondo, borde, radio, tamaño y espaciado compartido.'],
    ['CardHeader','Zona de identificación: título, descripción y acción complementaria cuando corresponda.'],
    ['CardTitle','Título principal de la tarjeta; mantiene la jerarquía del contenido.'],
    ['CardDescription','Contexto breve que ayuda a entender qué ofrece la tarjeta.'],
    ['CardAction','Acción o indicador opcional en el extremo superior derecho del header.'],
    ['CardContent','Información principal, datos o elementos de la composición.'],
    ['CardFooter','Acciones y contenido secundario alineados al final de la tarjeta.'],
    ['CardMedia (opcional)','Imagen con recorte controlado, texto alternativo y bordes coherentes con Card.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Valores de la Card base. Las ocho composiciones municipales conservan sus particularidades documentadas; estas reglas sirven como punto de partida para tarjetas nuevas.">
   <GuidelineTable rows={[
    ['Tamaño','Default con espaciado inicial de 24 px; Small con espaciado inicial de 16 px.'],
    ['Espaciado','16, 20, 24 o 32 px con la variable --mlz-card-spacing aplicada a las secciones.'],
    ['Radio','8 px (mlz-radius-lg) para la superficie y recorte de imágenes.'],
    ['Superficie','Blanco (#FFFFFF), borde Grey 100 (#E7E7E7) de 1 px y texto Grey 900 (#3D3D3D).'],
    ['Título','Geometria Bold, Primario 600 (#236999); Default 22/29 y Small 18/26.'],
    ['Descripción','Geometria Regular, Grey 500 (#6D6D6D); Default 16/24 y Small 14/22.'],
    ['Imagen','154 px de alto como referencia en News/Agenda, object-fit: cover; revisar proporción por composición.'],
    ['Acciones','Utilizar Button del sistema: Primario 600 o Terciario según jerarquía.'],
    ['Hover y Focus','Solo en superficies navegables o elementos accionables; foco Info 500 visible por teclado.'],
    ['Responsive','Ancho flexible hasta el máximo que determine la composición; conservar padding y lectura en mobile.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="La semántica depende del propósito: un article informativo agrupa información; si toda la tarjeta navega, su destino debe ser un enlace real. Las acciones internas deben ser identificables y operables por teclado.">
   <GuidelineTable rows={[
    ['Semántica','Usar article para unidades de contenido; no asignar rol de botón a una tarjeta sin acción.'],
    ['Tarjeta navegable','Si la superficie completa es clickeable, usar un enlace real y evitar botones anidados en ese enlace.'],
    ['Acción puntual','Mantener la tarjeta informativa y ubicar el botón o enlace en CardFooter o CardAction.'],
    ['Hover','Mostrar elevación o cambio de borde solo si toda la tarjeta se puede activar.'],
    ['Focus','Dejar visible el foco de la acción real; no retirar el indicador de teclado.'],
    ['Disabled','Deshabilitar la acción, no ocultar ni atenuar indiscriminadamente la información.'],
    ['Imagen','Usar alt descriptivo si aporta información y alt vacío si es decorativa.'],
    ['Contenido','Evitar alturas fijas cuando los títulos o descripciones puedan crecer.'],
    ['Ejemplos','Las acciones de esta documentación no envían datos ni navegan a gestiones reales.'],
   ]}/>
  </DocSection>
  <p className="andy-card-foundation-status" role="status" aria-live="polite">{action}</p>
 </div>;
}
