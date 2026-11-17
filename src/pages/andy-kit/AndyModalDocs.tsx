import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyModal, type ModalIntent, type ModalSize } from './AndyModal';
import './andy-modal-docs.css';

type AlertVariant = 'basic' | 'small' | 'media' | 'small-media' | 'destructive';
const examples: {id:AlertVariant;label:string;description:string;trigger:string;title:string;body:string;confirm:string;size:ModalSize;intent:ModalIntent;media?:'info'|'warning'|'delete'}[] = [
 {id:'basic',label:'Básico',description:'Título, descripción y confirmación explícita.',trigger:'Abrir confirmación',title:'¿Querés continuar?',body:'Revisá la información antes de confirmar esta operación.',confirm:'Continuar',size:'default',intent:'normal'},
 {id:'small',label:'Small',description:'Composición compacta para decisiones breves.',trigger:'Abrir small',title:'¿Confirmar los cambios?',body:'Se guardarán las modificaciones realizadas.',confirm:'Guardar cambios',size:'sm',intent:'normal'},
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
     <button type="button" className="andy-modal-trigger is-outline" onClick={()=>setActive(example.id)}>{example.trigger}</button>
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

type DialogVariant = 'standard' | 'compact' | 'form' | 'media';
export function AndyDialogDocs(){
 const [active,setActive]=useState<DialogVariant|null>(null);
 const [name,setName]=useState('Centro cultural');
 const [result,setResult]=useState<string|null>(null);
 const close=()=>setActive(null);
 const variants=[
  {id:'standard' as const,label:'Básico',desc:'Título, descripción, acciones y cierre opcional.',trigger:'Abrir diálogo'},
  {id:'compact' as const,label:'Small',desc:'Tamaño reducido para información breve.',trigger:'Abrir small'},
  {id:'form' as const,label:'Con formulario',desc:'Permite editar información sin abandonar la página.',trigger:'Editar registro'},
  {id:'media' as const,label:'Con iconografía',desc:'El ícono acompaña el contenido sin reemplazar el título.',trigger:'Abrir con ícono'}
 ];
 return <>
  <DocSection title="Básico" description="Dialog sirve para mostrar información o completar una tarea modal sin salir de la pantalla.">
   <DocPreview><button type="button" className="andy-modal-trigger" onClick={()=>setActive('standard')}>Abrir diálogo</button></DocPreview>
  </DocSection>
  <DocSection title="Variantes" description="Composiciones del mismo componente, con tamaños y contenido adaptados al caso de uso.">
   <div className="andy-modal-variant-list">{variants.map(v=><div className="andy-modal-variant" key={v.id}>
    <div className="andy-modal-variant-info"><div><strong>{v.label}</strong><p>{v.desc}</p></div></div>
    <button type="button" className="andy-modal-trigger is-outline" onClick={()=>setActive(v.id)}>{v.trigger}</button>
   </div>)}</div>
  </DocSection>
  <DocSection title="Anatomía" description="Estructura compartida con Alert Dialog, con cierre opcional y contenido interactivo.">
   <GuidelineTable rows={[
    ['Overlay','Capa que bloquea la interacción con el resto de la página.'],
    ['Header','Título, descripción y botón opcional de cerrar.'],
    ['Content','Puede contener texto, campos y elementos interactivos.'],
    ['Footer','Acciones alineadas al final del panel.'],
    ['Tamaños','Default hasta 480 px y Small hasta 380 px; ambos son fluidos en mobile.']
   ]}/>
  </DocSection>
  <DocSection title="Comportamiento" description="Cierre con botón, Escape o clic fuera del panel; el foco se mantiene dentro del modal mientras está abierto.">
   <GuidelineTable rows={[
    ['Apertura','El foco entra al diálogo y el contenido de fondo queda inactivo.'],
    ['Salida','Se puede cancelar desde la X, Cancelar, Escape o el fondo.'],
    ['Foco','El foco retorna al botón que abrió el modal.'],
    ['Contenido largo','El contenido se desplaza dentro del panel, respetando el alto disponible.']
   ]}/>
  </DocSection>
  {result&&<p className="andy-modal-result" role="status">{result}</p>}
  {active&&<AndyModal open={true} kind="dialog" size={active==='compact'?'sm':'default'}
   title={active==='form'?'Editar nombre de la sede':active==='compact'?'Información de actividad':active==='media'?'Detalle de la inscripción':'Detalle de actividad'}
   description={active==='form'?'Podés actualizar el nombre de esta sede.':active==='compact'?'Los detalles de la actividad se muestran en una ventana compacta.':active==='media'?'Revisá la información antes de continuar.':'Esta ventana permite revisar información sin abandonar la página.'}
   media={active==='media'?'info':undefined}
   confirmLabel={active==='form'?'Guardar cambios':'Entendido'}
   onClose={close}
   onConfirm={()=>{setResult(active==='form'?'Nombre actualizado en esta demostración: '+name+'.':'Diálogo cerrado.');close();}}
  >{active==='form'&&<label htmlFor="andy-modal-venue">Nombre de la sede<input id="andy-modal-venue" value={name} onChange={e=>setName(e.target.value)}/></label>}</AndyModal>}
 </>;
}
