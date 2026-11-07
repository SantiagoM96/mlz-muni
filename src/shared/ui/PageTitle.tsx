import type { ComponentPropsWithoutRef } from 'react';

/** Título de página institucional 32px/40px, con semántica h1 y props nativas. */
export type PageTitleProps = ComponentPropsWithoutRef<'h1'>;

export function PageTitle({ className = '', children, ...props }: PageTitleProps) {
  return (
    <h1 {...props} className={'text-[32px] leading-10 font-bold text-primary-600 ' + className}>
      {children}
    </h1>
  );
}
