import type { ReactNode } from 'react';
import './andy-docs-primitives.css';

export const slugify=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

/** Página de documentación: introducción -> secciones -> ejemplo -> criterio. */
export function DocSection({title,description,children,id,note}:{title:string;description?:string;children:ReactNode;id?:string;note?:string}){
 return <section className="andy-doc-section" id={id??slugify(title)}>
  <div className="andy-doc-section-heading"><h3>{title}</h3>{description&&<p>{description}</p>}</div>
  {children}
  {note&&<p className="andy-doc-section-note">{note}</p>}
 </section>;
}
export function DocPreview({children,align='center',className=''}:{children:ReactNode;align?:'center'|'start';className?:string}){
 return <div className={['andy-doc-demo','andy-doc-preview','align-'+align,className].filter(Boolean).join(' ')}>
  <div className="andy-doc-demo-content">{children}</div>
 </div>;
}

/** Tabla semántica compartida para anatomía, criterios y comportamiento.
 *  No se utiliza para advertencias, controles o instrucciones sin pares comparables. */
export function GuidelineTable({rows}:{rows:readonly (readonly [string,string])[]}){
 return <div className="andy-doc-guideline-table-wrap">
  <table className="andy-doc-guideline-table">
   <thead><tr><th scope="col">Elemento</th><th scope="col">Descripción</th></tr></thead>
   <tbody>{rows.map(([name,description])=><tr key={name}><th scope="row">{name}</th><td>{description}</td></tr>)}</tbody>
  </table>
 </div>;
}
