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
   <p>La página utiliza una barra de 6 px, sin flechas ni contorno. Pista Grey 100 (#E7E7E7), deslizador Grey 400 (#888888) y hover Grey 500 (#6D6D6D). Firefox utiliza el ancho nativo thin.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="page" title="Ejemplo de desplazamiento de página"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra interna · dropdown y drawer</h3>
   <p>Los dropdowns, calendarios y paneles utilizan <strong>4 px de ancho</strong> en Chromium/Safari, extremos redondeados y la misma escala Grey 100 / Grey 400 / Grey 500, sin flechas ni borde exterior. La muestra conserva 8 px de resguardo entre contenido y barra. La barra aparece cuando hay contenido desplazable.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="dropdown" title="Ejemplo de desplazamiento interno"/></div>
  </section>
  <section className="andy-scrollbar-section">
   <h3>Barra oculta · navegación lateral</h3>
   <p>Excepción intencional: el menú lateral y el índice conservan el desplazamiento con rueda, trackpad, gestos táctiles y teclado, pero no dibujan la barra.</p>
   <div className="andy-scrollbar-frame"><ScrollPreview variant="hidden" title="Ejemplo de menú lateral con scroll oculto"/></div>
  </section>
 </div>;
}
