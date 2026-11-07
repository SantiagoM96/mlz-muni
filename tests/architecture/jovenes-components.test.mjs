import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const src = p => readFileSync(p, 'utf8');

test('Jóvenes usa componentes de composición y no redefine sus implementaciones', () => {
  const page=src('src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx');
  assert.match(page, /import \{ InitiativeSection \}/);
  assert.match(page, /<InitiativeSection/);
  assert.doesNotMatch(page,/function InitiativeSection/);
  assert.doesNotMatch(page,/function LinkedParagraph/);
  const initiative=src('src/modules/jovenes-en-comunidad/components/InitiativeSection.tsx');
  assert.match(initiative,/<EditorialContent/);
  assert.match(initiative,/<Button/);
  assert.match(initiative,/aria-labelledby/);
  const editorial=src('src/modules/jovenes-en-comunidad/components/EditorialContent.tsx');
  assert.match(editorial,/export function EditorialContent/);
});
