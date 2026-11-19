import { expect, test } from '@playwright/test';

test('Andy: índice por familias y navegación a componentes individuales', async ({page})=>{
 await page.goto('/ui-kit-andy/componentes');
 await expect(page.getByRole('heading',{level:2,name:'Componentes'})).toBeVisible();
 const nav=page.getByRole('navigation',{name:'Navegación del Design System'});
 const isMobile=await page.evaluate(()=>innerWidth<=790);
 if(isMobile)await page.getByRole('button',{name:'Componentes',exact:true}).click();
 await expect(nav.getByRole('link',{name:'Dropdown / Select'})).toBeVisible();
 await nav.getByRole('link',{name:'Dropdown / Select'}).click();
 await expect(page).toHaveURL(/\/ui-kit-andy\/componentes\/select$/);
 await expect(page.getByRole('heading',{level:2,name:'Dropdown / Select'})).toBeVisible();
 await expect(page.getByText('Variantes de menú abierto')).toBeVisible();
 if(isMobile)await page.getByRole('button',{name:'Componentes',exact:true}).click();
 await nav.getByRole('link',{name:'Calendario / Date Picker'}).click();
 await expect(page).toHaveURL(/\/ui-kit-andy\/componentes\/calendario$/);
 await expect(page.getByRole('heading',{level:2,name:'Calendario / Date Picker'})).toBeVisible();
 await expect(page.locator('.andy-matrix-calendar-sample')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('Andy: acordeón agrupa variantes en ejemplos separados',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/acordeon');
 await expect(page.getByRole('heading',{level:3,name:'Apertura única'})).toBeVisible();
 await expect(page.getByRole('heading',{level:3,name:'Apertura múltiple'})).toBeVisible();
 const example=page.locator('.andy-doc-example').first();
 await expect(example.getByRole('button',{name:'¿Cómo puedo inscribirme?'})).toHaveAttribute('aria-expanded','true');
 await example.getByRole('button',{name:'¿Puedo cambiar el horario?'}).click();
 await expect(example.getByRole('button',{name:'¿Cómo puedo inscribirme?'})).toHaveAttribute('aria-expanded','false');
 await expect(example.getByRole('button',{name:'¿Puedo cambiar el horario?'})).toHaveAttribute('aria-expanded','true');
});

test('Andy: enlaces clásicos de las galerías permanecen disponibles',async ({page})=>{
 await page.goto('/ui-kit-andy/formularios');
 await expect(page.getByRole('heading',{level:2,name:'Formularios'})).toBeVisible();
 await expect(page.getByText('Componentes de formulario')).toBeVisible();
 await page.goto('/ui-kit-andy/componentes');
 await expect(page.getByRole('heading',{level:3,name:'Campos de formulario'})).toBeVisible();
});

test('Andy: Field e Input separan composición y control',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/field');
 await expect(page.getByRole('heading',{level:2,name:'Field'})).toBeVisible();
 for(const heading of ['Composición','Anatomía','Field Group','Field Set','Responsive Layout','Validación y errores','Accesibilidad'])
  await expect(page.getByRole('heading',{level:3,name:heading})).toBeVisible();
 const nav=page.locator('#andy-component-nav');
 if(await page.evaluate(()=>innerWidth<=790))await page.getByRole('button',{name:'Abrir menú de componentes'}).click();
 const fieldLink=nav.getByRole('link',{name:'Field',exact:true});
 await expect(nav.getByRole('link',{name:'Input',exact:true})).toBeVisible();
 const formLinks=await fieldLink.locator('..').getByRole('link').allTextContents();
 expect(formLinks.indexOf('Field')).toBeLessThan(formLinks.indexOf('Input'));
 await page.goto('/ui-kit-andy/componentes/input');
 await expect(page.getByRole('heading',{level:2,name:'Input'})).toBeVisible();
 for(const heading of ['Básico','Field','Estados','Disabled','Invalid','Required','Inline','Grid'])
  await expect(page.getByRole('heading',{level:3,name:heading})).toBeVisible();
 await expect(page.locator('#estados .andy-state-cell')).toHaveCount(6);
 const version=page.locator('.andy-header .andy-version');
 await expect(version.locator('time')).toHaveAttribute('datetime',/.+/);
 await expect(version.locator('time')).toHaveText(/^\d{2}:\d{2}$/);
});


test('Andy: los seis estados comparten una sola caja exterior sin tarjetas individuales',async ({page})=>{
 for(const slug of ['input','select','textarea','calendario','adjuntos']){
  await page.goto('/ui-kit-andy/componentes/'+slug);
  const frame=page.locator('.andy-doc-preview').first();
  await expect(frame).toBeVisible();
  await expect(frame.locator('.andy-state-cell')).toHaveCount(6);
  await expect(frame.locator('.andy-state-cell').first()).toHaveCSS('border-top-style','none');
  await expect(frame.locator('.andy-state-cell').first()).toHaveCSS('padding-top','0px');
 }
});

test('Andy: scrollbars documentadas y sidebar desplazable sin barra visible',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/scrollbars');
 await expect(page.getByRole('heading',{name:'Barras de scroll'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Barra principal · página'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Barra interna · dropdown y drawer'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Barra oculta · navegación lateral'})).toBeVisible();
 await expect(page.locator('.andy-scrollbar-demo-scroll')).toHaveCount(3);
 await expect(page.locator('.andy-scrollbar-demo-scroll.is-hidden')).toHaveCSS('scrollbar-width','none');
 await expect(page.locator('.andy-scrollbar-demo-scroll.is-dropdown')).toHaveCSS('scrollbar-width','thin');
 const sidebar=page.locator('.andy-sidebar');
 await expect(sidebar).toHaveCSS('scrollbar-width','none');
 await expect(sidebar).toHaveCSS('overflow-y','auto');
});


test('Andy: guías de espaciado y border radius usan la escala institucional compartida',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/espaciados');
 const guide=page.getByTestId('andy-spacing-guide');
 await expect(guide).toBeVisible();
 for(const size of [2,4,6,8,10,12,14,16,24,32,40,48,56,64])
   await expect(guide.getByText(size+' px',{exact:true})).toHaveCount(1);
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--mlz-space-64').trim())).toBe('64px');
 await page.goto('/ui-kit-andy/componentes/border-radius');
 await expect(page.getByTestId('andy-radius-guide')).toBeVisible();
 for(const token of ['--mlz-radius-xs','--mlz-radius-sm','--mlz-radius-md','--mlz-radius-lg','--mlz-radius-xl','--mlz-radius-2xl','--mlz-radius-full'])
  expect(await page.evaluate(t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),token)).not.toBe('');
});


test('Andy: header con marca Lomas UI en SVG y documentación full width',async ({page})=>{
 await page.setViewportSize({width:1600,height:900});
 await page.goto('/ui-kit-andy/componentes/boton');
 const header=page.locator('.andy-header');
 await expect(header).toHaveCSS('border-bottom-width','0px');
 const heading=header.locator('.andy-topbar-heading');
 const logo=heading.locator('h1 img');
 await expect(logo).toHaveAttribute('alt','Lomas UI — Design System');
 await expect(logo).toHaveAttribute('src',/\/assets\/andy-kit\/lomas-ui-logo\.svg$/);
 await expect(logo).toHaveCSS('width','192px');
 await expect(header.locator('.andy-topbar')).toHaveCSS('min-height','104px');
 await expect(heading.locator('.andy-eyebrow')).toHaveCount(0);
 const svg=await logo.evaluate(async image=>(await fetch((image as HTMLImageElement).src)).text());
 expect(svg).toContain('fill="#000000"');
 expect(svg).not.toContain('#1E1E1E');
 await expect(header.locator('.andy-version')).toHaveCSS('border-top-width','1px');
 const container=page.locator('.andy-doc-body');
 const measurements=await container.evaluate(el=>{
  const outer=el.getBoundingClientRect();
  const main=el.querySelector('.andy-doc-main')?.getBoundingClientRect();
  const left=el.querySelector('.andy-sidebar')?.getBoundingClientRect();
  const right=el.querySelector('.andy-doc-toc')?.getBoundingClientRect();
  return {width:outer.width,left:left?.left??0,right:right?.right??0,mainWidth:main?.width??0};
 });
 expect(measurements.width).toBeGreaterThan(1500);
 expect(measurements.left).toBeLessThan(40);
 expect(measurements.right).toBeGreaterThan(1500);
 expect(measurements.mainWidth).toBeGreaterThan(900);
});


test('Andy: enlace Componentes y flechas del directorio respetan la geometría del sistema',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes');
 const nav=page.getByRole('navigation',{name:'Navegación del Design System'});
 const parent=nav.getByRole('link',{name:'Componentes',exact:true});
 const child=nav.getByRole('link',{name:'Espaciados'});
 await expect(parent).toHaveCSS('margin-left','0px');
 await expect(parent).toHaveCSS('width',await child.evaluate(e=>getComputedStyle(e).width));
 const tile=page.locator('.andy-directory-grid > a').first();
 const arrow=tile.locator('.material-symbols-outlined');
 await expect(arrow).toHaveCSS('color','rgb(35, 105, 153)');
 const centers=await tile.evaluate(el=>{
  const parent=el.getBoundingClientRect();
  const child=el.querySelector('.material-symbols-outlined')!.getBoundingClientRect();
  return {parent:parent.top+parent.height/2,child:child.top+child.height/2};
 });
 expect(Math.abs(centers.parent-centers.child)).toBeLessThan(2);
});


test('Andy: buscador lateral filtra componentes sin perder sus categorías',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes');
 const nav=page.getByRole('navigation',{name:'Navegación del Design System'});
 const search=nav.getByRole('searchbox',{name:'Buscar componentes'});
 await search.fill('calendario');
 await expect(nav.getByRole('link',{name:'Calendario / Date Picker'})).toBeVisible();
 await expect(nav.getByRole('link',{name:'Dropdown / Select'})).toHaveCount(0);
 await search.fill('violeta');
 await expect(nav.getByText('No encontramos componentes.')).toBeVisible();
 await nav.getByRole('button',{name:'Limpiar búsqueda'}).click();
 await expect(nav.getByRole('link',{name:'Dropdown / Select'})).toBeVisible();
 await expect(search).toHaveValue('');
});


test('Andy: la UI del catálogo usa píldoras Info 500 sin alterar componentes de ejemplo',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes/boton');
 const nav=page.getByRole('navigation',{name:'Navegación del Design System'});
 const activeNav=nav.getByRole('link',{name:'Botones',exact:true});
 await expect(activeNav).toHaveCSS('background-color','rgb(0, 110, 255)');
 await expect(activeNav).toHaveCSS('border-top-left-radius','9999px');
 const search=nav.getByRole('searchbox',{name:'Buscar componentes'});
 await expect(search.locator('..')).toHaveCSS('border-top-left-radius','9999px');
 await search.focus();
 await expect(search.locator('..')).toHaveCSS('border-top-color','rgb(0, 110, 255)');
 const version=page.locator('.andy-header .andy-version');
 await expect(version).toHaveCSS('border-top-left-radius','9999px');
 const toc=page.getByRole('complementary',{name:'En esta página'});
 await expect(toc.locator('a').first()).toHaveCSS('border-top-left-radius','9999px');
 const primarySample=page.locator('#variantes .andy-system-button.is-primary').first();
 await expect(primarySample).toHaveCSS('background-color','rgb(35, 105, 153)');
 await expect(primarySample).toHaveCSS('border-top-left-radius','4px');
});



test('Andy: Button, Button Group, Calendar y Date Picker muestran check de revisado',async ({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/ui-kit-andy/componentes');
 const nav=page.locator('#andy-component-nav');
 for(const slug of ['boton','button-group','calendar','calendario']){
  const link=nav.locator('a[href$="/componentes/'+slug+'"]');
  await expect(link).toHaveCount(1);
  const mark=link.locator('.andy-nav-review-mark');
  await expect(mark).toBeVisible();
  await expect(mark).toHaveAttribute('aria-label','Revisado');
  await expect(mark).not.toHaveClass(/andy-nav-progress-mark/);
 }
});

test('Andy: Cairo se aplica a la documentación y Geometria se mantiene en las demos',async ({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/ui-kit-andy/componentes/tarjeta');
 const editorial=page.locator('.andy-doc-layout');
 const heading=page.locator('.andy-doc-section-heading>h3').first();
 const sidebar=page.locator('.andy-sidebar');
 const specimen=page.locator('#basico .andy-municipal-card-appointment');
 for(const locator of [editorial,heading,sidebar]){
  await expect(locator).toHaveCSS('font-family',/Cairo/);
 }
 await expect(page.locator('#basico .andy-doc-demo')).toHaveCSS('font-family',/Geometria/);
 await expect(specimen).toHaveCSS('font-family',/Geometria/);
 await expect(page.locator('.andy-doc-example-group button').first()).toHaveCSS('font-family',/Cairo/);
});

test('Andy: logotipo y alto de header se adaptan en mobile sin overflow horizontal',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/ui-kit-andy/fundamentos');
 const header=page.locator('.andy-header');
 const topbar=header.locator('.andy-topbar');
 const logo=header.locator('.andy-kit-brand img');
 await expect(topbar).toHaveCSS('min-height','90px');
 await expect(logo).toBeVisible();
 const size=await logo.boundingBox();
 expect(size).not.toBeNull();
 expect(size!.width).toBeGreaterThan(115);
 expect(size!.width).toBeLessThan(170);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
