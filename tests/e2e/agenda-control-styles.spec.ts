import { expect, test } from '@playwright/test';

test('consola conserva radios y tipografía de dos familias de campos', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/consola-preview');
  const general = page.locator('#console-title');
  await expect(general).toBeVisible();
  await expect(general).toHaveCSS('border-radius', '4px');
  await expect(general).toHaveCSS('font-size', '16px');
  await expect(general).toHaveCSS('color', 'rgb(35, 105, 153)');

  await page.getByRole('button', { name: 'Agregar', exact: true }).click();
  const schedule = page.locator('#console-schedule-kind');
  await expect(schedule).toBeVisible();
  await expect(schedule).toHaveCSS('border-radius', '6px');
  await expect(schedule).toHaveCSS('font-size', '16px');
  await expect(schedule).toHaveCSS('color', 'rgb(35, 105, 153)');
});
