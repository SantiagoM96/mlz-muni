import { test, expect } from '@playwright/test';

test('Andy: seis colores de Figma aparecen en fill y outline, con y sin icono',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/chips');
 for(const color of ['Default','Amarillo','Rojo','Verde','Azul','Violeta'])
  for(const appearance of ['fill','outline'])
   for(const icon of ['true','false'])
    await expect(page.locator(`[data-appearance="${appearance}"][data-color="${color}"][data-icon="${icon}"]`)).toHaveCount(1);
 await page.getByRole('button',{name:'Grande'}).click();
 await expect(page.locator('.andy-palette-tag').first()).toHaveClass(/is-grande/);
});

test('Andy: docs Button muestran variantes separadas, tamaños y seis estados por tipo',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/boton');
 const variants=page.locator('#variantes .andy-button-variant-example');
 await expect(variants).toHaveCount(5);
 for(const kind of ['primary','secondary','tertiary','ghost','link'])
  await expect(variants.locator(`[data-kind="${kind}"]`)).toHaveCount(1);
 await expect(page.locator('#tamanos .andy-button-size-example')).toHaveCount(3);
 const states=page.locator('#estados .andy-button-state-example');
 await expect(states).toHaveCount(6);
 for(const kind of ['primary','secondary','tertiary','ghost','link']){
  await page.getByRole('group',{name:'Tipo de botón para estados'}).getByRole('button',{name:({primary:'Primario',secondary:'Secundario',tertiary:'Terciario',ghost:'Ghost',link:'Link'} as Record<string,string>)[kind]}).click();
  for(const state of ['default','hover','focus','pressed','active','disabled'])
   await expect(states.locator(`[data-kind="${kind}"][data-state="${state}"]`)).toHaveCount(1);
 }
 const links=page.getByRole('complementary',{name:'En esta página'}).getByRole('link');
 await expect(links).toHaveCount(5);
 await expect(page.locator('#variantes .andy-button-preview')).toHaveCount(5);
});

test('Andy: los cinco tipos incluyen variantes de icono en tres tamaños',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/boton');
 const controls=page.getByRole('group',{name:'Tamaño para opciones de ícono'});
 for(const [size,base,inset] of [['Small',12,4],['Medium',16,4],['Large',24,6]] as const){
  await controls.getByRole('button',{name:new RegExp('^'+size)}).click();
  for(const kind of ['primary','secondary','tertiary','ghost']){
   const slot=page.locator('#iconografia');
   const start=slot.locator(`[data-kind="${kind}"][data-icon="start"]`);
   const end=slot.locator(`[data-kind="${kind}"][data-icon="end"]`);
   const plain=slot.locator(`[data-kind="${kind}"][data-icon="none"]`);
   await expect(plain).toHaveCSS('padding-left',base+'px');
   await expect(plain).toHaveCSS('padding-right',base+'px');
   await expect(start).toHaveCSS('padding-left',(base-inset)+'px');
   await expect(start).toHaveCSS('padding-right',base+'px');
   await expect(end).toHaveCSS('padding-left',base+'px');
   await expect(end).toHaveCSS('padding-right',(base-inset)+'px');
  }
  await expect(page.locator('#iconografia [data-kind="link"][data-icon="start"]')).toHaveCSS('padding-left','0px');
  await expect(page.locator('#iconografia [data-kind="primary"][data-icon="only"]')).toHaveCSS('padding-left','0px');
 }
});


test('Andy: los inspectores son Info 500 y los botones reales conservan Primario 600',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/boton');
 const tool=page.getByRole('group',{name:'Tipo de botón para estados'});
 await expect(tool.locator('button[aria-pressed="true"]')).toHaveCSS('background-color','rgb(0, 110, 255)');
 await expect(page.locator('#variantes .andy-system-button.is-primary').first()).toHaveCSS('background-color','rgb(35, 105, 153)');
 await tool.getByRole('button',{name:'Secundario'}).click();
 await expect(tool.getByRole('button',{name:'Secundario'})).toHaveCSS('background-color','rgb(0, 110, 255)');
 await page.goto('/ui-kit-andy/componentes/chips');
 await expect(page.locator('.andy-palette-size-options button[aria-pressed="true"]').first()).toHaveCSS('background-color','rgb(0, 110, 255)');
});

test('Andy: calendario documenta dos ejemplos abiertos y meses/años con Primario 600',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 await expect(page.locator('#seleccion-de-un-dia .andy-cal-example')).toHaveCount(1);
 await expect(page.locator('#seleccion-de-un-rango .andy-cal-example')).toHaveCount(1);
 const single=page.locator('#seleccion-de-un-dia');
 await single.getByRole('button',{name:'Seleccionar mes'}).click();
 const unselected=single.locator('.sports-cal-choice-option[aria-selected="false"]').first();
 const selected=single.locator('.sports-cal-choice-option[aria-selected="true"]').first();
 await expect(unselected.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(35, 105, 153)');
 await expect(selected).toHaveCSS('background-color','rgb(0, 110, 255)');
 await expect(selected.locator('.material-symbols-outlined')).toHaveCSS('color','rgb(255, 255, 255)');
});
