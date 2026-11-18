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


test('Andy: Date Picker de formulario usa controles y botones del sistema y los radios aprobados',async ({page})=>{
 await page.goto('/ui-kit-andy/formularios');
 const sample=page.locator('.andy-matrix-calendar-sample').first();
 await sample.locator('.sports-cal-trigger').click();
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
 await page.goto('/ui-kit-andy/componentes/calendar');
 const day=page.locator('#basico .andy-cal-gallery');
 const range=page.locator('#seleccion-de-rango .andy-cal-gallery');
 await expect(day).toBeVisible();
 await expect(range).toBeVisible();
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
 await page.goto('/ui-kit-andy/componentes/calendar');
 const day=page.locator('#basico .andy-cal-gallery');
 await day.getByRole('button',{name:'Seleccionar mes'}).click();
 const menu=day.getByRole('listbox',{name:'Meses'});
 await expect(menu).toBeVisible();
 const chosen=menu.getByRole('option',{name:'Noviembre'});
 await expect(chosen).toHaveAttribute('aria-selected','true');
 await expect(chosen).toHaveCSS('background-color','rgb(0, 110, 255)');
 await expect(chosen.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(255, 255, 255)');
 const other=menu.getByRole('option',{name:'Octubre'});
 await expect(other).toHaveCSS('font-size','16px');
 await expect(other.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(35, 105, 153)');
 await other.click();
 await expect(day.getByRole('button',{name:'Seleccionar mes'})).toContainText('Octubre');
 await day.getByRole('button',{name:'Seleccionar año'}).click();
 const years=day.getByRole('listbox',{name:'Años'});
 await expect(years.getByRole('option',{name:'2008'})).toHaveAttribute('aria-selected','true');
 await years.getByRole('option',{name:'2007'}).click();
 await expect(day.getByRole('button',{name:'Seleccionar año'})).toContainText('2007');
});



test('Andy: Calendar accesible navega con flechas y respeta restricciones',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendar');
 const example=page.locator('#fechas-restringidas');
 const disabled=example.getByRole('gridcell',{name:'19 de Noviembre de 2008'});
 await expect(disabled).toBeDisabled();
 const day=example.getByRole('gridcell',{name:'17 de Noviembre de 2008'});
 await day.focus();
 await day.press('ArrowRight');
 await expect(example.getByRole('gridcell',{name:'18 de Noviembre de 2008'})).toBeFocused();
 await page.keyboard.press('ArrowRight');
 await expect(example.getByRole('gridcell',{name:'21 de Noviembre de 2008'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(example.locator('.andy-cal-selection')).toContainText('21/11/2008');
 await expect(example.getByRole('gridcell',{name:'5 de Noviembre de 2008'})).toBeDisabled();
 await expect(example.getByRole('gridcell',{name:'26 de Noviembre de 2008'})).toBeDisabled();
});

test('Andy: Calendar PageDown cambia de mes sin seleccionar un día',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendar');
 const example=page.locator('#basico');
 const day=example.getByRole('gridcell',{name:'13 de Noviembre de 2008'});
 await day.focus();
 await day.press('PageDown');
 await expect(example.getByRole('gridcell',{name:'13 de Diciembre de 2008'})).toBeFocused();
 await expect(example.locator('.andy-cal-selection')).toContainText('13/11/2008');
});


test('Andy: los calendarios de documentación tienen contenedor visible alrededor de título, días y acciones', async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendar');
 for(const section of ['#basico','#seleccion-de-rango','#navegacion-por-mes-y-ano','#fechas-restringidas']){
  const example=page.locator(section);
  const card=example.locator('.andy-cal-example .sports-cal-popup.is-inline');
  await expect(card).toBeVisible();
  await expect(card).toHaveCSS('border-top-width','1px');
  await expect(card).toHaveCSS('background-color','rgb(255, 255, 255)');
  await expect(card).not.toHaveCSS('box-shadow','none');
  const isMobile=await page.evaluate(()=>window.innerWidth<=680);
  await expect(card).toHaveCSS('padding-top',isMobile?'16px':'24px');
  const cardBox=await card.boundingBox();
  const titleBox=await card.locator('.sports-cal-top').boundingBox();
  const actionsBox=await card.locator('.sports-cal-actions').boundingBox();
  expect(cardBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(actionsBox).not.toBeNull();
  if(cardBox && titleBox && actionsBox){
   expect(titleBox.y).toBeGreaterThan(cardBox.y);
   expect(actionsBox.y+actionsBox.height).toBeLessThan(cardBox.y+cardBox.height);
  }
 }
});

test('Andy: fecha del formulario desplegada a la derecha del campo',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/formularios');
 const sample=page.locator('.andy-matrix-calendar-sample').first();
 const trigger=sample.locator('.sports-cal-trigger');
 await trigger.click();
 const popup=sample.locator('.sports-cal-popup');
 await expect(popup).toBeVisible();
 const triggerBox=await trigger.boundingBox();
 const popupBox=await popup.boundingBox();
 expect(triggerBox).not.toBeNull();
 expect(popupBox).not.toBeNull();
 if(triggerBox&&popupBox){
  expect(Math.abs((popupBox.x+popupBox.width)-(triggerBox.x+triggerBox.width))).toBeLessThan(2);
  expect(Math.abs(popupBox.y-(triggerBox.y+triggerBox.height+4))).toBeLessThan(2);
 }
});
