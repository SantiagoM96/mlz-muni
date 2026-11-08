import { expect, test } from '@playwright/test';

test('joven_card sigue el contenido y proporciones publicadas en Figma', async ({page}) => {
  await page.goto('/ui-kit/tarjetas');
  const story = page.locator('[data-story-card="MLZ - UI KIT · joven_card"]');
  await expect(story).toBeVisible();
  const card = story.locator('article');
  await expect(card).toHaveCSS('max-width','352px');
  await expect(card.getByRole('heading',{name:'Dibujo y artes plásticas'})).toHaveCSS('font-size','22px');
  await expect(card).toContainText('Centro Cultural El Ceibo');
  await expect(card).toContainText('Lomas de Zamora');
  await expect(card).toContainText('16:00h a 19:00h');
  await expect(card.getByText('Lista de espera')).toHaveCount(0);
  await story.getByRole('checkbox',{name:'Mostrar lista de espera'}).check();
  await expect(card.getByText('Lista de espera')).toBeVisible();
  await card.getByRole('button',{name:'Ver mas'}).click();
  await expect(story.getByText('Se seleccionó Dibujo y artes plásticas')).toBeVisible();
});
