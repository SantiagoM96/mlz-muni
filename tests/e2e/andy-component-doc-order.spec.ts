import { test, expect } from '@playwright/test';

// Los componentes con check siguen una estructura editorial compartida:
// descripción -> ejemplos -> estados (cuando corresponda) -> anatomía -> especificaciones -> comportamiento.
const reviewed=['acordeon','mensaje','dialog','alert-dialog','avatar','chips','breadcrumb','boton','button-group','calendar','calendario'] as const;
for(const id of reviewed){
 test('UI Kit: estructura de documentación aprobada en '+id,async ({page})=>{
  await page.goto('/ui-kit-andy/componentes/'+id);
  const headings=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
  expect(headings[0]).toBe('Descripción');
  const anatomy=headings.indexOf('Anatomía');
  const specs=headings.indexOf('Especificaciones');
  const behavior=headings.indexOf('Comportamiento y accesibilidad');
  expect(anatomy).toBeGreaterThan(0);
  expect(specs).toBeGreaterThan(anatomy);
  expect(behavior).toBeGreaterThan(specs);
  const states=headings.indexOf('Estados');
  if(states>=0)expect(states).toBe(anatomy-1);
 });
}
test('Date Picker: Estados del campo aparece antes de Anatomía',async ({page})=>{
 await page.goto('/ui-kit-andy/componentes/calendario');
 const headings=await page.locator('.andy-doc-page .andy-doc-section > .andy-doc-section-heading h3').allTextContents();
 expect(headings.indexOf('Estados del campo')).toBeLessThan(headings.indexOf('Anatomía'));
 expect(headings).not.toContain('RTL');
});
