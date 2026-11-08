import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const src = path => readFileSync(path, 'utf8');

test('se recuperan las familias Figma ausentes de la galería anterior', () => {
  const gallery = src('src/pages/ui-kit/gallery/FormsGallery.tsx');
  for(const source of [
    'Input New', 'Input/TextFile', 'Input/Dropdownn', 'Input/TextArea',
    'Input · Contraseña', 'Input/Codigo', 'Input/DocumentoSelect',
    'SearchInput', 'Input/Adjuntar', 'Input/ChecBox', 'Input/RadioButton', 'Input/T&C',
  ]) assert.ok(gallery.includes('title="' + source + '"'), source);
  for(const component of [
    'MlzFigmaField', 'MlzFigmaTextFile', 'MlzFigmaDropdown', 'MlzFigmaTextArea',
    'MlzFigmaCode', 'MlzFigmaSearch', 'MlzFigmaDocumentSelect',
    'MlzFigmaFileUpload', 'MlzFigmaTerms', 'MlzFigmaChoices',
  ]) assert.ok(gallery.includes('<' + component), component);
});

test('Input New respeta foco, disabled, errores y alturas publicados', () => {
  const field = src('src/pages/ui-kit/figma/MlzFigmaField.tsx');
  for(const value of ['#006eff', '#e5f0f9', '#ef284c', '#ff344f', 'min-h-[123px]', 'h-12'])
    assert.ok(field.includes(value), value);
  const families = src('src/pages/ui-kit/figma/MlzFigmaFormFamilies.tsx');
  for(const value of ['w-[129px]', 'h-14', 'max-w-[216px]', 'max-w-[473px]', 'min-h-[136px]'])
    assert.ok(families.includes(value), value);
});

test('Material Symbols del UI Kit entran al subset, sin modificar módulos municipales', () => {
  const names = src('src/shared/ui/MaterialIcon.tsx');
  for(const icon of ['visibility', 'visibility_off', 'attach_file'])
    assert.ok(names.includes("  | '" + icon + "'"), icon);
  const gallery = src('src/pages/ui-kit/gallery/FormsGallery.tsx');
  assert.ok(!gallery.includes('modules/agenda') && !gallery.includes('modules/jovenes-en-comunidad'));
});
