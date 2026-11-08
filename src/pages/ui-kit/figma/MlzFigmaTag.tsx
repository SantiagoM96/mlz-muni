import type { ReactNode } from 'react';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';

export type FigmaTagSize = 'Chico' | 'Mediano' | 'Grande';
export type FigmaTagColor = 'Default' | 'Amarillo' | 'Rojo' | 'Verde' | 'Azul' | 'Violeta';
const sizeStyles: Record<FigmaTagSize, string> = {
  Chico: 'min-h-6 px-[6px] text-[14px]',
  Mediano: 'min-h-7 px-[6px] text-[16px]',
  Grande: 'min-h-[30px] px-[6px] text-[18px]',
};
const colorStyles: Record<FigmaTagColor, string> = {
  Default: 'bg-[#f3f7fc] text-[#236999]',
  Amarillo: 'bg-[#fffde7] text-[#f9a825]',
  Rojo: 'bg-[#fff0f0] text-[#ef284c]',
  Verde: 'bg-[#f1fcf4] text-[#2abb5b]',
  Azul: 'bg-[#e5f0ff] text-[#006eff]',
  Violeta: 'bg-[#ecddff] text-[#9747ff]',
};

/** tag publicado en Figma: 3 tamaños, 6 colores y opción de ícono. */
export function MlzFigmaTag({ size = 'Chico', color = 'Default', showIcon = false, children }:{
  size?: FigmaTagSize; color?: FigmaTagColor; showIcon?: boolean; children: ReactNode;
}) {
  return (
    <span className={'inline-flex items-center gap-1.5 rounded-[6px] font-medium leading-none ' + sizeStyles[size] + ' ' + colorStyles[color]}>
      {showIcon && <MaterialIcon name="info" size={size === 'Chico' ? 14 : size === 'Mediano' ? 16 : 18} />}
      {children}
    </span>
  );
}
