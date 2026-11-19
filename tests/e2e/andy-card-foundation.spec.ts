import { test, expect } from '@playwright/test';

test('Card: la documentación concentra los ejemplos, sin Tamaños ni Aplicaciones municipales',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const headings=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 expect(headings).toEqual([
  'Descripción','Básico','Composición','Espaciado','Imagen','Estados',
  'Anatomía','Especificaciones','Comportamiento y accesibilidad',
 ]);
 await expect(page.locator('#tamanos')).toHaveCount(0);
 await expect(page.getByText('Aplicaciones municipales',{exact:true})).toHaveCount(0);
 await expect(page.locator('.andy-family-card-gallery')).toHaveCount(0);
 await expect(page.locator('.andy-municipal-card-gallery')).toHaveCount(0);
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 await expect(viewer.getByRole('group',{name:'Tarjeta municipal'}).getByRole('button')).toHaveText([
  'Deporte anual','Agenda de la Comunidad','Noticias','Turnos online','Destacados','Eventos',
 ]);
 await expect(page.locator('#basico .andy-municipal-card-appointment')).toHaveCount(1);
 await expect(page.locator('#espaciado .andy-municipal-card-appointment')).toHaveCount(1);
 await expect(page.locator('#imagen .andy-municipal-card-news')).toHaveCount(1);
 await expect(page.locator('#estados [data-testid="agenda-card"]')).toHaveCount(1);
});

test('Card: Small / Medium / Large cambian gaps proporcionales, nunca el padding de 24px',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const control=page.getByRole('group',{name:'Espaciado de Card'});
 const content=page.locator('#espaciado .andy-municipal-card-appointment .andy-municipal-card-content');
 const action=content.locator('.andy-municipal-card-action');
 await expect(control.getByRole('button')).toHaveText(['Small','Medium','Large']);
 for(const [label,between,untilAction] of [
  ['Small',8,16],['Medium',12,24],['Large',16,32],
 ] as const){
  await control.getByRole('button',{name:label}).click();
  await expect(control.getByRole('button',{name:label})).toHaveAttribute('aria-pressed','true');
  await expect(content).toHaveCSS('gap',between+'px');
  for(const side of ['top','right','bottom','left']){
   await expect(content).toHaveCSS('padding-'+side,'24px');
  }
  await expect(action).toHaveCSS('padding-top',between+'px');
  await expect(action).toHaveCSS('margin-top','0px');
  const gap=await content.evaluate(el=>{
   const title=el.querySelector('h3')!;
   const description=el.querySelector('p')!;
   const link=el.querySelector('.andy-municipal-card-action')!;
   return {
    titleToDescription:description.getBoundingClientRect().top-title.getBoundingClientRect().bottom,
    descriptionToAction:link.getBoundingClientRect().top+
      parseFloat(getComputedStyle(link).paddingTop)-description.getBoundingClientRect().bottom,
   };
  });
  expect(Math.abs(gap.titleToDescription-between)).toBeLessThan(1);
  expect(Math.abs(gap.descriptionToAction-untilAction)).toBeLessThan(1);
 }
 // La muestra básica conserva los gaps originales, no recibe los ajustes didácticos.
 const basic=page.locator('#basico .andy-municipal-card-appointment .andy-municipal-card-content');
 await expect(basic).toHaveCSS('gap','12px');
 await expect(basic.locator('.andy-municipal-card-action')).toHaveCSS('padding-top','14px');
});

test('Card: el borde selected es de 2px y mantiene ambas esquinas redondeadas',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 for(const label of ['Tarjeta municipal','Espaciado de Card','Tarjeta con imagen','Estado de Card']){
  const control=page.getByRole('group',{name:label});
  await expect(control).toBeVisible();
  const first=control.getByRole('button').first();
  const last=control.getByRole('button').last();
  await first.click();
  await expect(first).toHaveCSS('border-top-width','2px');
  await expect(first).toHaveCSS('border-left-width','2px');
  await expect(first).toHaveCSS('border-top-left-radius','4px');
  await expect(first).toHaveCSS('border-bottom-left-radius','4px');
  await expect(first).toHaveCSS('border-top-color','rgb(136, 136, 136)');
  await last.click();
  await expect(last).toHaveCSS('border-top-width','2px');
  await expect(last).toHaveCSS('border-right-width','2px');
  await expect(last).toHaveCSS('border-top-right-radius','4px');
  await expect(last).toHaveCSS('border-bottom-right-radius','4px');
  await expect(last).toHaveCSS('background-color','rgb(231, 231, 231)');
 }
});

test('Card: Imagen alterna Noticias, Agenda de la Comunidad y Eventos con fotografía',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const control=page.getByRole('group',{name:'Tarjeta con imagen'});
 await expect(control.getByRole('button')).toHaveText(['Noticias','Agenda de la Comunidad','Eventos']);
 await control.getByRole('button',{name:'Noticias'}).click();
 await expect(page.locator('#imagen .andy-municipal-card-news img')).toHaveAttribute('alt',/.+/);
 await control.getByRole('button',{name:'Agenda de la Comunidad'}).click();
 await expect(page.locator('#imagen [data-testid="agenda-card"] img')).toHaveCount(1);
 await control.getByRole('button',{name:'Eventos'}).click();
 const event=page.locator('#imagen .andy-municipal-card-event');
 await expect(event).toBeVisible();
 await expect(event.locator('img.andy-municipal-card-event-image'))
  .toHaveAttribute('src',/jazz-internacional\.svg$/);
 await expect(event.getByText('Jazz Internacional')).toBeVisible();
});

test('Card: los estados Default, Hover y Focus se muestran sobre Agenda real',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const states=page.getByRole('group',{name:'Estado de Card'});
 await states.getByRole('button',{name:'Hover'}).click();
 await expect(page.locator('#estados .andy-card-real-states')).toHaveAttribute('data-preview-state','hover');
 await states.getByRole('button',{name:'Focus'}).click();
 await expect(page.locator('#estados [data-testid="agenda-card"] a[href]')).toHaveCSS('outline-style','solid');
 await states.getByRole('button',{name:'Default'}).click();
 await expect(page.locator('#estados .andy-card-real-states')).toHaveAttribute('data-preview-state','default');
});

test('Card: Composition presenta seis tarjetas reales con anatomía sin relleno',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 const buttons=viewer.getByRole('group',{name:'Tarjeta municipal'});
 const expected=[
  {label:'Deporte anual',header:1,content:1,footer:1,root:'.andy-family-card.is-sports'},
  {label:'Agenda de la Comunidad',header:1,content:1,footer:1,root:'[data-testid="agenda-card"]'},
  {label:'Noticias',header:1,content:1,footer:1,root:'.andy-municipal-card-news'},
  {label:'Turnos online',header:1,content:1,footer:1,root:'.andy-municipal-card-appointment'},
  {label:'Destacados',header:1,content:1,footer:1,root:'.andy-municipal-card-procedure'},
  {label:'Eventos',header:1,content:1,footer:1,root:'.andy-municipal-card-event'},
 ] as const;
 await expect(viewer.locator('.andy-card-anatomy-stage')).toHaveCSS('background-color','rgb(255, 255, 255)');
 for(const item of expected){
  await buttons.getByRole('button',{name:item.label,exact:true}).click();
  const stage=viewer.locator('.andy-card-anatomy-stage');
  await expect(stage.locator(item.root)).toHaveCount(1);
  for(const part of ['header','content','footer'] as const){
   const region=stage.locator('[data-card-anatomy-part="'+part+'"]');
   await expect(region).toHaveCount(item[part]);
   const css=await region.first().evaluate(el=>({
    width:getComputedStyle(el,'::after').borderTopWidth,
    style:getComputedStyle(el,'::after').borderTopStyle,
    background:getComputedStyle(el,'::after').backgroundColor,
   }));
   expect(css.width).toBe('1px');
   expect(css.style).toBe('dashed');
   expect(css.background).toBe('rgba(0, 0, 0, 0)');
  }
 }
});

test('Card: evento agrupa encabezado, datos y solo el texto del enlace',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 await viewer.getByRole('group',{name:'Tarjeta municipal'}).getByRole('button',{name:'Eventos'}).click();
 const event=viewer.locator('.andy-municipal-card-event');
 await expect(event.locator('.andy-municipal-card-event-heading')).toHaveAttribute('data-card-anatomy-part','header');
 await expect(event.locator('.andy-municipal-card-event-details')).toHaveAttribute('data-card-anatomy-part','content');
 await expect(event.locator('.andy-municipal-card-info')).toHaveCount(2);
 const action=event.locator('.andy-municipal-card-action');
 await expect(action).toHaveAttribute('data-card-anatomy-part','footer');
 const rect=await action.boundingBox();
 expect(rect).not.toBeNull();
 expect(rect!.height).toBeLessThan(35);
});

test('Card: Deportes conserva su banda celeste y responsive no agrega scroll horizontal',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const sports=page.getByTestId('andy-card-anatomy-viewer').locator('.andy-family-card.is-sports');
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('height','50px');
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('background-image',/linear-gradient/);
 await page.setViewportSize({width:390,height:844});
 await expect(sports.locator('.andy-family-card-sports-head')).toHaveCSS('height','48px');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('Card: auxiliar MLZ y leyenda sin fondo se preservan',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 for(const item of [
  {part:'header',line:'rgb(3, 169, 244)'},
  {part:'content',line:'rgb(151, 71, 255)'},
  {part:'footer',line:'rgb(233, 30, 99)'},
 ]){
  const box=viewer.locator('[data-card-anatomy-part="'+item.part+'"]').first();
  await expect(box).toHaveCount(1);
  const computed=await box.evaluate(el=>({
   border:getComputedStyle(el,'::after').borderTopColor,
   elementBackground:getComputedStyle(el).backgroundColor,
  }));
  expect(computed.border).toBe(item.line);
  expect(computed.elementBackground).toBe('rgba(0, 0, 0, 0)');
  const legend=viewer.locator('.andy-card-anatomy-swatch.is-'+item.part);
  await expect(legend).toHaveCSS('border-top-color',item.line);
  await expect(legend).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 }
});
