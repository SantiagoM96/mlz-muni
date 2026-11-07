import type { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}

/** Estructura semántica compartida: label y ayuda asociados al control existente. */
export function FormField({ label, htmlFor, children, hint }: FormFieldProps) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-[16px] font-bold leading-6 text-primary-600" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-[14px] leading-[21px] text-[#718092]">{hint}</p>}
    </div>
  );
}
