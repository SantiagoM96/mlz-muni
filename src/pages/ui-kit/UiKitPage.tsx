import { useEffect, type ComponentType } from 'react';
import { Link, NavLink, Navigate, useParams } from 'react-router-dom';
import { FormsView } from './views/FormsView';
import { ButtonsView } from './views/ButtonsView';
import { TypographyView } from './views/TypographyView';
import { CardsView } from './views/CardsView';
import { NavigationView } from './views/NavigationView';
import { IconsView } from './views/IconsView';
import { TokensView } from './views/TokensView';
import { FigmaTagsStory } from './figma/FigmaStories';

const categories = [
  { slug: 'formularios', name: 'Formularios', detail: 'Inputs, selects, textarea y checkbox' },
  { slug: 'botones', name: 'Botones y enlaces', detail: 'Acciones, variantes y estados' },
  { slug: 'tipografia', name: 'Tipografía', detail: 'Títulos, textos y jerarquías' },
  { slug: 'tarjetas', name: 'Tarjetas', detail: 'Institucionales y de Agenda' },
  { slug: 'etiquetas', name: 'Etiquetas y chips', detail: 'Variantes publicadas de Figma' },
  { slug: 'navegacion', name: 'Navegación y layout', detail: 'Breadcrumbs, índice y hero' },
  { slug: 'iconos', name: 'Íconos', detail: 'Material Symbols disponibles' },
  { slug: 'tokens', name: 'Tokens', detail: 'Colores, superficies y medidas' },
] as const;
type Category = (typeof categories)[number]['slug'];
const views: Record<Category, ComponentType> = {
  formularios: FormsView,
  botones: ButtonsView,
  tipografia: TypographyView,
  tarjetas: CardsView,
  etiquetas: FigmaTagsStory,
  navegacion: NavigationView,
  iconos: IconsView,
  tokens: TokensView,
};

export function UiKitPage() {
  const { categoria } = useParams<{ categoria?: string }>();
  const active = categories.find(item => item.slug === (categoria ?? 'formularios'));
  useEffect(() => {
    document.title = (active?.name ?? 'Biblioteca UI') + ' | Laboratorio MLZ';
  }, [active?.name]);
  if (!active) return <Navigate to="/ui-kit/formularios" replace />;
  const View = views[active.slug];
  return (
    <div className="min-h-screen bg-[#f5f8fb] text-grey-900" data-testid="ui-kit-page">
      <a href="#contenido-ui-kit" className="skip-link">Saltar al catálogo</a>
      <header className="border-b border-divider bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary-600">
              Gobierno Digital · MLZ
            </p>
            <p className="mt-1 text-[22px] font-bold leading-[28px] text-primary-600">
              Biblioteca UI <span className="font-normal text-grey-900">/ Laboratorio</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d4e2eb] bg-panel px-3 py-1.5 text-[13px] text-primary-600">
              Vista de revisión · sin guardar datos
            </span>
            <Link to="/" className="rounded-[4px] px-3 py-2 font-bold text-primary-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary-600">
              Volver al sitio
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1440px] items-start gap-6 px-4 py-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        <aside className="min-w-0 lg:sticky lg:top-6" aria-label="Categorías del catálogo">
          <div className="rounded-[12px] border border-divider bg-white p-3">
            <p className="mb-2 px-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#61788b]">Componentes</p>
            <nav aria-label="Categorías del UI Kit" className="flex flex-wrap gap-1 lg:flex-col">
              {categories.map(item => (
                <NavLink key={item.slug} to={'/ui-kit/' + item.slug}
                  className={({ isActive }) =>
                    'flex min-h-11 items-center rounded-[6px] px-3 py-2 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-primary-600 ' +
                    (isActive ? 'bg-primary-600 text-white' : 'text-primary-600 hover:bg-panel')}>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <p className="mt-3 px-2 text-[13px] leading-5 text-[#61788b]">
            Cada ejemplo utiliza componentes React existentes del proyecto.
          </p>
        </aside>
        <main id="contenido-ui-kit" tabIndex={-1} className="min-w-0">
          <div className="mb-6">
            <p className="text-[13px] font-medium text-primary-600">Biblioteca UI / {active.name}</p>
            <h1 className="mt-2 text-[32px] font-bold leading-10 text-primary-600">{active.name}</h1>
            <p className="mt-2 max-w-[820px] text-[16px] leading-6 text-grey-900">{active.detail}.
              Probá las variantes y los estados antes de reutilizar los componentes.
            </p>
          </div>
          <div className="flex flex-col gap-6"><View /></div>
          <footer className="mt-10 border-t border-divider pt-5 text-[13px] leading-5 text-[#61788b]">
            Los ajustes deben hacerse sobre el componente fuente y validarse en sus consumidores.
          </footer>
        </main>
      </div>
    </div>
  );
}
