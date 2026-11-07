import { expect, test } from '@playwright/test';

test('tokens tipográficos institucionales conservan las medidas aprobadas', async ({ page }) => {
  await page.goto('/jovenes-en-comunidad');
  const heading = page.getByRole('heading', { name: 'Contacto', level: 2 });
  await expect(heading).toHaveCSS('font-size', '24px');
  await expect(heading).toHaveCSS('line-height', '30px');

  const instagram = page.getByRole('complementary', { name: 'Índice y contacto de Jóvenes en Comunidad' })
    .getByRole('link', { name: '@jovenesencomunidad' });
  await expect(instagram).toHaveCSS('font-size', '18px');
  await expect(instagram).toHaveCSS('line-height', '26px');

  const callToAction = page.getByRole('button', { name: /Ver Puntos Jóvenes/ });
  await expect(callToAction).toHaveCSS('font-size', '18px');
  await expect(callToAction).toHaveCSS('line-height', '26px');

  const article = page.locator('.article-copy').first();
  await expect(article).toHaveCSS('font-size', '18px');
  await expect(article).toHaveCSS('line-height', '26px');

  const footerHeading = page.getByRole('heading', { name: 'Centro de Atención a la Comunidad' });
  await expect(footerHeading).toHaveCSS('font-size', '24px');
  await expect(footerHeading).toHaveCSS('line-height', '30px');
});
