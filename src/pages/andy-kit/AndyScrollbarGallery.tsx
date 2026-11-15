import './andy-scrollbar-gallery.css';

const optionNames=['Natación','Atletismo','Gimnasia artística','Vóley','Básquet','Tenis','Hockey','Fútbol','Patín artístico','Handball','Taekwondo','Yoga','Ajedrez','Danza'];

function ScrollPreview({variant,title}:{variant:'page'|'dropdown'|'hidden';title:string}){
 return <div className="andy-scrollbar-sample">
  <div className={'andy-scrollbar-demo-scroll is-'+variant} tabIndex={0} role="region" aria-label={title+' desplazable'}>
   {optionNames.map((name,i)=><div key={name} className="andy-scrollbar-demo-row">
    <span>{name}</span><span className="andy-scrollbar-demo-index">{String(i+1).padStart(2,'0')}</span>
   </div>)}
  </div>
 </div>;
}
export function AndyScrollbarGallery(){
 return <div className="andy-scrollbar-docs">
  <section className="andy-scrollbar-section">
   <h3>Barra principal · página</h3>
   <p>Se mantiene visible en el borde derecho de la ventana. Su apariencia nativa depende del navegador y del sistema operativo; no se oculta ni se sustituye.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="page" title="Ejemplo de desplazamiento de página"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra interna · dropdown y drawer</h3>
   <p>Variante estándar del UI Kit: <strong>4 px de ancho</strong>, sin flechas, con <strong>8 px de separación</strong> respecto de las opciones y deslizador gris azulado <code>#A9BDCD</code> sobre pista transparente. Se aplica en dropdowns, calendarios y filtros.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="dropdown" title="Ejemplo de opciones de dropdown"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra oculta · navegación lateral</h3>
   <p>La columna izquierda mantiene el desplazamiento mediante rueda, trackpad, gestos táctiles y teclado, pero no muestra una barra de scroll.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="hidden" title="Ejemplo de menú lateral con scroll oculto"/></div>
  </section>
 </div>;
}
