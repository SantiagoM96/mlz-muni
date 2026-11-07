import './styles/jovenes.css';
import { useEffect } from 'react';
import { Breadcrumbs } from '../../shared/navigation/Breadcrumbs';
import { PageContainer } from '../../shared/layout/PageContainer';
import { PageHero } from '../../shared/layout/PageHero';
import { PageTitle } from '../../shared/ui/PageTitle';
import { TableOfContents } from '../../shared/ui/TableOfContents';
import { InfoCard } from '../../shared/ui/InfoCard';
import { IconLink } from '../../shared/ui/IconLink';
import { initiatives, introduction } from './data/jovenes';
import { instagramUrl } from './data/links';
import { InitiativeSection } from './components/InitiativeSection';

export function JovenesEnComunidadPage() {
  useEffect(() => {
    document.title = 'Jóvenes en Comunidad | Municipio Lomas de Zamora';
  }, []);

  const heroDesktop = import.meta.env.BASE_URL + 'assets/jovenes-hero.jpg';
  const heroMobile = import.meta.env.BASE_URL + 'assets/jovenes-hero-mobile.jpg';

  return (
    <PageContainer className="pb-4 pt-8">
      <PageHero
        desktopSrc={heroDesktop}
        mobileSrc={heroMobile}
        alt="Jóvenes reunidos en una actividad comunitaria de Lomas de Zamora"
      />

      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Gestión' },
          { label: 'Jóvenes en Comunidad' },
        ]}
      />
      <PageTitle className="mb-6">
        Jóvenes en Comunidad
      </PageTitle>

      {/*
        Mobile en Figma: presentación → índice/contacto → iniciativas.
        Desktop: presentación e iniciativas a la izquierda; índice a la derecha.
        Se comparte una única estructura accesible, sin duplicar contenido.
      */}
      <div className="grid items-start gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,778px)_minmax(0,390px)]">
        <section
          aria-label="Presentación de Jóvenes en Comunidad"
          className="article-copy intro-copy min-w-0 lg:col-start-1 lg:row-start-1"
        >
          {introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <aside
          aria-label="Índice y contacto de Jóvenes en Comunidad"
          className="w-full max-w-[390px] min-w-0 space-y-6 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <TableOfContents items={initiatives.map(({ id, title }) => ({ id, label: title }))} ariaLabel="Índice de iniciativas" />

          <InfoCard title="Contacto">
            <IconLink brandIcon="instagram" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              @jovenesencomunidad
            </IconLink>
          </InfoCard>
        </aside>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <h2 data-testid="initiatives-heading" className="mb-6 text-institutional-body font-bold tracking-[0.03em] text-primary-600">
            INICIATIVAS
          </h2>
          <div>
            {initiatives.map((initiative, index) => (
              <InitiativeSection
                key={initiative.id}
                initiative={initiative}
                first={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
