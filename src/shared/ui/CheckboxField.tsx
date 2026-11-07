import type { ComponentPropsWithRef, ReactNode } from 'react';

export type CheckboxFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children' | 'className'> & {
  children: ReactNode;
  density?: 'standard' | 'comfortable';
  className?: string;
};

/** Checkbox nativo con label accesible; sin estado ni reglas de Agenda. */
export function CheckboxField({ children, density = 'standard', className = '', ...inputProps }: CheckboxFieldProps) {
  return (
    <label className={'flex ' + (density === 'comfortable' ? 'min-h-11' : 'min-h-7') +
      ' cursor-pointer items-center gap-2 text-[16px] font-bold text-primary-600' +
      (className ? ' ' + className : '')}>
      <input {...inputProps} type="checkbox" className="h-5 w-5 accent-primary-600" />
      {children}
    </label>
  );
}
