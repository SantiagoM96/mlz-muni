import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const src = p => readFileSync(p,'utf8');

test('componentes de Figma se implementan como React reales sin reemplazar producción', () => {
  const stories=src('src/pages/ui-kit/figma/FigmaStories.tsx');
  for(const component of ['MlzFigmaButton','MlzFigmaField','MlzFigmaTag','MlzFigmaChip','MlzFigmaChoices']) {
    assert.ok(stories.includes('<'+component),component+' no tiene consumidor');
  }
  for(const p of ['src/pages/ui-kit/views/ButtonsView.tsx','src/pages/ui-kit/views/FormsView.tsx']) {
    assert.match(src(p),/Figma.+Story/);
  }
  assert.ok(!src('src/shared/ui/Button.tsx').includes('MlzFigmaButton'));
  assert.ok(!src('src/modules/agenda/pages/AgendaPage.tsx').includes('MlzFigmaButton'));
  assert.ok(src('src/pages/ui-kit/views/CardsView.tsx').includes('<MlzFigmaJovenCard'));
  assert.ok(src('src/pages/ui-kit/figma/MlzFigmaJovenCard.tsx').includes('export function MlzFigmaJovenCard'));
});

test('Figma UI KIT tiene entrada directa en Pages y rutas de catálogo', () => {
  assert.ok(src('src/app/router.tsx').includes("path: '/ui-kit/:categoria?'"));
  assert.ok(src('scripts/prepare-pages.mjs').includes("'ui-kit/etiquetas'"));
  assert.ok(src('src/pages/ui-kit/UiKitPage.tsx').includes("etiquetas: FigmaTagsStory"));
});

test('la matriz de variantes Figma está expresada en código real', () => {
  const button=src('src/pages/ui-kit/figma/MlzFigmaButton.tsx');
  const field=src('src/pages/ui-kit/figma/MlzFigmaField.tsx');
  const tag=src('src/pages/ui-kit/figma/MlzFigmaTag.tsx');
  for(const type of ['primario','secundario','terciario','gost','link']) assert.ok(button.includes(type));
  for(const state of ['default','hovered','pressed','active','disabled']) assert.ok(button.includes(state));
  for(const state of ['Default','Hovered','Focus','Completo','Disable','Error']) assert.ok(field.includes(state));
  for(const color of ['Default','Amarillo','Rojo','Verde','Azul','Violeta']) assert.ok(tag.includes(color));
});
