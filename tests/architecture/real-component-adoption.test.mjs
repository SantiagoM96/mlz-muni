import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
const file = path => readFileSync(path, 'utf8');

const contracts = [
  ['PageTitle', ['src/modules/jovenes-en-comunidad/JovenesEnComunidadPage.tsx', 'src/modules/agenda/components/shared/AgendaIntro.tsx']],
  ['ActionLink', ['src/pages/home/HomePage.tsx', 'src/pages/not-found/NotFoundPage.tsx', 'src/modules/agenda/components/detail/ActivityRegistrationLink.tsx']],
  ['FormField', ['src/modules/agenda/consolePreview/ConsoleGeneralInfoSection.tsx', 'src/modules/agenda/consolePreview/ConsoleRegistrationSection.tsx', 'src/modules/agenda/consolePreview/ConsoleScheduleDateFields.tsx', 'src/modules/agenda/consolePreview/ConsoleVenueSelector.tsx']],
  ['TextField', ['src/modules/agenda/consolePreview/ConsoleGeneralInfoSection.tsx', 'src/modules/agenda/consolePreview/ConsoleVenueSelector.tsx']],
  ['SelectControl', ['src/modules/agenda/consolePreview/ConsoleRegistrationSection.tsx', 'src/modules/agenda/consolePreview/ConsoleScheduleDateFields.tsx']],
  ['TextAreaControl', ['src/modules/agenda/consolePreview/ConsoleGeneralInfoSection.tsx', 'src/modules/agenda/consolePreview/ConsoleScheduleAdditionalFields.tsx']],
  ['CheckboxField', ['src/modules/agenda/consolePreview/ConsoleGeneralInfoSection.tsx', 'src/modules/agenda/consolePreview/ConsoleImagesSection.tsx', 'src/modules/agenda/consolePreview/ConsoleScheduleAdditionalFields.tsx']],
];

test('todos los componentes institucionales nuevos tienen consumidores reales', () => {
  for (const [name, consumers] of contracts) {
    const source = consumers.map(p => file(p));
    for (const text of source) assert.ok(text.includes('<' + name), name + ' tiene consumidor sin componente real');
    assert.ok(consumers.length >= 2, name + ' no tiene adopción suficiente');
  }
});

test('consola no regresa a wrappers duplicados o constantes CSS', () => {
  const form = file('src/modules/agenda/consolePreview/ConsoleFormPrimitives.tsx');
  for(const old of ['consoleInputBaseClass', 'consoleCheckboxClass', 'export const inputClass']) assert.ok(!form.includes(old), old + ' fue reintroducido');
  assert.ok(!existsSync('src/modules/agenda/consolePreview/ConsoleScheduleFormPrimitives.tsx'));
  for(const p of [
    'src/modules/agenda/consolePreview/ConsoleScheduleDateFields.tsx',
    'src/modules/agenda/consolePreview/ConsoleScheduleAdditionalFields.tsx',
    'src/modules/agenda/consolePreview/ConsoleVenueSelector.tsx',
  ]) {
    assert.ok(!file(p).includes('className={inputClass}'), p + ' regresa a clases sin encapsular');
  }
});

test('shared/ui no conoce los modelos específicos de Agenda o Jóvenes', () => {
  for(const p of ['PageTitle.tsx', 'ActionLink.tsx', 'FormField.tsx', 'FormControls.tsx', 'CheckboxField.tsx']) {
    const src = file('src/shared/ui/' + p);
    assert.ok(!src.includes('modules/agenda') && !src.includes('modules/jovenes-en-comunidad'), p);
  }
});
