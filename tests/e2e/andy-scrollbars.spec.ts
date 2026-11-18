import { test, expect } from '@playwright/test';

test('Andy: página y barras internas usan pista y thumb grises, estrechos y sin flechas', async ({ page, browserName }) => {
  await page.goto('/ui-kit-andy/fundamentos');

  const pageScroll = page.locator('.andy-scrollbar-demo-scroll.is-page');
  const dropdownScroll = page.locator('.andy-scrollbar-demo-scroll.is-dropdown');
  const hiddenScroll = page.locator('.andy-scrollbar-demo-scroll.is-hidden');

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
      trackToken: getComputedStyle(html).getPropertyValue('--andy-scroll-track').trim(),
      thumbToken: getComputedStyle(html).getPropertyValue('--andy-scroll-thumb').trim(),
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

  expect(style.trackToken).toBe('var(--color-grey-100)');
  expect(style.thumbToken).toBe('var(--color-grey-400)');
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
    expect(result.width).toBe('4px');
    expect(result.track).toBe('rgb(231, 231, 231)');
    expect(result.thumb).toBe('rgb(136, 136, 136)');
  } else {
    expect(result.nativeWidth).toBe('thin');
  }
});
