import type { ConsoleSchedule } from './model';
import { FormField } from '../../../shared/ui/FormField';
import { TextField, SelectControl, TextAreaControl } from '../../../shared/ui/FormControls';
import { CheckboxField } from '../../../shared/ui/CheckboxField';

interface Props {
  value: ConsoleSchedule;
  onScheduleChange: (changes: Partial<ConsoleSchedule>) => void;
}

/** Opciones propias del encuentro; edición controlada por el diálogo. */
export function ConsoleScheduleAdditionalFields({ value, onScheduleChange }: Props) {
  return (
    <>
          <CheckboxField density="comfortable" checked={value.suspendedByRain}
            onChange={event => onScheduleChange({ suspendedByRain: event.target.checked })}>
            Se suspende por lluvia
          </CheckboxField>
          <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
            <FormField htmlFor="console-schedule-participants-type" label="Participantes (tipo)">
              <SelectControl appearance="soft" id="console-schedule-participants-type" 
                value={value.participantsType} onChange={event =>
                  onScheduleChange({ participantsType: event.target.value as ConsoleSchedule['participantsType'] })}>
                <option value="artists">Artistas</option>
                <option value="speakers">Oradores</option>
                <option value="participants">Otros participantes</option>
              </SelectControl>
            </FormField>
            <FormField htmlFor="console-schedule-participants" label="Artistas, oradores o participantes (opcional)">
              <TextAreaControl appearance="soft" id="console-schedule-participants" rows={2} className="resize-y"
                placeholder="Ej.: Andrea Gauna, Lautaro Rotela"
                value={value.participants} onChange={event => onScheduleChange({ participants: event.target.value })}/>
            </FormField>
          </div>
          <FormField htmlFor="console-schedule-detail" label="Detalle de esta programación (opcional)">
            <TextAreaControl appearance="soft" id="console-schedule-detail" rows={3} className="resize-y"
              placeholder="Información específica de esta fecha, si corresponde"
              value={value.detail} onChange={event => onScheduleChange({ detail: event.target.value })}/>
          </FormField>
    </>
  );
}
