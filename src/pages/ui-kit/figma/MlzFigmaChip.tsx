import { MaterialIcon } from '../../../shared/ui/MaterialIcon';

export type FigmaChipState = 'default' | 'hovered' | 'pressed' | 'active' | 'selected' | 'disabled';
export function MlzFigmaChip({ label, appearance = 'fill', state = 'default',
  selected = false, onClick, showRightIcon = true }:{
  label: string; appearance?: 'fill' | 'trazo'; state?: FigmaChipState;
  selected?: boolean; onClick?: () => void; showRightIcon?: boolean;
}) {
  const disabled = state === 'disabled';
  const active = selected || state === 'selected';
  const fill = active ? 'bg-[#1e415c] text-white'
    : state === 'pressed' || state === 'active' ? 'bg-[#1f5a85] text-white'
    : state === 'hovered' ? 'bg-[#236999] text-white'
    : 'bg-[#5ba8d5] text-white hover:bg-[#236999]';
  const stroke = active ? 'border-[#236999] bg-[#f3f7fc] text-[#236999]'
    : 'border-[#5ba8d5] bg-white text-[#236999] hover:bg-[#f3f7fc]';
  return (
    <button type="button" disabled={disabled} aria-pressed={active} onClick={onClick}
      className={'inline-flex min-h-8 items-center gap-2 rounded-[4px] px-3 text-[14px] font-medium ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#236999] ' +
        (appearance === 'fill' ? fill : 'border ' + stroke) +
        (disabled ? ' cursor-not-allowed opacity-50' : '')}>
      {label}{showRightIcon && <MaterialIcon name="close" size={16} />}
    </button>
  );
}
