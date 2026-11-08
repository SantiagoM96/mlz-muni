import { useState } from 'react';
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
  search?: boolean;
  showVerified?: boolean;
  showPasswordSecurity?: boolean;
}

/**
 * Input New · MLZ - UI KIT.
 * Tres tipos × seis estados recuperados del componente Figma publicado.
 * Alto: 48px (texto/dropdown), 123px (textarea); label 20px + separación 4px.
 */
export function MlzFigmaField({
  id, label, kind, state = 'Default', value, onChange,
  placeholder = 'Escribí un nombre de usuario', options = ['Seleccionar', 'DNI', 'Pasaporte'],
  helpText = '', showLabel = true, password = false, search = false,
  showVerified = true, showPasswordSecurity = false,
}: MlzFigmaFieldProps) {
  const [visible, setVisible] = useState(false);
  const disabled = state === 'Disable';
  const invalid = state === 'Error';
  const helpId = id + '-ayuda';
  const errorColor = kind === 'Text area' ? 'border-[#ff344f]' : 'border-[#ef284c]';
  const borderColor = invalid ? errorColor
    : state === 'Focus' ? 'border-[#006eff]'
      : state === 'Hovered' ? 'border-[#236999]'
        : kind === 'Text area' && state === 'Completo' ? 'border-[#236999]'
          : 'border-[#5ba8d5]';

  const bgColor = disabled ? 'bg-[#e5f0f9]'
    : kind === 'Dropdownn' && state === 'Completo' ? 'bg-[#f6f6f6]' : 'bg-white';

  const controlClass = 'w-full min-w-0 rounded-[4px] border px-4 text-[16px] leading-6 ' +
    'text-[#236999] outline-none placeholder:text-[#5ba8d5] ' +
    'hover:border-[#236999] focus-visible:border-[#006eff] focus-visible:ring-2 focus-visible:ring-[#006eff]/20 ' +
    'disabled:cursor-not-allowed ' + borderColor + ' ' + bgColor +
    (search ? ' pl-11' : '') + (password || showVerified ? ' pr-12' : '');

  const hint = invalid ? (helpText || 'Campo obligatorio') : helpText;
  const description = hint ? { 'aria-describedby': helpId } : {};
  const secure = [
    { label: 'Tener al menos 8 caracteres.', valid: value.length >= 8 },
    { label: 'Incluir al menos una letra mayúscula.', valid: /[A-Z]/.test(value) },
    { label: 'Incluir al menos una letra minúscula.', valid: /[a-z]/.test(value) },
    { label: 'Incluir al menos un número.', valid: /\d/.test(value) },
  ];
  const secureEnough = secure.every(item => item.valid);

  return (
    <div className="min-w-0">
      {showLabel && (
        <label htmlFor={id} className={'mb-1 block text-[16px] font-bold leading-5 ' +
          (invalid ? 'text-[#ef284c]' : 'text-[#236999]')}>
          {label}
        </label>
      )}
      <div className="relative">
        {kind === 'Text field' && (
          <>
            {search && (
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#236999]">
                <MaterialIcon name="search" size={20} />
              </span>
            )}
            <input id={id} type={password && !visible ? 'password' : 'text'}
              aria-label={!showLabel ? label : undefined}
              aria-invalid={invalid || undefined}
              {...description}
              value={value} onChange={event => onChange(event.target.value)}
              disabled={disabled} placeholder={placeholder}
              className={'h-12 ' + controlClass} />
            {password && (
              <button type="button" aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={visible} onClick={() => setVisible(v => !v)} disabled={disabled}
                className="absolute inset-y-0 right-3 flex min-w-9 items-center justify-center text-[#236999] focus-visible:outline-2 focus-visible:outline-[#006eff]">
                <span aria-hidden="true" className="material-symbols-outlined text-[22px]">
                  {visible ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            )}
            {!password && showVerified && state === 'Completo' && (
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2abb5b]"
                title="Verificado">
                <MaterialIcon name="check" size={20} />
              </span>
            )}
          </>
        )}
        {kind === 'Dropdownn' && (
          <>
            <select id={id} aria-label={!showLabel ? label : undefined}
              aria-invalid={invalid || undefined} {...description}
              value={value} onChange={event => onChange(event.target.value)}
              disabled={disabled}
              className={'h-12 appearance-none pr-11 ' + controlClass}>
              {options.map((option, index) => (
                <option key={index} value={index === 0 ? '' : option}>{option}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#236999]">
              <MaterialIcon name="expand_more" size={24} />
            </span>
          </>
        )}
        {kind === 'Text area' && (
          <textarea id={id} aria-label={!showLabel ? label : undefined}
            aria-invalid={invalid || undefined} {...description}
            value={value} onChange={event => onChange(event.target.value)}
            disabled={disabled} placeholder={placeholder} rows={4}
            className={'block min-h-[123px] resize-y py-3 ' + controlClass} />
        )}
      </div>
      {hint && (
        <p id={helpId} role={invalid ? 'alert' : undefined}
          className={'mt-1 text-[14px] leading-[18px] ' +
            (invalid ? 'text-[#ef284c]' : 'text-[#236999]')}>
          {hint}
        </p>
      )}
      {password && showPasswordSecurity && (
        <div className="mt-3 text-[14px] leading-6 text-[#3d3d3d]">
          <p className={'font-bold ' + (secureEnough ? 'text-[#2abb5b]' : '')}>
            {secureEnough ? 'Tu contraseña es segura' : 'Requisitos para una contraseña segura'}
          </p>
          <ul>
            {secure.map(item => (
              <li key={item.label} className={'flex gap-2 ' + (item.valid ? 'text-[#2abb5b]' : '')}>
                <span aria-hidden="true">{item.valid ? '✓' : '·'}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
