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
