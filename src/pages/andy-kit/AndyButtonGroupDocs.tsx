import { useEffect, useId, useRef, useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { ButtonGroup, ButtonGroupButton, type ButtonGroupSize } from '../../shared/ui/ButtonGroup';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-button-group-docs.css';

const sizes:readonly {id:ButtonGroupSize;label:string;px:string}[]=[
 {id:'small',label:'Small',px:'32 px'},
 {id:'medium',label:'Medium',px:'40 px'},
 {id:'large',label:'Large',px:'48 px'},
];

function SplitGroup({onAction,size='medium'}:{onAction:(label:string)=>void;size?:ButtonGroupSize}){
 const [open,setOpen]=useState(false);
 const holderRef=useRef<HTMLDivElement>(null);
 const triggerRef=useRef<HTMLButtonElement>(null);
 const menuRef=useRef<HTMLDivElement>(null);
 const menuId=useId();

 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{
   if(event.target instanceof Node&&!holderRef.current?.contains(event.target))setOpen(false);
  };
  const escape=(event:KeyboardEvent)=>{
   if(event.key!=='Escape')return;
   setOpen(false);
   triggerRef.current?.focus();
  };
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  menuRef.current?.querySelector('button')?.focus();
  return()=>{
   document.removeEventListener('pointerdown',outside);
   document.removeEventListener('keydown',escape);
  };
 },[open]);

 const act=(label:string)=>{setOpen(false);onAction(label)};
 return <div className="andy-button-group-menu-anchor" ref={holderRef}>
  <ButtonGroup aria-label="Acciones de seguimiento">
   <ButtonGroupButton size={size} onClick={()=>act('Posponer')}>Posponer</ButtonGroupButton>
   <ButtonGroupButton size={size} iconOnly aria-label="Más acciones de seguimiento"
    aria-controls={menuId} aria-expanded={open} ref={triggerRef} onClick={()=>setOpen(v=>!v)}>
    <MaterialIcon name="more_horiz" size={size==='small'?16:size==='large'?20:18}/>
   </ButtonGroupButton>
  </ButtonGroup>
  {open&&<div className="andy-button-group-menu" id={menuId} ref={menuRef}
   role="group" aria-label="Opciones adicionales">
   <button type="button" onClick={()=>act('Marcar como pendiente')}>Marcar como pendiente</button>
   <button type="button" onClick={()=>act('Reprogramar')}>Reprogramar</button>
  </div>}
 </div>;
}

export function AndyButtonGroupDocs(){
 const [action,setAction]=useState('');
 const run=(label:string)=>setAction(label);
 return <>
  <DocSection title="Descripción" description="Button Group agrupa acciones relacionadas en una misma superficie visual. Los botones comparten bordes y radios exteriores, pero cada uno conserva su acción, foco y estado. A diferencia de Toggle Group, no representa una selección.">{null}</DocSection>

  <DocSection title="Básico" description="Composición de referencia adaptada a MLZ: un botón de ícono independiente, dos acciones unidas y un grupo dividido con opciones adicionales.">
   <DocPreview>
    <div className="andy-button-group-demo-row">
     <ButtonGroup aria-label="Navegación hacia atrás">
      <ButtonGroupButton iconOnly aria-label="Volver" onClick={()=>run('Volver')}>
       <MaterialIcon name="arrow_back" size={18}/>
      </ButtonGroupButton>
     </ButtonGroup>
     <ButtonGroup aria-label="Acciones de registro">
      <ButtonGroupButton onClick={()=>run('Archivar')}>Archivar</ButtonGroupButton>
      <ButtonGroupButton onClick={()=>run('Reportar')}>Reportar</ButtonGroupButton>
     </ButtonGroup>
     <SplitGroup onAction={run}/>
    </div>
   </DocPreview>
  </DocSection>

  <DocSection title="Botones unidos" description="Dos o más acciones relacionadas comparten un contorno. Los divisores internos mantienen la separación y las esquinas interiores no tienen redondeo.">
   <DocPreview>
    <ButtonGroup aria-label="Acciones de documento">
     <ButtonGroupButton onClick={()=>run('Editar')}>Editar</ButtonGroupButton>
     <ButtonGroupButton onClick={()=>run('Duplicar')}>Duplicar</ButtonGroupButton>
     <ButtonGroupButton onClick={()=>run('Compartir')}>Compartir</ButtonGroupButton>
    </ButtonGroup>
   </DocPreview>
  </DocSection>

  <DocSection title="Botón dividido" description="La acción principal se ejecuta directamente y los tres puntos abren opciones complementarias sin alterar los demás botones.">
   <DocPreview><SplitGroup onAction={run}/></DocPreview>
  </DocSection>

  <DocSection title="Acciones primarias" description="Los grupos también admiten acciones con fondo pleno. Se mantiene el color Primario 600 y una línea tenue entre botones.">
   <DocPreview>
    <ButtonGroup aria-label="Acciones de publicación">
     <ButtonGroupButton variant="primary" onClick={()=>run('Guardar')}>Guardar</ButtonGroupButton>
     <ButtonGroupButton variant="primary" onClick={()=>run('Publicar')}>Publicar</ButtonGroupButton>
    </ButtonGroup>
   </DocPreview>
  </DocSection>

  <DocSection title="Orientación vertical" description="Cuando el contexto requiere una columna, se mantienen unidos los botones y los radios exteriores. Cada botón conserva su navegación de teclado.">
   <DocPreview>
    <ButtonGroup orientation="vertical" aria-label="Acciones de registro">
     <ButtonGroupButton onClick={()=>run('Editar')}>Editar</ButtonGroupButton>
     <ButtonGroupButton onClick={()=>run('Duplicar')}>Duplicar</ButtonGroupButton>
     <ButtonGroupButton onClick={()=>run('Archivar')}>Archivar</ButtonGroupButton>
    </ButtonGroup>
   </DocPreview>
  </DocSection>

  <DocSection title="Tamaños" description="Cada grupo mantiene un tamaño coherente: Small 32 px, Medium 40 px o Large 48 px, y siempre un radio exterior de 4 px.">
   <DocPreview>
    <div className="andy-button-group-sizes">
     {sizes.map(size=><div className="andy-button-group-size" key={size.id}>
      <ButtonGroup aria-label={'Acciones '+size.label}>
       <ButtonGroupButton size={size.id} onClick={()=>run('Archivar')}>Archivar</ButtonGroupButton>
       <ButtonGroupButton size={size.id} onClick={()=>run('Reportar')}>Reportar</ButtonGroupButton>
      </ButtonGroup>
      <strong>{size.label}</strong>
      <span>{size.px}</span>
     </div>)}
    </div>
   </DocPreview>
  </DocSection>

  <DocSection title="Anatomía" description="Partes del componente y criterios para organizar acciones relacionadas sin construir un control de selección.">
   <GuidelineTable rows={[
    ['ButtonGroup','Contenedor con role="group" y un nombre accesible.'],
    ['ButtonGroupButton','Botón nativo con acción, etiqueta y foco propios.'],
    ['Divisor','Línea de 1 px entre botones unidos; corresponde al borde del estilo Terciario.'],
    ['Esquinas','Radio solo en extremos; las esquinas internas quedan rectas.'],
    ['Botón de ícono','Área cuadrada y nombre accesible por aria-label.'],
    ['Más acciones','Botón de tres puntos con opciones adicionales desplegables.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Las medidas, la paleta y la tipografía pertenecen a Button MLZ; no se copian los colores oscuros de la referencia.">
   <GuidelineTable rows={[
    ['Tamaños','Small 32 px / 14–20; Medium 40 px / 16–24; Large 48 px / 18–26.'],
    ['Tipografía','Geometria Bold 700 en las acciones.'],
    ['Radio','4 px en los extremos y 0 px en las uniones internas.'],
    ['Bordes','Terciario: 1 px en #94C6E5; divisores internos del mismo grosor.'],
    ['Color del texto','Primario 600 (#236999) en Terciario; blanco en las variantes de fondo pleno.'],
    ['Hover terciario','Fondo #F3F7FC; Presionado #E5F0FF.'],
    ['Focus','Contorno Info 500 (#006EFF), 2 px separado 2 px del botón.'],
    ['Separación','0 px entre botones unidos y 16 px entre grupos independientes.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Cada botón ejecuta una acción. Para alternar valores seleccionados utilizá Toggle Group, no Button Group.">
   <GuidelineTable rows={[
    ['Semántica','role="group" con aria-label describe el conjunto; no agregar aria-pressed a acciones normales.'],
    ['Teclado','Tab navega por los botones; Enter y Espacio activan cada acción.'],
    ['Focus','Cada botón conserva su foco visible sin desplazar los demás.'],
    ['Menú','El disparador comunica aria-expanded; Escape cierra y devuelve el foco. Las opciones se recorren con Tab.'],
    ['Acciones','Las demostraciones informan la interacción sin navegar ni modificar datos reales.'],
    ['Selección','Usar Toggle Group para valores seleccionables, no para acciones independientes.'],
   ]}/>
  </DocSection>
  <span className="andy-button-group-a11y-status" role="status" aria-live="polite">{action?'Acción de demostración: '+action:''}</span>
 </>;
}
