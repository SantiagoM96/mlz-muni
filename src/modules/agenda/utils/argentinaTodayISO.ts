/** Fecha municipal, independiente de la zona horaria del dispositivo visitante. */
export function argentinaTodayISO(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (name: string) => parts.find(part => part.type === name)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

