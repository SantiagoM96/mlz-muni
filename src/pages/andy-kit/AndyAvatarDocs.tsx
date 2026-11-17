import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import {
  Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount,
  type AvatarSize,
} from '../../shared/ui/Avatar';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import './andy-avatar-docs.css';

type AvatarVariant='photo'|'initials'|'icon';
const PHOTO_CAROLINA='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces';
const PHOTO_MARTIN='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces';
const PHOTO_LUCIA='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=faces';
const sizes:{id:AvatarSize;label:string;value:string}[]=[
  {id:'xs',label:'XS',value:'24 px'},
  {id:'sm',label:'SM',value:'32 px'},
  {id:'md',label:'MD',value:'40 px'},
  {id:'lg',label:'LG',value:'48 px'},
  {id:'xl',label:'XL',value:'64 px'},
];

function PersonAvatar({size='md',variant='photo',status=false}:{
 size?:AvatarSize;variant?:AvatarVariant;status?:boolean
}){
  return <Avatar size={size} label={variant==='icon'?'Usuario sin datos':'Carolina Pérez'+(status?', disponible':'')}>
   {variant==='photo'&&<AvatarImage src={PHOTO_CAROLINA} alt=""/>}
   <AvatarFallback>
    {variant==='icon'?<MaterialIcon name="person" size={size==='xs'?16:size==='sm'?18:size==='xl'?32:24} weight={400}/>: 'CP'}
   </AvatarFallback>
   {status&&<AvatarBadge tone="success"/>}
  </Avatar>;
}

function AvatarPlayground(){
 const [variant,setVariant]=useState<AvatarVariant>('photo');
 const [size,setSize]=useState<AvatarSize>('md');
 const [withBadge,setWithBadge]=useState(false);
 const variants:{id:AvatarVariant;label:string}[]=[
  {id:'photo',label:'Fotografía'},{id:'initials',label:'Iniciales'},{id:'icon',label:'Ícono'},
 ];
 return <div className="andy-avatar-playground">
  <div className="andy-avatar-toolbar" role="toolbar" aria-label="Personalizar el avatar">
   <div className="andy-avatar-control-row" role="group" aria-label="Contenido del avatar">
    {variants.map(item=><button type="button" key={item.id} className={'andy-avatar-choice'+(variant===item.id?' is-selected':'')}
     aria-pressed={variant===item.id} onClick={()=>setVariant(item.id)}>{item.label}</button>)}
   </div>
   <div className="andy-avatar-control-row" role="group" aria-label="Tamaño del avatar">
    {sizes.map(item=><button type="button" key={item.id} className={'andy-avatar-choice'+(size===item.id?' is-selected':'')}
     aria-pressed={size===item.id} onClick={()=>setSize(item.id)}>{item.label}</button>)}
   </div>
   <button type="button" className={'andy-avatar-indicator-toggle'+(withBadge?' is-selected':'')}
    aria-pressed={withBadge} onClick={()=>setWithBadge(value=>!value)}
    title={withBadge?'Ocultar indicador de disponibilidad':'Mostrar indicador de disponibilidad'}>
    <MaterialIcon name={withBadge?'check_circle':'radio_button_unchecked'} size={18} weight={400}/>
    <span>Indicador</span>
   </button>
  </div>
  <DocPreview className="andy-avatar-basic-demo">
   <PersonAvatar variant={variant} size={size} status={withBadge}/>
  </DocPreview>
 </div>;
}

function AvatarVariantGallery(){
 return <div className="andy-avatar-variant-grid">
  <div className="andy-avatar-variant-item"><PersonAvatar size="lg"/><strong>Fotografía</strong><span>Identificación con imagen</span></div>
  <div className="andy-avatar-variant-item"><PersonAvatar variant="initials" size="lg"/><strong>Iniciales</strong><span>Sin fotografía disponible</span></div>
  <div className="andy-avatar-variant-item"><PersonAvatar variant="icon" size="lg"/><strong>Ícono genérico</strong><span>Sin identificación personal</span></div>
 </div>;
}

function AvatarSizeGallery(){
 return <div className="andy-avatar-size-grid">
  {sizes.map(item=><div className="andy-avatar-size-item" key={item.id}>
   <PersonAvatar size={item.id} variant="initials"/>
   <strong>{item.label}</strong><span>{item.value}</span>
  </div>)}
 </div>;
}

function AvatarBadgeGallery(){
 return <div className="andy-avatar-variant-grid">
  <div className="andy-avatar-variant-item"><PersonAvatar status size="lg"/><strong>Disponible</strong><span>Indicador Success</span></div>
  <div className="andy-avatar-variant-item"><Avatar label="Carolina Pérez, información disponible" size="lg">
    <AvatarImage src={PHOTO_CAROLINA} alt=""/><AvatarFallback>CP</AvatarFallback><AvatarBadge tone="info"><MaterialIcon name="check" size={13} weight={400}/></AvatarBadge>
   </Avatar><strong>Con ícono</strong><span>Indicador superpuesto</span></div>
  <div className="andy-avatar-variant-item"><Avatar label="Carolina Pérez, sin disponibilidad" size="lg">
    <AvatarFallback>CP</AvatarFallback><AvatarBadge tone="neutral"/>
   </Avatar><strong>Neutro</strong><span>Sin estado positivo</span></div>
 </div>;
}

function AvatarGroupGallery(){
 return <div className="andy-avatar-groups">
  <div className="andy-avatar-group-demo">
   <strong>Grupo de usuarios</strong>
   <AvatarGroup aria-label="Equipo de tres personas">
    <Avatar label="Carolina Pérez"><AvatarImage src={PHOTO_CAROLINA} alt=""/><AvatarFallback>CP</AvatarFallback></Avatar>
    <Avatar label="Martín López"><AvatarImage src={PHOTO_MARTIN} alt=""/><AvatarFallback>ML</AvatarFallback></Avatar>
    <Avatar label="Lucía Gómez"><AvatarImage src={PHOTO_LUCIA} alt=""/><AvatarFallback>LG</AvatarFallback></Avatar>
   </AvatarGroup>
  </div>
  <div className="andy-avatar-group-demo">
   <strong>Grupo con contador</strong>
   <AvatarGroup aria-label="Equipo: Carolina, Martín, Lucía y tres personas más">
    <Avatar label="Carolina Pérez"><AvatarImage src={PHOTO_CAROLINA} alt=""/><AvatarFallback>CP</AvatarFallback></Avatar>
    <Avatar label="Martín López"><AvatarImage src={PHOTO_MARTIN} alt=""/><AvatarFallback>ML</AvatarFallback></Avatar>
    <Avatar label="Lucía Gómez"><AvatarImage src={PHOTO_LUCIA} alt=""/><AvatarFallback>LG</AvatarFallback></Avatar>
    <AvatarGroupCount count={3}/>
   </AvatarGroup>
  </div>
 </div>;
}

function AvatarProfileTrigger(){
 const [open,setOpen]=useState(false);
 return <div className="andy-avatar-profile-demo">
  <button type="button" className="andy-avatar-trigger" aria-expanded={open}
   aria-controls="andy-avatar-profile-details" aria-label="Mostrar datos de Carolina Pérez"
   onClick={()=>setOpen(value=>!value)}><PersonAvatar size="lg"/></button>
  {open&&<div className="andy-avatar-profile-details" id="andy-avatar-profile-details">
   <strong>Carolina Pérez</strong>
   <span>Perfil de demostración</span>
   <button type="button" onClick={()=>setOpen(false)}>Cerrar</button>
  </div>}
 </div>;
}

export function AndyAvatarDocs(){
 return <>
  <DocSection title="Descripción" description="Avatar representa a una persona mediante su imagen, sus iniciales o un ícono alternativo. Puede usarse individualmente, con indicadores o en grupos.">{null}</DocSection>

  <DocSection title="Básico" description="Probá las tres presentaciones, los cinco tamaños y el indicador. Esta muestra es interactiva.">
   <AvatarPlayground/>
  </DocSection>

  <DocSection title="Variantes" description="La fotografía es prioritaria cuando existe; iniciales e ícono actúan como alternativas.">
   <DocPreview><AvatarVariantGallery/></DocPreview>
  </DocSection>

  <DocSection title="Tamaños" description="Escala institucional compacta para listas, encabezados, tarjetas y perfiles.">
   <DocPreview><AvatarSizeGallery/></DocPreview>
  </DocSection>

  <DocSection title="Indicadores" description="Badge superpuesto abajo a la derecha. Utilizarlo únicamente cuando hay información real de estado.">
   <DocPreview><AvatarBadgeGallery/></DocPreview>
  </DocSection>

  <DocSection title="Grupo de avatares" description="La superposición permite representar varios usuarios sin ocupar el ancho de una lista. El contador representa los adicionales.">
   <DocPreview><AvatarGroupGallery/></DocPreview>
  </DocSection>

  <DocSection title="Como disparador" description="Avatar puede formar parte de un botón de perfil. El botón conserva su propia área clickeable y foco visible.">
   <DocPreview><AvatarProfileTrigger/></DocPreview>
  </DocSection>

  <DocSection title="Anatomía" description="Seis piezas reutilizables tomadas como referencia de la composición de shadcn/ui y adaptadas a MLZ.">
   <GuidelineTable rows={[
    ['Avatar','Contenedor circular que define el tamaño, la identidad accesible y la posición de sus elementos.'],
    ['AvatarImage','Imagen recortada con object-fit: cover; aparece al cargar correctamente.'],
    ['AvatarFallback','Iniciales o ícono visible mientras carga la foto o si falta o falla.'],
    ['AvatarBadge','Indicador superpuesto abajo a la derecha, independiente de la imagen.'],
    ['AvatarGroup','Agrupación horizontal con superposición y contornos separadores.'],
    ['AvatarGroupCount','Contador +N de integrantes adicionales, con etiqueta accesible.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Geometría y semántica institucional aplicadas de forma consistente en las distintas variantes.">
   <GuidelineTable rows={[
    ['Tamaños','XS 24 px; SM 32 px; MD 40 px (default); LG 48 px; XL 64 px.'],
    ['Forma','Radio circular 50 % para imagen, fallback y contador.'],
    ['Tipografía','Geometria, peso 700 para iniciales, con tamaños adaptados a la escala.'],
    ['Fondo fallback','Primario 100: #E5F0F9.'],
    ['Color de iniciales e ícono','Primario 600: #236999.'],
    ['Iconografía','Material Symbols Outlined; peso 400; FILL 0.'],
    ['Badge','Indicadores semánticos Success / Info / Neutral; aro blanco de 2 px.'],
    ['Grupos','Superposición de 10 px, borde separador blanco de 2 px, sin achicar las fotografías.'],
    ['Imagen','Recorte centrado y cuadrado; sin deformaciones al cambiar de tamaño.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Avatar es informativo por defecto. El comportamiento de botón y sus estados se incorporan solamente cuando haya una acción real.">
   <GuidelineTable rows={[
    ['Prioridad de contenido','Fotografía válida → iniciales disponibles → ícono genérico.'],
    ['Carga fallida','Mantener el fallback sin alterar el tamaño ni desplazar el diseño.'],
    ['Nombre accesible','Proporcionar label cuando el Avatar identifica a alguien por sí solo; evitar duplicar el nombre que aparece al lado.'],
    ['Indicador','No depender exclusivamente del color para comunicar disponibilidad; complementar con texto o etiqueta accesible.'],
    ['Interactividad','Si abre un perfil o menú, usar un botón real con nombre accesible y área de interacción de al menos 44 × 44 px.'],
    ['Focus','Usar contorno visible Info 500 de 2 px en el botón; no agregar foco a avatares estáticos.'],
    ['Disabled','Aplicar al botón contenedor; no a un Avatar informativo ni a la persona representada.'],
    ['Referencia','Composición de Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup y AvatarGroupCount en shadcn/ui Base UI.'],
   ]}/>
  </DocSection>
 </>;
}
