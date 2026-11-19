import { test, expect } from '@playwright/test';

test('UI Kit: las nuevas secciones de Card preceden las seis tarjetas seleccionadas',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const titles=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 const newBlocks=['Descripción','Básico','Composición','Tamaños','Espaciado','Imagen','Estados','Anatomía','Especificaciones','Comportamiento y accesibilidad','Aplicaciones municipales'];
 const original=['Deportes Anual','Agenda de la Comunidad','Noticias','Turnos online','Trámites destacados','Eventos con fecha'];
 expect(titles.slice(0,newBlocks.length)).toEqual(newBlocks);
 expect(titles.slice(newBlocks.length)).toEqual(original);
 await expect(page.locator('.andy-family-card-gallery>.andy-doc-section')).toHaveCount(2);
 await expect(page.locator('.andy-municipal-card-gallery>.andy-doc-section')).toHaveCount(4);
 await expect(page.locator('.andy-family-card-gallery [data-testid="andy-family-card-sports"]')).toHaveCount(1);
 await expect(page.locator('.andy-family-card-gallery [data-testid="andy-family-card-agenda"]')).toHaveCount(1);
 await expect(page.getByTestId('andy-municipal-card-gallery').locator('article')).toHaveCount(4);
});

test('UI Kit: Básico, Tamaños, Espaciado, Imagen y Estados utilizan cards existentes',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 await expect(page.locator('#basico .andy-municipal-card-appointment')).toHaveCount(1);
 await expect(page.locator('#tamanos .andy-municipal-card-appointment')).toHaveCount(1);
 await expect(page.locator('#espaciado .andy-municipal-card-appointment')).toHaveCount(1);
 await expect(page.locator('#imagen .andy-municipal-card-news')).toHaveCount(1);
 await expect(page.locator('#estados [data-testid="agenda-card"]')).toHaveCount(1);
 await expect(page.locator('.andy-card-foundation-sample')).toHaveCount(0);
 await expect(page.locator('.mlz-card')).toHaveCount(0);

 const widths=page.getByRole('group',{name:'Ancho de Card'});
 const sample=page.locator('#tamanos .andy-card-real-size');
 await widths.getByRole('button',{name:'340 px'}).click();
 await expect(sample).toHaveCSS('max-width','420px');
 const narrow=await sample.boundingBox();
 expect(narrow).not.toBeNull();
 expect(narrow?.width).toBeLessThanOrEqual(340);
 await widths.getByRole('button',{name:'420 px'}).click();
 const wide=await sample.boundingBox();
 expect(wide).not.toBeNull();
 expect(wide!.width).toBeGreaterThan(narrow!.width);

 const control=page.getByRole('group',{name:'Espaciado de Card'});
 const content=page.locator('#espaciado .andy-municipal-card-appointment .andy-municipal-card-content');
 for(const value of [16,20,24,32]){
  await control.getByRole('button',{name:value+' px'}).click();
  await expect(content).toHaveCSS('padding-top',value+'px');
  await expect(content).toHaveCSS('padding-left',value+'px');
  await expect(content).toHaveCSS('gap',value+'px');
 }
 const originalCard=page.locator('.andy-municipal-card-gallery .andy-municipal-card-appointment .andy-municipal-card-content');
 await expect(originalCard).toHaveCSS('padding-left','24px');

 const imageControl=page.getByRole('group',{name:'Tarjeta con imagen'});
 await imageControl.getByRole('button',{name:'Agenda de la Comunidad'}).click();
 await expect(page.locator('#imagen [data-testid="agenda-card"]')).toHaveCount(1);
 await imageControl.getByRole('button',{name:'Noticias'}).click();
 await expect(page.locator('#imagen .andy-municipal-card-news img')).toHaveAttribute('alt',/.+/);

 const states=page.getByRole('group',{name:'Estado de Card'});
 await states.getByRole('button',{name:'Hover'}).click();
 await expect(page.locator('#estados .andy-card-real-states')).toHaveAttribute('data-preview-state','hover');
 await expect(page.locator('#estados [data-testid="agenda-card"]')).not.toHaveCSS('box-shadow','none');
 await states.getByRole('button',{name:'Focus'}).click();
 const focus=page.locator('#estados [data-testid="agenda-card"] a[href]');
 await expect(focus).toHaveCSS('outline-style','solid');
 await states.getByRole('button',{name:'Default'}).click();
 await expect(page.locator('#estados .andy-card-real-states')).toHaveAttribute('data-preview-state','default');
});

test('UI Kit: todos los controles editoriales de Card siguen los grises agrupados de Button',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 for(const label of ['Tarjeta municipal','Ancho de Card','Espaciado de Card','Tarjeta con imagen','Estado de Card']){
  const group=page.getByRole('group',{name:label});
  await expect(group).toBeVisible();
  const selected=group.getByRole('button',{pressed:true}).first();
  await expect(selected).toHaveCSS('background-color','rgb(231, 231, 231)');
  await expect(selected).toHaveCSS('border-top-color','rgb(136, 136, 136)');
 }
});

test('UI Kit: Composition usa seis tarjetas y resalta con bordes CSS dashed finos y tintes tenues',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 const buttons=viewer.getByRole('group',{name:'Tarjeta municipal'});
 await expect(buttons.getByRole('button')).toHaveCount(6);
 await expect(viewer.locator('.andy-card-anatomy-swatch')).toHaveCount(3);
 await expect(viewer.locator('.andy-card-anatomy-stage')).toHaveCSS('background-color','rgb(255, 255, 255)');
 const expected=[
  {label:'Deportes Anual',header:1,content:1,footer:1,root:'.andy-family-card.is-sports'},
  {label:'Agenda de la Comunidad',header:1,content:1,footer:1,root:'[data-testid="agenda-card"]'},
  {label:'Noticias',header:1,content:1,footer:1,root:'.andy-municipal-card-news'},
  {label:'Turnos online',header:1,content:1,footer:1,root:'.andy-municipal-card-appointment'},
  {label:'Trámites destacados',header:1,content:1,footer:1,root:'.andy-municipal-card-procedure'},
  {label:'Eventos con fecha',header:1,content:1,footer:1,root:'.andy-municipal-card-event'},
 ] as const;
 for(const item of expected){
  await buttons.getByRole('button',{name:item.label,exact:true}).click();
  const stage=viewer.locator('.andy-card-anatomy-stage');
  await expect(stage.locator(item.root)).toHaveCount(1);
  for(const part of ['header','content','footer'] as const){
   const regions=stage.locator('[data-card-anatomy-part="'+part+'"]');
   await expect(regions).toHaveCount(item[part]);
   if(item[part]>0){
    const css=await regions.first().evaluate(el=>({
     width:getComputedStyle(el,'::after').borderTopWidth,
     style:getComputedStyle(el,'::after').borderTopStyle,
     color:getComputedStyle(el).backgroundColor,
    }));
    expect(css.width).toBe('1px');
    expect(css.style).toBe('dashed');
    expect(css.color).toMatch(/rgba?\(/);
   }
  }
  await expect(stage.getByText('CardTitle',{exact:true})).toHaveCount(0);
  await expect(stage.getByText('CardContent',{exact:true})).toHaveCount(0);
  await expect(stage.getByText('CardFooter',{exact:true})).toHaveCount(0);
 }
 await buttons.getByRole('button',{name:'Deportes Anual'}).click();
 await expect(buttons.getByRole('button',{name:'Deportes Anual'})).toHaveAttribute('aria-pressed','true');
});

test('UI Kit: visor de Agenda no navega y galería original se conserva',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 await viewer.getByRole('group',{name:'Tarjeta municipal'}).getByRole('button',{name:'Agenda de la Comunidad'}).click();
 const agendaLink=viewer.locator('[data-testid="agenda-card"] a[href]').first();
 await agendaLink.click();
 await expect(page).toHaveURL(/\/ui-kit-andy\/componentes\/tarjeta$/);
 await expect(page.locator('.andy-family-card-gallery > .andy-doc-section')).toHaveCount(2);
 await expect(page.locator('.andy-municipal-card-gallery > .andy-doc-section')).toHaveCount(4);
});

test('UI Kit: Deportes recupera banda celeste de 50px y cuerpo blanco en desktop y mobile',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const sports=page.locator('.andy-family-card-gallery .andy-family-card.is-sports');
 const head=sports.locator('.andy-family-card-sports-head');
 await expect(head).toHaveCSS('height','50px');
 await expect(head).toHaveCSS('background-image',/linear-gradient/);
 await expect(sports).toHaveCSS('background-color','rgb(255, 255, 255)');
 await page.setViewportSize({width:390,height:844});
 await expect(head).toHaveCSS('height','48px');
});

test('UI Kit: Card responsive sin scroll horizontal involuntario',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 await viewer.getByRole('group',{name:'Tarjeta municipal'}).getByRole('button',{name:'Trámites destacados'}).click();
 await expect(viewer.locator('.andy-municipal-card-procedure')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('UI Kit: Eventos muestra imagen propia y cajas agrupadas con aire y acción breve',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const viewer=page.getByTestId('andy-card-anatomy-viewer');
 await viewer.getByRole('group',{name:'Tarjeta municipal'}).getByRole('button',{name:'Eventos con fecha'}).click();
 const sample=viewer.locator('.andy-municipal-card-event');
 await expect(sample.locator('img.andy-municipal-card-event-image')).toHaveAttribute('src',/jazz-internacional\.svg$/);
 await expect(sample.locator('.andy-municipal-card-event-heading')).toHaveAttribute('data-card-anatomy-part','header');
 await expect(sample.locator('.andy-municipal-card-event-details')).toHaveAttribute('data-card-anatomy-part','content');
 await expect(sample.locator('.andy-municipal-card-info')).toHaveCount(2);
 await expect(sample.locator('.andy-municipal-card-info[data-card-anatomy-part]')).toHaveCount(0);
 const footer=sample.locator('.andy-municipal-card-action');
 await expect(footer).toHaveAttribute('data-card-anatomy-part','footer');
 const footerBox=await footer.boundingBox();
 expect(footerBox).not.toBeNull();
 expect(footerBox!.height).toBeLessThan(35);
 const padding=await footer.evaluate(el=>({
  borderInset:getComputedStyle(el,'::after').top,
  borderWidth:getComputedStyle(el,'::after').borderTopWidth,
 }));
 expect(padding.borderInset).toBe('-8px');
 expect(padding.borderWidth).toBe('1px');
 const originalFooter=page.locator('.andy-municipal-card-gallery .andy-municipal-card-event .andy-municipal-card-action');
 await expect(originalFooter).toHaveCSS('padding-top','14px');
});

test('UI Kit: seis superficies de Card son blancas y Licencias ya no usa fondo primario',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 for(const cls of ['news','appointment','procedure','event']){
  await expect(page.locator('.andy-municipal-card-gallery .andy-municipal-card-'+cls))
   .toHaveCSS('background-color','rgb(255, 255, 255)');
 }
 await expect(page.locator('.andy-family-card-gallery .andy-family-card.is-sports'))
  .toHaveCSS('background-color','rgb(255, 255, 255)');
 await expect(page.locator('.andy-family-card-gallery [data-testid="agenda-card"]'))
  .toHaveCSS('background-color','rgb(255, 255, 255)');
 await expect(page.locator('.andy-municipal-card-gallery .andy-municipal-card-shortcut')).toHaveCount(0);
 await expect(page.locator('.andy-municipal-card-gallery .andy-municipal-card-service')).toHaveCount(0);
});
