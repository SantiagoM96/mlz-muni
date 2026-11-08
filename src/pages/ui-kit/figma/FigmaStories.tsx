import { useState } from 'react';
import { StoryCard } from '../components/StoryCard';
import { MlzFigmaButton, type FigmaButtonSize, type FigmaButtonState, type FigmaButtonType } from './MlzFigmaButton';
import { MlzFigmaField, type FigmaInputState } from './MlzFigmaField';
import { MlzFigmaChoices, type MlzChoiceDirection } from './MlzFigmaChoices';
import { MlzFigmaTag, type FigmaTagColor, type FigmaTagSize } from './MlzFigmaTag';
import { MlzFigmaChip } from './MlzFigmaChip';

const buttonKinds: FigmaButtonType[] = ['primario','secundario','terciario','gost','link'];
const buttonStates: FigmaButtonState[] = ['default','hovered','pressed','active','disabled'];
const inputStates: FigmaInputState[] = ['Default','Hovered','Focus','Completo','Disable','Error'];
const tagColors: FigmaTagColor[] = ['Default','Amarillo','Rojo','Verde','Azul','Violeta'];
const tagSizes: FigmaTagSize[] = ['Chico','Mediano','Grande'];

export function FigmaButtonsStory() {
  const [size,setSize] = useState<FigmaButtonSize>('Standar');
  const [state,setState] = useState<FigmaButtonState>('default');
  const [rightIcon,setRightIcon] = useState(false);
  const [last,setLast] = useState('Sin interacción');
  return <StoryCard title="MLZ - UI KIT · Button/Standar y Button/Chico"
    source="Figma: Button/Standar (86227fc4…) · Button/Chico (db83e62b…)"
    description="Original de Figma: 5 tipos × 5 estados, Standar 48px/18px y Chico 40px/16px; Geometria Bold y radio 4px. Compará después con Button de producción."
    usage={'<MlzFigmaButton kind="primario" size="Standar">Guardar</MlzFigmaButton>'}>
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex flex-col gap-1 text-[14px] font-bold">Tamaño
        <select aria-label="Tamaño de botón Figma" className="min-h-10 rounded border px-3" value={size} onChange={e=>setSize(e.target.value as FigmaButtonSize)}>
          <option>Standar</option><option>Chico</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-[14px] font-bold">Estado visual
        <select aria-label="Estado de botón Figma" className="min-h-10 rounded border px-3" value={state} onChange={e=>setState(e.target.value as FigmaButtonState)}>
          {buttonStates.map(s=><option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" checked={rightIcon} onChange={e=>setRightIcon(e.target.checked)}/>Ícono derecho</label>
    </div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {buttonKinds.map(kind=><div key={kind} className="flex min-h-28 flex-col items-start justify-center gap-2 rounded-lg border border-divider bg-white p-4">
        <span className="text-[12px]">{kind}</span>
        <MlzFigmaButton kind={kind} size={size} figmaState={state} showRightIcon={rightIcon} onClick={()=>setLast(kind)}>Probar {kind}</MlzFigmaButton>
      </div>)}
    </div>
    <p className="mt-3 text-[13px] text-primary-600" role="status">Última interacción: {last}</p>
    <h3 className="mt-6 mb-3 font-bold text-primary-600">Los 5 estados de primario</h3>
    <div className="flex flex-wrap gap-4">{buttonStates.map(s=><div key={s} className="flex flex-col gap-2 text-[12px]">
      <span>{s}</span><MlzFigmaButton size="Chico" figmaState={s}>Ejemplo</MlzFigmaButton>
    </div>)}</div>
  </StoryCard>;
}

export function FigmaFormsStory() {
  const [state,setState] = useState<FigmaInputState>('Default');
  const [showLabel,setShowLabel] = useState(true);
  const [text,setText] = useState('');
  const [selection,setSelection] = useState('');
  const [area,setArea] = useState('');
  const [direction,setDirection] = useState<MlzChoiceDirection>('Horizontal');
  const [radio,setRadio] = useState<string[]>(['Opción 1']);
  const [checks,setChecks] = useState<string[]>(['Opción 1']);
  return <>
    <StoryCard title="MLZ - UI KIT · Input New" source="Figma · Input New · 1ac711ae…"
      description="3 tipos × 6 estados publicados; label 16px Bold, control de 48px, radio 4px y estados Focus, Completo, Disable y Error."
      usage={'<MlzFigmaField id="nombre" label="Nombre" kind="Text field" value={value} onChange={setValue} />'}>
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <label className="flex flex-col gap-1 font-bold text-[14px]">Estado de Figma
          <select aria-label="Estado de Input New Figma" value={state} onChange={e=>setState(e.target.value as FigmaInputState)}
            className="min-h-10 rounded border px-3">{inputStates.map(s=><option key={s}>{s}</option>)}</select>
        </label>
        <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" checked={showLabel} onChange={e=>setShowLabel(e.target.checked)}/>Mostrar label</label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <MlzFigmaField id="figma-nombre" label="Nombre" kind="Text field" value={text} onChange={setText} state={state} showLabel={showLabel}
          placeholder="Escribí un nombre" helpText={state==='Error'?'Campo obligatorio':''}/>
        <MlzFigmaField id="figma-documento" label="Tipo de documento" kind="Dropdownn" value={selection} onChange={setSelection} state={state} showLabel={showLabel}
          options={['Seleccionar','DNI','Pasaporte']} helpText={state==='Error'?'Campo obligatorio':''}/>
        <div className="md:col-span-2">
          <MlzFigmaField id="figma-descripcion" label="Descripción" kind="Text area" value={area} onChange={setArea} state={state} showLabel={showLabel}
            helpText={state==='Error'?'Campo obligatorio':''}/>
        </div>
      </div>
    </StoryCard>
    <StoryCard title="MLZ - UI KIT · Input/ChecBox y Input/RadioButton" source="Figma: Input/ChecBox (7d7991a9…) · Input/RadioButton (3ea32d6d…)"
      description="Dos disposiciones publicadas: Horizontal y Vertical. Controles interactivos con semántica HTML nativa.">
      <label className="mb-5 flex flex-col gap-1 text-[14px] font-bold">Disposición
        <select aria-label="Disposición de opciones Figma" value={direction} onChange={e=>setDirection(e.target.value as MlzChoiceDirection)}
          className="min-h-10 max-w-[220px] rounded border px-3"><option>Horizontal</option><option>Vertical</option></select>
      </label>
      <div className="grid gap-6 md:grid-cols-2">
        <MlzFigmaChoices kind="checkbox" label="Checkbox" options={['Opción 1','Opción 2']} direction={direction} values={checks} onChange={setChecks}/>
        <MlzFigmaChoices kind="radio" label="RadioButton" options={['Opción 1','Opción 2']} direction={direction} values={radio} onChange={setRadio}/>
      </div>
    </StoryCard>
  </>;
}

export function FigmaTagsStory() {
  const [showIcon,setShowIcon]=useState(false);
  const [selected,setSelected]=useState<string[]>(['Cultura']);
  return <>
    <StoryCard title="MLZ - UI KIT · tag" source="Figma · tag · 56c07dce…"
      description="Las 18 variantes originales: tamaños Chico/Mediano/Grande (24/28/30px) × Default, Amarillo, Rojo, Verde, Azul y Violeta."
      usage={'<MlzFigmaTag size="Chico" color="Verde">Disponible</MlzFigmaTag>'}>
      <label className="mb-4 flex items-center gap-2 text-[14px]"><input type="checkbox" checked={showIcon} onChange={e=>setShowIcon(e.target.checked)}/>Mostrar ícono</label>
      <div className="grid gap-6">{tagSizes.map(size=><div key={size}><h3 className="mb-3 font-bold text-[14px]">{size}</h3>
        <div className="flex flex-wrap items-center gap-3">{tagColors.map(color=><MlzFigmaTag key={color} size={size} color={color} showIcon={showIcon}>{color}</MlzFigmaTag>)}</div>
      </div>)}</div>
    </StoryCard>
    <StoryCard title="MLZ - UI KIT · Chip/Fill y Chip/Trazo" source="Figma · Chip/Fill (63e84c5c…) · Chip/Trazo (55b830ce…)"
      description="Estados publicados: default, hovered, pressed, active, selected y disabled; altura 32px.">
      <div className="grid gap-6">{(['fill','trazo'] as const).map(appearance=><div key={appearance}>
        <h3 className="mb-3 font-bold text-[14px]">{appearance==='fill'?'Fill':'Trazo'}</h3>
        <div className="flex flex-wrap gap-3">{['Cultura','Deporte','Ambiente'].map(label=><MlzFigmaChip key={label} label={label} appearance={appearance}
          selected={selected.includes(label)} onClick={()=>setSelected(s=>s.includes(label)?s.filter(x=>x!==label):[...s,label])}/>)}
          <MlzFigmaChip appearance={appearance} label="Deshabilitado" state="disabled"/>
        </div>
      </div>)}</div>
      <p role="status" className="mt-4 text-[13px] text-primary-600">Seleccionados: {selected.join(', ')||'ninguno'}</p>
    </StoryCard>
  </>;
}
