import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const file = path => readFileSync(path, 'utf8');

test('PageTitle está implementado y adoptado por Jóvenes y Agenda', () => {
  assert.match(file('src/shared/ui/PageTitle.tsx'), /export function PageTitle/);
  for (const path of [
    'src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx',
    'src/modules/agenda/components/shared/AgendaIntro.tsx',
  ]) {
    assert.match(file(path), /import \{ PageTitle \}/);
    assert.match(file(path), /<PageTitle/);
  }
});
