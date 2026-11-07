import { expect, test } from '@playwright/test';

test('Jóvenes conserva composición de artículos y foco accesible del enlace', async ({ page }) => {
  await page.goto('/jovenes-en-comunidad');
  const initiative = page.getByRole('heading', { name: 'INICIATIVAS', level: 2 });
  await expect(initiative).toHaveCSS('font-size', '18px');
  await expect(initiative).toHaveCSS('line-height', '26px');
  const article = page.locator('.article-copy').first();
  await expect(article).toHaveCSS('font-size', '18px');
  await expect(article).toHaveCSS('line-height', '26px');
  const articleHeading = page.locator('.article-section h3').first();
  await expect(articleHeading).toHaveCSS('font-size', '24px');
  await expect(articleHeading).toHaveCSS('line-height', '30px');

  const instagram = page.locator('.article-copy a[href*="instagram.com"]').first();
  await expect(instagram).toBeVisible();
  await page.keyboard.press('Tab');
  await instagram.focus();
  await expect(instagram).toHaveCSS('outline-style', 'solid');
  await expect(instagram).toHaveCSS('outline-width', '2px');
});
