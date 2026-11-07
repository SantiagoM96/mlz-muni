import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const src = (path) => readFileSync(join(process.cwd(), path), 'utf8');

test('estándar institucional se usa en componentes y dos módulos reales', () => {
  const tokens = src('src/styles/tokens.css');
  for (const declaration of [
    '--text-institutional-body: 18px;', '--text-institutional-body--line-height: 26px;',
    '--text-institutional-section: 24px;', '--text-institutional-section--line-height: 30px;',
  ]) assert.ok(tokens.includes(declaration), 'Token faltante: ' + declaration);

  for (const path of [
    'src/shared/ui/Button.tsx', 'src/shared/ui/IconLink.tsx',
    'src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx',
    'src/modules/agenda/components/shared/AgendaIntro.tsx',
    'src/modules/agenda/components/public/ActivityDescription.tsx',
  ]) assert.ok(src(path).includes('text-institutional-body'), 'Falta adopción: ' + path);

  const form = src('src/modules/agenda/consolePreview/ConsoleFormPrimitives.tsx');
  assert.ok(form.includes("consoleCheckboxClass = 'h-5 w-5 accent-primary-600'"));
  assert.ok(form.includes('text-institutional-section'));
  for (const path of [
    'ConsoleGeneralInfoSection.tsx', 'ConsoleScheduleAdditionalFields.tsx', 'ConsoleImagesSection.tsx',
  ]) assert.ok(src('src/modules/agenda/consolePreview/' + path).includes('className={consoleCheckboxClass}'));

  const general = src('src/modules/agenda/consolePreview/ConsoleFormPrimitives.tsx');
  const schedule = src('src/modules/agenda/consolePreview/ConsoleScheduleFormPrimitives.tsx');
  assert.ok(general.includes('rounded-[4px]'), 'No modificar radio de formulario general');
  assert.ok(schedule.includes('rounded-[6px]'), 'No modificar radio del editor');
  assert.ok(src('src/modules/agenda/components/public/ActivityCharacteristic.tsx').includes('leading-[22px]'),
    'Preservar la excepción de 18/22 en los datos de tarjetas');
});
