import { useState, type ReactNode } from 'react';

export interface StoryCardProps {
  title: string;
  description: string;
  source: string;
  children: ReactNode;
  usage?: string;
  domain?: 'Compartido' | 'Agenda';
}

/** Ficha de laboratorio: el interior renderiza el componente real, nunca una réplica. */
export function StoryCard({ title, description, source, children, usage, domain = 'Compartido' }: StoryCardProps) {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyExample() {
    if (!usage) return;
    try {
      await navigator.clipboard.writeText(usage);
      setCopyStatus('Código copiado');
    } catch {
      setCopyStatus('No se pudo copiar');
    }
  }
  return (
    <section className="min-w-0 overflow-hidden rounded-[12px] border border-divider bg-white" data-story-card={title}>
      <header className="flex flex-wrap items-start justify-between gap-4 px-5 py-5 md:px-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[21px] font-bold leading-7 text-primary-600">{title}</h2>
            <span className={'rounded-full px-2 py-1 text-[11px] font-bold ' +
              (domain === 'Agenda' ? 'bg-[#fff7dd] text-[#815900]' : 'bg-panel text-primary-600')}>{domain}</span>
          </div>
          <p className="mt-2 text-[14px] leading-6 text-grey-900">{description}</p>
          <code className="mt-2 block break-all text-[12px] text-[#61788b]">{source}</code>
        </div>
      </header>
      <div className="min-w-0 border-y border-divider bg-[#f8fbfd] px-4 py-6 sm:px-6 md:py-8">{children}</div>
      {usage && (
        <details className="px-5 py-4 md:px-6">
          <summary className="cursor-pointer text-[14px] font-bold text-primary-600 focus-visible:outline-2">
            Ver ejemplo de uso
          </summary>
          <div className="mt-4">
            <pre className="max-w-full overflow-x-auto rounded-[6px] bg-[#16324b] p-4 text-[12px] leading-6 text-white"><code>{usage}</code></pre>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button type="button" onClick={copyExample}
                className="min-h-10 rounded-[6px] border border-primary-600 px-3 text-[13px] font-bold text-primary-600 hover:bg-panel">
                Copiar ejemplo
              </button>
              <span role="status" aria-live="polite" className="text-[13px] text-primary-600">{copyStatus}</span>
            </div>
          </div>
        </details>
      )}
    </section>
  );
}
