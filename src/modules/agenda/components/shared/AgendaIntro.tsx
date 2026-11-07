import { PageTitle } from '../../../../shared/ui/PageTitle';

/** Introducción editorial compartida por la portada y el listado de Agenda. */
export function AgendaIntro({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <PageTitle>¡Agenda Anual de la Comunidad 2026!</PageTitle>
      <p className="mt-2 text-institutional-body text-grey-900">Encontrá mes a mes todas las actividades culturales, deportivas y ambientales para disfrutar en tu barrio.</p>
    </div>
  );
}
