import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import { MlzFigmaTag } from './MlzFigmaTag';

export interface MlzFigmaJovenCardProps {
  category?: string;
  title?: string;
  day?: string;
  hours?: string;
  age?: string;
  place?: string;
  location?: string;
  showWaitlist?: boolean;
  onViewMore?: () => void;
}

/** Referencia funcional de joven_card / Opcion 2 del MLZ UI KIT, sin imágenes ajenas al diseño. */
export function MlzFigmaJovenCard({
  category = 'Artes Visuales',
  title = 'Dibujo y artes plásticas',
  day = 'Lunes',
  hours = '16:00h a 19:00h',
  age = 'Todas las edades',
  place = 'Centro Cultural El Ceibo',
  location = 'Lomas de Zamora',
  showWaitlist = false,
  onViewMore,
}: MlzFigmaJovenCardProps) {
  return (
    <article className="flex min-h-[297px] w-full max-w-[352px] flex-col justify-between rounded-[8px] border border-[#e7e7e7] bg-white py-4">
      <div className="flex flex-col gap-3 px-[17px]">
        <p className="text-[14px] font-medium leading-5 text-[#888888]">{category}</p>
        <h3 className="text-[22px] font-bold leading-7 text-[#236999]">{title}</h3>
        {showWaitlist && <div><MlzFigmaTag color="Rojo" size="Chico">Lista de espera</MlzFigmaTag></div>}
        <dl className="grid gap-3 text-[16px] leading-5 text-[#3d3d3d]">
          <div className="flex items-start gap-2">
            <MaterialIcon name="calendar_month" size={18}/><dt className="sr-only">Día</dt><dd>{day}</dd>
          </div>
          <div className="flex items-start gap-2">
            <MaterialIcon name="schedule" size={18}/><dt className="sr-only">Horario</dt><dd>{hours}</dd>
          </div>
          <div className="flex items-start gap-2 text-[#888888]">
            <MaterialIcon name="groups" size={18}/><dt className="sr-only">Edades</dt><dd>{age}</dd>
          </div>
          <div className="flex items-start gap-2">
            <MaterialIcon name="location_on" size={18}/><dt className="sr-only">Lugar</dt>
            <dd>{place} - {location}</dd>
          </div>
        </dl>
      </div>
      <button type="button" onClick={onViewMore}
        className="mt-4 inline-flex min-h-8 items-center gap-1.5 self-start px-[17px] text-[16px] font-medium text-[#236999] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#236999]">
        Ver mas <MaterialIcon name="chevron_right" size={18}/>
      </button>
    </article>
  );
}
