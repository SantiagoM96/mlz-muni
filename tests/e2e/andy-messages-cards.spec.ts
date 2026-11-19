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

test('Andy: Deportes y Agenda conservan cabeceras y tipografía en el visor unificado',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 const options=viewer.getByRole('group',{name:'Tarjeta municipal'});
 await options.getByRole('button',{name:'Deporte anual'}).click();
 const sports=viewer.getByTestId('andy-family-card-sports');
 await expect(sports).toBeVisible();
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('height','50px');
 await expect(sports.locator('.andy-family-card-sports-head')).toBeEmpty();
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('background-image','linear-gradient(115deg, rgb(32, 143, 184) 0%, rgb(43, 162, 201) 45%, rgb(102, 184, 218) 100%)');
 await expect(sports.locator('h3')).toHaveCSS('font-size','22px');
 const sportsDate=sports.locator('.andy-family-card-line').first();
 await expect(sportsDate).toHaveCSS('font-size','16px');
 await expect(sportsDate.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(35, 105, 153)');
 await expect(sports.getByText('Preinscribirse')).toBeVisible();

 await options.getByRole('button',{name:'Agenda de la Comunidad'}).click();
 const agenda=viewer.getByTestId('andy-family-card-agenda');
 await expect(agenda).toBeVisible();
 await expect(agenda.locator('article img')).toHaveCSS('height','154px');
 await expect(agenda.locator('article h2')).toHaveCSS('font-size','22px');
 await expect(agenda.locator('article p').first()).toHaveCSS('font-size','16px');
 const agendaDate=agenda.locator('[data-agenda-field="date"] p').first();
 await expect(agendaDate).toHaveCSS('font-size','16px');
 await expect(agendaDate).toHaveCSS('line-height','23px');
 await expect(agenda.locator('[data-agenda-field="date"] .material-symbols-outlined')).toHaveCSS('color','rgb(35, 105, 153)');
 await expect(agenda.locator('[data-testid="agenda-card-schedules"]')).toHaveCSS('row-gap','13px');
 await expect(agenda.getByText('Ver más')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
