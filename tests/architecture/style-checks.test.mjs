import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test } from 'node:test';
import { inspectStyleContracts } from '../../scripts/check-style-contracts.mjs';

test('el código actual cumple los contratos verificables', () => {
  assert.deepEqual(inspectStyleContracts().violations, []);
});

test('detecta un token institucional cambiado', () => {
  const root = mkdtempSync(join(tmpdir(), 'mlz-style-check-'));
  try {
    mkdirSync(join(root, 'src/styles'), { recursive: true });
    writeFileSync(join(root, 'src/styles/globals.css'),
      '@theme { --color-primary-600: #000000; --color-grey-900: #3d3d3d; --font-sans: Geometria, Arial; }');
    const result = inspectStyleContracts(root);
    assert.ok(result.violations.some(item => item.includes('--color-primary-600: #236999;')));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
