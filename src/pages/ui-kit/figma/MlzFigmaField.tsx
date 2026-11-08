import { MaterialIcon } from '../../../shared/ui/MaterialIcon';

export type FigmaInputKind = 'Text field' | 'Dropdownn' | 'Text area';
export type FigmaInputState = 'Default' | 'Hovered' | 'Focus' | 'Completo' | 'Disable' | 'Error';
export interface MlzFigmaFieldProps {
  id: string;
  label: string;
  kind: FigmaInputKind;
  state?: FigmaInputState;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: readonly string[];
  helpText?: string;
  showLabel?: boolean;
  password?: boolean;
  showVerified?: boolean;
}

/** Implementación para revisión del set publicado Input New: 3 tipos y 6 estados. */
export function MlzFigmaField({
  id, label, kind, state = 'Default', value, onChange, placeholder = 'Escribí un valor',
  options = ['Seleccionar', 'Opción 1', 'Opción 2'], helpText = 'Campo obligatorio',
  showLabel = true, password = false, showVerified = false,
}: MlzFigmaFieldProps) {
  const disabled = state === 'Disable';
  const invalid = state === 'Error';
  const helpId = id + '-ayuda';
  const inputClasses = 'min-h-12 w-full min-w-0 rounded-[4px] border bg-white px-4 py-2 text-[16px] leading-6 ' +
    'outline-none focus-visible:border-[#236999] focus-visible:ring-2 focus-visible:ring-[#236999]/20 ' +
    (invalid ? 'border-[#ef284c] text-[#236999]' : 'border-[#5ba8d5] text-[#236999]') +
    (state === 'Focus' ? ' ring-2 ring-[#236999]/20' : '') +
    (disabled ? ' cursor-not-allowed opacity-50' : '');
  const common = {
    id, disabled, 'aria-invalid': invalid || undefined,
    'aria-describedby': invalid || helpText ? helpId : undefined,
    className: inputClasses,
  };
  return (
    <div className="min-w-0">
      {showLabel && <label htmlFor={id} className={'mb-1 block text-[16px] font-bold leading-5 ' +
        (invalid ? 'text-[#ef284c]' : 'text-[#236999]')}>{label}</label>}
      <div className="relative">
        {kind === 'Text field' && (
          <input {...common} type={password ? 'password' : 'text'} value={value}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder} className={inputClasses + ' placeholder:text-[#5ba8d5]'} />
        )}
        {kind === 'Dropdownn' && (
          <select {...common} value={value} onChange={event => onChange(event.target.value)}>
            {options.map(option => <option key={option} value={option === 'Seleccionar' ? '' : option}>{option}</option>)}
          </select>
        )}
        {kind === 'Text area' && (
          <textarea {...common} rows={4} value={value} onChange={event => onChange(event.target.value)}
            placeholder={placeholder} className={inputClasses + ' min-h-[123px] resize-y placeholder:text-[#5ba8d5]'} />
        )}
        {showVerified && state === 'Completo' && kind === 'Text field' && (
          <span aria-label="Verificado" className="absolute right-3 top-3 text-[#2abb5b]"><MaterialIcon name="check" size={20} /></span>
        )}
      </div>
      {(invalid || helpText) && (
        <p id={helpId} role={invalid ? 'alert' : undefined}
          className={'mt-1 text-[14px] leading-5 ' + (invalid ? 'text-[#ef284c]' : 'text-[#61788b]')}>
          {invalid ? (helpText || 'Campo obligatorio') : helpText}
        </p>
      )}
    </div>
  );
}
