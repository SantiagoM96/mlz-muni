import { expect, test } from '@playwright/test';

test('catálogo incluye las familias de formularios del MLZ UI Kit', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  for(const name of [
    'Input New', 'Input/TextFile', 'Input/Dropdownn', 'Input/TextArea',
    'Input · Contraseña', 'Input/Codigo', 'Input/DocumentoSelect',
    'SearchInput', 'Input/Adjuntar', 'Input/ChecBox', 'Input/RadioButton', 'Input/T&C',
  ]) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.getByText('ActivityCard')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('Input New conserva las geometrías y los estados de interacción de Figma', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  const input = page.locator('#kit-new-text');
  const select = page.locator('#kit-new-dropdown');
  const area = page.locator('#kit-new-area');
  await expect(input).toHaveCSS('height', '48px');
  await expect(input).toHaveCSS('border-radius', '4px');
  await expect(input).toHaveCSS('border-top-color', 'rgb(91, 168, 213)');
  await expect(select).toHaveCSS('height', '48px');
  await expect(area).toHaveCSS('min-height', '123px');
  await expect(input).toHaveAttribute('placeholder', 'Escribí un nombre de usuario');
  await input.fill('Valor');
  await expect(input).toHaveCSS('border-top-color', 'rgb(0, 110, 255)');
  await select.selectOption('DNI');
  await expect(select).toHaveValue('DNI');
});

test('Código, documento, contraseña y SearchInput funcionan', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  for(const [index, digit] of ['1', '2', '3', '4'].entries()) {
    const input=page.getByRole('textbox', { name: 'Dígito ' + (index + 1) + ' del código' });
    await input.fill(digit);
    await expect(input).toHaveValue(digit);
  }
  const search = page.getByRole('searchbox', { name: 'Buscar' });
  await expect(search).toHaveCSS('height', '56px');
  await search.fill('Turnos');
  await expect(search).toHaveValue('Turnos');

  await page.locator('#kit-documento-numero').fill('335476578');
  await expect(page.locator('#kit-documento-numero')).toHaveValue('335476578');

  const password=page.locator('#kit-password');
  await expect(password).toHaveAttribute('type', 'password');
  await password.fill('ClaveSegura123');
  await page.getByRole('button', { name: 'Mostrar contraseña' }).click();
  await expect(password).toHaveAttribute('type', 'text');
  await expect(page.getByText('Tu contraseña es segura')).toBeVisible();
});

test('los dos tipos de Adjuntar conservan texto y admiten archivo local', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  await expect(page.getByRole('heading', { name: 'Opcion 1' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Opcion 2 Nuevo' })).toBeVisible();
  await page.locator('#kit-adjuntar-1').setInputFiles({
    name: 'documento.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF'),
  });
  await expect(page.getByText('documento.pdf')).toBeVisible();
  await expect(page.getByText('PDF, JPG o PNG de hasta 2 MB')).toBeVisible();
  await expect(page.getByRole('button', { name: /Adjunta una foto de el frente de tu documento/ }))
    .toHaveCSS('min-height', '56px');
});

test('Checkbox, RadioButton y T&C son controles nativos accesibles', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  const check = page.getByRole('checkbox', { name: 'Opción 2' }).first();
  await check.check();
  await expect(check).toBeChecked();
  const radio = page.getByRole('radio', { name: 'Opción 2' }).first();
  await radio.check();
  await expect(radio).toBeChecked();
  const terms = page.getByRole('checkbox', { name: /Declaro no haber podado/ });
  await terms.check();
  await expect(terms).toBeChecked();
  await expect(page.getByText(/árbol\/es en el año 2024/)).toBeVisible();
});
