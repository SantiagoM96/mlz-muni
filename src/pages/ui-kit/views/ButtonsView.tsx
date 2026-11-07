import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import { ActionLink } from '../../../shared/ui/ActionLink';
import { IconLink } from '../../../shared/ui/IconLink';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import { StoryCard } from '../components/StoryCard';

export function ButtonsView() {
  const [disabled, setDisabled] = useState(false);
  const [lastClick, setLastClick] = useState('Ninguna acción');
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-[12px] border border-[#c5dce9] bg-[#eaf3f9] p-4">
        <label className="flex items-center gap-2 text-[14px] font-medium">
          <input type="checkbox" checked={disabled} onChange={event => setDisabled(event.target.checked)} />
          Deshabilitar acciones
        </label>
        <p className="text-[14px]" role="status">Última interacción: <strong>{lastClick}</strong></p>
      </div>

      <StoryCard title="Button"
        source="src/shared/ui/Button.tsx"
        description="Botón nativo: variantes primary, secondary y success. Probá click, teclado, disabled y foco."
        usage={['<Button variant="primary" onClick={onSave}>', '  Guardar cambios', '</Button>'].join('\n')}>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled={disabled} onClick={() => setLastClick('Primario')}>Primario</Button>
          <Button variant="secondary" disabled={disabled} onClick={() => setLastClick('Secundario')}>Secundario</Button>
          <Button variant="success" disabled={disabled} onClick={() => setLastClick('Éxito')}>Confirmar</Button>
          <Button disabled title="Acción no disponible">Deshabilitado</Button>
        </div>
      </StoryCard>

      <StoryCard title="Button + MaterialIcon"
        source="src/shared/ui/Button.tsx · src/shared/ui/MaterialIcon.tsx"
        description="Composición de componentes reales; los íconos decorativos no duplican el nombre accesible."
        usage={['<Button onClick={onAdd}>', '  <MaterialIcon name="add" size={20} /> Agregar', '</Button>'].join('\n')}>
        <div className="flex flex-wrap gap-3">
          <Button disabled={disabled} onClick={() => setLastClick('Agregar')}>
            <MaterialIcon name="add" size={20} /> Agregar
          </Button>
          <Button variant="secondary" disabled={disabled} onClick={() => setLastClick('Volver')}>
            <MaterialIcon name="arrow_back" size={20} /> Volver
          </Button>
        </div>
      </StoryCard>

      <StoryCard title="ActionLink"
        source="src/shared/ui/ActionLink.tsx"
        description="Enlaces de navegación reales, compact y wide. Al hacer click navegan a pantallas existentes."
        usage={['<ActionLink to="/agenda-de-la-comunidad">Abrir Agenda</ActionLink>', '<ActionLink appearance="wide" to="/agenda-de-la-comunidad/actividades">', '  Ver actividades', '</ActionLink>'].join('\n')}>
        <div className="flex flex-col gap-4">
          <div><ActionLink to="/agenda-de-la-comunidad">Abrir Agenda</ActionLink></div>
          <div className="max-w-[420px]">
            <ActionLink to="/agenda-de-la-comunidad/actividades" appearance="wide">
              Ver actividades <MaterialIcon name="arrow_forward" size={22} />
            </ActionLink>
          </div>
        </div>
      </StoryCard>

      <StoryCard title="IconLink"
        source="src/shared/ui/IconLink.tsx"
        description="Enlaces de texto con pictograma, color institucional y estado de foco."
        usage={'<IconLink icon="bookmark" href="#contenido-ui-kit">Volver al catálogo</IconLink>'}>
        <div className="flex flex-wrap items-start gap-6">
          <IconLink icon="bookmark" href="#contenido-ui-kit">Volver al catálogo</IconLink>
          <IconLink icon="arrow_forward" href="#contenido-ui-kit">Explorar componentes</IconLink>
        </div>
      </StoryCard>
    </>
  );
}
