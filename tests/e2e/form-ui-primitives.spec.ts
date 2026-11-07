import { expect, test } from '@playwright/test';

test('los controles React compartidos preservan campos y estilos generales de Agenda', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/consola-preview');
  const title = page.getByRole('textbox', { name: 'Título', exact: true });
  await title.fill('Actividad de prueba');
  await expect(title).toHaveValue('Actividad de prueba');
  await expect(title).toHaveCSS('border-radius', '4px');
  await expect(title).toHaveCSS('color', 'rgb(35, 105, 153)');
  const category = page.getByRole('combobox', { name: 'Categoría', exact: true });
  await expect(category).toHaveCSS('border-radius', '4px');
  const desc = page.getByRole('textbox', { name: 'Descripción general' });
  await expect(desc).toHaveCSS('min-height', '120px');
  await expect(desc).toHaveCSS('resize', 'vertical');
  await expect(page.getByRole('combobox', { name: 'Modalidad' })).toHaveCSS('border-radius', '4px');
});
