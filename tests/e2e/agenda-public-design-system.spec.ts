import { expect, test } from '@playwright/test';

test('Agenda pública adopta tipografía compartida sin modificar el diseño', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad');
  const intro = page.getByText('Encontrá mes a mes todas las actividades culturales, deportivas y ambientales para disfrutar en tu barrio.');
  await expect(intro).toBeVisible();
  await expect(intro).toHaveCSS('font-size', '18px');
  await expect(intro).toHaveCSS('line-height', '26px');

  const circuitDescription = page.getByRole('region', { name: 'Circuitos de la Comunidad' }).locator('p').first();
  await expect(circuitDescription).toHaveCSS('font-size', '18px');
  await expect(circuitDescription).toHaveCSS('line-height', '26px');

  await page.goto('/agenda-de-la-comunidad/actividades/actividad-1');
  const description = page.getByRole('region', { name: 'Descripción de la actividad' }).locator('p').first();
  await expect(description).toBeVisible();
  await expect(description).toHaveCSS('font-size', '18px');
  await expect(description).toHaveCSS('line-height', '26px');
});
