import { useEffect, useId, useRef, useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './deportes-controls.css';

const venues = ['Casa Ari', 'Gimnasio de Alto Rendimiento', 'Gimnasio de Deportes de Combate', 'Natatorio Gregorio «Guyo» Sember', 'Natatorio Jorge Omar Rossi', 'Parque Municipal Eva Perón'];
const ages = ['Hasta 2 años', '3 a 5 años', '6 a 12 años', '13 a 17 años', 'Mayor de 18', 'Mayor de 50'];

type FilterDemoProps = { label: string; options: string[]; multiple?: boolean; searchable?: boolean };

function FilterDemo({ label, options, multiple = false, searchable = true }: FilterDemoProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [appliedCount, setAppliedCount] = useState(0);
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
  const apply = () => { setAppliedCount(selected.length); close(); };
  return <div className="kit-sports-filter" ref={root}>
    <button type="button" ref={trigger} className={`kit-sports-trigger ${open || selected.length ? 'is-active' : ''}`}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={id}
      onClick={() => { setOpen(previous => !previous); setSearch(''); }}>
      <span className="kit-sports-truncate">{!multiple && selected.length ? selected[0] : label}</span>
      {multiple && selected.length > 0 && <span className="kit-sports-count"><span>{selected.length}</span></span>}
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
              <input type={multiple ? "checkbox" : "radio"} name={multiple ? undefined : id} checked={checked} onChange={() => toggle(option)} aria-label={option} />
              <span className={multiple ? "kit-sports-checkbox" : "kit-sports-radio"} aria-hidden="true">{multiple ? <MaterialIcon name={checked ? 'check_box' : 'check_box_outline_blank'} size={24} /> : checked && <span className="kit-sports-radio-dot" />}</span>
            </label>;
          }) : <p className="kit-sports-empty">No encontramos opciones</p>}
        </div>
        <div className="kit-sports-actions">
          <button className="kit-sports-apply" type="button" onClick={apply}>Ver resultados ({appliedCount})</button>
          <button className="kit-sports-clear" type="button" onClick={() => { setSelected([]); setSearch(''); }}>Limpiar</button>
        </div>
      </div></>}
  </div>;
}

function MoreFiltersDemo() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(['Días de cursada', 'Tipo de deportista']);
  const [days, setDays] = useState<string[]>(['Lunes']);
  const [type, setType] = useState('Recreativo');
  const [applied, setApplied] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const count = days.length + (type ? 1 : 0);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  const toggleSection = (section: string) => setExpanded(previous =>
    previous.includes(section) ? previous.filter(item => item !== section) : [...previous, section],
  );
  return <div className="kit-sports-filter kit-sports-more" ref={root}>
    <button type="button" ref={trigger} className={`kit-sports-trigger ${open || count ? 'is-active' : ''}`}
      aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(previous => !previous)}>
      <span className="kit-sports-truncate">Más filtros</span><span className="kit-sports-count"><span>{count}</span></span>
      <MaterialIcon name="tune" size={24} />
    </button>
    {open && <><button type="button" className="kit-sports-backdrop" aria-label="Cerrar más filtros" onClick={close} />
      <div className="kit-sports-popover kit-sports-more-popover" role="dialog" aria-label="Más filtros">
        <div className="kit-sports-mobile-header"><span className="kit-sports-grabber" /><strong>Más filtros</strong></div>
        <div className="kit-sports-more-scroll">
          {['Días de cursada', 'Tipo de deportista'].map(section =>
            <div className="kit-sports-more-section" key={section}>
              <button type="button" className="kit-sports-section-title" aria-expanded={expanded.includes(section)}
                onClick={() => toggleSection(section)}>{section}
                <MaterialIcon name="expand_more" size={22} className={expanded.includes(section) ? 'rotate-180' : ''} />
              </button>
              {expanded.includes(section) && <div className="kit-sports-choice-grid">
                {section === 'Días de cursada'
                  ? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day =>
                    <label className="kit-sports-inline-choice" key={day}>
                      <input type="checkbox" checked={days.includes(day)} onChange={() => setDays(previous =>
                        previous.includes(day) ? previous.filter(x => x !== day) : [...previous, day])} />
                      <span className="kit-sports-inline-symbol" aria-hidden="true">{days.includes(day) && <MaterialIcon name="check" size={17}/>}</span>
                      {day}
                    </label>)
                  : ['Recreativo', 'Competitivo', 'Federado'].map(item =>
                    <label className="kit-sports-inline-choice" key={item}>
                      <input type="radio" name="kit-sports-athlete" checked={type === item} onChange={() => setType(item)} />
                      <span className="kit-sports-inline-symbol" aria-hidden="true" />{item}
                    </label>)}
              </div>}
            </div>)}
        </div>
        <div className="kit-sports-actions">
          <button className="kit-sports-apply" type="button" onClick={() => { setApplied(count); close(); }}>Ver resultados ({applied})</button>
          <button className="kit-sports-clear kit-sports-clear-bordered" type="button" onClick={() => { setDays([]); setType(''); }}>Limpiar</button>
        </div>
      </div></>}
  </div>;
}

function FormSelectDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <div className="kit-sports-field kit-sports-form-select" ref={root}>
    <span id={id + '-label'}>Tipo de documento</span>
    <button ref={trigger} type="button" className="kit-sports-form-trigger" aria-labelledby={id + '-label'}
      aria-expanded={open} aria-haspopup="listbox" aria-controls={id}
      onClick={() => setOpen(previous => !previous)}>
      <span>{value || 'Seleccionar'}</span><MaterialIcon name="expand_more" size={24} className={open ? 'rotate-180' : ''} />
    </button>
    {open && <><button type="button" className="kit-sports-backdrop" aria-label="Cerrar selector" onClick={() => setOpen(false)} />
      <div id={id} className="kit-sports-form-popover" role="listbox" aria-labelledby={id + '-label'}>
        {['DNI', 'Pasaporte', 'Libreta cívica'].map(item =>
          <button type="button" role="option" key={item} aria-selected={value === item}
            className="kit-sports-form-option" onClick={() => { setValue(item); setOpen(false); trigger.current?.focus(); }}>
            <span>{item}</span><span className="kit-sports-form-radio" aria-hidden="true"><span /></span>
          </button>)}
      </div></>}
  </div>;
}

function FormDemo() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  return <div className="kit-sports-form-grid">
    <label className="kit-sports-field"><span>Nombre y apellido</span><input placeholder="Ingresá tu nombre" value={name}
      onChange={event => setName(event.target.value)} aria-invalid={error} aria-describedby={error ? 'kit-sports-error' : undefined} />
      {error && <small id="kit-sports-error">Completá este campo.</small>}</label>
    <FormSelectDemo />
    <label className="kit-sports-field"><span>Campo deshabilitado</span><input disabled placeholder="No disponible" /></label>
    <div className="kit-sports-field"><span>Validación</span>
      <button type="button" className="kit-sports-example-button" onClick={() => setError(previous => !previous)}>
        {error ? 'Quitar estado de error' : 'Mostrar estado de error'}
      </button></div>
  </div>;
}

export function SportsControlsGallery({ mode = 'all' }: { mode?: 'all' | 'filters' }) {
  return <div className="kit-sports-gallery">
    <p className="kit-sports-intro">Patrones recuperados del prototipo Deportes Anual y de Agenda. Los filtros de catálogo y los campos de inscripción conservan comportamientos diferentes; esta galería no modifica las pantallas productivas.</p>
    <section className="kit-sports-section"><h2>Filtros de selección</h2>
      <p>Sede utiliza selección múltiple; Edad, selección única; Más filtros combina checkbox y radio. Las opciones están separadas para que no se peguen al seleccionar varias.</p>
      <div className="kit-sports-filters">
        <FilterDemo label="Sede" options={venues} multiple searchable={false} />
        <FilterDemo label="Edad" options={ages} searchable={false} />
        <MoreFiltersDemo />
      </div>
    </section>
    {mode === 'all' && <section className="kit-sports-section"><h2>Campos de formulario</h2>
      <p>Los campos mantienen etiqueta, placeholder, foco, completado, deshabilitado y error, sin adoptar el patrón de filtros.</p>
      <FormDemo />
    </section>}
    {mode === 'all' && <section className="kit-sports-section"><h2>Referencia de tokens</h2>
      <div className="kit-sports-swatches">{[
        ['Primario 600', '#236999'], ['Info / selección', '#006EFF'], ['Borde filtro', '#5BA8D5'],
        ['Texto', '#3D3D3D'], ['Superficie activa', '#F6F6F6'],
      ].map(([name, value]) => <div className="kit-sports-swatch" key={name}>
        <span className="kit-sports-swatch-color" style={{ background: value }} />
        <span><strong>{name}</strong><small>{value}</small></span>
      </div>)}</div>
      <p className="kit-sports-caption">Geometria · Material Symbols Outlined · controles 48 px · radio 4 px · estado activo con borde 2 px · separación 2 px entre opciones.</p>
    </section>}
  </div>;
}
