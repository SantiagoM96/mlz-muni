import { useState } from 'react';
import { MlzFigmaField } from '../figma/MlzFigmaField';
import { MlzFigmaChoices } from '../figma/MlzFigmaChoices';
import {
  MlzFigmaTextFile, MlzFigmaDropdown, MlzFigmaTextArea,
  MlzFigmaCode, MlzFigmaSearch, MlzFigmaDocumentSelect,
  MlzFigmaFileUpload, MlzFigmaTerms,
} from '../figma/MlzFigmaFormFamilies';
import { GallerySection } from './GallerySection';

export function FormsGallery() {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [legacyText, setLegacyText] = useState('');
  const [legacySelect, setLegacySelect] = useState('');
  const [legacyArea, setLegacyArea] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [search, setSearch] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [terms, setTerms] = useState(false);
  const [checks, setChecks] = useState<string[]>(['Opción 1']);
  const [radio, setRadio] = useState<string[]>(['Opción 1']);

  return (
    <>
      <GallerySection title="Input New">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="min-w-0 max-w-[342px]">
            <MlzFigmaField id="kit-new-text" kind="Text field" label="Tipo de documento"
              value={text} onChange={setText} />
          </div>
          <div className="min-w-0 max-w-[342px]">
            <MlzFigmaField id="kit-new-dropdown" kind="Dropdownn" label="Tipo de documento"
              value={selected} onChange={setSelected}
              options={['Seleccionar', 'DNI', 'Pasaporte']} />
          </div>
          <div className="min-w-0 max-w-[342px]">
            <MlzFigmaField id="kit-new-area" kind="Text area" label="Tipo de documento"
              value={description} onChange={setDescription} />
          </div>
        </div>
      </GallerySection>

      <GallerySection title="Input/TextFile">
        <MlzFigmaTextFile id="kit-classic-text" value={legacyText} onChange={setLegacyText} />
      </GallerySection>

      <GallerySection title="Input/Dropdownn">
        <MlzFigmaDropdown id="kit-classic-dropdown" value={legacySelect} onChange={setLegacySelect} />
      </GallerySection>

      <GallerySection title="Input/TextArea">
        <MlzFigmaTextArea id="kit-classic-area" value={legacyArea} onChange={setLegacyArea} />
      </GallerySection>

      <GallerySection title="Input · Contraseña">
        <div className="max-w-[438px]">
          <MlzFigmaField id="kit-password" kind="Text field" label="Contraseña"
            value={password} onChange={setPassword} placeholder="Escribí tu contraseña"
            password showPasswordSecurity />
        </div>
      </GallerySection>

      <GallerySection title="Input/Codigo">
        <MlzFigmaCode value={code} onChange={setCode} />
      </GallerySection>

      <GallerySection title="Input/DocumentoSelect">
        <MlzFigmaDocumentSelect value={documentNumber} onChange={setDocumentNumber} />
      </GallerySection>

      <GallerySection title="SearchInput">
        <MlzFigmaSearch id="kit-search-input" value={search} onChange={setSearch} />
      </GallerySection>

      <GallerySection title="Input/Adjuntar">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-[14px] font-medium text-grey-900">Opcion 1</h3>
            <MlzFigmaFileUpload option={1} />
          </div>
          <div>
            <h3 className="mb-3 text-[14px] font-medium text-grey-900">Opcion 2 Nuevo</h3>
            <MlzFigmaFileUpload option={2} />
          </div>
        </div>
      </GallerySection>

      <GallerySection title="Input/ChecBox">
        <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          <MlzFigmaChoices kind="checkbox" label="Horizontal" direction="Horizontal"
            options={['Opción 1', 'Opción 2']} values={checks} onChange={setChecks} />
          <MlzFigmaChoices kind="checkbox" label="Vertical" direction="Vertical"
            options={['Opción 1', 'Opción 2']} values={checks} onChange={setChecks} />
        </div>
      </GallerySection>

      <GallerySection title="Input/RadioButton">
        <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          <MlzFigmaChoices kind="radio" label="Horizontal" direction="Horizontal"
            options={['Opción 1', 'Opción 2']} values={radio} onChange={setRadio} />
          <MlzFigmaChoices kind="radio" label="Vertical" direction="Vertical"
            options={['Opción 1', 'Opción 2']} values={radio} onChange={setRadio} />
        </div>
      </GallerySection>

      <GallerySection title="Input/T&C">
        <MlzFigmaTerms checked={terms} onChange={setTerms} />
      </GallerySection>
    </>
  );
}
