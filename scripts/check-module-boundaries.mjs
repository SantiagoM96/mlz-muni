import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectSourceImports } from './architecture/module-imports.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = path.join(projectRoot, 'src');

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async entry => {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(name);
    return entry.isFile() && /\.[jt]sx?$/.test(entry.name) ? [name] : [];
  }));
  return paths.flat();
}

const violations = [];
for (const file of await sourceFiles(srcRoot)) {
  const content = await readFile(file, 'utf8');
  for (const error of inspectSourceImports(file, content, srcRoot)) {
    violations.push({
      file: path.relative(projectRoot, file).replaceAll(path.sep, '/'),
      ...error,
    });
  }
}

if (violations.length > 0) {
  console.error('Dependencias arquitectónicas prohibidas:');
  for (const violation of violations) {
    console.error(`  ${violation.file}: ${violation.specifier} — ${violation.reason}`);
  }
  process.exitCode = 1;
} else {
  console.log('Arquitectura: imports entre módulos y capas institucionales correctos.');
}
