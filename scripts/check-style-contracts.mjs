import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function file(root, rel) {
  return readFileSync(join(root, rel), 'utf8');
}

/**
 * Contratos comprobables sin depender de la sintaxis interna de Tailwind v4.
 * No es un linter CSS general ni pretende reconocer clases arbitrarias.
 */
export function inspectStyleContracts(root = process.cwd()) {
  const violations = [];
  const global = file(root, 'src/styles/globals.css');
  const tokensPath = join(root, 'src/styles/tokens.css');
  const agendaPath = join(root, 'src/modules/agenda/styles/agenda.css');
  const tokensSeparate = existsSync(tokensPath);
  const agendaSeparate = existsSync(agendaPath);
  const tokens = tokensSeparate ? file(root, 'src/styles/tokens.css') : global;

  const themeDeclarations = [global, ...(tokensSeparate ? [tokens] : [])]
    .reduce((sum, css) => sum + (css.match(/@theme\s*\{/g) ?? []).length, 0);
  if (themeDeclarations !== 1) violations.push('Se espera exactamente un bloque @theme institucional.');

  for (const declaration of [
    '--color-primary-600: #236999;',
    '--color-grey-900: #3d3d3d;',
    '--font-sans: Geometria,',
  ]) {
    if (!tokens.includes(declaration)) violations.push('Token institucional faltante o modificado: ' + declaration);
  }
  if (tokensSeparate && !global.includes('@import "./tokens.css";')) {
    violations.push('El CSS global no importa tokens.css.');
  }
  if (tokensSeparate && /@theme\s*\{/.test(global)) {
    violations.push('No duplicar @theme en globals.css.');
  }

  // La extracción de estilos de Agenda es progresiva: endurecer el límite
  // automáticamente en cuanto exista el archivo propio del módulo.
  if (agendaSeparate) {
    for (const marker of ['.agenda-', '--agenda-', '@keyframes agenda-']) {
      if (global.includes(marker)) violations.push('CSS de Agenda presente en globals.css: ' + marker);
    }
    const agenda = file(root, 'src/modules/agenda/styles/agenda.css');
    for (const marker of [
      '@media (max-width: 680px)',
      '@media (prefers-reduced-motion: reduce)',
      '@keyframes agenda-sheet-in',
      '.agenda-mobile-sheet.agenda-sheet-dragging',
    ]) {
      if (!agenda.includes(marker)) violations.push('Contrato de Agenda ausente: ' + marker);
    }
    for (const page of [
      'AgendaPage', 'AgendaHomePage', 'AgendaActivityDetailPage', 'AgendaConsolePreviewPage',
    ]) {
      const source = file(root, 'src/modules/agenda/pages/' + page + '.tsx');
      if (!source.includes("import '../styles/agenda.css';")) {
        violations.push('Falta importar CSS en ' + page);
      }
    }
  }
  return { violations, tokensSeparate, agendaSeparate };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = inspectStyleContracts();
  if (result.violations.length) {
    for (const violation of result.violations) process.stderr.write('✗ ' + violation + '\n');
    process.exitCode = 1;
  } else {
    process.stdout.write('✓ Contratos CSS/Design Tokens válidos. Tokens separados: ' +
      result.tokensSeparate + '. Agenda separada: ' + result.agendaSeparate + '.\n');
  }
}
