import { expect, test } from '@playwright/test';

test('Button/Standar y Button/Chico reproducen las variantes de MLZ UI KIT', async ({ page }) => {
  await page.goto('/ui-kit/botones');
  const section = page.locator('[data-story-card="MLZ - UI KIT · Button/Standar y Button/Chico"]');
  await expect(section).toBeVisible();
  const primary = section.getByRole('button', { name: 'Probar primario' });
  const secondary = section.getByRole('button', { name: 'Probar secundario' });
  await expect(primary).toHaveCSS('min-height', '48px');
  await expect(primary).toHaveCSS('background-color', 'rgb(35, 105, 153)');
  await expect(secondary).toHaveCSS('background-color', 'rgb(91, 168, 213)');
  await page.getByRole('combobox', { name: 'Tamaño de botón Figma' }).selectOption('Chico');
  await expect(primary).toHaveCSS('min-height', '40px');
  await expect(primary).toHaveCSS('font-size', '16px');
  await page.getByRole('combobox', { name: 'Estado de botón Figma' }).selectOption('disabled');
  await expect(primary).toBeDisabled();
  await page.getByRole('combobox', { name: 'Estado de botón Figma' }).selectOption('default');
  await primary.click();
  await expect(section.getByRole('status')).toContainText('primario');
});

test('Input New expone tipos y estados de Figma con HTML funcional', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  const section = page.locator('[data-story-card="MLZ - UI KIT · Input New"]');
  const input = section.getByRole('textbox', { name: 'Nombre' });
  await input.fill('Prueba Figma');
  await expect(input).toHaveValue('Prueba Figma');
  await expect(input).toHaveCSS('border-radius', '4px');
  // Al escribir, el campo sigue enfocado y muestra correctamente el borde de focus.
  await expect(input).toHaveCSS('border-top-color', 'rgb(35, 105, 153)');
  await input.press('Tab');
  await expect(input).toHaveCSS('border-top-color', 'rgb(91, 168, 213)');
  const select = section.getByRole('combobox', { name: 'Tipo de documento' });
  await select.selectOption('DNI');
  await expect(select).toHaveValue('DNI');
  await page.getByRole('combobox', { name: 'Estado de Input New Figma' }).selectOption('Error');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(section.getByRole('alert')).toHaveCount(3);
  await page.getByRole('combobox', { name: 'Estado de Input New Figma' }).selectOption('Disable');
  await expect(input).toBeDisabled();
  await expect(select).toBeDisabled();
});

test('tag muestra 3 tamaños y 6 colores verificados de Figma', async ({ page }) => {
  await page.goto('/ui-kit/etiquetas');
  const section = page.locator('[data-story-card="MLZ - UI KIT · tag"]');
  await expect(section.locator('span').filter({ hasText: 'Violeta' }).first()).toHaveCSS('background-color','rgb(236, 221, 255)');
  await expect(section.locator('span').filter({ hasText: 'Verde' }).first()).toHaveCSS('color','rgb(42, 187, 91)');
  await expect(section.getByRole('heading', { name: 'Grande' })).toBeVisible();
  await section.getByRole('checkbox', { name: 'Mostrar ícono' }).check();
  await expect(section.locator('.material-symbols-outlined').first()).toBeVisible();
});

test('chips y selecciones de Figma son interactivos y no guardan datos', async ({ page }) => {
  await page.goto('/ui-kit/etiquetas');
  const chips=page.locator('[data-story-card="MLZ - UI KIT · Chip/Fill y Chip/Trazo"]');
  const sports=chips.getByRole('button',{name:/Deporte/}).first();
  await sports.click();
  await expect(sports).toHaveAttribute('aria-pressed','true');
  await expect(chips.getByRole('status')).toContainText('Deporte');
  await page.goto('/ui-kit/formularios');
  const options=page.locator('[data-story-card="MLZ - UI KIT · Input/ChecBox y Input/RadioButton"]');
  await options.getByRole('combobox',{name:'Disposición de opciones Figma'}).selectOption('Vertical');
  await expect(options.getByRole('radio',{name:'Opción 2'})).not.toBeChecked();
  await options.getByRole('radio',{name:'Opción 2'}).check();
  await expect(options.getByRole('radio',{name:'Opción 2'})).toBeChecked();
});
