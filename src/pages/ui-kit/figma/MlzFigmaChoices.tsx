export type MlzChoiceKind = 'checkbox' | 'radio';
export type MlzChoiceDirection = 'Horizontal' | 'Vertical';
export function MlzFigmaChoices({ kind, direction = 'Horizontal', label, options, values, onChange }:{
  kind: MlzChoiceKind; direction?: MlzChoiceDirection; label: string;
  options: readonly string[]; values: readonly string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[16px] font-bold text-[#236999]">{label}</legend>
      <div className={'flex gap-4 ' + (direction === 'Horizontal' ? 'flex-wrap' : 'flex-col')}>
        {options.map(option => {
          const checked = values.includes(option);
          return (
            <label key={option} className="flex min-h-6 cursor-pointer items-center gap-2 text-[16px] text-[#3d3d3d]">
              <input type={kind} name={kind === 'radio' ? label : undefined} checked={checked}
                onChange={() => onChange(kind === 'radio' ? [option]
                  : checked ? values.filter(x => x !== option) : [...values, option])}
                className="h-5 w-5 accent-[#236999]" />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
