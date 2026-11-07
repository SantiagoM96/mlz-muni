import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');

test('CSS institucional no conoce las clases ni animaciones de Agenda', () => {
  const global = read('src/styles/globals.css');
  assert.doesNotMatch(global, /(?:\\.agenda-|--agenda-|@keyframes agenda-)/);
  assert.match(global, /html \{ scrollbar-gutter: stable; \}/);
});

test('Agenda conserva contratos de CSS táctil y motion', () => {
  const css = read('src/modules/agenda/styles/agenda.css');
  for (const snippet of [
    '@media (max-width: 680px)',
    '--agenda-motion-sheet: 230ms',
    '@keyframes agenda-sheet-in',
    '.agenda-mobile-sheet.agenda-sheet-dragging',
    '.agenda-mobile-sheet.agenda-sheet-stretch-rebounding',
    '.agenda-mobile-sheet.agenda-sheet-exit',
    '@media (prefers-reduced-motion: reduce)',
    '.agenda-filter-options::-webkit-scrollbar-thumb:hover',
  ]) assert.ok(css.includes(snippet), 'Falta el contrato: ' + snippet);
});

test('Todas las entradas de Agenda cargan los estilos del módulo', () => {
  for (const file of ['AgendaPage', 'AgendaHomePage', 'AgendaActivityDetailPage', 'AgendaConsolePreviewPage']) {
    assert.match(read('src/modules/agenda/pages/' + file + '.tsx'), /import '\\.\\.\\/styles\\/agenda\\.css';/);
  }
});
