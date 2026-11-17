import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyModal, type ModalIntent, type ModalSize } from './AndyModal';
import { AndyScheduleDialogForm, defaultSchedule, type ScheduleDraft } from './AndyScheduleDialogForm';
import './andy-modal-docs.css';

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
  <DocSection title="Básico" description="Alert Dialog solicita una respuesta cuando la acción tiene consecuencias importantes. Probá una confirmación con dos acciones visibles.">
   <DocPreview><button type="button" className="andy-modal-trigger" onClick={()=>setActive('basic')}>Abrir confirmación</button></DocPreview>
  </DocSection>
  <DocSection title="Variantes" description="Cinco composiciones inspiradas en Alert Dialog de shadcn/ui, utilizando la identidad institucional de MLZ.">
   <div className="andy-modal-variant-list">
    {examples.map(example=><div className="andy-modal-variant" key={example.id}>
     <div className="andy-modal-variant-info">
      {example.media&&<span className={'andy-modal-variant-icon'+(example.intent==='destructive'?' is-danger':'')}><MaterialIcon name={example.media} size={22}/></span>}
      <div><strong>{example.label}</strong><p>{example.description}</p></div>
     </div>
     <button type="button" className="andy-modal-trigger is-outline" onClick={()=>setActive(example.id)}><MaterialIcon name={example.intent==='destructive'?'delete':'visibility'} size={18}/>{example.trigger}</button>
    </div>)}
   </div>
  </DocSection>
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
  <DocSection title="Comportamiento" description="La confirmación requiere una decisión explícita; los controles mantienen la navegación accesible por teclado.">
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
   if(!draft.activity.trim()||draft.days.length===0){setError('Completá la actividad y seleccioná al menos un día.');return;}
   const [startH,startM]=draft.start.split(':').map(Number);
   const [endH,endM]=draft.end.split(':').map(Number);
   if((endH??0)*60+(endM??0)<=(startH??0)*60+(startM??0)){setError('La hora de finalización debe ser posterior al inicio.');return;}
   if(draft.capacity!==''&&(!Number.isInteger(Number(draft.capacity))||Number(draft.capacity)<1)){setError('Ingresá un número válido de cupos.');return;}
   setResult('Horario agregado a esta demostración: '+draft.days.join(', ')+' de '+draft.start+' a '+draft.end+'. No se guardaron datos reales.');
  }else setResult('Diálogo cerrado. No se modificaron datos reales.');
  close();
 };
 const variants=[
  {id:'schedule' as const,label:'Agregar horarios deportivos',desc:'Formulario completo, con días, horarios, duración, cupos y sede.',trigger:'Agregar horario'},
  {id:'compact' as const,label:'Small',desc:'Tamaño reducido para información breve.',trigger:'Ver small'},
  {id:'details' as const,label:'Detalle informativo',desc:'Contenido sencillo con cierre y acción principal.',trigger:'Ver detalle'},
  {id:'media' as const,label:'Con iconografía',desc:'Un ícono acompaña el contenido y refuerza la orientación.',trigger:'Ver con ícono'}
 ];
 return <>
  <DocSection title="Básico" description="Abrí un diálogo para agregar horarios a una actividad deportiva. Los controles siguen los criterios del formulario MLZ.">
   <DocPreview><button type="button" className="andy-modal-trigger" onClick={()=>open('schedule')}><MaterialIcon name="add_circle" size={20}/>Agregar horario</button></DocPreview>
  </DocSection>
  <DocSection title="Variantes" description="El formulario deportivo es la referencia principal. Las variantes adicionales muestran tamaños y composiciones de Dialog.">
   <div className="andy-modal-variant-list">{variants.map(v=><div className="andy-modal-variant" key={v.id}>
    <div className="andy-modal-variant-info"><div><strong>{v.label}</strong><p>{v.desc}</p></div></div>
    <button type="button" className="andy-modal-trigger is-outline" onClick={()=>open(v.id)}><MaterialIcon name={v.id==='schedule'?'add_circle':'visibility'} size={18}/>{v.trigger}</button>
   </div>)}</div>
  </DocSection>
  <DocSection title="Anatomía" description="Dialog utiliza una estructura reutilizable; los contenidos y campos son propios de cada tarea.">
   <GuidelineTable rows={[
    ['Overlay','Oscurece toda la ventana, incluido el encabezado del UI Kit; el contenido de fondo queda inactivo.'],
    ['Header','Título, descripción y botón explícito de cerrar.'],
    ['Content','Campos, selección de días, opciones de horario y cualquier contenido de la tarea.'],
    ['Footer','Cancelar y acción principal; botones del sistema municipal.'],
    ['Tamaños','Default 480 px, Small 380 px y formulario deportivo hasta 640 px, fluidos en mobile.']
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento" description="El foco permanece dentro del diálogo, los controles responden al teclado y la acción principal valida los datos.">
   <GuidelineTable rows={[
    ['Apertura','El disparador indica su acción con texto e ícono. El foco entra al modal.'],
    ['Cerrar','Cancelar, X, Escape o clic sobre el fondo cierran el Dialog sin guardar.'],
    ['Horario','Cambiar hora de inicio recalcula finalización; cambiar duración recalcula finalización.'],
    ['Validación','Se requiere actividad, al menos un día y horario de finalización posterior al inicio.'],
    ['Entorno','Esta demostración no envía ni persiste información.']
   ]}/>
  </DocSection>
  {result&&<p className="andy-modal-result" role="status">{result}</p>}
  {active&&<AndyModal open={true} kind="dialog" schedule={active==='schedule'} size={active==='compact'?'sm':'default'}
   title={active==='schedule'?'Agregar horario':active==='compact'?'Información de actividad':active==='media'?'Detalle de la inscripción':'Detalle de actividad'}
   description={active==='schedule'?'Definí los días, la franja horaria y los cupos disponibles para esta actividad.':active==='compact'?'Revisá esta información sin salir de la pantalla.':active==='media'?'Consultá los datos antes de continuar.':'Podés revisar información sin abandonar la página.'}
   media={active==='media'?'info':undefined}
   confirmLabel={active==='schedule'?'Agregar horario':'Entendido'}
   onClose={close} onConfirm={save}
  >{active==='schedule'&&<AndyScheduleDialogForm value={draft} onChange={setDraft} error={error}/>}</AndyModal>}
 </>;
}
