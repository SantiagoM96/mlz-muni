import { Button } from '../../../shared/ui/Button';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import type { Initiative } from '../data/jovenes';
import { EditorialContent } from './EditorialContent';

/** Una iniciativa mantiene su anclaje, encabezado y contenido accesible. */
export function InitiativeSection({ initiative, first }: { initiative: Initiative; first?: boolean }) {
  return (
    <section
      id={initiative.id}
      className={'article-section ' + (first ? '!pt-0' : '')}
      aria-labelledby={'heading-' + initiative.id}
    >
      <h3 id={'heading-' + initiative.id}>{initiative.title}</h3>
      <EditorialContent blocks={initiative.blocks} />
      {initiative.showPointsButton && (
        <div className="mt-6">
          <Button
            disabled
            title="La página de Puntos Jóvenes se incorporará en una etapa posterior"
          >
            Ver Puntos Jóvenes <MaterialIcon name="chevron_right" size={20} />
          </Button>
        </div>
      )}
    </section>
  );
}
