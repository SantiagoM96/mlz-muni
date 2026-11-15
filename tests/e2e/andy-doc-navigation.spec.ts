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
