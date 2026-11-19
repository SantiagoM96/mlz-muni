import {test,expect} from '@playwright/test';

test('Carrusel: documentación reducida a Introducción, Banner Home, Galería y Anatomía',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const title=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 expect(title).toEqual(['Introducción','Banner Home','Galería','Anatomía']);
 await expect(page.locator('#variantes,#configuracion,#estados-e-interaccion,#responsive')).toHaveCount(0);
 await expect(page.getByTestId('andy-carousel-settings')).toHaveCount(0);
 await expect(page.getByTestId('andy-carousel-docs')).toBeVisible();
 await expect(page.locator('#anatomia .andy-doc-guideline-cards > .andy-doc-guideline-card')).toHaveCount(7);
 const nav=page.locator('#andy-component-nav a[href$="/componentes/carrusel"]');
 await expect(nav).toBeVisible();
 await expect(nav.locator('[aria-label="En revisión"]')).toHaveCount(1);
});

test('Carrusel: banner de portada mantiene alto, radio, flechas circulares translúcidas y solo guiones',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 const home=page.locator('#banner-home [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-autoplay','running');
 await expect(banner.locator('.andy-carousel-hero')).toHaveCount(4);
 await expect(home.locator('.andy-carousel-hero')).toHaveCount(4);
 const imageSources=await banner.locator('.andy-carousel-hero-photo').evaluateAll(nodes=>
  nodes.map(node=>(node as HTMLImageElement).getAttribute('src'))
 );
 expect(new Set(imageSources).size).toBe(4);
 const viewport=banner.getByTestId('mlz-carousel-viewport');
 await expect(viewport).toHaveCSS('border-top-left-radius','8px');
 const hero=await banner.locator('.andy-carousel-hero').first().boundingBox();
 expect(hero).not.toBeNull();
 expect(hero!.height).toBeGreaterThanOrEqual(260);
 expect(hero!.height).toBeLessThanOrEqual(355);

 const previous=banner.getByRole('button',{name:'Diapositiva anterior'});
 const next=banner.getByRole('button',{name:'Diapositiva siguiente'});
 for(const button of [previous,next]){
  await expect(button).toHaveCSS('border-top-left-radius','50%');
  const bg=await button.evaluate(node=>getComputedStyle(node).backgroundColor);
  expect(bg).toMatch(/^rgba\(/);
  expect(bg).not.toBe('rgb(255, 255, 255)');
 }
 const dots=banner.getByRole('group',{name:'Elegir diapositiva'});
 await expect(dots.getByRole('button')).toHaveCount(4);
 await expect(dots).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(banner.locator('.mlz-carousel-banner-controls')).toHaveCount(0);
 await expect(banner.locator('.mlz-carousel-play-toggle')).toHaveCount(0);
 await expect(banner.getByRole('button',{name:/Pausar|Reanudar/})).toHaveCount(0);
 const first=dots.getByRole('button',{name:'Ir a diapositiva 1'});
 await expect(first).toHaveAttribute('aria-current','true');
 await dots.getByRole('button',{name:'Ir a diapositiva 3'}).click();
 await expect(banner).toHaveAttribute('data-current','2');
 await next.click();
 await expect(banner).toHaveAttribute('data-current','3');
 await next.click();
 await expect(banner).toHaveAttribute('data-current','0');
});

test('Carrusel: autoplay de 4 segundos se pausa con hover o interacción',async ({page})=>{
 await page.clock.install();
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-current','0');
 await expect(banner).toHaveAttribute('data-autoplay','running');
 await page.clock.fastForward(4100);
 await expect(banner).toHaveAttribute('data-current','1');
 await banner.hover();
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 await page.clock.fastForward(8100);
 await expect(banner).toHaveAttribute('data-current','1');
});

test('Carrusel: Galería muestra cuatro fotografías sin tarjetas deportivas ni autoplay',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const gallery=page.locator('#galeria [data-testid="mlz-carousel"]');
 await expect(gallery).toHaveAttribute('data-autoplay','off');
 await expect(gallery.locator('.andy-carousel-photo img')).toHaveCount(4);
 await expect(gallery.locator('.andy-family-card')).toHaveCount(0);
 await expect(gallery.getByRole('group',{name:'Elegir diapositiva'})).toHaveCount(0);
 const urls=await gallery.locator('.andy-carousel-photo img').evaluateAll(nodes=>
  nodes.map(node=>(node as HTMLImageElement).getAttribute('src'))
 );
 expect(new Set(urls).size).toBe(4);
 for(const photo of await gallery.locator('.andy-carousel-photo img').all()){
  await expect(photo).toHaveAttribute('alt',/.+/);
 }
 const viewport=gallery.getByTestId('mlz-carousel-viewport');
 await expect(viewport).toHaveCSS('scroll-snap-type','x mandatory');
 await expect(viewport).toHaveCSS('scrollbar-width','none');
 const measure=await viewport.evaluate(el=>({
  client:el.clientWidth,scroll:el.scrollWidth,
  item:el.querySelector('.mlz-carousel-item')!.getBoundingClientRect().width,
 }));
 expect(measure.scroll).toBeGreaterThan(measure.client);
 expect(measure.item).toBeLessThan(measure.client/2);
 const previous=gallery.getByRole('button',{name:'Imagen anterior'});
 const next=gallery.getByRole('button',{name:'Imagen siguiente'});
 await expect(previous).toBeDisabled();
 await expect(next).toBeEnabled();
 await next.click();
 await expect(gallery).toHaveAttribute('data-current','1');
 await expect(previous).toBeEnabled();
 const last=4-Number(await gallery.getAttribute('data-visible'));
 for(let i=1;i<=last;i++)await next.click();
 await expect(gallery).toHaveAttribute('data-current',String(last));
 await expect(next).toBeDisabled();
 await viewport.focus();
 await viewport.press('Home');
 await expect(gallery).toHaveAttribute('data-current','0');
 await viewport.press('ArrowRight');
 await expect(gallery).toHaveAttribute('data-current','1');
});

test('Carrusel: Galería mobile mantiene swipe, parte de la siguiente foto y controles',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 const gallery=page.locator('#galeria [data-testid="mlz-carousel"]');
 await expect(gallery).toHaveAttribute('data-visible','1');
 const v=gallery.getByTestId('mlz-carousel-viewport');
 const measure=await v.evaluate(el=>({
  client:el.clientWidth,scroll:el.scrollWidth,
  item:el.querySelector('.mlz-carousel-item')!.getBoundingClientRect().width,
 }));
 expect(measure.scroll).toBeGreaterThan(measure.client);
 expect(measure.item).toBeLessThan(measure.client);
 await gallery.getByRole('button',{name:'Imagen siguiente'}).click();
 await expect(gallery).toHaveAttribute('data-current','1');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('Carrusel: los CTA blancos usan el color propio del banner y las tipografías son compactas',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#banner-home [data-testid="mlz-carousel"]');
 const expectedColors={
  blue:'rgb(4, 60, 105)',
  violet:'rgb(74, 36, 110)',
  green:'rgb(4, 94, 88)',
  coral:'rgb(158, 76, 85)',
 };
 for(const [tone,color] of Object.entries(expectedColors)){
  const hero=banner.locator('.andy-carousel-hero.is-'+tone);
  const cta=hero.locator('.andy-carousel-hero-cta');
  await expect(cta).toHaveCSS('background-color','rgb(255, 255, 255)');
  await expect(cta).toHaveCSS('color',color);
  const values=await hero.evaluate(el=>{
   const title=el.querySelector('.andy-carousel-hero-title')!;
   const description=el.querySelector('.andy-carousel-hero-description')!;
   const titleStyle=getComputedStyle(title);
   const descriptionStyle=getComputedStyle(description);
   return {
    titleLineHeight:parseFloat(titleStyle.lineHeight),
    titleFontSize:parseFloat(titleStyle.fontSize),
    descriptionLineHeight:parseFloat(descriptionStyle.lineHeight),
    descriptionFontSize:parseFloat(descriptionStyle.fontSize),
    copyHeight:el.querySelector('.andy-carousel-hero-copy')!.getBoundingClientRect().height,
    bannerHeight:el.getBoundingClientRect().height,
   };
  });
  expect(values.titleLineHeight/values.titleFontSize).toBeLessThan(1.03);
  expect(values.descriptionLineHeight/values.descriptionFontSize).toBeLessThan(1.25);
  expect(values.copyHeight).toBeLessThan(values.bannerHeight);
 }
 const fourth=banner.locator('.andy-carousel-hero.is-coral .andy-carousel-hero-photo');
 await expect(fourth).toHaveAttribute('src',/photo-1759143545924-beb85b33c0f1/);
 await expect(banner).toHaveAttribute('data-autoplay','running');
});

test('Catálogo MLZ: cada término es una ficha individual con título y explicación a 16 px',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 for(const component of ['carrusel','mensaje','acordeon','tarjeta']){
  await page.goto('/ui-kit-andy/componentes/'+component);
  const anatomy=page.locator('#anatomia .andy-doc-guideline-cards').first();
  await expect(anatomy).toBeVisible();
  const cards=anatomy.locator(':scope > .andy-doc-guideline-card');
  expect(await cards.count()).toBeGreaterThanOrEqual(4);
  await expect(anatomy).toHaveCSS('border-top-style','none');
  for(const card of await cards.all()){
   await expect(card).toHaveCSS('background-color','rgb(255, 255, 255)');
   await expect(card).toHaveCSS('border-top-width','1px');
   await expect(card).toHaveCSS('border-top-style','solid');
   await expect(card.locator('dt')).toHaveCSS('font-size','16px');
   await expect(card.locator('dd')).toHaveCSS('font-size','16px');
   await expect(card.locator('dt')).toHaveCSS('line-height','24px');
   await expect(card.locator('dd')).toHaveCSS('line-height','24px');
  }
  await expect(anatomy.locator('table,thead,tbody,tr')).toHaveCount(0);
 }
 // También alcanza Especificaciones y Comportamiento, no solo Anatomía.
 await page.goto('/ui-kit-andy/componentes/mensaje');
 for(const section of ['#especificaciones','#comportamiento-y-accesibilidad']){
  const grid=page.locator(section+' .andy-doc-guideline-cards');
  await expect(grid).toBeVisible();
  const cards=grid.locator(':scope > .andy-doc-guideline-card');
  expect(await cards.count()).toBeGreaterThan(2);
  await expect(cards.first().locator('dt')).toHaveCSS('font-size','16px');
  await expect(cards.first().locator('dd')).toHaveCSS('font-size','16px');
 }
});

test('Catálogo MLZ: las fichas se organizan en dos columnas si entran y una en mobile',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const grid=page.locator('#anatomia .andy-doc-guideline-cards');
 const cards=grid.locator(':scope > .andy-doc-guideline-card');
 const rects=await cards.evaluateAll(elements=>elements.slice(0,3).map(el=>({
  left:el.getBoundingClientRect().left,top:el.getBoundingClientRect().top,
  width:el.getBoundingClientRect().width
 })));
 expect(Math.abs(rects[0].top-rects[1].top)).toBeLessThan(2);
 expect(rects[1].left).toBeGreaterThan(rects[0].left+rects[0].width);
 expect(rects[2].top).toBeGreaterThan(rects[0].top);
 await page.setViewportSize({width:390,height:844});
 const mobileRects=await cards.evaluateAll(elements=>elements.slice(0,3).map(el=>({
  left:el.getBoundingClientRect().left,top:el.getBoundingClientRect().top,
 })));
 expect(mobileRects[1].top).toBeGreaterThan(mobileRects[0].top);
 expect(Math.abs(mobileRects[0].left-mobileRects[1].left)).toBeLessThan(2);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
