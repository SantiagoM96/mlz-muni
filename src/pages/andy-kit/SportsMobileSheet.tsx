import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './sports-mobile-sheet.css';

export function useSportsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 680px)');
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return mobile;
}

type Sample = {y:number;time:number};
type Gesture = {id:number;startY:number;height:number;samples:Sample[]};
type Props = {
  open:boolean;
  title:string;
  onClose:()=>void;
  children:ReactNode;
  primaryLabel?:string;
  onPrimary?:()=>void;
  secondaryLabel?:string;
  onSecondary?:()=>void;
  /** El producto usa una altura contenida por el viewport; el pie queda fijo. */
  size?:'normal'|'large';
  actions?:'filters'|'form';
};

const elasticUp = (distance:number) => 34 * (1 - Math.exp(distance / 76));
const constrained = (value:number) => Math.max(0, Math.min(1,value));

export function SportsMobileSheet({open,title,onClose,children,primaryLabel='Ver resultados',onPrimary,secondaryLabel='Limpiar',onSecondary,size='normal',actions='filters'}:Props) {
  const dialogId=useId();
  const sheet=useRef<HTMLDivElement>(null);
  const handle=useRef<HTMLButtonElement>(null);
  const gesture=useRef<Gesture|null>(null);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const closeCallback=useRef(onClose);
  useEffect(()=>{closeCallback.current=onClose;},[onClose]);
  const [phase,setPhase]=useState<'entering'|'settled'|'dragging'|'rebounding'|'closing'>('entering');
  const [offset,setOffset]=useState(0);
  const [stretch,setStretch]=useState(0);
  const [scrim,setScrim]=useState(1);
  const [baseHeight,setBaseHeight]=useState(0);
  const primary=onPrimary??onClose;

  function clearTimer(){if(timer.current!==null){clearTimeout(timer.current);timer.current=null;}}
  function exit(callback?:()=>void) {
    if(phase==='closing')return;
    clearTimer();gesture.current=null;
    setPhase('closing');setScrim(0);
    timer.current=setTimeout(()=>{timer.current=null;(callback??closeCallback.current)();},290);
  }
  function dismiss(){exit();}
  useEffect(()=>{
    if(!open)return;
    const before=document.body.style.overflow;
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    document.body.style.overflow='hidden';
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();closeCallback.current();return;}
      if(event.key!=='Tab'||!sheet.current)return;
      const focusable=[...sheet.current.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),[tabindex="0"]')];
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    };
    document.addEventListener('keydown',key);
    handle.current?.focus({preventScroll:true});
    return ()=>{
      document.body.style.overflow=before;
      document.removeEventListener('keydown',key);
      previous?.focus({preventScroll:true});
    };
  },[open]);
  useEffect(()=>()=>{if(timer.current!==null)clearTimeout(timer.current);},[]);
  if(!open||typeof document==='undefined')return null;
  const start=(event:ReactPointerEvent<HTMLButtonElement>)=>{
    if(phase==='closing'||(event.pointerType==='mouse'&&event.button!==0))return;
    clearTimer();
    const h=sheet.current?.getBoundingClientRect().height||500;
    gesture.current={id:event.pointerId,startY:event.clientY,height:h,samples:[{y:event.clientY,time:performance.now()}]};
    setBaseHeight(h);
    setPhase('dragging');setOffset(0);setStretch(0);setScrim(1);
    try{event.currentTarget.setPointerCapture(event.pointerId);}catch{/* Fall back to normal pointer events */}
    event.preventDefault();
  };
  const move=(event:ReactPointerEvent<HTMLButtonElement>)=>{
    const g=gesture.current;if(!g||g.id!==event.pointerId)return;
    const dy=event.clientY-g.startY;
    if(dy>=0){setOffset(dy);setStretch(0);setScrim(constrained(1-dy/g.height));}
    else {setOffset(0);setStretch(elasticUp(-dy));setScrim(1);}
    const now=performance.now();
    g.samples.push({y:event.clientY,time:now});
    while(g.samples.length>2&&now-g.samples[0]!.time>95)g.samples.shift();
    event.preventDefault();
  };
  const end=(event:ReactPointerEvent<HTMLButtonElement>,cancelled=false)=>{
    const g=gesture.current;if(!g||g.id!==event.pointerId)return;
    gesture.current=null;
    try{if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);}catch{/* capture may already be released */}
    const dy=event.clientY-g.startY,now=performance.now(),first=g.samples[0]!;
    if(!cancelled&&Math.abs(dy)<8){dismiss();event.preventDefault();return;}
    const velocity=(event.clientY-first.y)/Math.max(1,now-first.time);
    const threshold=Math.min(168,Math.max(120,g.height*.24));
    if(!cancelled&&dy>0&&(dy>=threshold||(dy>=55&&velocity>=.8))){
      dismiss();
    }else{
      setPhase('rebounding');setOffset(0);setStretch(0);setScrim(1);
      clearTimer();timer.current=setTimeout(()=>{timer.current=null;setPhase('settled');},410);
    }
    event.preventDefault();
  };
  return createPortal(<div className="sports-sheet-layer" data-testid="sports-mobile-drawer">
    <button type="button" className="sports-sheet-scrim" aria-label={'Cerrar '+title}
      style={{'--sports-scrim-level':scrim} as CSSProperties}
      onClick={dismiss} />
    <div ref={sheet} className={'sports-mobile-sheet is-'+phase+' is-'+size+' actions-'+actions} role="dialog" aria-modal="true"
      aria-labelledby={dialogId}
      style={{'--sports-drag-y':offset+'px','--sports-stretch-y':stretch+'px','--sports-base-height':baseHeight+'px'} as CSSProperties}>
      <button ref={handle} type="button" className="sports-sheet-grab" aria-label="Deslizá hacia abajo para cerrar"
        onPointerDown={start} onPointerMove={move} onPointerUp={e=>end(e)}
        onPointerCancel={e=>end(e,true)} onClick={event=>{if(event.detail===0)dismiss();}}>
        <span className="sports-sheet-pill" aria-hidden="true"/>
      </button>
      <div className="sports-sheet-heading" id={dialogId}>{title}</div>
      <div className="sports-sheet-content">{children}</div>
      <div className="sports-sheet-footer">
        <button type="button" className="sports-sheet-primary" onClick={()=>exit(primary)}>{primaryLabel}</button>
        <button type="button" className="sports-sheet-secondary" onClick={onSecondary??dismiss}>{secondaryLabel}</button>
      </div>
    </div>
  </div>,document.body);
}
