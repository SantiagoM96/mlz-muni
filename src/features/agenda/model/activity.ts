export type ActivityCategory = string;
export type FilterGroup = 'type' | 'category' | 'locality' | 'date';

export type AgendaScheduleType = 'exact' | 'range' | 'recurring';

/** Una programación corresponde a un horario y sede, no a cada ocurrencia semanal. */
export interface AgendaSchedule {
  id: string;
  scheduleType: AgendaScheduleType;
  startDate: string; // ISO YYYY-MM-DD
  endDate?: string | null;
  /** ISO weekday: lunes=1 ... domingo=7. */
  weekdays?: readonly number[] | null;
  startTime: string; // HH:mm
  endTime?: string | null;
  locality: string;
  venue: string;
  address?: string;
  detail?: string;
  /** El detalle contiene nombres de artistas, no una nota genérica. */
  detailType?: 'artists';
  /** Participantes identificados para esta fecha; independientes del detalle editorial. */
  participants?: string;
  participantsType?: 'artists' | 'speakers' | 'participants';
  /** Condición de lluvia de esta programación; puede diferir entre sedes. */
  suspendedByRain?: boolean;
}

export type AgendaRegistrationMode = 'none' | 'online' | 'in-person';

export interface AgendaActivity {
  id: string;
  title: string;
  category: ActivityCategory;
  type: string;
  locality: string;
  dayLabel: string;
  timeLabel: string;
  image: string;
  badges: { kind: 'rain' | 'accessible' | 'registration' | 'featured'; label: string }[];
  dateISO?: string;
  venue?: string;
  address?: string;
  description?: string;
  /** Marca el copy editorial creado para la maqueta, no validado por el equipo. */
  descriptionIsIllustrative?: boolean;
  source?: string;
  /** URL externa de inscripción asignada de forma explícita a esta actividad. */
  registrationUrl?: string;
  /** Datos de Agenda V2; la ausencia conserva la representación de registros importados. */
  schedules?: readonly AgendaSchedule[];
  registrationMode?: AgendaRegistrationMode;
  registrationInformation?: string;
}
