import './andy-scrollbar-gallery.css';

function ScrollPreview({variant,title}:{variant:'page'|'dropdown'|'hidden';title:string}){
 return <div className="andy-scrollbar-sample">
  <div className={'andy-scrollbar-demo-scroll is-'+variant} tabIndex={0} role="region" aria-label={title+' desplazable'}>
   {Array.from({length:14},(_,i)=><div key={i} className="andy-scrollbar-demo-row" aria-hidden="true">
    <span className="andy-scrollbar-demo-placeholder"/>
    <span className="andy-scrollbar-demo-index-placeholder"/>
   </div>)}
  </div>
 </div>;
}
export function AndyScrollbarGallery(){
 return <div className="andy-scrollbar-docs">
  <section className="andy-scrollbar-section">
   <h3>Barra principal · página</h3>
   <p>Se muestra en el borde derecho del documento: 6 px en Chromium y Safari, thumb #C4D2DC, hover #91AAB9 y pista transparente. Firefox utiliza el equivalente thin.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="page" title="Ejemplo de desplazamiento de página"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra interna · dropdown y drawer</h3>
   <p>Variante interna para dropdowns y paneles: <strong>4 px de ancho</strong>, sin flechas, con <strong>8 px de resguardo</strong> respecto del contenido y thumb <code>#A9BDCD</code> sobre pista transparente. Se aplica cuando el contenido excede la altura disponible.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="dropdown" title="Ejemplo de desplazamiento interno"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra oculta · navegación lateral</h3>
   <p>La columna izquierda mantiene el desplazamiento mediante rueda, trackpad, gestos táctiles y teclado, pero no muestra una barra de scroll.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="hidden" title="Ejemplo de menú lateral con scroll oculto"/></div>
  </section>
 </div>;
}
