import { test, expect } from '@playwright/test';

test('Andy: calendario permite elegir mes, año, día y confirmar',async ({page})=>{
 await page.goto('/ui-kit-andy/formularios');
 const sample=page.locator('.andy-matrix-calendar-sample');
 await sample.getByRole('button',{name:'Seleccionar fecha'}).click();
 const picker=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await expect(picker).toBeVisible();
 const month=picker.locator('.sports-cal-choice-trigger').first();
 const year=picker.locator('.sports-cal-choice-trigger').last();
 await year.click();
 const yearDialog=page.getByRole('dialog',{name:'Seleccionar año'});
 if(await yearDialog.isVisible().catch(()=>false)){
  await yearDialog.getByRole('option',{name:'2000'}).click();
 }else{
  await picker.getByRole('option',{name:'2000'}).click();
 }
 await month.click();
 const monthDialog=page.getByRole('dialog',{name:'Seleccionar mes'});
 if(await monthDialog.isVisible().catch(()=>false)){
  await monthDialog.getByRole('option',{name:'Junio'}).click();
 }else{
  await picker.getByRole('option',{name:'Junio'}).click();
 }
 await picker.getByRole('gridcell',{name:'15 de Junio de 2000'}).click();
 await picker.getByRole('button',{name:'Confirmar'}).click();
 await expect(sample.getByRole('button',{name:/15 \/ 06 \/ 2000/})).toBeVisible();
 await sample.getByRole('button',{name:'Borrar fecha de nacimiento'}).click();
 await expect(sample.getByRole('button',{name:'Seleccionar fecha'})).toBeVisible();
});

test('Andy: meses futuros deshabilitados y fecha pendiente requiere confirmación',async ({page})=>{
 await page.goto('/ui-kit-andy/formularios');
 const sample=page.locator('.andy-matrix-calendar-sample');
 await sample.getByRole('button',{name:'Seleccionar fecha'}).click();
 const calendar=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await expect(calendar.getByRole('button',{name:'Confirmar'})).toBeDisabled();
 await expect(calendar.getByRole('button',{name:'Mes anterior'})).toBeEnabled();
 await calendar.getByRole('gridcell',{name:/de .* de /}).first().click();
 await expect(calendar.getByRole('button',{name:'Confirmar'})).toBeEnabled();
 await calendar.getByRole('button',{name:'Borrar fecha'}).click();
 await expect(sample.getByRole('button',{name:'Seleccionar fecha'})).toBeVisible();
});


test('Andy: Date Picker usa controles y botones del sistema y los radios aprobados',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const sample=page.locator('.andy-matrix-calendar-sample');
 await sample.getByRole('button',{name:'Seleccionar fecha'}).click();
 const picker=page.getByRole('dialog',{name:'Seleccionar fecha'});
 await expect(picker).toBeVisible();
 const mobile=await page.evaluate(()=>window.innerWidth<=680);
 await expect(picker).toHaveCSS('border-top-left-radius',mobile?'16px':'8px');
 for(const trigger of await picker.locator('.sports-cal-choice-trigger').all()){
  await expect(trigger).toHaveCSS('height',mobile?'40px':'32px');
  await expect(trigger).toHaveCSS('border-top-left-radius','4px');
 }
 for(const name of ['Borrar fecha','Confirmar']){
  const button=picker.getByRole('button',{name,exact:true});
  await expect(button).toHaveClass(/andy-system-button/);
  await expect(button).toHaveCSS('height',mobile?'40px':'32px');
  await expect(button).toHaveCSS('border-top-left-radius','4px');
 }
 await expect(picker.getByRole('button',{name:'Confirmar'})).toHaveClass(/is-primary/);
 await expect(picker.getByRole('button',{name:'Borrar fecha'})).toHaveClass(/is-tertiary/);
});


test('Andy: dos calendarios abiertos permiten seleccionar un día y un rango',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const examples=page.locator('.andy-cal-case');
 await expect(examples).toHaveCount(2);
 const day=examples.first(),range=examples.last();
 await expect(day.locator('.sports-cal-popup.is-inline')).toBeVisible();
 await expect(range.locator('.sports-cal-popup.is-inline')).toBeVisible();
 await expect(day.getByText('13/11/2008')).toBeVisible();
 await day.getByRole('gridcell',{name:'20 de Noviembre de 2008'}).click();
 await expect(day.locator('.andy-cal-selection')).toContainText('20/11/2008');
 await day.getByRole('button',{name:'Confirmar'}).click();
 await expect(day.locator('.andy-cal-selection')).toContainText('Confirmado: 20/11/2008');
 await range.getByRole('gridcell',{name:'19 de Noviembre de 2008'}).click();
 await range.getByRole('gridcell',{name:'23 de Noviembre de 2008'}).click();
 await expect(range.locator('.sports-cal-day.is-in-range')).toHaveCount(3);
 await range.getByRole('button',{name:'Confirmar'}).click();
 await expect(range.locator('.andy-cal-selection')).toContainText('19/11/2008 al 23/11/2008');
});

test('Andy: mes y año respetan iconos, selección y tipografía de dropdowns MLZ',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const day=page.locator('.andy-cal-case').first();
 await day.getByRole('button',{name:'Seleccionar mes'}).click();
 const menu=day.getByRole('listbox',{name:'Meses'});
 await expect(menu).toBeVisible();
 const chosen=menu.getByRole('option',{name:'Noviembre'});
 await expect(chosen).toHaveAttribute('aria-selected','true');
 await expect(chosen).toHaveCSS('background-color','rgb(0, 110, 255)');
 await expect(chosen.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(255, 255, 255)');
 const other=menu.getByRole('option',{name:'Octubre'});
 await expect(other).toHaveCSS('font-size','16px');
 await expect(other.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(91, 168, 213)');
 await other.click();
 await expect(day.getByRole('button',{name:'Seleccionar mes'})).toContainText('Octubre');
 await day.getByRole('button',{name:'Seleccionar año'}).click();
 const years=day.getByRole('listbox',{name:'Años'});
 await expect(years.getByRole('option',{name:'2008'})).toHaveAttribute('aria-selected','true');
 await years.getByRole('option',{name:'2007'}).click();
 await expect(day.getByRole('button',{name:'Seleccionar año'})).toContainText('2007');
});
