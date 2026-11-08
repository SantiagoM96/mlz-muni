import { useEffect, type ComponentType } from 'react';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import { FormsGallery } from './gallery/FormsGallery';
import { ButtonsGallery } from './gallery/ButtonsGallery';
import { TagsGallery } from './gallery/TagsGallery';
import { CardsGallery } from './gallery/CardsGallery';

const categories = [
  { slug: 'formularios', label: 'Formularios' },
  { slug: 'botones', label: 'Botones' },
  { slug: 'etiquetas', label: 'Etiquetas y chips' },
  { slug: 'tarjetas', label: 'Tarjetas' },
] as const;

type Category = (typeof categories)[number]['slug'];

const galleries: Record<Category, ComponentType> = {
  formularios: FormsGallery,
  botones: ButtonsGallery,
  etiquetas: TagsGallery,
  tarjetas: CardsGallery,
};

/** Catálogo visual de la biblioteca Figma MLZ - UI KIT. Agenda se revisará por separado. */
export function UiKitPage() {
  const { categoria } = useParams<{ categoria?: string }>();
  const active = categories.find(item => item.slug === (categoria ?? 'formularios'));

  useEffect(() => {
    document.title = 'MLZ UI Kit · ' + (active?.label ?? 'Componentes');
  }, [active?.label]);

  if (!active) return <Navigate to="/ui-kit/formularios" replace />;

  const Gallery = galleries[active.slug];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-grey-900" data-testid="ui-kit-page">
      <a className="skip-link" href="#componentes">Ir a los componentes</a>
      <header className="border-b border-divider bg-white">
        <div className="mx-auto max-w-[1200px] px-4 pt-7 sm:px-6 lg:px-8">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary-600">Municipio de Lomas de Zamora</p>
          <p className="mt-1 text-[24px] font-bold leading-[30px] text-primary-600">MLZ UI Kit</p>
          <nav aria-label="Categorías del UI Kit" className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {categories.map(item => (
              <NavLink key={item.slug} to={'/ui-kit/' + item.slug}
                className={({ isActive }) =>
                  'inline-flex min-h-11 items-center border-b-[3px] px-1 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-primary-600 ' +
                  (isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-grey-900 hover:text-primary-600')
                }>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="componentes" tabIndex={-1} className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-[30px] font-bold leading-[38px] text-primary-600">{active.label}</h1>
        <Gallery />
      </main>
    </div>
  );
}
