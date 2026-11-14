import { useEffect, useId, useRef, useState } from 'react';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import './deportes-controls.css';

const sports = ['Natación', 'Fútbol', 'Vóley', 'Básquet', 'Gimnasia', 'Atletismo'];
const ages = ['Infancias', 'Adolescentes', 'Personas adultas', 'Personas mayores'];

type FilterDemoProps = { label: string; options: string[]; multiple?: boolean; searchable?: boolean };

function FilterDemo({ label, options, multiple = false, searchable = true }: FilterDemoProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);
  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 680px)').matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const filtered = options.filter(option => option.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')));
  const toggle = (option: string) => setSelected(previous =>
    multiple ? (previous.includes(option) ? previous.filter(item => item !== option) : [...previous, option])
      : (previous.includes(option) ? [] : [option]),
  );
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <div className="kit-sports-filter" ref={root}>
    <button type="button" ref={trigger} className={`kit-sports-trigger ${open || selected.length ? 'is-active' : ''}`}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={id}
      onClick={() => { setOpen(previous => !previous); setSearch(''); }}>
      <span className="kit-sports-truncate">{label}</span>
      {selected.length > 0 && <span className="kit-sports-count">{selected.length}</span>}
      <MaterialIcon name="expand_more" size={22} className={open ? 'rotate-180' : ''} />
    </button>
    {open && <><button className="kit-sports-backdrop" aria-label="Cerrar opciones" onClick={close} type="button" />
      <div className="kit-sports-popover" id={id} role="dialog" aria-label={`Opciones de ${label}`}>
        <div className="kit-sports-mobile-header"><span className="kit-sports-grabber" /><strong>{label}</strong></div>
        {searchable && <div className="kit-sports-search-wrap"><input aria-label={`Buscar ${label}`} autoFocus
          placeholder="Buscar" value={search} onChange={event => setSearch(event.target.value)} />
          <MaterialIcon name="search" size={22} /></div>}
        <div className="kit-sports-options" role="group" aria-label={`Seleccionar ${label}`}>
          {filtered.length ? filtered.map(option => {
            const checked = selected.includes(option);
            return <label className={`kit-sports-option ${checked ? 'is-selected' : ''}`} key={option}>
              <span>{option}</span>
              <input type="checkbox" checked={checked} onChange={() => toggle(option)} aria-label={option} />
              <span className="kit-sports-checkbox" aria-hidden="true">{checked && <MaterialIcon name="check" size={16} />}</span>
            </label>;
          }) : <p className="kit-sports-empty">No encontramos opciones</p>}
        </div>
        <div className="kit-sports-actions">
          <button className="kit-sports-apply" type="button" onClick={close}>Ver resultados</button>
          <button className="kit-sports-clear" type="button" onClick={() => { setSelected([]); setSearch(''); }}>Limpiar</button>
        </div>
      </div></>}
  </div>;
}

function FormDemo() {
  const [name, setName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [error, setError] = useState(false);
  return <div className="kit-sports-form-grid">
    <label className="kit-sports-field"><span>Nombre y apellido</span><input placeholder="Ingresá tu nombre" value={name}
      onChange={event => setName(event.target.value)} aria-invalid={error} aria-describedby={error ? 'kit-sports-error' : undefined} />
      {error && <small id="kit-sports-error">Completá este campo.</small>}</label>
    <label className="kit-sports-field"><span>Tipo de documento</span>
      <select value={documentType} onChange={event => setDocumentType(event.target.value)}>
        <option value="">Seleccionar</option><option value="dni">DNI</option><option value="pasaporte">Pasaporte</option>
      </select></label>
    <label className="kit-sports-field"><span>Campo deshabilitado</span><input disabled placeholder="No disponible" /></label>
    <div className="kit-sports-field"><span>Validación</span>
      <button type="button" className="kit-sports-example-button" onClick={() => setError(previous => !previous)}>
        {error ? 'Quitar estado de error' : 'Mostrar estado de error'}
      </button></div>
  </div>;
}

export function SportsControlsGallery() {
  return <div className="kit-sports-gallery">
    <p className="kit-sports-intro">Patrones recuperados del prototipo Deportes Anual y de Agenda. Los filtros de catálogo y los campos de inscripción conservan comportamientos diferentes; esta galería no modifica las pantallas productivas.</p>
    <section className="kit-sports-section"><h2>Filtros de selección</h2>
      <p>Selección múltiple con opciones independientes, check de contorno, búsqueda y acciones explícitas. Fecha no tiene buscador interno.</p>
      <div className="kit-sports-filters">
        <FilterDemo label="Deporte" options={sports} multiple />
        <FilterDemo label="Edad" options={ages} multiple />
        <FilterDemo label="Fecha" options={['Hoy', 'Mañana', 'Esta semana', 'Este mes']} searchable={false} />
      </div>
    </section>
    <section className="kit-sports-section"><h2>Campos de formulario</h2>
      <p>Los campos mantienen etiqueta, placeholder, foco, completado, deshabilitado y error, sin adoptar el patrón de filtros.</p>
      <FormDemo />
    </section>
    <section className="kit-sports-section"><h2>Referencia de tokens</h2>
      <div className="kit-sports-swatches">{[
        ['Primario 600', '#236999'], ['Info / selección', '#006EFF'], ['Borde filtro', '#5BA8D5'],
        ['Texto', '#3D3D3D'], ['Superficie activa', '#F6F6F6'],
      ].map(([name, value]) => <div className="kit-sports-swatch" key={name}>
        <span className="kit-sports-swatch-color" style={{ background: value }} />
        <span><strong>{name}</strong><small>{value}</small></span>
      </div>)}</div>
      <p className="kit-sports-caption">Geometria · Material Symbols Outlined · controles 48 px · radio 4 px · estado activo con borde 2 px · separación 2 px entre opciones.</p>
    </section>
  </div>;
}
