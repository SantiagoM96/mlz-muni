import { useEffect, useId, useRef, useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { SportsMobileSheet, useSportsMobile } from '../andy-kit/SportsMobileSheet';
import './deportes-controls.css';

const venues = ['Casa Ari', 'Gimnasio de Alto Rendimiento', 'Gimnasio de Deportes de Combate', 'Natatorio Gregorio «Guyo» Sember', 'Natatorio Jorge Omar Rossi', 'Parque Municipal Eva Perón'];
const ages = ['Hasta 2 años', '3 a 5 años', '6 a 12 años', '13 a 17 años', 'Mayor de 18', 'Mayor de 50'];

type FilterDemoProps = { label: string; options: string[]; multiple?: boolean; searchable?: boolean };

function FilterDemo({ label, options, multiple = false, searchable = true }: FilterDemoProps) {
  const mobile = useSportsMobile();
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
      if (!window.matchMedia('(max-width: 680px)').matches && root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
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
    {open && !mobile && <><button className="kit-sports-backdrop" aria-label="Cerrar opciones" onClick={close} type="button" />
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
              <span className={multiple ? "kit-sports-checkbox" : "kit-sports-radio"} aria-hidden="true"><MaterialIcon name={multiple ? checked ? 'check_box' : 'check_box_outline_blank' : checked ? 'radio_button_checked' : 'radio_button_unchecked'} size={24}/></span>
            </label>;
          }) : <p className="kit-sports-empty">No encontramos opciones</p>}
        </div>
        <div className="kit-sports-actions">
          <button className="kit-sports-apply" type="button" onClick={apply}>Ver resultados ({selected.length})</button>
          <button className="kit-sports-clear" type="button" onClick={() => { setSelected([]); setSearch(''); }}>Limpiar</button>
        </div>
      </div></>}
    {mobile && open && <SportsMobileSheet open={open} title={label} onClose={close}
      primaryLabel={`Ver resultados (${selected.length})`} onPrimary={apply}
      secondaryLabel="Limpiar" onSecondary={() => { setSelected([]); setSearch(''); }}>
      {searchable && <div className="kit-sports-search-wrap"><input aria-label={`Buscar ${label}`}
        placeholder="Buscar" value={search} onChange={event=>setSearch(event.target.value)} />
        <MaterialIcon name="search" size={24}/></div>}
      <div className="kit-sports-options" role="group" aria-label={`Seleccionar ${label}`}>
        {filtered.length ? filtered.map(option => {
          const checked=selected.includes(option);
          return <label className={`kit-sports-option ${checked?'is-selected':''}`} key={option}>
            <span>{option}</span>
            <input type={multiple?'checkbox':'radio'} name={multiple?undefined:id+'-mobile'}
              checked={checked} onChange={()=>toggle(option)} aria-label={option}/>
            <span className={multiple?'kit-sports-checkbox':'kit-sports-radio'} aria-hidden="true">
              <MaterialIcon name={multiple?checked?'check_box':'check_box_outline_blank':checked?'radio_button_checked':'radio_button_unchecked'} size={24}/>
            </span>
          </label>;
        }):<p className="kit-sports-empty">No encontramos opciones</p>}
      </div>
    </SportsMobileSheet>}
  </div>;
}

function MoreFiltersDemo() {
  const mobile = useSportsMobile();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(['Días de cursada','Tipo de deportista','Nivel de intensidad']);
  const [disability, setDisability] = useState(false);
  const [days, setDays] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [intensity,setIntensity] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const count=days.length+Number(Boolean(type))+Number(Boolean(intensity))+Number(disability);
  const close=()=>{setOpen(false);trigger.current?.focus({preventScroll:true});};
  useEffect(()=>{
    if(!open)return;
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();close();}};
    document.addEventListener('keydown',key);
    return()=>document.removeEventListener('keydown',key);
  },[open]);
  const toggleSection=(name:string)=>setExpanded(old=>old.includes(name)?old.filter(v=>v!==name):[...old,name]);
  const reset=()=>{setDays([]);setType('');setIntensity('');setDisability(false);};
  const panel=<div className="kit-sports-advanced" aria-label="Opciones de Más filtros">
    <label className="kit-sports-disability">
      <span><strong>Para personas con discapacidad</strong><small>Mostrar actividades orientadas a personas con discapacidad</small></span>
      <input type="checkbox" role="switch" checked={disability} onChange={e=>setDisability(e.target.checked)}
        aria-label="Para personas con discapacidad"/>
      <span aria-hidden="true" className="kit-sports-disability-track"/>
    </label>
    {([
      ['Días de cursada',['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']],
      ['Tipo de deportista',['Recreativo','Competitivo','Federado']],
      ['Nivel de intensidad',['Bajo','Medio','Alto']]
    ] as const).map(([group,values])=>
      <section className="kit-sports-advanced-section" key={group}>
        <button type="button" className="kit-sports-advanced-heading" aria-expanded={expanded.includes(group)}
          onClick={()=>toggleSection(group)}>
          <span>{group}</span><MaterialIcon name="expand_more" size={24} className={expanded.includes(group)?'rotate-180':''}/>
        </button>
        {expanded.includes(group)&&<div className="kit-sports-advanced-grid">
          {values.map(v=>{
            const multi=group==='Días de cursada';
            const chosen=multi?days.includes(v):group==='Tipo de deportista'?type===v:intensity===v;
            return <label className="kit-sports-advanced-choice" key={v}>
              <input type={multi?'checkbox':'radio'} name={multi?undefined:group.replaceAll(' ','-')+(mobile?'-mobile':'-desktop')}
                checked={chosen} onChange={()=>{
                  if(multi)setDays(old=>old.includes(v)?old.filter(x=>x!==v):[...old,v]);
                  else if(group==='Tipo de deportista')setType(v);
                  else setIntensity(v);
                }} />
              <span aria-hidden="true" className="kit-sports-advanced-symbol">
                <MaterialIcon size={24} name={multi?chosen?'check_box':'check_box_outline_blank':chosen?'radio_button_checked':'radio_button_unchecked'}/>
              </span><span>{v}</span>
            </label>;
          })}
        </div>}
      </section>)}
  </div>;
  return <div className="kit-sports-filter kit-sports-more" ref={root}>
    <button type="button" ref={trigger} className={`kit-sports-trigger ${open||count?'is-active':''}`}
      aria-expanded={open} aria-haspopup="dialog" onClick={()=>setOpen(v=>!v)}>
      <span className="kit-sports-truncate">Más filtros</span>
      {count>0&&<span className="kit-sports-count"><span>{count}</span></span>}
      <MaterialIcon name="tune" size={24}/>
    </button>
    {open&&!mobile&&<>
      <button type="button" className="kit-sports-backdrop" aria-label="Cerrar Más filtros" onClick={close}/>
      <div className="kit-sports-popover kit-sports-more-popover kit-sports-advanced-popover" role="dialog" aria-label="Más filtros">
        {panel}
        <div className="kit-sports-actions">
          <button className="kit-sports-apply" type="button" onClick={close}>Ver resultados ({count})</button>
          <button className="kit-sports-clear kit-sports-clear-bordered" type="button" onClick={reset}>Limpiar</button>
        </div>
      </div>
    </>}
    {mobile&&open&&<SportsMobileSheet open={open} title="Más filtros" onClose={close}
      size="large" actions="filters" primaryLabel={`Ver resultados (${count})`}
      onPrimary={close} secondaryLabel="Limpiar" onSecondary={reset}>
      {panel}
    </SportsMobileSheet>}
  </div>;
}

function SortDemo() {
  const mobile=useSportsMobile();
  const [open,setOpen]=useState(false);
  const [sort,setSort]=useState('Alfabético: Z a A');
  const trigger=useRef<HTMLButtonElement>(null);
  const options=['Alfabético: A a Z','Alfabético: Z a A','Edad: menor a mayor','Edad: mayor a menor','Próxima clase primero'];
  const close=()=>{setOpen(false);trigger.current?.focus({preventScroll:true});};
  const list=<div className="kit-sports-sort-choices">
    {options.map(option=><button type="button" key={option}
      className={`kit-sports-sort-choice ${option===sort?'is-selected':''}`}
      aria-pressed={option===sort}
      onClick={()=>{setSort(option);close();}}>
      <span>{option}</span>{option===sort&&<MaterialIcon name="check" size={24}/>}
    </button>)}
  </div>;
  return <div className="kit-sports-sort-example">
    <button type="button" ref={trigger} className="kit-sports-sort-trigger" aria-expanded={open}
      onClick={()=>setOpen(v=>!v)}><MaterialIcon name="sort" size={24}/>Ordenar por</button>
    {open&&!mobile&&<div className="kit-sports-sort-popover" role="group" aria-label="Opciones para ordenar">{list}</div>}
    {mobile&&open&&<SportsMobileSheet open={open} title="Ordenar por" onClose={close} actions="sort">{list}</SportsMobileSheet>}
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
      <div className="kit-sports-sort-demo"><SortDemo/></div>
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
