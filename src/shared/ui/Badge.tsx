import type { ReactNode } from 'react';
import { MaterialIcon, type MaterialIconName } from './MaterialIcon';
import './badge.css';

/** Badge informa un estado; por defecto es un elemento estático, no un botón.
 * Basado en las composiciones de shadcn/ui, con los tokens propios de MLZ. */
export type BadgeTone = 'primary' | 'warning' | 'error' | 'success' | 'info' | 'purple' | 'neutral';
export type BadgeAppearance = 'soft' | 'outline' | 'solid' | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeIconPosition = 'none' | 'start' | 'end';

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  icon?: MaterialIconName;
  iconPosition?: BadgeIconPosition;
  loading?: boolean;
  href?: string;
  title?: string;
  className?: string;
  ariaLabel?: string;
};

export function Badge({
  children,
  tone='primary',
  appearance='soft',
  size='md',
  icon,
  iconPosition='none',
  loading=false,
  href,
  title,
  className='',
  ariaLabel,
}: BadgeProps) {
  const iconSize=size==='sm'?14:size==='lg'?18:16;
  const classNames=[
    'mlz-badge','tone-'+tone,'is-'+appearance,'is-'+size,
    href?'is-link':'',
    loading?'is-loading':'',
    className,
  ].filter(Boolean).join(' ');
  const media=loading
    ? <span className="mlz-badge-spinner" aria-hidden="true"><MaterialIcon name="sync" size={iconSize} weight={400}/></span>
    : icon&&iconPosition!=='none'
      ? <MaterialIcon name={icon} size={iconSize} weight={400}/>
      : null;
  const body=<>
    {iconPosition!=='end'&&media}
    <span className="mlz-badge-label">{children}</span>
    {iconPosition==='end'&&media}
  </>;
  return href
    ? <a className={classNames} href={href} title={title} aria-label={ariaLabel}>{body}</a>
    : <span className={classNames} title={title}>{body}</span>;
}

/** Chip removible: el único elemento interactivo es el botón de quitar.
 * No se anida un botón dentro de un Badge/enlace clickeable. */
export function RemovableChip({label,onRemove,size='md',tone='neutral'}:{
  label:string;
  onRemove:()=>void;
  size?:BadgeSize;
  tone?:BadgeTone;
}) {
  return <span className={'mlz-badge mlz-removable-chip tone-'+tone+' is-soft is-'+size}>
    <span className="mlz-badge-label">{label}</span>
    <button type="button" className="mlz-chip-remove" onClick={onRemove} aria-label={'Quitar '+label}>
      <MaterialIcon name="close" size={size==='sm'?14:size==='lg'?18:16} weight={400}/>
    </button>
  </span>;
}
