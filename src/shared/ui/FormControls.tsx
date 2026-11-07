import type { ComponentPropsWithRef } from 'react';

/** Controles nativos controlados o no controlados, sin estado ni modelo municipal. */
export type FormControlAppearance = 'standard' | 'soft';

const base = 'min-h-12 w-full min-w-0 border border-[#93bfe0] bg-white px-4 py-2.5 text-[16px] leading-6 text-primary-600 outline-none placeholder:text-[#8baac3] focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600/20';
const appearances: Record<FormControlAppearance, string> = {
  standard: 'rounded-[4px] transition-colors',
  soft: 'rounded-[6px]',
};

function classes(appearance: FormControlAppearance, custom: string) {
  return base + ' ' + appearances[appearance] + (custom ? ' ' + custom : '');
}

export type TextFieldProps = ComponentPropsWithRef<'input'> & { appearance?: FormControlAppearance };
export function TextField({ appearance = 'standard', className = '', ...props }: TextFieldProps) {
  return <input {...props} className={classes(appearance, className)} />;
}

export type SelectControlProps = ComponentPropsWithRef<'select'> & { appearance?: FormControlAppearance };
export function SelectControl({ appearance = 'standard', className = '', children, ...props }: SelectControlProps) {
  return <select {...props} className={classes(appearance, className)}>{children}</select>;
}

export type TextAreaControlProps = ComponentPropsWithRef<'textarea'> & { appearance?: FormControlAppearance };
export function TextAreaControl({ appearance = 'standard', className = '', ...props }: TextAreaControlProps) {
  return <textarea {...props} className={classes(appearance, className)} />;
}
