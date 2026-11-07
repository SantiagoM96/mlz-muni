import { Link, type LinkProps } from 'react-router-dom';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/** Acción navegable: el HTML sigue siendo un link, no un botón que simula navegación. */
export type ActionLinkAppearance = 'compact' | 'wide';

type ActionLinkBase = { children: ReactNode; appearance?: ActionLinkAppearance; className?: string };
export type ActionLinkProps =
  | (ActionLinkBase & Omit<LinkProps, 'children' | 'className'> & { href?: never })
  | (ActionLinkBase & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className'> & { href: string; to?: never });

const appearanceClasses: Record<ActionLinkAppearance, string> = {
  compact: 'inline-flex min-h-12 items-center rounded bg-primary-600 px-6 py-2 font-bold text-white hover:bg-primary-700',
  wide: 'flex min-h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-primary-600 px-5 py-3 text-center text-[18px] font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-500',
};

export function ActionLink(props: ActionLinkProps) {
  const { children, appearance = 'compact', className = '', ...rest } = props;
  const classes = appearanceClasses[appearance] + (className ? ' ' + className : '');
  if ('to' in rest && rest.to !== undefined) {
    return <Link {...rest} className={classes}>{children}</Link>;
  }
  return <a {...rest} className={classes}>{children}</a>;
}
