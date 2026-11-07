import { expect, test } from '@playwright/test';

/** Referencia de píxeles temporal generada desde el commit base del PR por CI. */
test('paridad visual de Jóvenes en Comunidad', async ({ page }) => {
  await page.goto('/jovenes-en-comunidad');
  await expect(page.getByRole('heading', { name: 'Jóvenes en Comunidad', level: 1 })).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images)
      .filter(image => image.complete && image.naturalWidth > 0)
      .map(image => image.decode().catch(() => undefined)));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await expect(page).toHaveScreenshot('jovenes-public.png', {
    animations: 'disabled', caret: 'hide', fullPage: true, maxDiffPixelRatio: 0.0005,
  });
});
