import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const subsetPath = path.resolve('src/assets/fonts/material-symbols-outlined-subset.woff2');

test('Material Symbols conserva su familia e importa solamente el subset local', async ({ page }) => {
  expect(existsSync(subsetPath), 'La fuente optimizada debe generarse antes de iniciar Vite').toBe(true);
  expect(statSync(subsetPath).size, 'La fuente debe pesar menos de 1 MB').toBeLessThan(1_000_000);

  const response = await page.goto('/jovenes-en-comunidad');
  expect(response?.ok()).toBe(true);

  const result = await page.evaluate(async () => {
    await document.fonts.load('24px "Material Symbols Outlined"', 'menu');
    await document.fonts.ready;
    const icon = document.querySelector<HTMLElement>('[data-material-symbol]');
    const resources = performance.getEntriesByType('resource').map(entry => entry.name);
    return {
      computedFont: icon ? getComputedStyle(icon).fontFamily : '',
      visibleIcons: document.querySelectorAll('[data-material-symbol]').length,
      optimizedAssets: resources.filter(name => name.includes('material-symbols-outlined-subset.woff2')),
      originalAssets: resources.filter(name =>
        /material-symbols-outlined(?!-subset)[^/]*\.woff2/.test(name)),
      fontLoaded: [...document.fonts].some(face =>
        face.family.includes('Material Symbols Outlined') && face.status === 'loaded'),
    };
  });

  expect(result.visibleIcons).toBeGreaterThan(0);
  expect(result.computedFont).toContain('Material Symbols Outlined');
  expect(result.fontLoaded).toBe(true);
  expect(result.optimizedAssets).toHaveLength(1);
  expect(result.originalAssets).toHaveLength(0);
});
