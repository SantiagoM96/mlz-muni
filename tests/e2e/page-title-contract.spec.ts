import { expect, test } from '@playwright/test';

test('dos módulos consumen PageTitle sin variar su contrato visual', async ({ page }) => {
  for (const [path, title] of [
    ['/jovenes-en-comunidad', 'Jóvenes en Comunidad'],
    ['/agenda-de-la-comunidad', '¡Agenda Anual de la Comunidad 2026!'],
  ] as const) {
    await page.goto(path);
    const heading = page.getByRole('heading', { level: 1, name: title });
    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveCSS('font-size', '32px');
    await expect(heading).toHaveCSS('line-height', '40px');
    await expect(heading).toHaveCSS('color', 'rgb(35, 105, 153)');
  }
});
