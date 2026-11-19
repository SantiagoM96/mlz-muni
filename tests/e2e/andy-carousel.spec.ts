import {test,expect} from '@playwright/test';

test('Carrusel: documentación reducida a Introducción, Banner Home, Galería y Anatomía',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const title=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 expect(title).toEqual(['Introducción','Banner Home','Galería','Anatomía']);
 await expect(page.locator('#variantes,#configuracion,#estados-e-interaccion,#responsive')).toHaveCount(0);
 await expect(page.getByTestId('andy-carousel-settings')).toHaveCount(0);
 await expect(page.getByTestId('andy-carousel-docs')).toBeVisible();
 await expect(page.locator('#anatomia .andy-doc-guideline-table tbody tr')).toHaveCount(7);
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

test('Carrusel: autoplay de 5 segundos se pausa con hover o interacción',async ({page})=>{
 await page.clock.install();
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-current','0');
 await expect(banner).toHaveAttribute('data-autoplay','running');
 await page.clock.fastForward(5100);
 await expect(banner).toHaveAttribute('data-current','1');
 await banner.hover();
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 await page.clock.fastForward(10100);
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
