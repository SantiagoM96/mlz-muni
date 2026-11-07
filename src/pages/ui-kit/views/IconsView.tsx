import { useState } from 'react';
import { MaterialIcon, type MaterialIconName } from '../../../shared/ui/MaterialIcon';
import { TextField } from '../../../shared/ui/FormControls';
import { StoryCard } from '../components/StoryCard';

const names: readonly MaterialIconName[] = [
  'bookmark', 'chevron_right', 'arrow_forward', 'arrow_back', 'menu', 'close',
  'search', 'calendar_month', 'event_available', 'schedule', 'expand_more',
  'filter_list', 'tune', 'map', 'location_on', 'grid_view', 'sort', 'swap_vert',
  'confirmation_number', 'accessible_forward', 'accessible', 'rainy',
  'comedy_mask', 'check', 'link', 'content_copy', 'add', 'edit', 'delete',
  'groups', 'record_voice_over', 'star', 'info',
];

export function IconsView() {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(24);
  const filtered = names.filter(name => name.toLowerCase().includes(query.toLowerCase().trim()));
  return (
    <>
      <StoryCard title="MaterialIcon"
        source="src/shared/ui/MaterialIcon.tsx"
        description="Fuente local Material Symbols Outlined. El buscador utiliza el TextField real del sistema."
        usage={'<MaterialIcon name="calendar_month" size={24} />'}>
        <div className="mb-5 flex flex-wrap items-end gap-3">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-[14px] font-bold text-primary-600">
            Buscar ícono
            <TextField aria-label="Buscar ícono" appearance="soft" value={query}
              onChange={event => setQuery(event.target.value)} placeholder="Ej.: calendar, arrow" />
          </label>
          <label className="flex flex-col gap-1 text-[14px] font-bold text-primary-600">
            Tamaño
            <select aria-label="Tamaño de íconos" value={size} onChange={event => setSize(Number(event.target.value))}
              className="min-h-12 rounded-[6px] border border-[#93bfe0] bg-white px-3">
              <option value={20}>20 px</option>
              <option value={24}>24 px</option>
              <option value={32}>32 px</option>
            </select>
          </label>
        </div>
        <p className="mb-4 text-[13px] text-[#61788b]">{filtered.length} íconos disponibles</p>
        {filtered.length === 0 ? (
          <p role="status" className="rounded-[6px] bg-white p-4 text-[14px]">Sin resultados para esta búsqueda.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map(name => (
              <li key={name} className="flex min-w-0 flex-col items-center gap-3 rounded-[8px] border border-divider bg-white p-4">
                <MaterialIcon name={name} size={size} />
                <code className="max-w-full break-all text-center text-[12px] text-primary-600">{name}</code>
              </li>
            ))}
          </ul>
        )}
      </StoryCard>
    </>
  );
}
