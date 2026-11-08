import { useState } from 'react';
import { MlzFigmaTag, type FigmaTagColor, type FigmaTagSize } from '../figma/MlzFigmaTag';
import { MlzFigmaChip } from '../figma/MlzFigmaChip';
import { GallerySection } from './GallerySection';

const colors: readonly FigmaTagColor[] = ['Default', 'Amarillo', 'Rojo', 'Verde', 'Azul', 'Violeta'];
const sizes: readonly FigmaTagSize[] = ['Chico', 'Mediano', 'Grande'];

export function TagsGallery() {
  const [selected, setSelected] = useState<string[]>(['Cultura']);
  function toggle(value: string) {
    setSelected(values => values.includes(value) ? values.filter(item => item !== value) : [...values, value]);
  }

  return (
    <>
      <GallerySection title="tag">
        <div className="space-y-6">
          {sizes.map(size => (
            <div key={size}>
              <h3 className="mb-3 text-[14px] font-medium text-grey-900">{size}</h3>
              <div className="flex flex-wrap items-center gap-3">
                {colors.map(color => (
                  <MlzFigmaTag key={color} color={color} size={size}>{color}</MlzFigmaTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GallerySection>
      <GallerySection title="Chip/Fill">
        <div className="flex flex-wrap gap-3">
          {['Cultura', 'Deporte', 'Ambiente'].map(label => (
            <MlzFigmaChip key={label} label={label} appearance="fill"
              selected={selected.includes(label)} onClick={() => toggle(label)} />
          ))}
        </div>
      </GallerySection>
      <GallerySection title="Chip/Trazo">
        <div className="flex flex-wrap gap-3">
          {['Cultura', 'Deporte', 'Ambiente'].map(label => (
            <MlzFigmaChip key={label} label={label} appearance="trazo"
              selected={selected.includes(label)} onClick={() => toggle(label)} />
          ))}
        </div>
      </GallerySection>
    </>
  );
}
