import type { ComponentPropsWithoutRef } from 'react';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';

/** Recreación funcional del set Figma Button/Standar y Button/Chico. No modifica Button de producción. */
export type FigmaButtonType = 'primario' | 'secundario' | 'terciario' | 'gost' | 'link';
export type FigmaButtonSize = 'Standar' | 'Chico';
export type FigmaButtonState = 'default' | 'hovered' | 'pressed' | 'active' | 'disabled';

const styles: Record<FigmaButtonType, string> = {
  primario: 'bg-[#236999] text-white hover:bg-[#1f5a85] active:bg-[#1e415c]',
  secundario: 'bg-[#5ba8d5] text-white hover:bg-[#358dc2] active:bg-[#236999]',
  terciario: 'border border-[#94c6e5] bg-transparent text-[#236999] hover:bg-[#f3f7fc] active:bg-[#e5f0ff]',
  gost: 'bg-transparent text-[#236999] hover:bg-[#f3f7fc] active:bg-[#e5f0ff]',
  link: 'bg-transparent text-[#236999] hover:underline active:text-[#006eff]',
};
const visualState: Record<FigmaButtonType, Record<FigmaButtonState, string>> = {
  primario: { default: '', hovered: 'bg-[#1f5a85]', pressed: 'bg-[#1e415c]', active: 'bg-[#1e415c]', disabled: '' },
  secundario: { default: '', hovered: 'bg-[#358dc2]', pressed: 'bg-[#236999]', active: 'bg-[#236999]', disabled: 'bg-[#236999]' },
  terciario: { default: '', hovered: 'bg-transparent', pressed: 'bg-[#e5f0ff]', active: 'bg-[#e5f0ff]', disabled: '' },
  gost: { default: '', hovered: 'bg-[#f3f7fc]', pressed: 'bg-[#e5f0ff]', active: 'bg-[#e5f0ff]', disabled: '' },
  link: { default: '', hovered: 'underline', pressed: 'text-[#358dc2]', active: 'text-[#006eff]', disabled: '' },
};

export interface MlzFigmaButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  kind?: FigmaButtonType;
  size?: FigmaButtonSize;
  figmaState?: FigmaButtonState;
  showRightIcon?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export function MlzFigmaButton({
  kind = 'primario', size = 'Standar', figmaState = 'default',
  showRightIcon = false, className = '', disabled = false, children, type = 'button', ...rest
}: MlzFigmaButtonProps) {
  const isDisabled = disabled || figmaState === 'disabled';
  const isLink = kind === 'link';
  const geometry = isLink
    ? 'min-h-[26px] px-0'
    : size === 'Standar' ? 'min-h-12 px-6' : 'min-h-10 px-4';
  const typography = size === 'Standar' ? 'text-[18px]' : 'text-[16px]';
  const tertiaryBorder = kind === 'terciario' && size === 'Chico' ? 'border-[#236999]' : '';
  return (
    <button {...rest} type={type} disabled={isDisabled}
      aria-pressed={figmaState === 'active' ? true : undefined}
      className={'inline-flex items-center justify-center gap-2 rounded-[4px] font-bold leading-[26px] ' +
        'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#236999] ' +
        geometry + ' ' + typography + ' ' + styles[kind] + ' ' + tertiaryBorder + ' ' +
        visualState[kind][figmaState] + (isDisabled ? ' cursor-not-allowed opacity-50' : '') +
        (className ? ' ' + className : '')}>
      {children}
      {showRightIcon && <MaterialIcon name="chevron_right" size={size === 'Standar' ? 20 : 18} />}
    </button>
  );
}
