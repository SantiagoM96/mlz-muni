import { useState } from 'react';
import { MlzFigmaField } from '../figma/MlzFigmaField';
import { MlzFigmaChoices } from '../figma/MlzFigmaChoices';
import { GallerySection } from './GallerySection';

export function FormsGallery() {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [checks, setChecks] = useState<string[]>(['Opción 1']);
  const [radio, setRadio] = useState<string[]>(['Opción 1']);

  return (
    <>
      <GallerySection title="Input New">
        <div className="grid max-w-[860px] gap-x-8 gap-y-7 md:grid-cols-2">
          <MlzFigmaField kind="Text field" id="kit-text-field" label="Text field"
            value={text} onChange={setText} helpText="" placeholder="Placeholder" />
          <MlzFigmaField kind="Dropdownn" id="kit-dropdown" label="Dropdownn"
            value={selected} onChange={setSelected} helpText=""
            options={['Seleccionar', 'Opción 1', 'Opción 2']} />
          <div className="md:col-span-2">
            <MlzFigmaField kind="Text area" id="kit-text-area" label="Text area"
              value={description} onChange={setDescription} helpText="" placeholder="Placeholder" />
          </div>
        </div>
      </GallerySection>
      <GallerySection title="Input/ChecBox · Input/RadioButton">
        <div className="grid max-w-[860px] gap-8 md:grid-cols-2">
          <MlzFigmaChoices kind="checkbox" label="Checkbox" direction="Vertical"
            options={['Opción 1', 'Opción 2']} values={checks} onChange={setChecks} />
          <MlzFigmaChoices kind="radio" label="RadioButton" direction="Vertical"
            options={['Opción 1', 'Opción 2']} values={radio} onChange={setRadio} />
        </div>
      </GallerySection>
    </>
  );
}
