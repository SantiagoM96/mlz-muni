import { test, expect } from '@playwright/test';

test('Andy: página y barras internas usan pista y thumb grises, estrechos y sin flechas', async ({ page, browserName }) => {
  await page.goto('/ui-kit-andy/fundamentos');

  const pageScroll = page.locator('.andy-scrollbar-demo-scroll.is-page');
  const dropdownScroll = page.locator('.andy-scrollbar-demo-scroll.is-dropdown');

  for (const scroller of [pageScroll, dropdownScroll]) {
    await expect(scroller).toBeVisible();
    const scrollable = await scroller.evaluate(el => el.scrollHeight > el.clientHeight);
    expect(scrollable).toBe(true);
  }

  const style = await page.evaluate(() => {
    const html = document.documentElement;
    const internal = document.querySelector('.andy-scrollbar-demo-scroll.is-dropdown')!;
    const hidden = document.querySelector('.andy-scrollbar-demo-scroll.is-hidden')!;
    const sidebar = document.querySelector('.andy-sidebar')!;
    const pseudo = (element: Element, selector: string) => getComputedStyle(element, selector);
    return {
      pageWidth: pseudo(html, '::-webkit-scrollbar').width,
      internalWidth: pseudo(internal, '::-webkit-scrollbar').width,
      pageTrack: pseudo(html, '::-webkit-scrollbar-track').backgroundColor,
      internalTrack: pseudo(internal, '::-webkit-scrollbar-track').backgroundColor,
      internalThumb: pseudo(internal, '::-webkit-scrollbar-thumb').backgroundColor,
      arrows: pseudo(internal, '::-webkit-scrollbar-button').display,
      internalNativeWidth: getComputedStyle(internal).scrollbarWidth,
      hiddenNativeWidth: getComputedStyle(hidden).scrollbarWidth,
      sidebarNativeWidth: getComputedStyle(sidebar).scrollbarWidth,
    };
  });

  expect(style.hiddenNativeWidth).toBe('none');
  expect(style.sidebarNativeWidth).toBe('none');

  if (browserName === 'chromium' || browserName === 'webkit') {
    expect(style.pageWidth).toBe('6px');
    expect(style.internalWidth).toBe('4px');
    expect(style.pageTrack).toBe('rgb(231, 231, 231)');
    expect(style.internalTrack).toBe('rgb(231, 231, 231)');
    expect(style.internalThumb).toBe('rgb(136, 136, 136)');
    expect(style.arrows).toBe('none');
    expect(style.internalNativeWidth).toBe('auto');
  } else {
    expect(style.internalNativeWidth).toBe('thin');
  }

  await dropdownScroll.evaluate(el => { el.scrollTop = 100; });
  expect(await dropdownScroll.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
});

test('Andy: dropdown de año muestra la barra interna del sistema sin ocultarla', async ({ page, browserName }) => {
  await page.goto('/ui-kit-andy/componentes/calendar');
  const sample = page.locator('#basico');
  await sample.getByRole('button', { name: 'Seleccionar año' }).click();
  const scroll = sample.locator('.sports-cal-choices');
  await expect(scroll).toBeVisible();
  const result = await scroll.evaluate(el => ({
    overflow: getComputedStyle(el).overflowY,
    width: getComputedStyle(el, '::-webkit-scrollbar').width,
    track: getComputedStyle(el, '::-webkit-scrollbar-track').backgroundColor,
    thumb: getComputedStyle(el, '::-webkit-scrollbar-thumb').backgroundColor,
    nativeWidth: getComputedStyle(el).scrollbarWidth,
    canScroll: el.scrollHeight > el.clientHeight,
  }));
  expect(result.canScroll).toBe(true);
  expect(result.overflow).toBe('auto');
  if (browserName === 'chromium' || browserName === 'webkit') {
    expect(result.nativeWidth).toBe('auto');
    expect(result.width).toBe('10px');
    expect(await scroll.evaluate(el => getComputedStyle(el, '::-webkit-scrollbar-thumb').borderLeftWidth)).toBe('6px');
    expect(result.track).toBe('rgb(231, 231, 231)');
    expect(result.thumb).toBe('rgb(136, 136, 136)');
  } else {
    expect(result.nativeWidth).toBe('thin');
  }
});


test('Andy: dropdown con y sin scroll utiliza todo el ancho disponible correctamente', async ({page, browserName})=>{
 await page.setViewportSize({width:900,height:768});
 await page.goto('/ui-kit-andy/componentes/select');
 const simple=page.locator('.andy-dropdown-variant[data-variant="simple"] .andy-dropdown-variant-options');
 const checkbox=page.locator('.andy-dropdown-variant[data-variant="checkbox"] .andy-dropdown-variant-options');
 await expect(simple).toBeVisible();
 await expect(checkbox).toBeVisible();
 const read=async (locator: typeof simple)=>locator.evaluate(el=>{
  const first=el.querySelector<HTMLElement>('.andy-dropdown-variant-option')!;
  return {
   scrolls:el.scrollHeight>el.clientHeight,
   paddingEnd:getComputedStyle(el).paddingInlineEnd,
   listRight:el.getBoundingClientRect().right,
   optionRight:first.getBoundingClientRect().right,
   trackWidth:getComputedStyle(el,'::-webkit-scrollbar').width,
   thumbInset:getComputedStyle(el,'::-webkit-scrollbar-thumb').borderLeftWidth,
  };
 });
 const noScroll=await read(simple);
 const scroll=await read(checkbox);
 expect(noScroll.scrolls).toBe(false);
 expect(noScroll.paddingEnd).toBe('0px');
 expect(noScroll.listRight-noScroll.optionRight).toBeLessThanOrEqual(1);
 expect(scroll.scrolls).toBe(true);
 expect(scroll.paddingEnd).toBe('0px');
 if(browserName==='chromium'||browserName==='webkit'){
  expect(scroll.trackWidth).toBe('10px');
  expect(scroll.thumbInset).toBe('6px');
  expect(scroll.listRight-scroll.optionRight).toBeGreaterThanOrEqual(9);
 }
});

test('Andy: dropdowns de hora y año muestran un hueco real antes de la pista', async ({page, browserName})=>{
 await page.setViewportSize({width:900,height:768});
 const checkGap=async (selector:string,inset:string,width:string)=>{
  const list=page.locator(selector);
  await expect(list).toBeVisible();
  const found=await list.evaluate(el=>({
   scrolls:el.scrollHeight>el.clientHeight,
   paddingEnd:getComputedStyle(el).paddingInlineEnd,
   trackWidth:getComputedStyle(el,'::-webkit-scrollbar').width,
   thumbInset:getComputedStyle(el,'::-webkit-scrollbar-thumb').borderLeftWidth,
  }));
  expect(found.scrolls).toBe(true);
  expect(found.paddingEnd).toBe('0px');
  if(browserName==='chromium'||browserName==='webkit'){
   expect(found.trackWidth).toBe(width);
   expect(found.thumbInset).toBe(inset);
  }
 };
 await page.goto('/ui-kit-andy/componentes/calendario');
 await page.locator('#fecha-y-hora').getByRole('button',{name:'Seleccionar hora'}).click();
 await checkGap('#fecha-y-hora .andy-dpv-time-options','4px','8px');

 await page.goto('/ui-kit-andy/componentes/calendar');
 await page.locator('#basico').getByRole('button',{name:'Seleccionar año'}).click();
 await checkGap('#basico .sports-cal-choices','6px','10px');
});
