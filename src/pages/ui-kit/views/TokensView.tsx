import { StoryCard } from '../components/StoryCard';

const colors = [
  { name: 'primary-500', value: '#358dc2', bg: 'bg-primary-500' },
  { name: 'primary-600', value: '#236999', bg: 'bg-primary-600' },
  { name: 'primary-700', value: '#19577f', bg: 'bg-primary-700' },
  { name: 'info-500', value: '#006eff', bg: 'bg-info-500' },
  { name: 'success-500', value: '#2abb5b', bg: 'bg-success-500' },
  { name: 'success-600', value: '#208c43', bg: 'bg-success-600' },
  { name: 'grey-900', value: '#3d3d3d', bg: 'bg-grey-900' },
  { name: 'panel', value: '#f3f7fc', bg: 'bg-panel' },
  { name: 'divider', value: '#e1e7eb', bg: 'bg-divider' },
] as const;

export function TokensView() {
  return (
    <>
      <StoryCard title="Paleta institucional"
        source="src/styles/tokens.css"
        description="Swatches generados a partir de las clases Tailwind reales. Los valores son los actualmente definidos en el Design System."
        usage={'<div className="bg-primary-600 text-white">Primario institucional</div>'}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map(item => (
            <li key={item.name} className="overflow-hidden rounded-[8px] border border-divider bg-white">
              <div className={'h-16 w-full ' + item.bg} aria-label={'Muestra de color ' + item.name} />
              <div className="px-4 py-3">
                <p className="font-bold text-primary-600">{item.name}</p>
                <code className="mt-1 text-[13px] text-grey-900">{item.value}</code>
              </div>
            </li>
          ))}
        </ul>
      </StoryCard>

      <StoryCard title="Geometrías utilizadas"
        source="src/shared/ui/FormControls.tsx · src/shared/ui/InfoCard.tsx"
        description="Ejemplos de radios existentes. Todavía no existe una escala semántica única de radios; cada valor conserva un uso justificado.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: '4 px · general', cls: 'rounded-[4px]' },
            { name: '6 px · editor', cls: 'rounded-[6px]' },
            { name: '8 px · tarjeta', cls: 'rounded-[8px]' },
            { name: '12 px · laboratorio', cls: 'rounded-[12px]' },
          ].map(item => (
            <div key={item.name} className={'flex h-24 items-center justify-center border border-[#93bfe0] bg-white px-3 text-center text-[14px] font-bold text-primary-600 ' + item.cls}>
              {item.name}
            </div>
          ))}
        </div>
      </StoryCard>

      <StoryCard title="Tokens tipográficos"
        source="src/styles/tokens.css"
        description="Pares de tamaño e interlineado implementados; comparar en la vista Tipografía.">
        <div className="space-y-4">
          <p className="text-institutional-body">text-institutional-body · 18px / 26px</p>
          <p className="text-institutional-section font-bold text-primary-600">text-institutional-section · 24px / 30px</p>
        </div>
      </StoryCard>
    </>
  );
}
