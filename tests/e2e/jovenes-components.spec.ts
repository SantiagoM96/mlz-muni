import { expect, test } from '@playwright/test';

test('Jóvenes compone nueve iniciativas desde componentes reales y conserva navegación', async ({ page }) => {
  await page.goto('/jovenes-en-comunidad');
  const initiatives = page.locator('section.article-section');
  await expect(initiatives).toHaveCount(9);
  await expect(initiatives.first().locator('h3')).toBeVisible();
  const link = page.getByRole('navigation', { name: 'Índice de iniciativas' })
    .getByRole('link', { name: 'Copa Joven' });
  await link.click();
  await expect(page).toHaveURL(/#copa-joven$/);
  const instagram = page.getByRole('complementary', { name: 'Índice y contacto de Jóvenes en Comunidad' })
    .getByRole('link', { name: '@jovenesencomunidad' });
  await expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/jovenesencomunidad/');
  await expect(page.getByRole('button', { name: /Ver Puntos Jóvenes/ })).toBeDisabled();
});
