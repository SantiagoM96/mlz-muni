import path from 'node:path';
import ts from 'typescript';

/** Leé imports, reexports y imports dinámicos literales mediante el parser real de TypeScript. */
export function collectImportSpecifiers(source, filename) {
  const file = ts.createSourceFile(
    filename, source, ts.ScriptTarget.Latest, true,
    filename.endsWith('.tsx') || filename.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const imports = [];
  const add = (node) => {
    if (node && ts.isStringLiteralLike(node)) imports.push(node.text);
  };
  const visit = (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      add(node.moduleSpecifier);
    } else if (ts.isCallExpression(node) && node.arguments.length === 1) {
      const isDynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequire = ts.isIdentifier(node.expression) && node.expression.text === 'require';
      if (isDynamic || isRequire) add(node.arguments[0]);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      add(node.argument.literal);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return imports;
}

export function resolveSourceImport(fromFile, specifier, srcRoot) {
  if (specifier.startsWith('.')) return path.resolve(path.dirname(fromFile), specifier);
  if (specifier.startsWith('@/')) return path.resolve(srcRoot, specifier.slice(2));
  if (specifier.startsWith('src/')) return path.resolve(srcRoot, specifier.slice(4));
  return null;
}

function sourceParts(file, srcRoot) {
  const relative = path.relative(path.resolve(srcRoot), path.resolve(file));
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) return null;
  return relative.split(path.sep);
}

function isInstitutional(parts) {
  return parts[0] === 'shared'
    || parts[0] === 'layouts'
    || (parts[0] === 'components' && ['ui', 'layout', 'navigation'].includes(parts[1]));
}

/**
 * Devuelve una infracción o null. `app` puede montar páginas de módulos,
 * pero no acceder a sus datos o utilidades internas. Las capas institucionales
 * jamás importan dominios municipales.
 */
export function getBoundaryViolation(fromFile, targetFile, srcRoot) {
  const from = sourceParts(fromFile, srcRoot);
  const target = sourceParts(targetFile, srcRoot);
  if (!from || !target) return null;

  if (isInstitutional(from) && target[0] === 'modules') {
    return 'La UI institucional no puede importar módulos municipales';
  }

  if (from[0] === 'modules' && target[0] === 'modules' && from[1] !== target[1]) {
    return 'Un módulo municipal no puede importar archivos de otro módulo';
  }

  if (from[0] === 'app' && target[0] === 'modules') {
    const isModulePage = target[2] === 'pages'
      || /^[A-Za-z][A-Za-z0-9]*Page(?:\.[jt]sx?)?$/.test(target[2] ?? '');
    if (!isModulePage) return 'La composición app solo puede importar páginas de módulos';
  }

  if (from[0] === 'modules' && from[2] === 'model'
    && target[0] === 'modules' && target[1] === from[1] && target[2] !== 'model') {
    return 'El modelo de dominio no puede depender de UI, datos, hooks ni utilidades';
  }

  return null;
}

export function inspectSourceImports(fromFile, source, srcRoot) {
  const errors = [];
  const parts = sourceParts(fromFile, srcRoot);
  for (const specifier of collectImportSpecifiers(source, fromFile)) {
    if (parts?.[0] === 'modules' && parts[2] === 'model'
      && /^react(?:$|\/|-dom(?:$|\/)|-router-dom(?:$|\/))/.test(specifier)) {
      errors.push({ specifier, reason: 'El modelo de dominio no puede importar React' });
    }
    const target = resolveSourceImport(fromFile, specifier, srcRoot);
    if (!target) continue;
    const reason = getBoundaryViolation(fromFile, target, srcRoot);
    if (reason) errors.push({ specifier, reason });
  }
  return errors;
}
