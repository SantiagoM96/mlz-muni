import { test, expect } from '@playwright/test';

test('UI Kit: Card incorpora documentación base antes de las ocho tarjetas originales',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const titles=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 const newBlocks=['Descripción','Básico','Composición','Tamaños','Espaciado','Imagen','Estados','Anatomía','Especificaciones','Comportamiento y accesibilidad','Aplicaciones municipales'];
 const currentCards=['Deportes Anual','Agenda de la Comunidad','Noticias','Áreas y servicios','Turnos online','Trámites destacados','Accesos rápidos','Eventos con fecha'];
 expect(titles.slice(0,newBlocks.length)).toEqual(newBlocks);
 expect(titles.slice(newBlocks.length)).toEqual(currentCards);
 await expect(page.locator('.andy-family-card-gallery > .andy-doc-section')).toHaveCount(2);
 await expect(page.locator('.andy-municipal-card-gallery > .andy-doc-section')).toHaveCount(6);
 await expect(page.getByTestId('andy-family-card-sports')).toHaveCount(1);
 await expect(page.getByTestId('andy-family-card-agenda')).toHaveCount(1);
 await expect(page.getByTestId('andy-municipal-card-gallery').locator('article')).toHaveCount(6);
});

test('UI Kit: Card cambia tamaño y espaciado sin afectar las muestras municipales',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const sizes=page.getByRole('group',{name:'Tamaño de Card'});
 const card=page.locator('#tamanos .mlz-card');
 await expect(card).toHaveAttribute('data-size','default');
 await sizes.getByRole('button',{name:'Small'}).click();
 await expect(card).toHaveAttribute('data-size','sm');
 await expect(card).toHaveCSS('border-top-left-radius','8px');
 await expect(card).toHaveCSS('padding-top','16px');
 await sizes.getByRole('button',{name:'Default'}).click();
 await expect(card).toHaveCSS('padding-top','24px');

 const spacing=page.getByRole('group',{name:'Espaciado de Card'});
 const specimen=page.locator('#espaciado .mlz-card');
 for(const value of [16,20,24,32]){
  const button=spacing.getByRole('button',{name:value+' px'});
  await button.click();
  await expect(button).toHaveAttribute('aria-pressed','true');
  await expect(specimen).toHaveCSS('padding-top',value+'px');
  await expect(specimen.locator('.mlz-card-header')).toHaveCSS('padding-left',value+'px');
 }
 await expect(page.locator('.andy-municipal-card-gallery .andy-municipal-card')).toHaveCount(6);
});

test('UI Kit: Card documenta composición, imagen y cuatro estados sin falsear interacciones',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const basic=page.locator('#basico .mlz-card');
 for(const name of ['mlz-card-header','mlz-card-title','mlz-card-description','mlz-card-action','mlz-card-content','mlz-card-footer']){
  await expect(basic.locator('.'+name)).toHaveCount(1);
 }
 await basic.getByRole('button',{name:'Consultar servicio'}).click();
 await expect(page.getByRole('status')).toContainText('Demostración: Consultar servicio');
 const image=page.locator('#imagen .mlz-card');
 await expect(image.locator('img')).toHaveAttribute('src',/andy-cards\/noticia-obras\.webp$/);
 await expect(image.locator('img')).toHaveAttribute('alt',/.+/);
 const cases=page.locator('#estados [data-testid^="andy-card-state-"]');
 await expect(cases).toHaveCount(4);
 await expect(page.getByTestId('andy-card-state-disabled').getByRole('button')).toBeDisabled();
 await expect(page.getByTestId('andy-card-state-hover')).not.toHaveCSS('box-shadow','none');
 const focusButton=page.getByTestId('andy-card-state-focus').getByRole('button');
 await expect(focusButton).toHaveCSS('outline-style','solid');
});

test('UI Kit: Card se adapta a mobile sin recortar el contenido',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 await expect(page.locator('.andy-card-foundation-states')).toHaveCSS('grid-template-columns',/\d+px/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
