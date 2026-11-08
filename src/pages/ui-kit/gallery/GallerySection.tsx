import type { ReactNode } from 'react';

/** Agrupa variantes del mismo componente sin convertirlas en tarjetas de ejemplo. */
export function GallerySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-9 border-b border-divider pb-9 last:mb-0 last:border-0 last:pb-0">
      <h2 className="mb-5 text-[19px] font-bold leading-7 text-primary-600">{title}</h2>
      {children}
    </section>
  );
}
