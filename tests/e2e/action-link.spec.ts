import { expect, test } from '@playwright/test';

test('acciones internas comparten un componente Link nativo sin perder rutas ni medidas', async ({ page }) => {
  await page.goto('/');
  const action = page.getByRole('link', { name: /Ver Agenda de la Comunidad/ });
  await expect(action).toHaveAttribute('href', /agenda-de-la-comunidad/);
  await expect(action).toHaveCSS('min-height', '48px');
  await action.click();
  await expect(page).toHaveURL(/agenda-de-la-comunidad/);

  await page.goto('/ruta-que-no-existe');
  const home = page.getByRole('link', { name: 'Volver al inicio' });
  await expect(home).toHaveCSS('min-height', '48px');
  await home.click();
  await expect(page).toHaveURL(/\/$/);
});

test('acción externa de Agenda conserva semántica de enlace y atributos seguros', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/actividades');
  const card = page.locator('[data-testid="agenda-card"]').first();
  await expect(card).toBeVisible();
  // La vinculación externa depende de la actividad; cuando aparezca, conservar su seguridad.
  const registration = page.locator('[data-testid="agenda-registration-link"]').first();
  if (await registration.count()) {
    await expect(registration).toHaveAttribute('target', '_blank');
    await expect(registration).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(registration).toHaveCSS('min-height', '48px');
  }
});
