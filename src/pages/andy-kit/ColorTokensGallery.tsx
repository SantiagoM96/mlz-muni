import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { figmaColorVariables } from './figma-color-variables';
import './color-tokens-gallery.css';

const groups = [
  { title: 'Natural', key: 'Natural' },
  { title: 'Primario', key: 'Primario' },
  { title: 'Success', key: 'Semantico/Succes' },
  { title: 'Info', key: 'Semantico/Info' },
  { title: 'Alert', key: 'Semantico/Alert' },
  { title: 'Error', key: 'Semantico/Error' },
  { title: 'Marca', key: 'Marca' },
  { title: 'Link', key: 'Link' },
  { title: 'Auxiliares', key: 'Auxiliars' },
  { title: 'Acento', key: 'Acent' },
] as const;

function textColor(hex: string) {
 const r=parseInt(hex.slice(1,3),16)/255;
 const g=parseInt(hex.slice(3,5),16)/255;
 const b=parseInt(hex.slice(5,7),16)/255;
 const linear=[r,g,b].map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
 const luminance=linear[0]*.2126+linear[1]*.7152+linear[2]*.0722;
 return luminance>.38?'#172532':'#ffffff';
}

export function ColorTokensGallery() {
 const [copied,setCopied]=useState<string|null>(null);
 const [expanded,setExpanded]=useState(false);
 const featured=['Natural','Primario','Semantico/Info','Semantico/Succes'];
 const visibleGroups=expanded?groups:groups.filter(group=>featured.some(key=>key===group.key));
 return <div className="andy-color-library" data-testid="andy-figma-color-library">
  <p className="andy-color-library-intro">Escalas cromáticas oficiales del Municipio. Cada fila representa un token de Figma; seleccioná un tono para copiar su código hexadecimal.</p>
  <div className="andy-color-library-preview" id="andy-color-library-grid">
   {visibleGroups.map(group=>{
    const colors=figmaColorVariables.filter(color=>color.name.startsWith(group.key+'/'));
    if(!colors.length)return null;
    return <section className="andy-color-family" key={group.key}>
     <div className="andy-color-family-header"><h3 className="andy-color-family-title">{group.title}</h3><span>{colors.length} tonos</span></div>
     <div className="andy-color-scale">
      {colors.map(color=><button type="button" key={color.name}
       className="andy-color-scale-row"
       style={{backgroundColor:color.hex,color:textColor(color.hex)}}
       onClick={()=>{if(typeof navigator!=='undefined'&&navigator.clipboard?.writeText){void navigator.clipboard.writeText(color.hex).catch(()=>undefined);}setCopied(color.name);}}
       aria-label={`Copiar ${color.hex} de ${color.name}`}
       title={copied===color.name?'HEX copiado':`Copiar ${color.hex}`}>
       <span className="andy-color-scale-name">{color.name.split('/').slice(-1)[0]}</span>
       <span className="andy-color-scale-code">{color.hex.toUpperCase()} {copied===color.name&&<MaterialIcon name="check" size={14}/>}</span>
      </button>)}
     </div>
    </section>;
   })}
  </div>
  <button type="button" className="andy-color-library-expand" aria-expanded={expanded} aria-controls="andy-color-library-grid" onClick={()=>setExpanded(value=>!value)}>
   {expanded?'Ver menos escalas':'Ver todas las escalas'} <MaterialIcon name={expanded?'expand_less':'expand_more'} size={20}/>
  </button>
 </div>;
}
