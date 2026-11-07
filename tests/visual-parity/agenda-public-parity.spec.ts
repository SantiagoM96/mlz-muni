import { expect, test } from '@playwright/test';

/**
 * Paridad visual pública: referencia temporal obtenida desde main en CI.
 * No reescribe capturas aprobadas ni sustituye pruebas de interacción.
 */
const pages = [
  { name: 'inicio', path: '/agenda-de-la-comunidad', ready: '[data-testid="agenda-home-banner"]' },
  { name: 'listado', path: '/agenda-de-la-comunidad/actividades', ready: '[data-testid="agenda-toolbar"]' },
  { name: 'ficha', path: '/agenda-de-la-comunidad/actividades/actividad-1', ready: '[data-testid="agenda-detail-image"]' },
] as const;

for (const view of pages) {
  test('paridad pública de Agenda — ' + view.name, async ({ page }) => {
    await page.goto(view.path);
    await expect(page.locator(view.ready)).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images)
        .filter(image => image.complete && image.naturalWidth > 0)
        .map(image => image.decode().catch(() => undefined)));
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await expect(page).toHaveScreenshot('agenda-public-' + view.name + '.png', {
      animations: 'disabled',
      caret: 'hide',
      fullPage: false,
      maxDiffPixelRatio: 0.0005,
      // No evaluar contenido cartográfico de terceros como parte del Design System.
      mask: [page.locator('iframe')],
    });
  });
}
