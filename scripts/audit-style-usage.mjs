import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

// Inventario informativo: nunca falla por tener valores arbitrarios aprobados.
function sourceFiles(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? sourceFiles(path) :
      entry.isFile() && /\.(?:css|tsx|ts)$/.test(entry.name) ? [path] : [];
  });
}

const files = sourceFiles('src').sort();
const arbitrary = new Map();
const colors = new Map();
const duplicates = new Map();
const importantFiles = [];
const inlineStyles = [];
const cssSources = [];
let arbitraryUses = 0;
let hexUses = 0;
let agendaInGlobals = 0;

const add = (map, value) => map.set(value, (map.get(value) ?? 0) + 1);

for (const path of files) {
  const source = readFileSync(path, 'utf8');
  const name = relative('.', path);
  const arbitraryHere = [...source.matchAll(/[\w:!/-]+-\[[^\]\s"'\x60]+\]/g)];
  for (const match of arbitraryHere) {
    add(arbitrary, match[0]);
    arbitraryUses++;
  }
  for (const match of source.matchAll(/#[\da-fA-F]{3,8}\b/g)) {
    add(colors, match[0].toLowerCase());
    hexUses++;
  }
  const important = (source.match(/!important/g) ?? []).length;
  if (important) importantFiles.push({ file: name, occurrences: important });
  const inline = (source.match(/style=\{\{|\.style\.(?:setProperty|removeProperty|opacity|transition)/g) ?? []).length;
  if (inline) inlineStyles.push({ file: name, occurrences: inline });
  if (path.endsWith('.css')) cssSources.push({ file: name, bytes: Buffer.byteLength(source) });
  if (name === 'src/styles/globals.css') agendaInGlobals = (source.match(/\.agenda-/g) ?? []).length;

  // Duplicación exacta de className literales, sin tratar templates como equivalentes.
  for (const match of source.matchAll(/className=(?:"([^"]{16,})"|'([^']{16,})')/g)) {
    const classString = (match[1] ?? match[2]).replace(/\s+/g, ' ').trim();
    add(duplicates, classString);
  }
}
const top = (map, count, repeatedOnly = false) => [...map.entries()]
  .filter(([,n]) => !repeatedOnly || n > 1)
  .sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]))
  .slice(0,count)
  .map(([value,occurrences]) => ({ value, occurrences }));
console.log(JSON.stringify({
  scope: 'src/ archivos .ts/.tsx/.css; inspección textual, no AST',
  sourceFiles: files.length,
  cssSources,
  arbitraryUses,
  arbitraryUnique: arbitrary.size,
  frequentArbitrary: top(arbitrary, 15),
  hexadecimalUses: hexUses,
  frequentHex: top(colors, 15),
  importantFiles,
  inlineStyles,
  repeatedLiteralClassNames: top(duplicates, 8, true),
  agendaSelectorsInGlobal: agendaInGlobals,
}, null, 2));
