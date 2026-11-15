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
