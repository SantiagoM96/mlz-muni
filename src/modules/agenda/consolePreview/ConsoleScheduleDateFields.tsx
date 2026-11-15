import { ConsoleSelectControl as SelectControl } from './ConsoleSelectControl';
import type { RefObject } from 'react';
import type { ConsoleSchedule } from './model';
import type { ConsoleScheduleInvalidField } from './scheduleEditorRules';
import { WEEKDAYS } from './demoData';
import { FormField } from '../../../shared/ui/FormField';
import { TextField } from '../../../shared/ui/FormControls';

const weekdayButtonClassName = 'console-weekday min-h-10 px-1 focus-visible:outline-2 focus-visible:outline-primary-600';

interface Props {
  value: ConsoleSchedule;
  onScheduleChange: (changes: Partial<ConsoleSchedule>) => void;
  selectRef: RefObject<HTMLSelectElement | null>;
  invalidField?: ConsoleScheduleInvalidField;
}

/** Fechas, períodos y recurrencias editables; el estado sigue en el modal. */
export function ConsoleScheduleDateFields({ value, onScheduleChange, selectRef, invalidField }: Props) {
  return (
    <>
          <FormField htmlFor="console-schedule-kind" label="Tipo de fecha">
            <SelectControl appearance="soft" ref={selectRef} id="console-schedule-kind" 
              value={value.scheduleType}
              onChange={event => {
                const scheduleType = event.target.value as ConsoleSchedule['scheduleType'];
                onScheduleChange({ scheduleType,
                  weekdays: scheduleType === 'recurring' ? (value.weekdays.length ? value.weekdays : [6]) : [] });
              }}>
              <option value="exact">Fecha puntual</option>
              <option value="range">Período</option>
              <option value="recurring">Recurrente</option>
            </SelectControl>
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField htmlFor="console-schedule-start" label={value.scheduleType === 'exact' ? 'Fecha' : 'Desde'}>
              <TextField appearance="soft" id="console-schedule-start" aria-invalid={invalidField === 'startDate'}
                aria-describedby={invalidField === 'startDate' ? 'console-schedule-error' : undefined} type="date" lang="es-AR" 
                value={value.startDate} onChange={event => onScheduleChange({ startDate: event.target.value })}/>
            </FormField>
            {value.scheduleType !== 'exact' && (
              <FormField htmlFor="console-schedule-end" label="Hasta">
                <TextField appearance="soft" id="console-schedule-end" aria-invalid={invalidField === 'endDate'}
                aria-describedby={invalidField === 'endDate' ? 'console-schedule-error' : undefined} type="date" lang="es-AR" 
                  value={value.endDate} onChange={event => onScheduleChange({ endDate: event.target.value })}/>
              </FormField>
            )}
          </div>
          {value.scheduleType === 'recurring' && (
            <fieldset id="console-schedule-weekdays"
              tabIndex={invalidField === 'weekdays' ? -1 : undefined}
              aria-invalid={invalidField === 'weekdays'}
              aria-describedby={invalidField === 'weekdays' ? 'console-schedule-error' : undefined}>
              <legend className="mb-2 text-[16px] font-bold text-primary-600">Se repite los días</legend>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {WEEKDAYS.map(day => {
                  const selected = value.weekdays.includes(day.number);
                  return <button key={day.number} type="button" aria-pressed={selected}
                    aria-label={'Todos los ' + day.short}
                    onClick={() => onScheduleChange({ weekdays: selected
                      ? value.weekdays.filter(item => item !== day.number)
                      : [...value.weekdays, day.number].sort((a, b) => a - b) })}
                    className={weekdayButtonClassName}>
                    {day.short}
                  </button>;
                })}
              </div>
            </fieldset>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField htmlFor="console-schedule-start-time" label="Horario de inicio">
              <TextField appearance="soft" id="console-schedule-start-time" aria-invalid={invalidField === 'startTime'}
                aria-describedby={invalidField === 'startTime' ? 'console-schedule-error' : undefined} type="time" lang="es-AR" 
                value={value.startTime} onChange={event => onScheduleChange({ startTime: event.target.value })}/>
            </FormField>
            <FormField htmlFor="console-schedule-end-time" label="Horario de fin (opcional)">
              <TextField appearance="soft" id="console-schedule-end-time" aria-invalid={invalidField === 'endTime'}
                aria-describedby={invalidField === 'endTime' ? 'console-schedule-error' : undefined} type="time" lang="es-AR" 
                value={value.endTime} onChange={event => onScheduleChange({ endTime: event.target.value })}/>
            </FormField>
          </div>
    </>
  );
}
