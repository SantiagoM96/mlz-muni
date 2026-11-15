import { expect, test } from '@playwright/test';

test('Andy: los cuatro mensajes usan exactamente los tokens de Figma mensaje_destacado',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/mensaje');
 for(const [variant,bg,foreground] of [
  ['success','rgb(234, 249, 239)','rgb(29, 156, 72)'],
  ['info','rgb(229, 240, 255)','rgb(0, 88, 204)'],
  ['warning','rgb(255, 253, 231)','rgb(249, 168, 37)'],
  ['error','rgb(255, 240, 240)','rgb(239, 40, 76)']
 ]){
  const message=page.locator('.andy-alert-'+variant);
  await expect(message).toHaveCount(1);
  await expect(message).toHaveCSS('background-color',bg);
  await expect(message).toHaveCSS('border-top-color',foreground);
  await expect(message).toHaveCSS('color',foreground);
 }
});

test('Andy: las tarjetas Deportes y Agenda conservan sus cabeceras propias y tipografía común',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const sports=page.getByTestId('andy-family-card-sports');
 const agenda=page.getByTestId('andy-family-card-agenda');
 await expect(sports).toBeVisible();
 await expect(agenda).toBeVisible();
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('height','55px');
 await expect(agenda.locator('article img')).toHaveCSS('height','154px');
 await expect(sports.locator('h3')).toHaveCSS('font-size','22px');
 await expect(agenda.locator('article h2')).toHaveCSS('font-size','22px');
 await expect(sports.getByText('Preinscribirse')).toBeVisible();
 await expect(agenda.getByText('Ver más')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
