import { test, expect } from '@playwright/test';

test('UI Kit: Calendar y Date Picker tienen páginas independientes',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendar');
 await expect(page.getByRole('heading',{name:'Calendar',exact:true})).toBeVisible();
 await expect(page.locator('#seleccion-de-rango')).toBeVisible();
 await expect(page.locator('#fecha-de-nacimiento')).toHaveCount(0);
 await page.goto('/ui-kit-andy/componentes/calendario');
 await expect(page.getByRole('heading',{name:'Date Picker',exact:true})).toBeVisible();
 for(const id of ['basico','seleccion-de-rango','fecha-de-nacimiento','campo-editable','fecha-y-hora','lenguaje-natural','rtl']){
  await expect(page.locator('#'+id)).toBeVisible();
 }
});

test('Date Picker: selección individual requiere confirmar',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#basico');
 const trigger=demo.locator('.sports-cal-trigger');
 await expect(trigger).toContainText('Seleccionar fecha');
 await trigger.click();
 const popup=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await expect(popup).toBeVisible();
 await popup.locator('[data-calendar-date$="-15"]').click();
 await expect(trigger).toContainText('Seleccionar fecha');
 await popup.getByRole('button',{name:'Confirmar'}).click();
 await expect(trigger).not.toContainText('Seleccionar fecha');
});

test('Date Picker: rango conserva inicio, fin y selección intermedia',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#seleccion-de-rango');
 const trigger=demo.locator('.sports-cal-trigger');
 await trigger.click();
 const popup=page.getByRole('dialog',{name:'Seleccionar rango'});
 await popup.locator('[data-calendar-date$="-10"]').click();
 await popup.locator('[data-calendar-date$="-14"]').click();
 await expect(popup.locator('.sports-cal-day.is-in-range')).toHaveCount(3);
 await popup.getByRole('button',{name:'Confirmar'}).click();
 await expect(trigger).toContainText(' – ');
});

test('Date Picker: campo editable valida fechas y sincroniza calendario',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#campo-editable');
 const field=demo.getByRole('textbox',{name:'Fecha de suscripción'});
 await field.fill('31/02/2026');
 await field.press('Enter');
 await expect(demo.getByRole('alert')).toContainText('fecha válida');
 await field.fill('25/11/2026');
 await field.press('Enter');
 await expect(demo.getByRole('alert')).toHaveCount(0);
 await demo.getByRole('button',{name:'Abrir calendario de Fecha de suscripción'}).click();
 const popup=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await expect(popup.getByRole('gridcell',{name:'25 de Noviembre de 2026'})).toHaveAttribute('aria-selected','true');
});

test('Date Picker: lenguaje natural interpreta mañana sin guardar texto ambiguo',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#lenguaje-natural');
 const field=demo.getByRole('textbox',{name:'Fecha de publicación'});
 await field.fill('mañana');
 await field.press('Enter');
 await expect(demo.getByRole('status')).toContainText('Fecha interpretada:');
 await field.fill('cualquier fecha');
 await field.press('Enter');
 await expect(demo.getByRole('alert')).toContainText('No reconocimos');
});

test('Date Picker: fecha y hora se muestran juntas después de confirmar',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#fecha-y-hora');
 await demo.locator('.sports-cal-trigger').click();
 const popup=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await popup.locator('[data-calendar-date$="-15"]').click();
 await popup.getByRole('button',{name:'Confirmar'}).click();
 await demo.getByLabel('Hora').fill('14:30');
 await expect(demo.getByRole('status')).toContainText('14:30');
});

test('Date Picker: variante RTL conserva apertura y orden lógico',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const demo=page.locator('#rtl .andy-dpv');
 await expect(demo).toHaveAttribute('dir','rtl');
 await demo.locator('.sports-cal-trigger').click();
 await expect(page.getByRole('dialog',{name:'اختر تاريخًا'})).toBeVisible();
});
