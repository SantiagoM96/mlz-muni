import { useMemo, useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { SportsControlsGallery, SportsSortDemo } from '../ui-kit/SportsControlsGallery';
import './andy-sports-search.css';

const sports = [
 {name:'Natación',venue:'Natatorio Gregorio «Guyo» Sember'},
 {name:'Yoga',venue:'Parque Municipal Eva Perón'},
 {name:'Gimnasia',venue:'Gimnasio de Alto Rendimiento'},
 {name:'Deportes de combate',venue:'Gimnasio de Deportes de Combate'},
 {name:'Fútbol',venue:'Parque Municipal Eva Perón'},
 {name:'Actividades acuáticas',venue:'Natatorio Jorge Omar Rossi'},
];
const normalize=(text:string)=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es-AR').trim();

export function AndySportsSearchExample({integrated=false}:{integrated?:boolean}){
 const [query,setQuery]=useState('');
 const [mapMode,setMapMode]=useState(false);
 const results=useMemo(()=>sports.filter(activity=>normalize(activity.name+' '+activity.venue).includes(normalize(query))),[query]);
 return <div className={'andy-sports-search'+(integrated?' is-integrated':'')}>
  <div className="andy-sports-search-control">
   <input type="search" value={query} onChange={event=>setQuery(event.target.value)}
    placeholder="¿Qué estás buscando?" aria-label="Buscar actividades deportivas"
    aria-controls={integrated?'andy-sports-search-results':'andy-sports-search-simple-results'} />
   <MaterialIcon name="search" size={24}/>
  </div>
  {integrated&&<div className="andy-sports-search-filters"><SportsControlsGallery mode="filters" hideSort/></div>}
  <div className="andy-sports-search-results" id={integrated?'andy-sports-search-results':'andy-sports-search-simple-results'}>
   <div className="andy-sports-search-results-top">
    <strong>Mostrando {results.length} {results.length===1?'actividad':'actividades'}</strong>
    <div className="andy-sports-search-results-tools">
     {query&&<button type="button" onClick={()=>setQuery('')}>Limpiar búsqueda</button>}
     {integrated&&<><button type="button" className={'andy-sports-map-toggle'+(mapMode?' is-active':'')} aria-pressed={mapMode} onClick={()=>setMapMode(v=>!v)}><MaterialIcon name={mapMode?'grid_view':'map'} size={22}/>{mapMode?'Ver lista':'Ver mapa'}</button><SportsSortDemo/></>}
    </div>
   </div>
   {mapMode&&integrated?<div className="andy-sports-map-placeholder" role="status"><MaterialIcon name="map" size={28}/><strong>Vista de mapa</strong><span>En esta demostración no se cargan ubicaciones geográficas. Volvé a «Ver lista» para consultar las actividades filtradas.</span></div>:results.length?<ul>{results.map(activity=><li key={activity.name}><strong>{activity.name}</strong><span>{activity.venue}</span></li>)}</ul>
    :<p role="status">No encontramos actividades. Probá con otros términos.</p>}
  </div>
  {integrated&&<p className="andy-sports-search-note">Demostración con datos de ejemplo. El buscador filtra las actividades de esta lista; los filtros desplegables reproducen la interacción de Deportes Anual y tienen estados propios. El botón «Ver mapa» demuestra el cambio de vista, sin representar ubicaciones reales.</p>}
 </div>;
}
