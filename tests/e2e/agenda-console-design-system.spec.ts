import { expect, test } from '@playwright/test';

test('consola utiliza tokens compartidos en títulos, inputs y checkboxes', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/consola-preview');
  const heading = page.getByRole('heading', { name: '1. Información general' });
  await expect(heading).toHaveCSS('font-size', '24px');
  await expect(heading).toHaveCSS('line-height', '30px');
  const title = page.locator('#console-title');
  await expect(title).toHaveCSS('color', 'rgb(35, 105, 153)');
  await expect(title).toHaveCSS('border-radius', '4px');

  const inclusive = page.getByRole('checkbox', { name: 'Disciplina inclusiva' });
  await expect(inclusive).toHaveCSS('accent-color', 'rgb(35, 105, 153)');
  const featured = page.getByRole('checkbox', { name: 'Destacar actividad' });
  await expect(featured).toHaveCSS('accent-color', 'rgb(35, 105, 153)');

  await page.getByRole('button', { name: 'Agregar', exact: true }).click();
  const schedule = page.locator('#console-schedule-kind');
  await expect(schedule).toHaveCSS('border-radius', '6px');
  const rain = page.getByRole('checkbox', { name: 'Se suspende por lluvia' });
  await expect(rain).toHaveCSS('accent-color', 'rgb(35, 105, 153)');
});
