import type { ComponentPropsWithRef, HTMLAttributes, ReactNode } from 'react';
import './button-group.css';

export type ButtonGroupOrientation='horizontal'|'vertical';
export type ButtonGroupVariant='primary'|'secondary'|'tertiary'|'ghost'|'destructive';
export type ButtonGroupSize='small'|'medium'|'large';

type ButtonGroupProps=Omit<HTMLAttributes<HTMLDivElement>,'children'> & {
 children:ReactNode;
 orientation?:ButtonGroupOrientation;
};
/** Agrupa acciones independientes. Para selección, utilizar Toggle Group. */
export function ButtonGroup({children,orientation='horizontal',className='',...rest}:ButtonGroupProps){
 return <div {...rest} role="group" data-orientation={orientation}
  className={'mlz-button-group is-'+orientation+(className?' '+className:'')}>{children}</div>;
}
type ButtonGroupButtonProps=ComponentPropsWithRef<'button'> & {
 variant?:ButtonGroupVariant;
 size?:ButtonGroupSize;
 iconOnly?:boolean;
};
/** Botón con geometría y colores MLZ: cada control conserva su foco y acción. */
export function ButtonGroupButton({
 variant='tertiary',size='medium',iconOnly=false,type='button',className='',children,...rest
}:ButtonGroupButtonProps){
 return <button {...rest} type={type}
  className={'mlz-button-group__button is-'+variant+' is-'+size+(iconOnly?' is-icon-only':'')+(className?' '+className:'')}>
  {children}
 </button>;
}
