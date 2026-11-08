import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const src=p=>readFileSync(p,'utf8');

test('conserva las variantes verificadas en la librería Figma', () => {
  const base='src/pages/ui-kit/figma/';
  const [button,field,tag,chip]=['MlzFigmaButton','MlzFigmaField','MlzFigmaTag','MlzFigmaChip']
    .map(name=>src(base+name+'.tsx'));
  for(const kind of ['primario','secundario','terciario','gost','link'])assert.ok(button.includes(kind));
  for(const state of ['default','hovered','pressed','active','disabled'])assert.ok(button.includes(state));
  for(const state of ['Default','Hovered','Focus','Completo','Disable','Error'])assert.ok(field.includes(state));
  for(const color of ['Default','Amarillo','Rojo','Verde','Azul','Violeta'])assert.ok(tag.includes(color));
  for(const type of ['fill','trazo'])assert.ok(chip.includes(type));
});

test('el catálogo no sustituye componentes de producción', () => {
  for(const path of ['src/shared/ui/Button.tsx','src/modules/agenda/pages/AgendaPage.tsx',
    'src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx'])
    assert.ok(!src(path).includes('MlzFigma'),path);
});
