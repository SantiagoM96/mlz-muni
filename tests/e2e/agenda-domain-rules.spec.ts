import { expect, test } from '@playwright/test';
import type { AgendaActivity, AgendaSchedule } from '../../src/features/agenda/model/activity';
import { emptyFilters } from '../../src/features/agenda/model/filterState';
import { argentinaTodayISO } from '../../src/features/agenda/utils/argentinaTodayISO';
import { filterAgendaActivities } from '../../src/features/agenda/utils/filterAgendaActivities';
import { getActivitySchedulePresentations, isAgendaActivityVisible } from '../../src/features/agenda/utils/activitySchedules';

const today = '2026-11-07';

function activity(id: string, dateISO: string, title: string, overrides: Partial<AgendaActivity> = {}): AgendaActivity {
  return {
    id, dateISO, title, category: 'Cultural', type: 'Música', locality: 'Banfield',
    dayLabel: '', timeLabel: '10:00 h', image: '', badges: [], ...overrides,
  };
}

function schedule(id: string, startDate: string): AgendaSchedule {
  return { id, scheduleType: 'exact', startDate, startTime: '10:00', locality: 'Banfield', venue: 'Plaza' };
}

test.describe('Agenda — contratos puros de fecha, filtros y programaciones', () => {
  test('la fecha argentina respeta el cambio de día UTC-3', () => {
    expect(argentinaTodayISO(new Date('2026-11-07T01:30:00.000Z'))).toBe('2026-11-06');
    expect(argentinaTodayISO(new Date('2026-11-07T03:30:00.000Z'))).toBe('2026-11-07');
  });

  test('el filtro utiliza el dataset proporcionado y no modifica la entrada', () => {
    const input = Object.freeze([
      activity('b', '2026-11-08', 'Música'),
      activity('a', today, 'Teatro', { type: 'Teatro' }),
    ]);
    const result = filterAgendaActivities('', emptyFilters(), 'az', today, input);
    expect(result.map(item => item.id)).toEqual(['b', 'a']);
    expect(input.map(item => item.id)).toEqual(['b', 'a']);
    expect(result).not.toBe(input);
  });

  test('la búsqueda es insensible a mayúsculas y tildes', () => {
    const items = [activity('music', today, 'Música en la Plaza'), activity('garden', today, 'Huerta', { type: 'Taller' })];
    expect(filterAgendaActivities('MUSICA', emptyFilters(), 'default', today, items).map(item => item.id))
      .toEqual(['music']);
  });

  test('tipo, categoría y localidad funcionan conjuntamente', () => {
    const items = [
      activity('one', today, 'Función', { category: 'Cultural', type: 'Teatro', locality: 'Lomas de Zamora' }),
      activity('two', today, 'Obra', { category: 'Cultural', type: 'Teatro', locality: 'Banfield' }),
      activity('three', today, 'Torneo', { category: 'Deportiva y recreativa', type: 'Torneo', locality: 'Lomas de Zamora' }),
    ];
    const f = emptyFilters();
    f.type = ['Teatro']; f.category = ['Cultural']; f.locality = ['Lomas de Zamora'];
    expect(filterAgendaActivities('', f, 'default', today, items).map(item => item.id)).toEqual(['one']);
  });

  test('Hoy, Esta semana y Este fin de semana conservan lunes-domingo', () => {
    const items = [
      activity('thursday', '2026-11-05', 'Jueves'),
      activity('saturday', '2026-11-07', 'Sábado'),
      activity('sunday', '2026-11-08', 'Domingo'),
      activity('monday', '2026-11-09', 'Lunes'),
    ];
    const f = emptyFilters();
    f.date = ['Hoy'];
    expect(filterAgendaActivities('', f, 'default', today, items).map(item => item.id)).toEqual(['saturday']);
    f.date = ['Esta semana'];
    expect(filterAgendaActivities('', f, 'az', today, items).map(item => item.id))
      .toEqual(['sunday', 'thursday', 'saturday']);
    f.date = ['Este fin de semana'];
    expect(filterAgendaActivities('', f, 'az', today, items).map(item => item.id))
      .toEqual(['sunday', 'saturday']);
  });

  test('el orden original prioriza previews, luego fechas futuras y finalmente el archivo', () => {
    const items = [
      activity('old', '2026-11-04', 'Archivo'),
      activity('future', '2026-11-08', 'Próxima'),
      activity('preview-v2-first', '2026-11-06', 'Ejemplo'),
      activity('current', today, 'Hoy'),
    ];
    expect(filterAgendaActivities('', emptyFilters(), 'default', today, items).map(item => item.id))
      .toEqual(['preview-v2-first', 'current', 'future', 'old']);
  });

  test('la actividad V2 oculta las programaciones finalizadas y mantiene las importadas', () => {
    const upcoming = activity('v2', '2026-11-01', 'Taller', {
      schedules: [schedule('past', '2026-11-06'), schedule('next', '2026-11-09')],
    });
    const legacy = activity('legacy', '2026-11-01', 'Importada');
    expect(getActivitySchedulePresentations(upcoming, today).map(item => item.id)).toEqual(['next']);
    expect(isAgendaActivityVisible(upcoming, today)).toBe(true);
    expect(isAgendaActivityVisible(activity('ended', '2026-11-01', 'Finalizada', {
      schedules: [schedule('old', '2026-11-06')],
    }), today)).toBe(false);
    expect(isAgendaActivityVisible(legacy, today)).toBe(true);
  });
});
