import { expect, test } from '@playwright/test';

test('joven_card de Figma sin controles ni fichas de ejemplo', async ({ page }) => {
  await page.goto('/ui-kit/tarjetas');
  const card=page.getByRole('article');
  await expect(card).toHaveCount(1);
  await expect(card).toHaveCSS('max-width','352px');
  await expect(card.getByRole('heading',{name:'Dibujo y artes plásticas'})).toHaveCSS('font-size','22px');
  await expect(card).toContainText('Centro Cultural El Ceibo');
  await expect(card).toContainText('16:00h a 19:00h');
  await expect(card.getByText('Lista de espera')).toHaveCount(0);
  await expect(page.getByRole('checkbox',{name:'Mostrar lista de espera'})).toHaveCount(0);
});
