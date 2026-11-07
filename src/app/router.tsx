import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteLayout } from '../shared/layout/SiteLayout';
import { HomePage } from '../pages/home/HomePage';
import { AgendaPage } from '../modules/agenda/pages/AgendaPage';
import { AgendaHomePage } from '../modules/agenda/pages/AgendaHomePage';
import { AgendaActivityDetailPage } from '../modules/agenda/pages/AgendaActivityDetailPage';
import { JovenesEnComunidadPage } from '../modules/jovenes-en-comunidad/JovenesEnComunidadPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
const router = createBrowserRouter([{
  element: <SiteLayout />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/agenda-de-la-comunidad', element: <AgendaHomePage /> },
    { path: '/agenda-de-la-comunidad/actividades', element: <AgendaPage /> },
    { path: '/agenda-de-la-comunidad/actividades/:id', element: <AgendaActivityDetailPage /> },
    { path: '/jovenes-en-comunidad', element: <JovenesEnComunidadPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
}, {
  path: '/agenda-de-la-comunidad/consola-preview',
  lazy: async () => ({
    Component: (await import('../modules/agenda/pages/AgendaConsolePreviewPage')).AgendaConsolePreviewPage,
  }),
}, {
  // Laboratorio técnico independiente del layout público y cargado solo al visitarlo.
  path: '/ui-kit/:categoria?',
  lazy: async () => ({
    Component: (await import('../pages/ui-kit/UiKitPage')).UiKitPage,
  }),
}], { basename });
export function AppRouter() { return <RouterProvider router={router} />; }
