import { useRef, useState } from 'react';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';

const labelClass = 'mb-1 block text-[16px] font-bold leading-5 text-[#236999]';
const baseInput = 'h-12 min-w-0 rounded-[4px] border border-[#5ba8d5] bg-white px-4 ' +
  'text-[16px] leading-6 text-[#236999] outline-none placeholder:text-[#5ba8d5] ' +
  'hover:border-[#236999] focus-visible:border-[#006eff] focus-visible:ring-2 focus-visible:ring-[#006eff]/20';

/** Input/TextFile · estados publicados Placeholder / Completo / Disable / Error. */
export function MlzFigmaTextFile({ id, value, onChange, label = 'Tipo de documento' }: {
  id: string; value: string; onChange: (value: string) => void; label?: string;
}) {
  return (
    <div className="min-w-0 max-w-[438px]">
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input id={id} className={baseInput + ' w-full'} placeholder="Escribí un nombre de usuario"
        value={value} onChange={event => onChange(event.target.value)} />
    </div>
  );
}

/** Input/Dropdownn · set original de seis variantes, con activación nativa de opciones. */
export function MlzFigmaDropdown({ id, value, onChange, label = 'Desde' }: {
  id: string; value: string; onChange: (value: string) => void; label?: string;
}) {
  return (
    <div className="min-w-0 max-w-[342px]">
      <label className={labelClass} htmlFor={id}>{label}</label>
      <div className="relative">
        <select id={id} value={value} onChange={event => onChange(event.target.value)}
          className={baseInput + ' w-full appearance-none pr-11'}>
          <option value="">Seleccionar</option>
          <option value="Opción 1">Opción 1</option>
          <option value="Opción 2">Opción 2</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#236999]">
          <MaterialIcon name="expand_more" size={24} />
        </span>
      </div>
    </div>
  );
}

/** Input/TextArea · 435 × 147px (20px label + 4px espacio + 123px control). */
export function MlzFigmaTextArea({ id, value, onChange }: {
  id: string; value: string; onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 max-w-[435px]">
      <label className={labelClass} htmlFor={id}>Default + Placeholder</label>
      <textarea id={id} value={value} onChange={event => onChange(event.target.value)}
        rows={4} placeholder="Escribí un nombre de usuario"
        className={baseInput + ' min-h-[123px] h-auto w-full resize-y py-3'} />
    </div>
  );
}

/** Input/Codigo · cuatro celdas 48×48px con separación de 8px. */
export function MlzFigmaCode({ value, onChange }: {
  value: string; onChange: (value: string) => void;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 4 }, (_, i) => value[i] || '');
  function change(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(''));
    if (digit && index < 3) refs.current[index + 1]?.focus();
  }
  return (
    <fieldset className="w-full max-w-[216px]">
      <legend className={labelClass}>Código</legend>
      <div className="flex gap-2">
        {digits.map((digit, index) => (
          <input key={index} ref={el => { refs.current[index] = el; }}
            aria-label={'Dígito ' + (index + 1) + ' del código'} type="text"
            inputMode="numeric" pattern="[0-9]*" autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1} value={digit} placeholder="|"
            onChange={event => change(index, event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Backspace' && !digit && index > 0) refs.current[index - 1]?.focus();
            }}
            className="h-12 min-w-0 w-12 flex-1 rounded-[4px] border border-[#5ba8d5] bg-white text-center text-[24px] text-[#236999] outline-none placeholder:text-[#236999] focus-visible:border-[#006eff]" />
        ))}
      </div>
    </fieldset>
  );
}

/** SearchInput · barra de búsqueda de 56px publicada en la librería. */
export function MlzFigmaSearch({ id, value, onChange }: {
  id: string; value: string; onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full max-w-[700px]">
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#236999]">
        <MaterialIcon name="search" size={24} />
      </span>
      <input id={id} type="search" aria-label="Buscar" value={value}
        onChange={event => onChange(event.target.value)} placeholder="Buscar"
        className="h-14 w-full min-w-0 rounded-[4px] border border-[#5ba8d5] bg-[#f3f7fc] pl-14 pr-4 text-[18px] leading-[26px] text-[#236999] outline-none placeholder:text-[#94c6e5] focus-visible:border-[#006eff]" />
    </div>
  );
}

/** Input/DocumentoSelect · tipo 129px + número, alto 48px. */
export function MlzFigmaDocumentSelect({ value, onChange }: {
  value: string; onChange: (value: string) => void;
}) {
  const [kind, setKind] = useState('DNI');
  return (
    <div className="min-w-0 max-w-[438px]">
      <label className={labelClass} htmlFor="kit-documento-numero">Tipo y numero de documento</label>
      <div className="flex h-12 min-w-0 overflow-hidden rounded-[4px] border border-[#5ba8d5]">
        <div className="relative w-[129px] shrink-0 bg-[#236999]">
          <select aria-label="Tipo de documento" value={kind}
            onChange={event => setKind(event.target.value)}
            className="h-full w-full appearance-none bg-transparent pl-4 pr-8 text-[16px] text-white outline-none focus-visible:ring-2 focus-visible:ring-white">
            <option value="DNI" className="text-[#236999]">DNI</option>
            <option value="Pasaporte" className="text-[#236999]">Pasaporte</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
            <MaterialIcon name="expand_more" size={20} />
          </span>
        </div>
        <input id="kit-documento-numero" type="text" inputMode="numeric"
          value={value} onChange={event => onChange(event.target.value)}
          placeholder="335476578"
          className="min-w-0 flex-1 border-0 bg-white px-4 text-[16px] text-[#236999] outline-none placeholder:text-[#5ba8d5] focus-visible:ring-2 focus-visible:ring-[#006eff]/20" />
      </div>
    </div>
  );
}

/** Input/Adjuntar/Opcion 1 · selector azul de 36px sobre bandeja de 48px. */
export function MlzFigmaFileUpload({ option = 1 }: { option?: 1 | 2 }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const id = option === 1 ? 'kit-adjuntar-1' : 'kit-adjuntar-2';

  function selectFile(file?: File) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('El archivo supera los 2 MB');
      setFileName('');
      return;
    }
    setFileName(file.name);
    setError('');
  }

  return (
    <div className={option === 1 ? 'min-w-0 max-w-[435px]' : 'min-w-0 max-w-[473px]'}>
      {option === 1 && <label className={labelClass} htmlFor={id}>Frente del DNI</label>}
      <input ref={inputRef} id={id} type="file" accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only" onChange={event => selectFile(event.target.files?.[0])} />
      {option === 1 ? (
        <div className="flex h-12 min-w-0 items-center gap-2 rounded-[4px] bg-[#e5f0f9] p-1.5">
          <button type="button" onClick={() => inputRef.current?.click()}
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-[2px] bg-[#236999] px-3 text-[16px] leading-5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006eff]">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">attach_file</span>
            Seleccionar archivo
          </button>
          <span className="min-w-0 truncate text-[16px] text-[#94c6e5]">{fileName || 'No hay archivo'}</span>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="flex min-h-14 w-full min-w-0 items-center gap-2 rounded-[8px] border border-[#dbdbdb] bg-white px-4 text-left text-[18px] leading-[23px] text-[#3d3d3d] focus-visible:outline-2 focus-visible:outline-[#006eff]">
          <span aria-hidden="true" className="material-symbols-outlined text-[24px]">attach_file</span>
          <span className="min-w-0">{fileName || 'Adjunta una foto de el frente de tu documento'}</span>
        </button>
      )}
      {option === 1 && <p className="mt-1 text-[16px] leading-5 text-[#236999]">PDF, JPG o PNG de hasta 2 MB</p>}
      {error && <p role="alert" className="mt-1 text-[14px] text-[#ef284c]">{error}</p>}
    </div>
  );
}

/** Input/T&C · contenido literal del componente publicado, con checkbox nativo. */
export function MlzFigmaTerms({ checked, onChange }: {
  checked: boolean; onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex min-h-[136px] max-w-[435px] cursor-pointer items-start gap-2 rounded-[4px] text-[16px] leading-5 text-[#3d3d3d]">
      <input type="checkbox" className="mt-0.5 h-6 w-6 shrink-0 accent-[#236999]"
        checked={checked} onChange={event => onChange(event.target.checked)} />
      <span>
        Declaro no haber podado este/os árbol/es en el año 2024, que la presentación de este formulario
        reviste el carácter de Declaración Jurada y que los datos consignados son correctos, veraces y
        sin omisiones, asumiendo las responsabilidades del caso por las consecuencias derivadas de falsedades o errores.
      </span>
    </label>
  );
}
