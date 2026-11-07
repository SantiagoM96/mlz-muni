import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const file = path => readFileSync(path, 'utf8');

test('UI Kit se carga solo bajo una ruta propia y es navegable en GitHub Pages', () => {
  const router = file('src/app/router.tsx');
  assert.match(router, /path: '\/ui-kit\/:categoria\?'/);
  assert.match(router, /import\('\.\.\/pages\/ui-kit\/UiKitPage'\)/);
  const pages = file('scripts/prepare-pages.mjs');
  for (const category of ['formularios', 'botones', 'tipografia', 'tarjetas', 'navegacion', 'iconos', 'tokens']) {
    assert.ok(pages.includes("'ui-kit/" + category + "'"), category);
  }
  assert.ok(!file('src/shared/navigation/SiteHeader.tsx').includes('/ui-kit/'));
});

test('laboratorio consume componentes React reales sin duplicar su implementación', () => {
  const forms = file('src/pages/ui-kit/views/FormsView.tsx');
  const buttons = file('src/pages/ui-kit/views/ButtonsView.tsx');
  const cards = file('src/pages/ui-kit/views/CardsView.tsx');
  for (const name of ['FormField', 'TextField', 'SelectControl', 'TextAreaControl', 'CheckboxField']) {
    assert.ok(forms.includes('<' + name), 'No se usa ' + name);
  }
  for (const name of ['Button', 'ActionLink', 'IconLink', 'MaterialIcon']) {
    assert.ok(buttons.includes('<' + name), 'No se usa ' + name);
  }
  for (const name of ['InfoCard', 'ActivityCard', 'ActivityBadges', 'FeaturedActivityCard', 'AgendaCircuitCard']) {
    assert.ok(cards.includes('<' + name), 'No se usa ' + name);
  }
});

test('los controles demostrativos no persistirán datos', () => {
  const source = ['UiKitPage.tsx', 'views/FormsView.tsx', 'views/ButtonsView.tsx']
    .map(path => file('src/pages/ui-kit/' + path)).join('\n');
  assert.ok(!/\bfetch\s*\(/.test(source));
  assert.ok(!/localStorage|sessionStorage|indexedDB/.test(source));
});
