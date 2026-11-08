import { expect, test } from '@playwright/test';

const categories = [
  ['formularios', 'Formularios'], ['botones', 'Botones'],
  ['etiquetas', 'Etiquetas y chips'], ['tarjetas', 'Tarjetas'],
] as const;

test('catálogo simplificado: cuatro categorías de Figma, sin overflow', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  const nav=page.getByRole('navigation', { name: 'Categorías del UI Kit' });
  await expect(nav.getByRole('link')).toHaveCount(4);
  for(const [slug,name] of categories) {
    await nav.getByRole('link',{name,exact:true}).click();
    await expect(page).toHaveURL(new RegExp('/ui-kit/'+slug+'$'));
    await expect(page.getByRole('heading',{level:1,name})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  await expect(page.getByText('ActivityCard')).toHaveCount(0);
  await expect(page.getByText('Ver ejemplo de uso')).toHaveCount(0);
});

test('formularios: Input New, checkbox y radio nativos', async ({ page }) => {
  await page.goto('/ui-kit/formularios');
  await expect(page.getByRole('heading',{name:'Input New'})).toBeVisible();
  const input=page.locator('#kit-new-text');
  await input.fill('Nombre');
  await expect(input).toHaveValue('Nombre');
  await page.locator('#kit-new-dropdown').selectOption('DNI');
  await expect(page.locator('#kit-new-dropdown')).toHaveValue('DNI');
  const checkbox=page.getByRole('checkbox',{name:'Opción 2'}).first();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  const radio=page.getByRole('radio',{name:'Opción 2'}).first();
  await radio.check();
  await expect(radio).toBeChecked();
});

test('botones: exclusivamente Standar y Chico de Figma', async ({ page }) => {
  await page.goto('/ui-kit/botones');
  await expect(page.getByRole('heading',{name:'Button/Standar'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Button/Chico'})).toBeVisible();
  const primary=page.getByRole('button',{name:'Primario'});
  await expect(primary).toHaveCount(2);
  await expect(primary.first()).toHaveCSS('min-height','48px');
  await expect(primary.last()).toHaveCSS('min-height','40px');
  await expect(page.getByText('ActionLink')).toHaveCount(0);
});

test('etiquetas y chips son componentes Figma', async ({ page }) => {
  await page.goto('/ui-kit/etiquetas');
  await expect(page.getByRole('heading',{name:'tag'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Chip/Fill'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Chip/Trazo'})).toBeVisible();
  const chip=page.getByRole('button',{name:'Deporte'}).first();
  await chip.click();
  await expect(chip).toHaveAttribute('aria-pressed','true');
});

test('joven_card es la única tarjeta y no hay muestras de Agenda', async ({ page }) => {
  await page.goto('/ui-kit/tarjetas');
  await expect(page.getByRole('heading',{name:'joven_card'})).toBeVisible();
  const card=page.getByRole('article');
  await expect(card).toHaveCount(1);
  await expect(card.getByRole('heading',{name:'Dibujo y artes plásticas'})).toBeVisible();
  await expect(page.getByText('Taller de compostaje')).toHaveCount(0);
  await expect(page.getByText('InfoCard')).toHaveCount(0);
});

test('rutas antiguas redirigen sin mostrar las vistas heredadas', async ({ page }) => {
  await page.goto('/ui-kit');
  await expect(page.getByRole('heading',{level:1,name:'Formularios'})).toBeVisible();
  for(const route of ['tipografia','navegacion','iconos','tokens']) {
    await page.goto('/ui-kit/'+route);
    await expect(page).toHaveURL(/\/ui-kit\/formularios$/);
  }
});
