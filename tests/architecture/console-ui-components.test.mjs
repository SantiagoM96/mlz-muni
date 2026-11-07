import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
const src = p => readFileSync(p, 'utf8');

test('consola reemplaza clases repetidas por componentes React reales', () => {
  for (const name of ['ConsoleScheduleDateFields', 'ConsoleScheduleAdditionalFields', 'ConsoleVenueSelector']) {
    const code = src('src/modules/agenda/consolePreview/' + name + '.tsx');
    assert.ok(code.includes('<FormField'), name + ' no usa FormField');
    assert.ok(!code.includes('className={inputClass}'), name + ' todavía usa inputClass');
    assert.ok(!code.includes('<Field '), name + ' conserva wrapper duplicado');
  }
  for (const name of ['ConsoleGeneralInfoSection', 'ConsoleScheduleAdditionalFields', 'ConsoleImagesSection']) {
    assert.ok(src('src/modules/agenda/consolePreview/' + name + '.tsx').includes('<CheckboxField'));
  }
  assert.ok(!existsSync('src/modules/agenda/consolePreview/ConsoleScheduleFormPrimitives.tsx'));
});
