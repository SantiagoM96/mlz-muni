import { useState, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';
import './avatar.css';

/** Avatar MLZ: composición inspirada en el patrón Avatar de shadcn/ui.
 * Estilos y escala propios del Design System institucional.
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarBadgeTone = 'success' | 'info' | 'neutral';

type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  size?: AvatarSize;
  label?: string;
  children: ReactNode;
};

export function Avatar({size='md',label,className='',children,...props}:AvatarProps){
  return <span
    {...props}
    className={['mlz-avatar',className].filter(Boolean).join(' ')}
    data-size={size}
    role={label?'img':undefined}
    aria-label={label}
    aria-hidden={label?undefined:true}
  >{children}</span>;
}

type AvatarImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'>;

/** La imagen aparece cuando terminó de cargar; el fallback permanece
 * a la vista durante la carga y si el recurso falla. */
export function AvatarImage({src,alt='',className='',onLoad,onError,...props}:AvatarImageProps){
  const [loadedSource,setLoadedSource]=useState<string|null>(null);
  return src?<img
    {...props}
    key={src}
    src={src}
    alt={alt}
    className={['mlz-avatar-image',className].filter(Boolean).join(' ')}
    data-loaded={loadedSource===src}
    onLoad={event=>{setLoadedSource(src);onLoad?.(event);}}
    onError={event=>{setLoadedSource(null);onError?.(event);}}
  />:null;
}

export function AvatarFallback({className='',children,...props}:HTMLAttributes<HTMLSpanElement>){
  return <span {...props} className={['mlz-avatar-fallback',className].filter(Boolean).join(' ')}>{children}</span>;
}

type AvatarBadgeProps = HTMLAttributes<HTMLSpanElement> & {tone?:AvatarBadgeTone};
export function AvatarBadge({tone='success',className='',children,...props}:AvatarBadgeProps){
  return <span {...props} aria-hidden="true" className={['mlz-avatar-badge','is-'+tone,className].filter(Boolean).join(' ')}>{children}</span>;
}

type AvatarGroupProps=HTMLAttributes<HTMLDivElement> & {children:ReactNode};
export function AvatarGroup({className='',children,...props}:AvatarGroupProps){
  return <div {...props} className={['mlz-avatar-group',className].filter(Boolean).join(' ')}>{children}</div>;
}

type AvatarGroupCountProps=Omit<HTMLAttributes<HTMLSpanElement>,'children'> & {
  count:number;
  size?:AvatarSize;
};
export function AvatarGroupCount({count,size='md',className='',...props}:AvatarGroupCountProps){
  return <span {...props} className={['mlz-avatar-group-count',className].filter(Boolean).join(' ')}
    data-size={size} aria-label={count+' personas más'}>+{count}</span>;
}
