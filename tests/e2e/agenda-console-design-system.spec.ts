import { expect, test } from '@playwright/test';

test('consola utiliza tokens compartidos en títulos, inputs y checkboxes', async ({ page }) => {
  await page.goto('/agenda-de-la-comunidad/consola-preview');
  const heading = page.getByRole('heading', { name: '1. Información general' });
  await expect(heading).toHaveCSS('font-size', '24px');
  await expect(heading).toHaveCSS('line-height', '30px');
  const title = page.locator('#console-title');
  await expect(title).toHaveCSS('color', 'rgb(61, 61, 61)');
  await expect(title).toHaveCSS('border-radius', '4px');

  const inclusive = page.getByRole('checkbox', { name: 'Disciplina inclusiva' });
  await expect(inclusive).toHaveCSS('accent-color', 'rgb(35, 105, 153)');
  const featured = page.getByRole('checkbox', { name: 'Destacar actividad' });
  await expect(featured).toHaveCSS('accent-color', 'rgb(35, 105, 153)');

  await page.getByRole('button', { name: 'Agregar', exact: true }).click();
  const schedule = page.locator('#console-schedule-kind');
  await expect(schedule).toHaveCSS('border-radius', '4px');
  const rain = page.getByRole('checkbox', { name: 'Se suspende por lluvia' });
  await expect(rain).toHaveCSS('accent-color', 'rgb(35, 105, 153)');
});

test('consola: selects, botones, días y modales aplican las reglas MLZ sin cambiar el flujo',async ({page})=>{
 await page.goto('/agenda-de-la-comunidad/consola-preview');
 const root=page.locator('.mlz-console');
 await expect(root).toBeVisible();
 const category=page.locator('#console-category');
 await expect(category).toHaveCSS('border-top-left-radius','4px');
 await expect(category).toHaveCSS('appearance','none');
 await expect(category.locator('..').locator('.console-select-chevron')).toHaveCSS('color','rgb(35, 105, 153)');
 const title=page.locator('#console-title');
 await title.fill('Actividad de prueba');
 await expect(title).toHaveValue('Actividad de prueba');
 await title.focus();
 await expect(title).toHaveCSS('border-top-color','rgb(0, 110, 255)');
 const add=page.getByRole('button',{name:'Agregar',exact:true});
 await expect(add).toHaveCSS('background-color','rgb(35, 105, 153)');
 await expect(add).toHaveCSS('padding-left','12px');
 await add.click();
 const editor=page.getByTestId('console-schedule-editor');
 await expect(editor).toBeVisible();
 await expect(editor.locator('#console-schedule-kind')).toHaveCSS('border-top-left-radius','4px');
 await editor.getByRole('combobox',{name:'Tipo de fecha'}).selectOption('recurring');
 const weekday=editor.locator('#console-schedule-weekdays button').first();
 await weekday.click();
 await expect(weekday).toHaveCSS('background-color','rgb(35, 105, 153)');
 await expect(editor.getByRole('button',{name:'Guardar programación'})).toHaveCSS('padding-left','18px');
});
