import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './dropdown-variants-gallery.css';

type Variant = 'simple' | 'radio' | 'checkbox' | 'search';
const options = ['DNI', 'Pasaporte', 'Libreta cívica', 'Libreta de enrolamiento'];
const definitions: {id:Variant; title:string; note:string; label:string}[] = [
  {id:'simple',title:'Selección normal',note:'Una opción, marca de check. Selección única.',label:'Tipo de documento'},
  {id:'radio',title:'Selección con radio button',note:'Una opción, indicador circular visible.',label:'Tipo de deportista'},
  {id:'checkbox',title:'Selección con checkbox',note:'Varias opciones seleccionables.',label:'Días de cursada'},
  {id:'search',title:'Dropdown con buscador',note:'Filtrado de opciones dentro del menú.',label:'Localidad'},
];
const values: Record<Variant,string[]> = {
  simple:options,
  radio:['Recreativo','Competitivo','Federado','No federado'],
  checkbox:['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  search:['Banfield','Lomas de Zamora','Temperley','Turdera','San José','Villa Centenario'],
};
function VariantCard({id,title,note,label}:{id:Variant;title:string;note:string;label:string}){
  const [selected,setSelected]=useState<string[]>(id==='checkbox'?['Lunes','Miércoles']:id==='radio'?['Recreativo']:id==='search'?['Banfield']:['DNI']);
  const [query,setQuery]=useState('');
  const [open,setOpen]=useState(true);
  const shown=values[id].filter(v=>v.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')));
  const multi=id==='checkbox';
  const select=(option:string)=>{
    setSelected(previous=>multi?(previous.includes(option)?previous.filter(v=>v!==option):[...previous,option]):[option]);
  };
  return <article className="andy-dropdown-variant" data-variant={id}>
    <header className="andy-dropdown-variant-heading"><h4>{title}</h4><p>{note}</p></header>
    <div className="andy-dropdown-variant-label">{label}</div>
    <button className={'andy-dropdown-variant-trigger'+(open?' is-open':'')} type="button"
      aria-expanded={open} aria-label={label+'. '+(open?'Cerrar opciones':'Abrir opciones')}
      onClick={()=>setOpen(v=>!v)}>
      <span>{multi?(selected.length?selected.length+' seleccionados':'Seleccionar'):selected[0]||'Seleccionar'}</span>
      <MaterialIcon name="expand_more" size={24}/>
    </button>
    {open?<div className="andy-dropdown-variant-menu">
      {id==='search'&&<div className="andy-dropdown-search">
        <input aria-label="Buscar localidad" placeholder="Buscar localidad" type="search"
          value={query} onChange={event=>setQuery(event.target.value)}/>
        <MaterialIcon name="search" size={20}/>
      </div>}
      <div className="andy-dropdown-variant-options" role="group" aria-label={'Opciones de '+label}>
        {shown.map(option=>{
          const checked=selected.includes(option);
          return <label key={option} className={'andy-dropdown-variant-option'+(checked?' selected':'')}>
            <span>{option}</span>
            {id==='simple'||id==='search'
              ?<><input type="radio" name={'andy-dropdown-'+id} checked={checked}
                onChange={()=>select(option)} aria-label={option}/>
                <span className="andy-dropdown-mark" aria-hidden="true">{checked&&<MaterialIcon name="check" size={20}/>}</span></>
              :<><input type={multi?'checkbox':'radio'} name={multi?undefined:'andy-dropdown-'+id}
                checked={checked} onChange={()=>select(option)} aria-label={option}/>
                <span className={'andy-dropdown-choice '+(multi?'is-check':'is-radio')} aria-hidden="true">
                  {multi?(checked&&<MaterialIcon name="check" size={16}/>):(checked&&<span/>)}
                </span></>}
          </label>;
        })}
        {shown.length===0&&<p className="andy-dropdown-no-results">No se encontraron opciones.</p>}
      </div>
      {multi&&<div className="andy-dropdown-variant-actions">
        <button type="button" onClick={()=>setOpen(false)}>Confirmar ({selected.length})</button>
        <button type="button" onClick={()=>setSelected([])}>Limpiar</button>
      </div>}
    </div>:<button type="button" className="andy-dropdown-open-again" onClick={()=>setOpen(true)}>Mostrar opciones</button>}
  </article>;
}
export function DropdownVariantsGallery(){
  return <div className="andy-dropdown-variants">
    <p className="andy-dropdown-variants-intro">Cuatro variantes con el menú abierto por defecto. Podés cambiar las opciones, filtrar, seleccionar varias y cerrar o volver a abrir cada dropdown. Estos ejemplos no modifican inscripciones reales.</p>
    <div className="andy-dropdown-variants-grid">{definitions.map(d=><VariantCard key={d.id} {...d}/>)}</div>
  </div>;
}
