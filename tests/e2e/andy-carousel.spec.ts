import { test, expect } from '@playwright/test';

test('UI Kit: Carrusel aparece en navegación y sigue estructura solicitada',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/carrusel');
 await expect(page.getByTestId('andy-carousel-docs')).toBeVisible();
 await expect(page.locator('.andy-main-heading h2')).toHaveText('Carrusel');
 const titles=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 expect(titles).toEqual([
  'Introducción','Anatomía','Variantes','Configuración','Estados e interacción',
  'Responsive','Buenas prácticas',
 ]);
 const sidebar=page.locator('#andy-component-nav');
 const nav=sidebar.locator('a[href$="/componentes/carrusel"]');
 await expect(nav).toBeVisible();
 await expect(nav.locator('[aria-label="En revisión"]')).toHaveCount(1);
 await expect(nav.locator('[aria-label="Revisado"]')).toHaveCount(0);
 await expect(page.locator('#anatomia .andy-doc-guideline-table tbody tr')).toHaveCount(7);
});

test('UI Kit: banner automático usa cuatro bloques grises, guiones y navegación lateral',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-autoplay','running');
 await expect(banner).toHaveAttribute('data-current','0');
 await expect(banner.locator('.andy-carousel-placeholder')).toHaveCount(4);
 const dots=banner.getByRole('group',{name:'Elegir diapositiva'});
 await expect(dots.getByRole('button')).toHaveCount(4);
 const first=dots.getByRole('button',{name:'Ir a diapositiva 1'});
 const third=dots.getByRole('button',{name:'Ir a diapositiva 3'});
 await expect(first).toHaveAttribute('aria-current','true');
 await third.click();
 await expect(banner).toHaveAttribute('data-current','2');
 await expect(third).toHaveAttribute('aria-current','true');
 const widths=await dots.evaluate(element=>{
  const first=element.querySelector('button:first-child span')!;
  const active=element.querySelector('button:nth-child(3) span')!;
  return {small:first.getBoundingClientRect().width,large:active.getBoundingClientRect().width};
 });
 expect(widths.large).toBeGreaterThan(widths.small);

 await banner.getByRole('button',{name:'Diapositiva siguiente'}).click();
 await expect(banner).toHaveAttribute('data-current','3');
 await banner.getByRole('button',{name:'Diapositiva siguiente'}).click();
 await expect(banner).toHaveAttribute('data-current','0');
 await banner.getByRole('button',{name:'Pausar carrusel automático'}).click();
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 await banner.getByRole('button',{name:'Reanudar carrusel automático'}).click();
 // Recupera autoplay cuando no hay hover/foco.
 await expect(banner.getByRole('button',{name:'Pausar carrusel automático'})).toBeVisible();
});

test('UI Kit: banner realmente avanza al cabo de 5s y se pausa en hover',async ({page})=>{
 await page.clock.install();
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-autoplay','running');
 await page.clock.fastForward(5100);
 await expect(banner).toHaveAttribute('data-current','1');
 await banner.hover();
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 await page.clock.fastForward(10100);
 await expect(banner).toHaveAttribute('data-current','1');
});

test('UI Kit: galería deportiva utiliza tarjetas reales, swipe y flechas con límites',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const gallery=page.locator('#variantes [data-testid="mlz-carousel"].is-gallery');
 await expect(gallery).toHaveAttribute('data-autoplay','off');
 await expect(gallery.locator('.andy-family-card.is-sports')).toHaveCount(5);
 const viewport=gallery.getByTestId('mlz-carousel-viewport');
 await expect(viewport).toHaveCSS('scroll-snap-type','x mandatory');
 await expect(gallery.getByRole('button',{name:'Actividad anterior'})).toBeDisabled();
 await gallery.getByRole('button',{name:'Actividad siguiente'}).click();
 await expect(gallery).toHaveAttribute('data-current','1');
 await expect(gallery.getByRole('button',{name:'Actividad anterior'})).toBeEnabled();
 const max=5-Number(await gallery.getAttribute('data-visible'));
 for(let i=0;i<5;i++)await gallery.getByRole('button',{name:'Actividad siguiente'}).click();
 await expect(gallery).toHaveAttribute('data-current',String(max));
 await expect(gallery.getByRole('button',{name:'Actividad siguiente'})).toBeDisabled();
 await viewport.focus();
 await viewport.press('Home');
 await expect(gallery).toHaveAttribute('data-current','0');
 await viewport.press('ArrowRight');
 await expect(gallery).toHaveAttribute('data-current','1');
 await viewport.press('End');
 await expect(gallery).toHaveAttribute('data-current',String(max));
});

test('UI Kit: configuración ajusta carrusel y no tamaños de tarjeta',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const controls=page.getByTestId('andy-carousel-settings');
 const gallery=page.locator('#configuracion [data-testid="mlz-carousel"]');
 await controls.getByRole('group',{name:'Elementos visibles'}).getByRole('button',{name:'2'}).click();
 await expect(gallery).toHaveAttribute('data-visible','2');
 await controls.getByRole('group',{name:'Separación'}).getByRole('button',{name:'24 px'}).click();
 await expect(gallery).toHaveCSS('--mlz-carousel-gap','24px');
 await controls.getByRole('group',{name:'Alineación'}).getByRole('button',{name:'Centro'}).click();
 await expect(gallery.locator('.mlz-carousel-viewport')).toHaveClass(/is-center/);
 await controls.getByRole('group',{name:'Navegación'}).getByRole('button',{name:'Sin flechas'}).click();
 await expect(gallery.getByRole('button',{name:'Actividad siguiente'})).toHaveCount(0);
 await controls.getByRole('group',{name:'Navegación'}).getByRole('button',{name:'Con flechas'}).click();
 await controls.getByRole('group',{name:'Desplazamiento'}).getByRole('button',{name:'Por página'}).click();
 await controls.getByRole('group',{name:'Repetición'}).getByRole('button',{name:'Con loop'}).click();
 await gallery.getByRole('button',{name:'Actividad anterior'}).click();
 await expect(gallery).toHaveAttribute('data-current','3');
 await expect(gallery.locator('.andy-family-card')).toHaveCount(5);
});

test('UI Kit: responsive, auto no altera tarjetas y reduced motion desactiva autoplay',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/ui-kit-andy/componentes/carrusel');
 const banner=page.locator('#introduccion [data-testid="mlz-carousel"]');
 await expect(banner).toHaveAttribute('data-autoplay','paused');
 const gallery=page.locator('#responsive [data-testid="mlz-carousel"]');
 await expect(gallery).toHaveAttribute('data-visible','1');
 await expect(gallery.locator('.andy-family-card')).toHaveCount(5);
 const widths=await gallery.getByTestId('mlz-carousel-viewport').evaluate(el=>({
  client:el.clientWidth,scroll:el.scrollWidth,
 }));
 expect(widths.scroll).toBeGreaterThan(widths.client);
 await gallery.getByRole('button',{name:'Actividad siguiente'}).click();
 await expect(gallery).toHaveAttribute('data-current','1');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
