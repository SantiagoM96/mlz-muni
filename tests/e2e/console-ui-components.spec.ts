import { expect, test } from '@playwright/test';

test('consola utiliza controles React en programación y sedes', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/consola-preview');
  await page.getByRole('button', { name: 'Editar programación 1' }).click();
  const dialog = page.getByTestId('console-schedule-editor');
  await expect(dialog.getByLabel('Tipo de fecha')).toHaveCSS('border-radius', '6px');
  const rain = dialog.getByRole('checkbox', { name: 'Se suspende por lluvia' });
  await expect(rain).toHaveCSS('accent-color', 'rgb(35, 105, 153)');
  await expect(rain).toHaveCSS('height', '20px');
  await dialog.getByRole('button', { name: 'Agregar nuevo lugar' }).click();
  await dialog.getByLabel('Nombre del lugar').fill('Centro Cultural Nuevo');
  await dialog.getByLabel('Localidad').fill('Banfield');
  await dialog.getByLabel('Dirección').fill('Maipú 123');
  await dialog.getByRole('button', { name: 'Guardar lugar' }).click();
  await expect(dialog.getByLabel('Lugar')).toContainText('Centro Cultural Nuevo');
});
