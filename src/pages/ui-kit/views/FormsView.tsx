import { useState } from 'react';
import { FormField } from '../../../shared/ui/FormField';
import { TextField, SelectControl, TextAreaControl, type FormControlAppearance } from '../../../shared/ui/FormControls';
import { CheckboxField } from '../../../shared/ui/CheckboxField';
import { StoryCard } from '../components/StoryCard';

export function FormsView() {
  const [appearance, setAppearance] = useState<FormControlAppearance>('standard');
  const [density, setDensity] = useState<'standard' | 'comfortable'>('standard');
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [title, setTitle] = useState('Taller de huerta comunitaria');
  const [kind, setKind] = useState('Taller');
  const [description, setDescription] = useState('Actividad abierta a la comunidad.');
  const [inclusive, setInclusive] = useState(true);
  function reset() {
    setAppearance('standard'); setDensity('standard'); setDisabled(false);
    setInvalid(false); setTitle('Taller de huerta comunitaria'); setKind('Taller');
    setDescription('Actividad abierta a la comunidad.'); setInclusive(true);
  }

  return (
    <>
      <div className="rounded-[12px] border border-[#c5dce9] bg-[#eaf3f9] p-4 md:p-5">
        <h2 className="text-[16px] font-bold text-primary-600">Panel de pruebas</h2>
        <p className="mt-1 text-[14px] leading-5">Los ajustes afectan únicamente a los ejemplos y no se guardan.</p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="flex min-w-[155px] flex-col gap-1 text-[13px] font-bold text-primary-600">
            Apariencia
            <select aria-label="Apariencia de los controles" value={appearance}
              onChange={event => setAppearance(event.target.value as FormControlAppearance)}
              className="min-h-10 rounded-[4px] border border-[#93bfe0] bg-white px-3 text-[15px]">
              <option value="standard">Standard · 4px</option>
              <option value="soft">Soft · 6px</option>
            </select>
          </label>
          <label className="flex min-w-[155px] flex-col gap-1 text-[13px] font-bold text-primary-600">
            Densidad del checkbox
            <select aria-label="Densidad del checkbox" value={density}
              onChange={event => setDensity(event.target.value as 'standard' | 'comfortable')}
              className="min-h-10 rounded-[4px] border border-[#93bfe0] bg-white px-3 text-[15px]">
              <option value="standard">Standard · 28px</option>
              <option value="comfortable">Comfortable · 44px</option>
            </select>
          </label>
          <label className="flex min-h-10 items-center gap-2 text-[14px] font-medium">
            <input type="checkbox" checked={disabled} onChange={event => setDisabled(event.target.checked)} />
            Disabled
          </label>
          <label className="flex min-h-10 items-center gap-2 text-[14px] font-medium">
            <input type="checkbox" checked={invalid} onChange={event => setInvalid(event.target.checked)} />
            Aria-invalid
          </label>
          <button type="button" onClick={reset}
            className="min-h-10 rounded-[4px] border border-primary-600 bg-white px-3 text-[14px] font-bold text-primary-600">
            Restablecer
          </button>
        </div>
      </div>

      <StoryCard title="TextField · SelectControl · TextAreaControl"
        source="src/shared/ui/FormControls.tsx · src/shared/ui/FormField.tsx"
        description="Los controles utilizan elementos HTML nativos, props React tipadas y dos variantes visuales. FormField resuelve la asociación label-control."
        usage={['<FormField label="Título" htmlFor="actividad">', '  <TextField id="actividad" appearance="standard" />', '</FormField>'].join('\n')}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Título" htmlFor="kit-titulo" hint="Nombre visible de la actividad.">
            <TextField id="kit-titulo" appearance={appearance} disabled={disabled} aria-invalid={invalid}
              aria-describedby={invalid ? 'kit-error' : undefined} value={title}
              onChange={event => setTitle(event.target.value)} placeholder="Ej.: Taller de compostaje" />
          </FormField>
          <FormField label="Tipo de actividad" htmlFor="kit-tipo">
            <SelectControl id="kit-tipo" appearance={appearance} disabled={disabled} aria-invalid={invalid}
              value={kind} onChange={event => setKind(event.target.value)}>
              <option value="Taller">Taller</option>
              <option value="Muestra">Muestra</option>
              <option value="Jornada">Jornada</option>
            </SelectControl>
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Descripción" htmlFor="kit-descripcion" hint="Texto ilustrativo que no se publica.">
              <TextAreaControl id="kit-descripcion" appearance={appearance} rows={3}
                disabled={disabled} aria-invalid={invalid} value={description}
                onChange={event => setDescription(event.target.value)} className="resize-y" />
            </FormField>
          </div>
          {invalid && <p id="kit-error" role="alert" className="text-[14px] text-[#ac343e] md:col-span-2">
            aria-invalid activo. Falta definir una variante visual institucional específica para error.
          </p>}
        </div>
      </StoryCard>

      <StoryCard title="CheckboxField"
        source="src/shared/ui/CheckboxField.tsx"
        description="Checkbox nativo con label clickeable, checked controlado y densidades standard/comfortable."
        usage={['<CheckboxField checked={inclusive}', '  onChange={event => setInclusive(event.target.checked)}>', '  Disciplina inclusiva', '</CheckboxField>'].join('\n')}>
        <div className="flex flex-col gap-4">
          <CheckboxField checked={inclusive} density={density} disabled={disabled}
            onChange={event => setInclusive(event.target.checked)}>
            Disciplina inclusiva
          </CheckboxField>
          <p className="text-[14px]" role="status">Valor: {inclusive ? 'Seleccionado' : 'Sin seleccionar'}</p>
          <div className="max-w-[420px] rounded-[8px] border border-divider bg-white p-4">
            <p className="mb-2 text-[13px] font-bold text-primary-600">Estado fijo: disabled</p>
            <CheckboxField disabled checked={false} onChange={() => undefined}>Opción no disponible</CheckboxField>
          </div>
        </div>
      </StoryCard>

      <StoryCard title="Valores controlados"
        source="src/shared/ui/FormControls.tsx"
        description="Las interacciones modifican estado React local; no están conectadas a ningún servicio ni formulario real.">
        <dl className="grid gap-3 rounded-[8px] bg-white p-4 text-[14px] sm:grid-cols-[140px_minmax(0,1fr)]">
          <dt className="font-bold">Título</dt><dd className="break-words">{title || '(vacío)'}</dd>
          <dt className="font-bold">Tipo</dt><dd>{kind}</dd>
          <dt className="font-bold">Checkbox</dt><dd>{inclusive ? 'true' : 'false'}</dd>
          <dt className="font-bold">Apariencia</dt><dd>{appearance}</dd>
          <dt className="font-bold">Estado</dt><dd>{disabled ? 'disabled' : invalid ? 'aria-invalid' : 'normal'}</dd>
        </dl>
      </StoryCard>
    </>
  );
}
