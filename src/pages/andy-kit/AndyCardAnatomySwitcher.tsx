import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { AndyActivityCard } from './AndyActivityCards';
import { AndyMunicipalCardGallery, type MunicipalCardKind } from './AndyMunicipalCards';
import './andy-card-anatomy-switcher.css';

const examples=[
 {id:'sports',label:'Deportes Anual'},
 {id:'agenda',label:'Agenda de la Comunidad'},
 {id:'news',label:'Noticias'},
 {id:'service',label:'Áreas y servicios'},
 {id:'appointment',label:'Turnos online'},
 {id:'procedure',label:'Trámites destacados'},
 {id:'shortcut',label:'Accesos rápidos'},
 {id:'event',label:'Eventos con fecha'},
] as const;

type ExampleId=typeof examples[number]['id'];
type Part='header'|'content'|'footer';

/** Las zonas se señalan sobre el DOM de las tarjetas reales, sin duplicar
 * el HTML ni alterar la presentación de las ocho muestras originales. */
const anatomy:Record<ExampleId,Partial<Record<Part,readonly string[]>>>={
 sports:{
  header:['.andy-family-card-intro'],
  content:['.andy-family-card-details'],
  footer:['.andy-family-card-action'],
 },
 agenda:{
  header:['[data-testid="agenda-card"] > a > div > div:first-child'],
  content:['[data-testid="agenda-card-schedules"]'],
  footer:['[data-testid="agenda-card"] > a > div > .mt-auto'],
 },
 news:{
  header:['.andy-municipal-card-news .andy-municipal-card-tag','.andy-municipal-card-news h3'],
  content:['.andy-municipal-card-news .andy-municipal-card-meta'],
  footer:['.andy-municipal-card-news .andy-municipal-card-action'],
 },
 service:{
  header:['.andy-municipal-card-service-panel h3'],
  footer:['.andy-municipal-card-service-panel .andy-municipal-card-action'],
 },
 appointment:{
  header:['.andy-municipal-card-appointment h3'],
  content:['.andy-municipal-card-appointment p'],
  footer:['.andy-municipal-card-appointment .andy-municipal-card-action'],
 },
 procedure:{
  header:['.andy-municipal-card-procedure h3'],
  content:['.andy-municipal-card-procedure p'],
  footer:['.andy-municipal-card-procedure .andy-municipal-card-action'],
 },
 shortcut:{
  header:['.andy-municipal-card-shortcut-content h3'],
 },
 event:{
  header:['.andy-municipal-card-event .andy-municipal-card-category','.andy-municipal-card-event h3'],
  content:['.andy-municipal-card-event .andy-municipal-card-info'],
  footer:['.andy-municipal-card-event .andy-municipal-card-action'],
 },
};

const legend:readonly {part:Part;label:string}[]=[
 {part:'header',label:'Header · identificación'},
 {part:'content',label:'Content · información'},
 {part:'footer',label:'Footer · acciones'},
];

function CardExample({id}:{id:ExampleId}){
 if(id==='sports'||id==='agenda')return <AndyActivityCard kind={id}/>;
 return <AndyMunicipalCardGallery only={id as MunicipalCardKind} bare/>;
}

export function AndyCardAnatomySwitcher(){
 const [index,setIndex]=useState(0);
 const previewRef=useRef<HTMLDivElement>(null);
 const current=examples[index];
 const choose=(next:number)=>setIndex((next+examples.length)%examples.length);

 useLayoutEffect(()=>{
  const root=previewRef.current;
  if(!root)return;
  const highlighted=new Set<HTMLElement>();
  for(const part of legend){
   for(const selector of anatomy[current.id][part.part]??[]){
    for(const node of root.querySelectorAll<HTMLElement>(selector)){
     node.dataset.cardAnatomyPart=part.part;
     highlighted.add(node);
    }
   }
  }
  return ()=>{for(const node of highlighted)delete node.dataset.cardAnatomyPart;};
 },[current.id]);

 // La tarjeta de Agenda tiene un enlace real: mantener su apariencia,
 // pero no salir del catálogo cuando se explora esta vista didáctica.
 const avoidNavigation=(event:MouseEvent<HTMLDivElement>)=>{
  if(event.target instanceof Element&&event.target.closest('a[href]')){
   event.preventDefault();
   event.stopPropagation();
  }
 };

 return <div className="andy-card-anatomy-viewer" data-testid="andy-card-anatomy-viewer">
  <div className="andy-card-anatomy-controls" role="group" aria-label="Cambiar tarjeta municipal">
   <button type="button" className="andy-card-anatomy-nav" aria-label="Tarjeta anterior"
    onClick={()=>choose(index-1)}><MaterialIcon name="arrow_back" size={20}/></button>
   <label className="andy-card-anatomy-select-wrap">
    <span className="andy-card-anatomy-label">Tarjeta municipal</span>
    <select aria-label="Tarjeta municipal" value={current.id}
     onChange={event=>{
      const next=examples.findIndex(example=>example.id===event.currentTarget.value);
      if(next>=0)choose(next);
     }}>
     {examples.map(example=><option key={example.id} value={example.id}>{example.label}</option>)}
    </select>
   </label>
   <button type="button" className="andy-card-anatomy-nav" aria-label="Tarjeta siguiente"
    onClick={()=>choose(index+1)}><MaterialIcon name="arrow_forward" size={20}/></button>
   <span className="andy-card-anatomy-count">{index+1} de {examples.length}</span>
  </div>

  <div className="andy-card-anatomy-legend" aria-label="Leyenda de composición">
   {legend.map(item=><span className="andy-card-anatomy-key" key={item.part}>
    <span className={'andy-card-anatomy-swatch is-'+item.part} aria-hidden="true"/>
    {item.label}
   </span>)}
  </div>

  <div className="andy-card-anatomy-stage" role="region"
   aria-label={'Anatomía de '+current.label}>
   <div className="andy-card-anatomy-demo" ref={previewRef} onClickCapture={avoidNavigation}
    key={current.id} data-example={current.id}>
    <CardExample id={current.id}/>
   </div>
  </div>
  <p className="andy-card-anatomy-explanation">El resaltado se aplica sobre la tarjeta real. Algunas variantes no tienen contenido o footer independiente: en esos casos no se dibuja una sección inexistente.</p>
 </div>;
}
