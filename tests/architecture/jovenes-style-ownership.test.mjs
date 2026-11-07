import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const global = readFileSync(join(root, 'src/styles/globals.css'), 'utf8');
const moduleCss = readFileSync(join(root, 'src/modules/jovenes-en-comunidad/styles/jovenes.css'), 'utf8');
const page = readFileSync(join(root, 'src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx'), 'utf8');

function tsxFiles(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? tsxFiles(path) : path.endsWith('.tsx') ? [path] : [];
  });
}

test('reglas editoriales de Jóvenes son propiedad del módulo', () => {
  for (const marker of ['.article-copy', '.article-section', '.intro-copy']) {
    assert.equal(global.includes(marker), false, 'Regla de Jóvenes filtrada a global: ' + marker);
    assert.ok(moduleCss.includes(marker), 'Regla extraída ausente: ' + marker);
  }
  assert.ok(page.includes("import './styles/jovenes.css';"));
  for (const path of tsxFiles(join(root, 'src'))) {
    if (relative(join(root, 'src/modules/jovenes-en-comunidad'), path).startsWith('..')) {
      const text = readFileSync(path, 'utf8');
      for (const marker of ['article-copy', 'article-section', 'intro-copy']) {
        assert.ok(!text.includes(marker), 'Otro módulo usa regla editorial de Jóvenes: ' + relative(root, path));
      }
    }
  }
});
