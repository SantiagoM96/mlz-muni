import { test, expect } from '@playwright/test';

test('UI Kit: Calendar y Date Picker tienen páginas independientes',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendar');
 await expect(page.getByRole('heading',{name:'Calendar',exact:true})).toBeVisible();
 await expect(page.locator('#seleccion-de-rango')).toBeVisible();
 await expect(page.locator('#fecha-de-nacimiento')).toHaveCount(0);
 await page.goto('/ui-kit-andy/componentes/calendario');
 await expect(page.getByRole('heading',{name:'Date Picker',exact:true})).toBeVisible();
 for(const id of ['basico','seleccion-de-rango','fecha-de-nacimiento','campo-editable','fecha-y-hora','lenguaje-natural']){
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
 await demo.getByRole('button',{name:'Seleccionar hora'}).click();
 const hours=demo.getByRole('listbox',{name:'Horas'});
 await expect(hours.getByRole('option',{name:'09'})).toHaveAttribute('aria-selected','true');
 await hours.getByRole('option',{name:'14'}).click();
 await demo.getByRole('button',{name:'Seleccionar minutos'}).click();
 const minutes=demo.getByRole('listbox',{name:'Minutos'});
 await minutes.getByRole('option',{name:'30'}).click();
 await expect(demo.getByRole('status')).toContainText('14:30');
});

test('Date Picker: no incluye la variante RTL',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 await expect(page.locator('#rtl')).toHaveCount(0);
});


test('Date Picker: inputs editables y calendario comparten focus interior del Design System',async ({page})=>{
 await page.setViewportSize({width:900,height:768});
 await page.goto('/ui-kit-andy/componentes/calendario');
 for(const section of ['campo-editable','lenguaje-natural']){
  const example=page.locator('#'+section);
  const field=example.locator('.andy-dpv-input');
  const calendar=example.locator('.andy-dpv-icon-trigger');
  await field.click();
  await expect(field).toHaveCSS('border-top-color','rgb(0, 110, 255)');
  await expect(field).toHaveCSS('outline-style','none');
  await expect(field).toHaveCSS('box-shadow',/inset .*rgb\(0, 110, 255\)|rgb\(0, 110, 255\).*inset/);
  await calendar.click();
  await expect(calendar).toHaveAttribute('aria-expanded','true');
  await expect(calendar).toHaveCSS('outline-style','none');
  await expect(calendar).toHaveCSS('border-top-color','rgb(0, 110, 255)');
  await expect(calendar).toHaveCSS('box-shadow',/inset .*rgb\(0, 110, 255\)|rgb\(0, 110, 255\).*inset/);
  await calendar.click();
 }
});

test('Date Picker: el error del campo editable prevalece sobre el estado focus',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const field=page.locator('#campo-editable .andy-dpv-input');
 await field.fill('31/02/2026');
 await field.press('Enter');
 await field.click();
 await expect(field).toHaveCSS('border-top-color','rgb(239, 40, 76)');
 await expect(field).toHaveCSS('outline-style','none');
 await expect(field).toHaveCSS('box-shadow',/inset .*rgb\(239, 40, 76\)|rgb\(239, 40, 76\).*inset/);
});
