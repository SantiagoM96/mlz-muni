import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
const src=p=>readFileSync(p,'utf8');
const root='src/pages/ui-kit/';

test('solo cuatro galerías UI Kit derivadas de Figma', () => {
  const page=src(root+'UiKitPage.tsx');
  for(const slug of ['formularios','botones','etiquetas','tarjetas'])
    assert.ok(page.includes("slug: '"+slug+"'"),slug);
  for(const old of ['tipografia','navegacion','iconos','tokens'])
    assert.ok(!page.includes("slug: '"+old+"'"),old);
  assert.ok(src('scripts/prepare-pages.mjs').includes("'ui-kit/formularios'"));
  assert.ok(src('src/app/router.tsx').includes("path: '/ui-kit/:categoria?'"));
  assert.ok(!src('src/shared/navigation/SiteHeader.tsx').includes('/ui-kit/'));
});

test('elimina StoryCard y las siete vistas heredadas del catálogo', () => {
  assert.ok(!existsSync(root+'components/StoryCard.tsx'));
  assert.ok(!existsSync(root+'figma/FigmaStories.tsx'));
  for(const view of ['ButtonsView','CardsView','FormsView','IconsView','NavigationView','TokensView','TypographyView'])
    assert.ok(!existsSync(root+'views/'+view+'.tsx'),view);
});

test('galerías usan componentes MLZ Figma y no importan Agenda', () => {
  const parts={FormsGallery:['MlzFigmaField','MlzFigmaChoices'],
    ButtonsGallery:['MlzFigmaButton'],TagsGallery:['MlzFigmaTag','MlzFigmaChip'],
    CardsGallery:['MlzFigmaJovenCard']};
  for(const [name,components] of Object.entries(parts)) {
    const code=src(root+'gallery/'+name+'.tsx');
    for(const component of components) assert.ok(code.includes('<'+component),name+' falta '+component);
    assert.ok(!code.includes('modules/agenda')&&!code.includes('modules/jovenes-en-comunidad'),name);
  }
});
