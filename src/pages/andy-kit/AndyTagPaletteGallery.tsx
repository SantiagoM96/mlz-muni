import { useState, type CSSProperties } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import './andy-tag-palette-gallery.css';

type PaletteColor = {
  label:string;
  fill:string;
  foreground:string;
};
const palette:readonly PaletteColor[]=[
  {label:'Default',fill:'#F3F7FC',foreground:'#236999'},
  {label:'Amarillo',fill:'#FFFDE7',foreground:'#F9A825'},
  {label:'Rojo',fill:'#FFF0F0',foreground:'#EF284C'},
  {label:'Verde',fill:'#F1FCF4',foreground:'#2ABB5B'},
  {label:'Azul',fill:'#E5F0FF',foreground:'#006EFF'},
  {label:'Violeta',fill:'#ECDDFF',foreground:'#9747FF'},
];
type Appearance='fill'|'outline';
type Size='chico'|'mediano'|'grande';

function Tag({color,appearance,withIcon,size}:{
  color:PaletteColor;appearance:Appearance;withIcon:boolean;size:Size;
}){
 const vars={'--andy-tag-fill':color.fill,'--andy-tag-tone':color.foreground} as CSSProperties;
 const iconSize=size==='grande'?18:size==='mediano'?16:14;
 return <span className={`andy-palette-tag is-${appearance} is-${size}`} style={vars}
    data-appearance={appearance} data-color={color.label} data-icon={withIcon?'true':'false'}>
   {withIcon&&<MaterialIcon name="info" size={iconSize}/>}
   <span>{color.label}</span>
 </span>;
}

function VariantSection({appearance,size}: {appearance:Appearance;size:Size}){
 return <section className="andy-palette-variant" aria-label={appearance==='fill'?'Fondo suave':'Outline'}>
  <div className="andy-palette-variant-heading">
   <h3>{appearance==='fill'?'Fondo suave':'Outline'}</h3>
   <p>{appearance==='fill'
    ?'Fondo claro del color y texto intenso, sin borde.'
    :'Fondo blanco, trazo del color y texto intenso.'}</p>
  </div>
  <div className="andy-palette-preview">
   <div className="andy-palette-column-labels" aria-hidden="true"><span>Color</span><span>Sin ícono</span><span>Con ícono</span></div>
   {palette.map(color=><div className="andy-palette-row" key={color.label}>
    <div className="andy-palette-name"><span className="andy-palette-dot" style={{background:color.foreground}}/>
      {color.label}</div>
    <div><Tag color={color} size={size} appearance={appearance} withIcon={false}/></div>
    <div><Tag color={color} size={size} appearance={appearance} withIcon/></div>
   </div>)}
  </div>
 </section>;
}

export function AndyTagPaletteGallery({onlyAppearance}:{onlyAppearance?:Appearance}={}){
 const [size,setSize]=useState<Size>('mediano');
 return <div className="andy-tag-palette">
  <div className="andy-palette-sizebar">
   <div><h3>Tamaños</h3><p>Las variantes de Figma se aplican a todos los colores.</p></div>
   <div className="andy-palette-size-options" role="group" aria-label="Tamaño de las etiquetas">
    {(['chico','mediano','grande'] as const).map(option=><button key={option} type="button"
      aria-pressed={size===option} onClick={()=>setSize(option)}>
      {option.charAt(0).toUpperCase()+option.slice(1)}
    </button>)}
   </div>
  </div>
  {(!onlyAppearance||onlyAppearance==='fill')&&<VariantSection appearance="fill" size={size}/>}
  {(!onlyAppearance||onlyAppearance==='outline')&&<VariantSection appearance="outline" size={size}/>}
  <p className="andy-palette-note">Los colores reproducen los seis estilos del componente <strong>Tag</strong> del UI Kit de Figma. El outline utiliza el mismo color intenso en el borde, texto e ícono.</p>
 </div>;
}
