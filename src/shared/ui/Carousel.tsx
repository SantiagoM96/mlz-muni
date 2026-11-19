import {
 useCallback, useEffect, useRef, useState,
 type CSSProperties, type ReactNode,
} from 'react';
import { MaterialIcon } from './MaterialIcon';
import { ButtonGroup, ButtonGroupButton } from './ButtonGroup';
import './carousel.css';

export type CarouselVisible='auto'|1|2|3;
export type CarouselAlign='start'|'center';
export type CarouselStep='item'|'page';

type CarouselProps={
 label:string;
 slides:readonly ReactNode[];
 variant?:'banner'|'gallery';
 visible?:CarouselVisible;
 gap?:8|12|16|24;
 align?:CarouselAlign;
 showNavigation?:boolean;
 showIndicators?:boolean;
 loop?:boolean;
 step?:CarouselStep;
 autoplayMs?:number;
};

/** Contenedor funcional independiente del tipo de tarjeta, imagen o texto.
 * Sin autoplay por defecto: solo el banner que lo solicita lo habilita.
 * Desplazamiento nativo con scroll-snap, trackpad y gestos táctiles.
 */
export function Carousel({
 label,slides,variant='gallery',visible='auto',gap=16,align='start',
 showNavigation=true,showIndicators=false,loop=false,step='item',autoplayMs,
}:CarouselProps){
 const viewportRef=useRef<HTMLDivElement>(null);
 const currentRef=useRef(0);
 const programmaticTargetRef=useRef<number|null>(null);
 const [width,setWidth]=useState(0);
 const [current,setCurrent]=useState(0);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [paused,setPaused]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [reducedMotion,setReducedMotion]=useState(
  ()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches
 );

 useEffect(()=>{
  const viewport=viewportRef.current;
  if(!viewport)return;
  const observer=new ResizeObserver(entries=>{
   const next=Math.round(entries[0]?.contentRect.width??0);
   setWidth(old=>old===next?old:next);
  });
  observer.observe(viewport);
  setWidth(Math.round(viewport.clientWidth));
  return()=>observer.disconnect();
 },[]);

 useEffect(()=>{
  const query=window.matchMedia('(prefers-reduced-motion: reduce)');
  const onChange=()=>setReducedMotion(query.matches);
  query.addEventListener('change',onChange);
  return()=>query.removeEventListener('change',onChange);
 },[]);
 useEffect(()=>{
  const onVisibility=()=>setHidden(document.hidden);
  document.addEventListener('visibilitychange',onVisibility);
  return()=>document.removeEventListener('visibilitychange',onVisibility);
 },[]);

 const breakpointCount=width<480?1:width<850?2:3;
 const visibleCount=variant==='banner'?1:Math.min(visible==='auto'?3:visible,breakpointCount);
 const maxIndex=Math.max(0,slides.length-visibleCount);
 const canMove=slides.length>visibleCount;
 const canPrevious=canMove&&(loop||current>0);
 const canNext=canMove&&(loop||current<maxIndex);

 const goTo=useCallback((target:number,behavior:ScrollBehavior='smooth')=>{
  const viewport=viewportRef.current;
  if(!viewport)return;
  const children=Array.from(viewport.children) as HTMLElement[];
  if(!children.length)return;
  const next=loop?(target%(maxIndex+1)+(maxIndex+1))%(maxIndex+1):
   Math.max(0,Math.min(target,maxIndex));
  const child=children[next];
  const first=children[0];
  if(!child||!first)return;
  const origin=child.offsetLeft-first.offsetLeft;
  const aligned=align==='center'?origin-(viewport.clientWidth-child.clientWidth)/2:origin;
  const position=Math.max(0,Math.min(aligned,viewport.scrollWidth-viewport.clientWidth));
  programmaticTargetRef.current=next;
  currentRef.current=next;
  setCurrent(next);
  viewport.scrollTo({left:position,behavior:reducedMotion?'auto':behavior});
 },[align,loop,maxIndex,reducedMotion]);

 const lastIndexRef=useRef(maxIndex);
 useEffect(()=>{
  if(lastIndexRef.current===maxIndex)return;
  lastIndexRef.current=maxIndex;
  const target=Math.min(currentRef.current,maxIndex);
  goTo(target,'auto');
 },[maxIndex,goTo]);

 const scrollRaf=useRef(0);
 const onScroll=()=>{
  if(scrollRaf.current)cancelAnimationFrame(scrollRaf.current);
  scrollRaf.current=requestAnimationFrame(()=>{
   const viewport=viewportRef.current;
   if(!viewport)return;
   const children=Array.from(viewport.children) as HTMLElement[];
   const first=children[0];
   if(!first)return;
   let bestIndex=0;
   let bestDistance=Infinity;
   const maxScroll=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
   for(let i=0;i<=maxIndex;i++){
    const child=children[i];
    if(!child)continue;
    const origin=child.offsetLeft-first.offsetLeft;
    const aligned=align==='center'?origin-(viewport.clientWidth-child.clientWidth)/2:origin;
    const position=Math.max(0,Math.min(aligned,maxScroll));
    const distance=Math.abs(viewport.scrollLeft-position);
    if(distance<bestDistance){bestDistance=distance;bestIndex=i;}
   }
   // No sobrescribir el índice elegido mientras una transición smooth cruza
   // otras diapositivas. Se libera al alcanzar el destino.
   const requested=programmaticTargetRef.current;
   if(requested!==null){
    const target=children[requested];
    if(target){
     const origin=target.offsetLeft-first.offsetLeft;
     const aligned=align==='center'?origin-(viewport.clientWidth-target.clientWidth)/2:origin;
     const goal=Math.max(0,Math.min(aligned,maxScroll));
     if(Math.abs(viewport.scrollLeft-goal)>2)return;
    }
    programmaticTargetRef.current=null;
   }
   currentRef.current=bestIndex;
   setCurrent(old=>old===bestIndex?old:bestIndex);
  });
 };

 useEffect(()=>()=>{if(scrollRaf.current)cancelAnimationFrame(scrollRaf.current);},[]);

 const autoRequested=variant==='banner'&&typeof autoplayMs==='number'&&autoplayMs>0;
 const autoRunning=autoRequested&&!paused&&!hovered&&!focused&&!reducedMotion&&!hidden&&canMove;
 useEffect(()=>{
  if(!autoRunning)return;
  const timer=window.setInterval(()=>goTo(currentRef.current+1),autoplayMs);
  return()=>window.clearInterval(timer);
 },[autoRunning,autoplayMs,goTo]);

 const advance=(direction:-1|1)=>{
  // Desde los extremos, Loop debe llegar a la primera/última página,
  // incluso cuando el paso configurado es una página completa.
  if(loop&&direction===-1&&currentRef.current===0){goTo(maxIndex);return;}
  if(loop&&direction===1&&currentRef.current===maxIndex){goTo(0);return;}
  goTo(currentRef.current+direction*(step==='page'?visibleCount:1));
 };
 const style={
  '--mlz-carousel-gap':'var(--mlz-space-'+gap+')',
  '--mlz-carousel-visible':visibleCount,
 } as CSSProperties;

 return <div className={'mlz-carousel is-'+variant} style={style}
  role="region" aria-roledescription="carrusel" aria-label={label}
  data-testid="mlz-carousel" data-current={current} data-visible={visibleCount}
  data-autoplay={autoRunning?'running':autoRequested?'paused':'off'}
  onMouseEnter={()=>setHovered(true)}
  onMouseLeave={()=>setHovered(false)}
  onFocusCapture={()=>setFocused(true)}
  onBlurCapture={event=>{
   const next=event.relatedTarget;
   if(!(next instanceof Node)||!event.currentTarget.contains(next))setFocused(false);
  }}>
  {variant==='gallery'&&showNavigation&&<div className="mlz-carousel-toolbar">
   <span className="mlz-carousel-count">{Math.min(current+1,slides.length)} de {slides.length}</span>
   <ButtonGroup aria-label="Navegación de actividades" className="mlz-carousel-gallery-arrows">
    <ButtonGroupButton iconOnly aria-label="Actividad anterior" disabled={!canPrevious}
     onClick={()=>advance(-1)}><MaterialIcon name="arrow_back" size={20}/></ButtonGroupButton>
    <ButtonGroupButton iconOnly aria-label="Actividad siguiente" disabled={!canNext}
     onClick={()=>advance(1)}><MaterialIcon name="arrow_forward" size={20}/></ButtonGroupButton>
   </ButtonGroup>
  </div>}
  <div className="mlz-carousel-body">
   <div className={'mlz-carousel-viewport'+(align==='center'?' is-center':'')} ref={viewportRef}
    data-testid="mlz-carousel-viewport" onScroll={onScroll}
    tabIndex={0} aria-label={'Desplazar '+label.toLowerCase()}
    onPointerDown={()=>{programmaticTargetRef.current=null;}}
    onWheel={()=>{programmaticTargetRef.current=null;}}
    onKeyDown={event=>{
     if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
      event.preventDefault();
      advance(event.key==='ArrowRight'?1:-1);
     }else if(event.key==='Home'){event.preventDefault();goTo(0);}
     else if(event.key==='End'){event.preventDefault();goTo(maxIndex);}
    }}>
    {slides.map((slide,i)=><div className="mlz-carousel-item" key={i}
     role="group" aria-roledescription="diapositiva"
     aria-label={(i+1)+' de '+slides.length} data-slide={i}>
     {slide}
    </div>)}
   </div>
   {variant==='banner'&&showNavigation&&<div className="mlz-carousel-overlay-arrows">
    <ButtonGroup aria-label="Diapositiva anterior">
     <ButtonGroupButton iconOnly aria-label="Diapositiva anterior"
      disabled={!canPrevious} onClick={()=>advance(-1)}>
      <MaterialIcon name="chevron_left" size={24}/>
     </ButtonGroupButton>
    </ButtonGroup>
    <ButtonGroup aria-label="Diapositiva siguiente">
     <ButtonGroupButton iconOnly aria-label="Diapositiva siguiente"
      disabled={!canNext} onClick={()=>advance(1)}>
      <MaterialIcon name="chevron_right" size={24}/>
     </ButtonGroupButton>
    </ButtonGroup>
   </div>}
   {variant==='banner'&&<div className="mlz-carousel-banner-controls">
    {showIndicators&&<div className="mlz-carousel-indicators" role="group" aria-label="Elegir diapositiva">
     {slides.map((_,i)=><button key={i} type="button" className={'mlz-carousel-indicator'+(i===current?' is-current':'')}
      aria-label={'Ir a diapositiva '+(i+1)} aria-current={i===current?'true':undefined}
      onClick={()=>goTo(i)}><span/></button>)}
    </div>}
    {autoRequested&&<button type="button" className="mlz-carousel-play-toggle"
     aria-label={paused?'Reanudar carrusel automático':'Pausar carrusel automático'}
     aria-pressed={paused} onClick={()=>setPaused(old=>!old)}>
     <MaterialIcon name={paused?'play_arrow':'pause'} size={20}/>
    </button>}
   </div>}
  </div>
  <span className="mlz-carousel-sr-status" aria-live={autoRunning?'off':'polite'} aria-atomic="true">
   {autoRunning?'':('Diapositiva '+(current+1)+' de '+slides.length)}
  </span>
 </div>;
}
