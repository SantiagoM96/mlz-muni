import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MaterialIcon } from '../ui/MaterialIcon';
import { getMobileBreadcrumbParent } from './getMobileBreadcrumbParent';
import './breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export type BreadcrumbSeparator = 'chevron' | 'slash';

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
  /** @deprecated Se conserva por compatibilidad; el Breadcrumb institucional usa siempre Primario 600. */
  tone?: 'primary' | 'neutral';
  /** Mostrar solo el vínculo al padre en mobile, evitando truncar la página actual. */
  mobileParentOnly?: boolean;
  /** Chevron predeterminado; variantes textuales para contextos específicos. */
  separator?: BreadcrumbSeparator;
  /** Contraer niveles intermedios cuando hay cinco o más elementos. */
  collapseMiddle?: boolean;
  /** Presentación de ejemplo: sin enlaces ni navegación, con controles de colapsado activos. */
  disableNavigation?: boolean;
}

/** Breadcrumb institucional. Mantiene la navegación mobile «Volver» existente
 * y agrega separadores alternativos y colapsado accesible sin duplicar rutas. */
export function Breadcrumbs({
  items,
  className='',
  tone='primary',
  mobileParentOnly=false,
  separator='chevron',
  collapseMiddle=false,
  disableNavigation=false,
}: BreadcrumbsProps) {
  const mobileParent=getMobileBreadcrumbParent(items,mobileParentOnly);
  const collapsible=collapseMiddle&&items.length>=5;
  const collapsedItems=collapsible?items.slice(1,-2):[];
  const collapseRef=useRef<HTMLDetailsElement>(null);

  useEffect(()=>{
    if(!collapsible)return;
    const dismiss=(event:PointerEvent)=>{
      const details=collapseRef.current;
      if(details?.open&&event.target instanceof Node&&!details.contains(event.target))details.open=false;
    };
    const dismissKey=(event:KeyboardEvent)=>{
      if(event.key!=='Escape'||!collapseRef.current?.open)return;
      collapseRef.current.open=false;
      collapseRef.current.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown',dismiss);
    document.addEventListener('keydown',dismissKey);
    return ()=>{
      document.removeEventListener('pointerdown',dismiss);
      document.removeEventListener('keydown',dismissKey);
    };
  },[collapsible]);

  const renderSeparator=()=>{
    if(separator==='slash')return <span className="mlz-breadcrumb-separator" aria-hidden="true">/</span>;
    return <span className="mlz-breadcrumb-separator" aria-hidden="true"><MaterialIcon name="chevron_right" size={20} weight={400}/></span>;
  };

  return (
    <nav aria-label="Ruta de navegación"
      className={'mlz-breadcrumb my-6 w-full min-w-0 is-'+tone+' '+className}>
      {mobileParent&&(
        <div className="mlz-breadcrumb-back">
          {disableNavigation?(
            <span className="mlz-breadcrumb-text mlz-breadcrumb-back-link" data-testid="breadcrumb-mobile-back">
              <MaterialIcon name="arrow_back" size={20} weight={400}/>
              <span>Volver</span>
            </span>
          ):(
            <Link to={mobileParent.to}
              className="mlz-breadcrumb-link mlz-breadcrumb-back-link"
              aria-label={'Volver a '+mobileParent.label}
              data-testid="breadcrumb-mobile-back">
              <MaterialIcon name="arrow_back" size={20} weight={400}/>
              <span>Volver</span>
            </Link>
          )}
        </div>
      )}
      <ol className={'mlz-breadcrumb-list'+(mobileParent?' has-mobile-back':'')}>
        {items.map((item,index)=>{
          const isLast=index===items.length-1;
          const isParent=index===items.length-2;
          const hideOnMobile=index<items.length-2;
          const itemClasses=[
            'mlz-breadcrumb-item',isLast?'is-current':'',
            isParent?'is-parent':'',hideOnMobile?'is-mobile-hidden':'',
          ].filter(Boolean).join(' ');
          if(collapsible&&index>1&&index<items.length-2)return null;
          if(collapsible&&index===1)return (
            <li key="collapsed" className={itemClasses}>
              {renderSeparator()}
              <details ref={collapseRef} className="mlz-breadcrumb-collapse">
                <summary aria-label="Mostrar niveles intermedios" title="Mostrar niveles intermedios">
                  <MaterialIcon name="more_horiz" size={20} weight={400}/>
                </summary>
                <ul className="mlz-breadcrumb-menu" aria-label="Niveles intermedios">
                  {collapsedItems.map((hidden,hiddenIndex)=>(
                    <li key={hidden.to||hidden.label+'-'+hiddenIndex}>
                      {hidden.to&&!disableNavigation?(
                        <Link to={hidden.to} onClick={()=>{if(collapseRef.current)collapseRef.current.open=false}}>
                          {hidden.label}
                        </Link>
                      ):<span>{hidden.label}</span>}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
          return (
            <li key={item.to||item.label+'-'+index} className={itemClasses}>
              {index>0&&renderSeparator()}
              {item.to&&!isLast&&!disableNavigation?(
                <Link className="mlz-breadcrumb-link" to={item.to}>{item.label}</Link>
              ):(
                <span className={isLast?'mlz-breadcrumb-current':'mlz-breadcrumb-text'}
                  title={isLast?item.label:undefined}
                  aria-current={isLast?'page':undefined}
                  data-testid={isLast?'breadcrumb-current':undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
