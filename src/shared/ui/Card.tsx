import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import './card.css';

export type CardSize = 'default' | 'sm';
export type CardSpacing = 16 | 20 | 24 | 32;

type CardProps = ComponentPropsWithoutRef<'article'> & {
 size?: CardSize;
 spacing?: CardSpacing;
};

const spacingTokens:Record<CardSpacing,string>={
 16:'var(--mlz-space-16)',
 20:'20px',
 24:'var(--mlz-space-24)',
 32:'var(--mlz-space-32)',
};
const classes=(name:string,extra='')=>[name,extra].filter(Boolean).join(' ');

/** Composición base de Card MLZ. Los patrones de producto existentes no se modifican. */
export function Card({size='default',spacing,className='',style,children,...props}:CardProps){
 const spacingStyle=spacing?{'--mlz-card-spacing':spacingTokens[spacing]}:{};
 return <article {...props} data-size={size} className={classes('mlz-card',className)}
  style={{...spacingStyle,...style} as CSSProperties}>{children}</article>;
}
export function CardHeader({className='',...props}:ComponentPropsWithoutRef<'div'>){
 return <div {...props} className={classes('mlz-card-header',className)}/>;
}
export function CardTitle({className='',...props}:ComponentPropsWithoutRef<'h4'>){
 return <h4 {...props} className={classes('mlz-card-title',className)}/>;
}
export function CardDescription({className='',...props}:ComponentPropsWithoutRef<'p'>){
 return <p {...props} className={classes('mlz-card-description',className)}/>;
}
export function CardAction({className='',...props}:ComponentPropsWithoutRef<'div'>){
 return <div {...props} className={classes('mlz-card-action',className)}/>;
}
export function CardContent({className='',...props}:ComponentPropsWithoutRef<'div'>){
 return <div {...props} className={classes('mlz-card-content',className)}/>;
}
export function CardFooter({className='',...props}:ComponentPropsWithoutRef<'div'>){
 return <div {...props} className={classes('mlz-card-footer',className)}/>;
}
export function CardMedia({className='',...props}:ComponentPropsWithoutRef<'img'>){
 return <img {...props} className={classes('mlz-card-media',className)}/>;
}
