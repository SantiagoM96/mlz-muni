import { Breadcrumbs } from '../../../shared/navigation/Breadcrumbs';
import { TableOfContents } from '../../../shared/ui/TableOfContents';
import { PageHero } from '../../../shared/layout/PageHero';
import { StoryCard } from '../components/StoryCard';

export function NavigationView() {
  return (
    <>
      <StoryCard title="Breadcrumbs"
        source="src/shared/navigation/Breadcrumbs.tsx"
        description="Rutas de navegación institucionales. En mobile conserva el nivel relevante y el foco de los enlaces."
        usage={['<Breadcrumbs items={[', '  { label: "Inicio", to: "/" },', '  { label: "Gestión" },', '  { label: "Página actual" },', ']} />'].join('\n')}>
        <Breadcrumbs items={[
          { label: 'Inicio', to: '/' },
          { label: 'Gestión' },
          { label: 'Biblioteca de componentes' },
        ]} />
      </StoryCard>

      <StoryCard title="TableOfContents"
        source="src/shared/ui/TableOfContents.tsx"
        description="Navegación por anclas con InfoCard e IconLink; se usa en Jóvenes en Comunidad."
        usage={'<TableOfContents title="Índice" items={[{ id: "kit-destino", label: "Ejemplo" }]} />'}>
        <div className="max-w-[390px]">
          <TableOfContents title="Índice de ejemplo" ariaLabel="Índice de esta demostración"
            items={[
              { id: 'kit-destino-uno', label: 'Contenido principal' },
              { id: 'kit-destino-dos', label: 'Más información' },
            ]} />
        </div>
        <div className="mt-5 space-y-2 text-[14px]">
          <p id="kit-destino-uno" tabIndex={-1} className="scroll-mt-6 font-bold text-primary-600">
            Contenido principal
          </p>
          <p id="kit-destino-dos" tabIndex={-1} className="scroll-mt-6">Más información</p>
        </div>
      </StoryCard>

      <StoryCard title="PageHero"
        source="src/shared/layout/PageHero.tsx"
        description="Imagen institucional responsive en un picture real, con fuente mobile propia y esquinas redondeadas."
        usage={['<PageHero', '  desktopSrc={desktopImage}', '  mobileSrc={mobileImage}', '  alt="Jóvenes en una actividad comunitaria"', '/>'].join('\n')}>
        <div className="max-w-[960px]">
          <PageHero
            desktopSrc={import.meta.env.BASE_URL + 'assets/jovenes-hero.jpg'}
            mobileSrc={import.meta.env.BASE_URL + 'assets/jovenes-hero-mobile.jpg'}
            alt="Jóvenes reunidos en una actividad comunitaria de Lomas de Zamora" />
        </div>
      </StoryCard>
    </>
  );
}
