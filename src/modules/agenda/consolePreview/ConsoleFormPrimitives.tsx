/** Estructura editorial de secciones de consola; controles nativos residen en shared/ui. */
export const labelClass = 'mb-1.5 block text-[16px] font-bold leading-6 text-primary-600';
export const noteClass = 'mt-2 text-[14px] leading-[21px] text-[#718092]';

export function SectionTitle({ number, title, subtitle }: { number: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-institutional-section font-bold text-primary-600">
        {number}. {title}
      </h2>
      {subtitle && <p className="mt-1 text-[16px] leading-6 text-grey-900">{subtitle}</p>}
    </div>
  );
}
