import type { ReactNode } from 'react';
import { consoleInputBaseClass, labelClass } from './ConsoleFormPrimitives';

// El modal usa radio 6px, distinto del formulario general (4px): conservarlo.
export const inputClass = consoleInputBaseClass + ' rounded-[6px]';

export function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return <div className="min-w-0">
    <label htmlFor={id} className={labelClass}>{label}</label>
    {children}
  </div>;
}
