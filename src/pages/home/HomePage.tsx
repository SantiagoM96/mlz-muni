import { ActionLink } from '../../shared/ui/ActionLink';
import { PageContainer } from '../../shared/layout/PageContainer';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';

export function HomePage() {
  return (
    <PageContainer className="min-h-[50vh] py-12">
      <h1 className="mb-4 text-[32px] font-bold text-primary-600">Municipio de Lomas de Zamora</h1>
      <p className="max-w-[720px] text-[18px] leading-7">La portada general del municipio se incorporará cuando esté disponible su diseño.</p>
      <ActionLink to="/agenda-de-la-comunidad" className="mt-6">
        Ver Agenda de la Comunidad <MaterialIcon name="chevron_right" size={20} className="ml-2" />
      </ActionLink>
    </PageContainer>
  );
}
