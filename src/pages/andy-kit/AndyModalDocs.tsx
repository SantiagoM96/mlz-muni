import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyModal, type ModalIntent, type ModalSize } from './AndyModal';
import { AndyScheduleDialogForm, defaultSchedule, type ScheduleDraft } from './AndyScheduleDialogForm';
import './andy-modal-docs.css';
import './andy-button-matrix.css';

type AlertVariant = 'basic' | 'small' | 'media' | 'small-media' | 'destructive';
const examples: {id:AlertVariant;label:string;description:string;trigger:string;title:string;body:string;confirm:string;size:ModalSize;intent:ModalIntent;media?:'info'|'warning'|'delete'}[] = [
 {id:'basic',label:'Básico',description:'Título, descripción y confirmación explícita.',trigger:'Abrir confirmación',title:'¿Querés continuar?',body:'Revisá la información antes de confirmar esta operación.',confirm:'Continuar',size:'default',intent:'normal',media:'info'},
 {id:'small',label:'Small',description:'Composición compacta para decisiones breves.',trigger:'Abrir small',title:'¿Confirmar los cambios?',body:'Se guardarán las modificaciones realizadas.',confirm:'Guardar cambios',size:'sm',intent:'normal',media:'info'},
 {id:'media',label:'Con ícono',description:'Un indicador visual refuerza el significado del mensaje.',trigger:'Abrir con ícono',title:'Confirmar inscripción',body:'Se registrarán los datos ingresados en la actividad seleccionada.',confirm:'Confirmar',size:'default',intent:'normal',media:'info'},
 {id:'small-media',label:'Small con ícono',description:'Variante reducida con un recurso visual.',trigger:'Abrir compacto',title:'Actualizar información',body:'Los datos guardados se reemplazarán por la nueva versión.',confirm:'Actualizar',size:'sm',intent:'normal',media:'warning'},
 {id:'destructive',label:'Destructivo',description:'Acción de alto impacto con una consecuencia explícita.',trigger:'Probar eliminación',title:'¿Eliminar este registro?',body:'Esta acción eliminará el registro y no se podrá deshacer.',confirm:'Eliminar registro',size:'default',intent:'destructive',media:'delete'}
];

export function AndyAlertDialogDocs(){
 const [active,setActive]=useState<AlertVariant|null>(null);
 const [result,setResult]=useState<string|null>(null);
 const selected=examples.find(e=>e.id===active);
 const close=()=>setActive(null);
 return <>
  <DocSection title="Descripción" description="Alert Dialog solicita una decisión explícita antes de ejecutar una acción que puede tener consecuencias importantes.">
   <p className="andy-alert-doc-description">Usalo para confirmar acciones sensibles, advertir sobre cambios que no se pueden deshacer o solicitar una respuesta antes de continuar. A diferencia de Dialog, no se cierra al presionar fuera de la ventana; permite confirmar o cancelar con una decisión consciente.</p>
  </DocSection>
  <DocSection title="Básico" description="Alert Dialog solicita una respuesta cuando la acción tiene consecuencias importantes. Probá una confirmación con dos acciones visibles.">
   <DocPreview>
    <button type="button" className="andy-system-button is-tertiary is-medium icon-start"
     onClick={()=>setActive('basic')}>
     <MaterialIcon name="visibility" size={18}/>Abrir confirmación
    </button>
   </DocPreview>
  </DocSection>
  {examples.filter(example=>example.id!=='basic').map(example=><DocSection
   key={example.id} title={example.label} description={example.description}>
   <DocPreview>
    <button type="button" className="andy-system-button is-tertiary is-medium icon-start"
     onClick={()=>setActive(example.id)}>
     <MaterialIcon name="visibility" size={18}/>{example.trigger}
    </button>
   </DocPreview>
  </DocSection>)}
  <DocSection title="Anatomía" description="Partes reutilizables del modal, diferenciando estructura de contenido y acciones.">
   <GuidelineTable rows={[
    ['Overlay','Fondo modal que desactiva la interacción con la página.'],
    ['Content','Panel principal, tamaño Default o Small.'],
    ['Header','Agrupa título, descripción e iconografía opcional.'],
    ['Media','Ícono de Google Material Symbols, opcional según la variante.'],
    ['Footer','Contiene las acciones Cancelar y Confirmar.'],
    ['Acción destructiva','Usa la variante de error del producto cuando la consecuencia no puede deshacerse.']
   ]}/>
  </DocSection>
  <DocSection title="Especificaciones" description="El tamaño, la composición y las acciones conservan los estilos institucionales del sistema.">
   <GuidelineTable rows={[
    ['Tamaños','Default o Small, según la complejidad de la decisión.'],
    ['Superficie','Panel con overlay; el contenido mantiene título, descripción y acciones.'],
    ['Acciones','Cancelar y Confirmar, con etiquetas explícitas y jerarquía visual definida.'],
    ['Iconografía','Material Symbols opcional para reforzar la intención del mensaje.'],
    ['Destructivo','Confirma consecuencias de alto impacto mediante el estilo de error del sistema.'],
    ['Mobile','El panel y las acciones se adaptan al espacio disponible.']
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento y accesibilidad" description="La confirmación requiere una decisión explícita; los controles mantienen la navegación accesible por teclado.">
   <GuidelineTable rows={[
    ['Foco','Al abrir, se coloca sobre Cancelar; Tab permanece dentro del diálogo y al cerrar vuelve al disparador.'],
    ['Teclado','Escape cancela; Enter activa solo la acción que tiene el foco.'],
    ['Cierre','En Alert Dialog, pulsar fuera del panel no ejecuta la acción ni cierra el modal.'],
    ['Jerarquía','La acción irreversible debe indicar concretamente qué se va a eliminar o descartar.'],
    ['Diferencia con Dialog','Dialog permite cerrar desde la X o el fondo; Alert Dialog exige una decisión explícita o cancelar.']
   ]}/>
  </DocSection>
  {result&&<p className="andy-modal-result" role="status">{result}</p>}
  {selected&&<AndyModal open={true} kind="alert" size={selected.size} intent={selected.intent} media={selected.media}
   title={selected.title} description={selected.body} confirmLabel={selected.confirm}
   onClose={close} onConfirm={()=>{setResult('Acción simulada: '+selected.confirm.toLowerCase()+'. No se modificaron datos reales.');close();}}/>}
 </>;
}

type DialogVariant = 'schedule' | 'compact' | 'details' | 'media';
export function AndyDialogDocs(){
 const [active,setActive]=useState<DialogVariant|null>(null);
 const [draft,setDraft]=useState<ScheduleDraft>(defaultSchedule);
 const [error,setError]=useState('');
 const [result,setResult]=useState<string|null>(null);
 const close=()=>{setActive(null);setError('');};
 const open=(variant:DialogVariant)=>{setError('');if(variant==='schedule')setDraft(defaultSchedule);setActive(variant);};
 const save=()=>{
  if(active==='schedule'){
   if(!draft.activity.trim()){setError('Completá la actividad.');return;}
   const [startH,startM]=draft.start.split(':').map(Number);
   const [endH,endM]=draft.end.split(':').map(Number);
   if((endH??0)*60+(endM??0)<=(startH??0)*60+(startM??0)){setError('La hora de finalización debe ser posterior al inicio.');return;}
   if(draft.capacity!==''&&(!Number.isInteger(Number(draft.capacity))||Number(draft.capacity)<1)){setError('Ingresá un número válido de cupos.');return;}
   setResult('Horario agregado a esta demostración: '+draft.start+' a '+draft.end+'. No se guardaron datos reales.');
  }else setResult('Diálogo cerrado. No se modificaron datos reales.');
  close();
 };
 const variants=[
  {id:'compact' as const,title:'Small',description:'Tamaño reducido para información breve.',trigger:'Ver small'},
  {id:'details' as const,title:'Detalle informativo',description:'Contenido sencillo con cierre y acción principal.',trigger:'Ver detalle'},
  {id:'media' as const,title:'Con iconografía',description:'Un ícono acompaña el contenido y refuerza la orientación.',trigger:'Ver con ícono'}
 ];
 return <>
  <DocSection title="Descripción" description="Dialog muestra contenido y controles en una ventana superpuesta sin abandonar la página actual.">
   <p className="andy-alert-doc-description">Usalo para completar formularios breves, consultar detalles o editar información dentro del mismo flujo. Puede cerrarse con Cancelar, Escape, el botón de cierre o al presionar el fondo; no debe reemplazar una pantalla completa cuando la tarea necesita más espacio.</p>
  </DocSection>
  <DocSection title="Básico" description="Abrí un diálogo para agregar horarios a una actividad deportiva. Los controles siguen los criterios del formulario MLZ.">
   <DocPreview><button type="button" className="andy-system-button is-tertiary is-medium icon-start" onClick={()=>open('schedule')}><MaterialIcon name="add_circle" size={20}/>Agregar horario</button></DocPreview>
  </DocSection>
  {variants.map(variant=><DocSection key={variant.id} title={variant.title} description={variant.description}>
   <DocPreview>
    <button type="button" className="andy-system-button is-tertiary is-medium icon-start" onClick={()=>open(variant.id)}>
     <MaterialIcon name="visibility" size={18}/>{variant.trigger}
    </button>
   </DocPreview>
  </DocSection>)}
  <DocSection title="Anatomía" description="Dialog utiliza una estructura reutilizable; los contenidos y campos son propios de cada tarea.">
   <GuidelineTable rows={[
    ['Overlay','Oscurece toda la ventana, incluido el encabezado del UI Kit; el contenido de fondo queda inactivo.'],
    ['Header','Título, descripción y botón explícito de cerrar.'],
    ['Content','Campos y opciones de horario de la tarea.'],
    ['Footer','Cancelar y acción principal; botones del sistema municipal.'],
    ['Tamaños','Default 480 px, Small 380 px y formulario deportivo hasta 760 px, fluidos en mobile.']
   ]}/>
  </DocSection>
  <DocSection title="Especificaciones" description="Propiedades visuales y composición reutilizadas por las variantes del Dialog.">
   <GuidelineTable rows={[
    ['Tamaños','Default 480 px, Small 380 px y formulario deportivo hasta 760 px; fluidos en mobile.'],
    ['Contenido','Encabezado, descripción, controles opcionales y pie con acciones.'],
    ['Cierre','Botón X, Cancelar, Escape o clic fuera del panel.'],
    ['Overlay','Oscurece el fondo e impide interactuar con la pantalla subyacente.'],
    ['Acciones','Botones institucionales con foco visible y etiquetas claras.']
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento y accesibilidad" description="El foco permanece dentro del diálogo, los controles responden al teclado y la acción principal valida los datos.">
   <GuidelineTable rows={[
    ['Apertura','El disparador indica su acción con texto e ícono. El foco entra al modal.'],
    ['Cerrar','Cancelar, X, Escape o clic sobre el fondo cierran el Dialog sin guardar.'],
    ['Horario','Cambiar inicio o duración recalcula finalización; cambiar finalización actualiza duración.'],
    ['Validación','Se requiere actividad y un horario de finalización posterior al inicio.'],
    ['Entorno','Esta demostración no envía ni persiste información.']
   ]}/>
  </DocSection>
  {result&&<p className="andy-modal-result" role="status">{result}</p>}
  {active&&<AndyModal open={true} kind="dialog" schedule={active==='schedule'} size={active==='compact'?'sm':'default'}
   title={active==='schedule'?'Agregar horario':active==='compact'?'Información de actividad':active==='media'?'Detalle de la inscripción':'Detalle de actividad'}
   description={active==='schedule'?'Definí la franja horaria y los cupos disponibles para esta actividad.':active==='compact'?'Revisá esta información sin salir de la pantalla.':active==='media'?'Consultá los datos antes de continuar.':'Podés revisar información sin abandonar la página.'}
   media={active==='media'?'info':undefined}
   confirmLabel={active==='schedule'?'Agregar horario':'Entendido'}
   onClose={close} onConfirm={save}
  >{active==='schedule'&&<AndyScheduleDialogForm value={draft} onChange={setDraft} error={error}/>}</AndyModal>}
 </>;
}
