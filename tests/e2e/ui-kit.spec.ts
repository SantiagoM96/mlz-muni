import { expect, test } from '@playwright/test';

const categories = [
  ['formularios', 'Formularios'],
  ['botones', 'Botones y enlaces'],
  ['tipografia', 'Tipografía'],
  ['tarjetas', 'Tarjetas'],
  ['navegacion', 'Navegación y layout'],
  ['iconos', 'Íconos'],
  ['tokens', 'Tokens'],
] as const;

test('catálogo ofrece siete vistas navegables sin desbordamiento horizontal', async ({ page }) => {
  const response = await page.goto('/ui-kit/formularios');
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('navigation', { name: 'Categorías del UI Kit' })).toBeVisible();
  for (const [slug, heading] of categories) {
    await page.getByRole('navigation', { name: 'Categorías del UI Kit' })
      .getByRole('link', { name: heading, exact: true }).click();
    await expect(page).toHaveURL(new RegExp('/ui-kit/' + slug + '$'));
    await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
});

test('Formularios usa controles reales, variantes y estados locales', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  const title = page.getByRole('textbox', { name: 'Título', exact: true });
  await expect(title).toHaveCSS('border-radius', '4px');
  await title.fill('Nueva actividad');
  await expect(page.getByText('Nueva actividad', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Apariencia de los controles' }).selectOption('soft');
  await expect(title).toHaveCSS('border-radius', '6px');
  await page.getByRole('checkbox', { name: 'Aria-invalid' }).check();
  await expect(title).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('alert')).toContainText('Falta definir');
  const inclusive = page.getByRole('checkbox', { name: 'Disciplina inclusiva' });
  await inclusive.uncheck();
  await expect(inclusive).not.toBeChecked();
  await page.getByRole('checkbox', { name: 'Disabled' }).check();
  await expect(title).toBeDisabled();
  await expect(inclusive).toBeDisabled();
  await page.getByRole('button', { name: 'Restablecer' }).click();
  await expect(title).toBeEnabled();
  await expect(title).toHaveCSS('border-radius', '4px');
  await expect(inclusive).toBeChecked();
});

test('Botones presenta variantes reales y callbacks funcionales', async ({ page }) => {
  await page.goto('/ui-kit/botones');
  await page.getByRole('button', { name: 'Primario', exact: true }).click();
  await expect(page.getByRole('status').first()).toContainText('Primario');
  await page.getByRole('checkbox', { name: 'Deshabilitar acciones' }).check();
  await expect(page.getByRole('button', { name: 'Primario', exact: true })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Abrir Agenda' })).toHaveAttribute('href', /agenda-de-la-comunidad/);
});

test('Tarjetas exhibe componentes del proyecto y sus datos ilustrativos', async ({ page }) => {
  await page.goto('/ui-kit/tarjetas');
  await expect(page.getByRole('heading', { name: 'InfoCard' })).toBeVisible();
  const card = page.locator('[data-testid="agenda-card"]');
  await expect(card).toHaveCount(1);
  await expect(card).toContainText('Taller de compostaje');
  await card.getByRole('button', { name: 'Ver más' }).click();
  await expect(page.getByRole('status')).toContainText('Taller de compostaje');
  await expect(page.getByTestId('agenda-featured')).toBeVisible();
});

test('MaterialIcon busca y redimensiona el icono real', async ({ page }) => {
  await page.goto('/ui-kit/iconos');
  await page.getByRole('textbox', { name: 'Buscar ícono' }).fill('calendar');
  await expect(page.getByText('calendar_month', { exact: true })).toBeVisible();
  await expect(page.getByText('bookmark', { exact: true })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Tamaño de íconos' }).selectOption('32');
  await expect(page.locator('[data-material-symbol="calendar_month"]')).toHaveCSS('width', '32px');
});

test('rutas del UI Kit admiten acceso directo y la URL base', async ({ page }) => {
  await page.goto('/ui-kit');
  await expect(page.getByRole('heading', { name: 'Formularios', level: 1 })).toBeVisible();
  await page.goto('/ui-kit/tokens');
  await expect(page.getByText('#236999')).toBeVisible();
  await page.goto('/ui-kit/categoria-inexistente');
  await expect(page).toHaveURL(/\/ui-kit\/formularios$/);
});
