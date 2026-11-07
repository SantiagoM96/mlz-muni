import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {
  collectImportSpecifiers,
  resolveSourceImport,
  getBoundaryViolation,
  inspectSourceImports,
} from '../../scripts/architecture/module-imports.mjs';

const srcRoot = path.resolve('/virtual/project/src');
const from = (p) => path.join(srcRoot, p);

test('detecta imports estáticos, type-only, reexports y dinámicos literales', () => {
  const source = [
    "import type { A } from '../models/A';",
    "export { B } from '../other/B';",
    "async function load() { return import('../other/C'); }",
    "type Extra = import('../other/D').Extra;",
  ].join('\n');
  assert.deepEqual(collectImportSpecifiers(source, 'a.ts'), [
    '../models/A', '../other/B', '../other/C', '../other/D',
  ]);
});

test('las importaciones relativas y alias explícitos se resuelven dentro del proyecto', () => {
  const file = from('modules/agenda/pages/AgendaPage.tsx');
  assert.equal(
    resolveSourceImport(file, '../model/activity', srcRoot),
    from('modules/agenda/model/activity'),
  );
  assert.equal(resolveSourceImport(file, '@/modules/agenda/data/agenda', srcRoot), from('modules/agenda/data/agenda'));
  assert.equal(resolveSourceImport(file, 'react', srcRoot), null);
});

test('un módulo puede importar su propio modelo y la UI institucional', () => {
  const file = from('modules/agenda/pages/AgendaPage.tsx');
  assert.equal(getBoundaryViolation(file, from('modules/agenda/model/activity'), srcRoot), null);
  assert.equal(getBoundaryViolation(file, from('components/ui/Button'), srcRoot), null);
});

test('bloquea importaciones cruzadas entre módulos', () => {
  const file = from('modules/agenda/pages/AgendaPage.tsx');
  assert.match(getBoundaryViolation(file, from('modules/jovenes-en-comunidad/data/jovenes'), srcRoot), /otro módulo/);
});

test('bloquea UI institucional acoplada al dominio de Agenda', () => {
  const file = from('components/navigation/Breadcrumbs.tsx');
  assert.match(getBoundaryViolation(file, from('modules/agenda/utils/argentinaTodayISO'), srcRoot), /UI institucional/);
  assert.match(getBoundaryViolation(from('layouts/SiteLayout.tsx'), from('modules/agenda/model/activity'), srcRoot), /UI institucional/);
});

test('app puede componer páginas, no acceder a los fixtures ni utilidades internas', () => {
  const file = from('app/router.tsx');
  assert.equal(getBoundaryViolation(file, from('modules/agenda/pages/AgendaPage'), srcRoot), null);
  assert.equal(getBoundaryViolation(file, from('modules/jovenes-en-comunidad/JovenesEnComunidadPage'), srcRoot), null);
  assert.match(getBoundaryViolation(file, from('modules/agenda/data/agenda'), srcRoot), /solo puede importar páginas/);
});

test('el modelo solo depende de otros archivos del mismo modelo', () => {
  const file = from('modules/agenda/model/filterState.ts');
  assert.equal(getBoundaryViolation(file, from('modules/agenda/model/activity'), srcRoot), null);
  assert.match(getBoundaryViolation(file, from('modules/agenda/data/agenda'), srcRoot), /modelo de dominio/);
  assert.deepEqual(inspectSourceImports(file, "import type { FC } from 'react';", srcRoot), [
    { specifier: 'react', reason: 'El modelo de dominio no puede importar React' },
  ]);
});

test('inspecciona imports dinámicos y detecta cruces no permitidos', () => {
  const file = from('modules/agenda/pages/AgendaPage.tsx');
  assert.equal(inspectSourceImports(file, "const page = import('../../jovenes-en-comunidad/JovenesEnComunidadPage');", srcRoot).length, 1);
  assert.deepEqual(inspectSourceImports(file, "import { Button } from '../../../components/ui/Button';", srcRoot), []);
});
