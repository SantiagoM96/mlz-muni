import './andy-geometry-guides.css';

export const mlzSpacing=[2,4,6,8,10,12,14,16,24,32,40,48,56,64] as const;
export const mlzRadii=[
 {value:0,name:'None',usage:'Separadores y superficies sin redondeo'},
 {value:2,name:'XS',usage:'Elementos de detalle'},
 {value:4,name:'Small',usage:'Inputs, botones, dropdowns'},
 {value:6,name:'Medium',usage:'Chips y etiquetas'},
 {value:8,name:'Large',usage:'Tarjetas y popovers'},
 {value:12,name:'XL',usage:'Paneles destacados'},
 {value:16,name:'2XL',usage:'Drawers móviles y modales'},
 {value:9999,name:'Full',usage:'Píldoras, avatares y tiradores'}
] as const;
export function AndySpacingGuide(){
 return <div className="andy-geometry-guide" data-testid="andy-spacing-guide">
  <p className="andy-geometry-lead">Escala oficial para <strong>padding, margin y gap</strong> de todos los componentes. De 2 a 16 px avanza de 2 en 2; después, de 8 en 8 hasta 64 px.</p>
  <div className="andy-geometry-items">
   {mlzSpacing.map(px=><div className="andy-geometry-spacing-row" key={px}>
    <div className="andy-geometry-measure"><strong>{px} px</strong><code>--mlz-space-{px}</code></div>
    <div className="andy-geometry-track"><span style={{width:(px*3)+'px'}}/></div>
   </div>)}
  </div>
  <p className="andy-geometry-guideline">La barra representa cada valor a una escala visual de 3× (no es una medida real en pantalla). Ejemplos de uso: 4–8 px entre ícono y texto; 8–16 px entre controles; 16–24 px de padding en superficies y 24–32 px entre secciones. Elegir siempre un valor de la escala.</p>
 </div>;
}
export function AndyRadiusGuide(){
 return <div className="andy-geometry-guide" data-testid="andy-radius-guide">
  <p className="andy-geometry-lead">Radios definidos por función: los controles conservan un redondeo moderado, las tarjetas uno mayor y los drawers su forma superior redondeada. No se aplican radios arbitrarios.</p>
  <div className="andy-radius-grid">
   {mlzRadii.map(radius=><div className="andy-radius-tile" key={radius.name}>
    <div className="andy-radius-illustration" aria-hidden="true"><span style={{borderRadius:radius.value+'px'}}/></div>
    <div className="andy-radius-data">
     <strong>{radius.name} <span>· {radius.value===9999?'Full':radius.value+' px'}</span></strong>
     <code>--mlz-radius-{radius.name.toLowerCase()==='2xl'?'2xl':radius.name.toLowerCase()==='small'?'sm':radius.name.toLowerCase()==='medium'?'md':radius.name.toLowerCase()==='large'?'lg':radius.name.toLowerCase()==='none'?'none':radius.name.toLowerCase()==='full'?'full':radius.name.toLowerCase()==='xl'?'xl':'xs'}</code>
     <p>{radius.usage}</p>
    </div>
   </div>)}
  </div>
 </div>;
}
