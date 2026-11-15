import { test, expect } from '@playwright/test';

test('Andy: seis colores de Figma aparecen en fill y outline, con y sin icono',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/chips');
 const colors=['Default','Amarillo','Rojo','Verde','Azul','Violeta'];
 for(const color of colors){
  for(const appearance of ['fill','outline']){
   for(const icon of ['true','false']){
    await expect(page.locator(`[data-appearance="${appearance}"][data-color="${color}"][data-icon="${icon}"]`)).toHaveCount(1);
   }
  }
 }
 await page.getByRole('button',{name:'Grande'}).click();
 await expect(page.locator('.andy-palette-tag').first()).toHaveClass(/is-grande/);
});

test('Andy: cinco tipos de botones, seis estados, tres tamaños y cuatro opciones de icono',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/boton');
 const kinds=['primary','secondary','tertiary','ghost','link'];
 for(const kind of kinds)for(const state of ['default','hover','focus','pressed','active','disabled'])
  await expect(page.locator(`[data-kind="${kind}"][data-state="${state}"]`)).toHaveCount(1);
 for(const size of ['Medium','Small','Large']){
  await page.getByRole('button',{name:new RegExp('^'+size)}).click();
  const expected=size==='Large'?'48px':size==='Medium'?'40px':'32px';
  await expect(page.locator('.andy-button-state-row .andy-system-button').first()).toHaveCSS('height',expected);
 }
 for(const kind of kinds)for(const icon of ['none','start','end','only'])
  await expect(page.locator(`.andy-button-icon-matrix [data-kind="${kind}"][data-icon="${icon}"]`)).toHaveCount(1);
});


test('Andy: padding óptico compensado del lado del icono en todos los tamaños',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/boton');
 for(const [size,base,inset] of [['Large',24,6],['Medium',16,4],['Small',12,3]] as const){
  await page.getByRole('button',{name:new RegExp('^'+size)}).click();
  for(const kind of ['primary','secondary','tertiary','ghost']){
   const start=page.locator(`.andy-button-icon-matrix [data-kind="${kind}"][data-icon="start"]`);
   const end=page.locator(`.andy-button-icon-matrix [data-kind="${kind}"][data-icon="end"]`);
   const plain=page.locator(`.andy-button-icon-matrix [data-kind="${kind}"][data-icon="none"]`);
   await expect(plain).toHaveCSS('padding-left',base+'px');
   await expect(plain).toHaveCSS('padding-right',base+'px');
   await expect(start).toHaveCSS('padding-left',(base-inset)+'px');
   await expect(start).toHaveCSS('padding-right',base+'px');
   await expect(end).toHaveCSS('padding-left',base+'px');
   await expect(end).toHaveCSS('padding-right',(base-inset)+'px');
  }
  const link=page.locator('.andy-button-icon-matrix [data-kind="link"][data-icon="start"]');
  await expect(link).toHaveCSS('padding-left','0px');
  await expect(link).toHaveCSS('padding-right','0px');
  const only=page.locator('.andy-button-icon-matrix [data-kind="primary"][data-icon="only"]');
  await expect(only).toHaveCSS('padding-left','0px');
  await expect(only).toHaveCSS('padding-right','0px');
 }
});
