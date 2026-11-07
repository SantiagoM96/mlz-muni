import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = process.argv[2] || 'dist';
if (!existsSync(root)) {
  process.stderr.write('No se encontró el build: ' + root + '. Ejecutar npm run build primero.\n');
  process.exitCode = 1;
} else {
  const findCss = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? findCss(path) : (entry.isFile() && path.endsWith('.css') ? [path] : []);
  });
  const files = findCss(root).sort();
  if (!files.length) {
    process.stderr.write('No se encontró CSS compilado en ' + root + '.\n');
    process.exitCode = 1;
  } else {
    let totalRaw = 0;
    let totalGzip = 0;
    const fmt = n => (n / 1000).toFixed(2) + ' kB';
    process.stdout.write('CSS compilado (kB decimales, gzip nivel 9):\n');
    for (const path of files) {
      const bytes = readFileSync(path);
      const raw = bytes.byteLength;
      const gzip = gzipSync(bytes, { level: 9 }).byteLength;
      totalRaw += raw;
      totalGzip += gzip;
      process.stdout.write('  ' + relative(root, path) + ': ' + fmt(raw) + ' / gzip ' + fmt(gzip) + '\n');
    }
    process.stdout.write('Total de archivos CSS: ' + files.length +
      ' | sin comprimir: ' + fmt(totalRaw) + ' | gzip: ' + fmt(totalGzip) + '\n');
    process.stdout.write('Nota: medir base y propuesta en el mismo modo Vite; esto no mide LCP, CLS ni INP.\n');
  }
}
