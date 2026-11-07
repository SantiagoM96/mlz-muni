import { useState } from 'react';
import { InfoCard } from '../../../shared/ui/InfoCard';
import { IconLink } from '../../../shared/ui/IconLink';
import { ActivityCard } from '../../../modules/agenda/components/public/ActivityCard';
import { FeaturedActivityCard } from '../../../modules/agenda/components/public/FeaturedActivityCard';
import { ActivityBadges } from '../../../modules/agenda/components/public/ActivityBadges';
import { AgendaCircuitCard } from '../../../modules/agenda/components/public/AgendaCircuitCard';
import { agendaV2PreviewActivities } from '../../../modules/agenda/data/agenda-v2-previews';
import { featuredActivity } from '../../../modules/agenda/data/agenda-featured';
import { StoryCard } from '../components/StoryCard';
import '../../../modules/agenda/styles/agenda.css';

export function CardsView() {
  const [message, setMessage] = useState('Seleccioná una acción de muestra.');
  const sample = agendaV2PreviewActivities.find(item => item.id === 'preview-v2-compostaje');
  return (
    <>
      <StoryCard title="InfoCard"
        source="src/shared/ui/InfoCard.tsx"
        description="Tarjeta institucional compartida, con título accesible, fondo panel, radio 4px y padding 24px."
        usage={['<InfoCard title="Contacto">', '  <IconLink icon="bookmark" href="#contacto">Consultar</IconLink>', '</InfoCard>'].join('\n')}>
        <div className="max-w-[390px]">
          <InfoCard title="Contacto">
            <p className="text-institutional-body">Encontrá los canales de contacto.</p>
            <IconLink icon="bookmark" href="#contenido-ui-kit">Volver al catálogo</IconLink>
          </InfoCard>
        </div>
      </StoryCard>

      <StoryCard title="ActivityCard"
        domain="Agenda" source="src/modules/agenda/components/public/ActivityCard.tsx"
        description="Tarjeta real de Agenda con ilustración, tipo, chips, fechas y lugar. Conserva sus reglas de negocio dentro del módulo."
        usage={'<ActivityCard activity={activity} onViewDetail={handleDetail} />'}>
        {sample ? (
          <div className="max-w-[390px]">
            <ActivityCard activity={sample} previewDateISO="2026-11-07"
              onViewDetail={() => setMessage('Se seleccionó la ficha: ' + sample.title)} />
            <p className="mt-3 text-[13px] text-primary-600" role="status">{message}</p>
          </div>
        ) : <p>No se encontró el ejemplo de Agenda.</p>}
      </StoryCard>

      <StoryCard title="ActivityBadges"
        domain="Agenda" source="src/modules/agenda/components/public/ActivityBadges.tsx"
        description="Etiquetas propias del dominio Agenda, con pictogramas, colores y densidad según contexto."
        usage={'<ActivityBadges badges={activity.badges} variant="summary" />'}>
        {sample ? (
          <div className="flex flex-col gap-5">
            <div><p className="mb-2 text-[13px]">Variante default</p><ActivityBadges badges={sample.badges} /></div>
            <div><p className="mb-2 text-[13px]">Variante summary</p><ActivityBadges badges={sample.badges} variant="summary" /></div>
          </div>
        ) : null}
      </StoryCard>

      <StoryCard title="FeaturedActivityCard"
        domain="Agenda" source="src/modules/agenda/components/public/FeaturedActivityCard.tsx"
        description="Tarjeta horizontal destacada existente. Su acción navega a la ficha de Agenda."
        usage={'<FeaturedActivityCard activity={featuredActivity} />'}>
        <div className="max-w-[900px]"><FeaturedActivityCard activity={featuredActivity} /></div>
      </StoryCard>

      <StoryCard title="AgendaCircuitCard"
        domain="Agenda" source="src/modules/agenda/components/public/AgendaCircuitCard.tsx"
        description="Tarjeta editorial con imagen y gradiente; sigue siendo propia de Agenda, no una Card genérica."
        usage={'<AgendaCircuitCard circuit={circuit} />'}>
        <div className="max-w-[480px]">
          <AgendaCircuitCard circuit={{
            title: 'Circuito Cultural', description: 'Conocé propuestas culturales del municipio.',
            actionLabel: 'Ir a cartelera',
            image: import.meta.env.BASE_URL + 'assets/agenda/home-theater.jpg',
            variant: 'theater',
          }} />
        </div>
      </StoryCard>
    </>
  );
}
