import { PageTitle } from '../../../shared/ui/PageTitle';
import { StoryCard } from '../components/StoryCard';

export function TypographyView() {
  return (
    <>
      <StoryCard title="PageTitle"
        source="src/shared/ui/PageTitle.tsx"
        description="Encabezado h1 institucional compartido por Jóvenes y Agenda. Geometría aprobada: 32px/40px."
        usage={'<PageTitle>Jóvenes en Comunidad</PageTitle>'}>
        <PageTitle>Jóvenes en Comunidad · muestra</PageTitle>
      </StoryCard>

      <StoryCard title="Jerarquía tipográfica"
        source="src/styles/tokens.css"
        description="Pares tipográficos reales de Tailwind CSS v4. El catálogo enseña las medidas existentes, no inventa una nueva escala."
        usage={['<h2 className="text-institutional-section font-bold text-primary-600">Título</h2>', '<p className="text-institutional-body">Texto institucional</p>'].join('\n')}>
        <div className="flex flex-col gap-5">
          <div className="border-b border-divider pb-4">
            <p className="text-[12px] uppercase tracking-wider text-[#61788b]">Sección · 24 / 30 · bold</p>
            <h2 className="mt-2 text-institutional-section font-bold text-primary-600">Información de la comunidad</h2>
          </div>
          <div className="border-b border-divider pb-4">
            <p className="text-[12px] uppercase tracking-wider text-[#61788b]">Cuerpo institucional · 18 / 26</p>
            <p className="mt-2 max-w-[680px] text-institutional-body">
              Conocé las propuestas, actividades y servicios disponibles para la comunidad.
            </p>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-wider text-[#61788b]">Texto auxiliar existente · 14 / 21</p>
            <p className="mt-2 text-[14px] leading-[21px] text-[#718092]">
              Este tamaño todavía no está definido como token semántico transversal.
            </p>
          </div>
        </div>
      </StoryCard>

      <StoryCard title="Familia y peso"
        source="src/styles/globals.css · src/styles/tokens.css"
        description="Geometria y sus variantes actualmente incluidas en la plataforma. Los pesos se comparan con el texto real."
        usage={'<p className="font-bold text-institutional-body">Texto destacado</p>'}>
        <div className="grid gap-4 md:grid-cols-2">
          <p className="text-institutional-body font-normal">Geometria Regular · 400</p>
          <p className="text-institutional-body font-medium">Geometria Medium · 500</p>
          <p className="text-institutional-body font-bold">Geometria Bold · 700</p>
          <p className="text-institutional-body text-primary-600">Texto de acción · Primary 600</p>
        </div>
      </StoryCard>
    </>
  );
}
