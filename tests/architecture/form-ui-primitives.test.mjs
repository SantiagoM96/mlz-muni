import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
const src = path => readFileSync(path, 'utf8');

test('FormField y controles son componentes React adoptados, no solo clases', () => {
  assert.match(src('src/shared/ui/FormField.tsx'), /export function FormField/);
  const controls = src('src/shared/ui/FormControls.tsx');
  for(const name of ['TextField', 'SelectControl', 'TextAreaControl']) assert.ok(controls.includes('export function ' + name));
  for(const path of [
    'src/modules/agenda/consolePreview/ConsoleGeneralInfoSection.tsx',
    'src/modules/agenda/consolePreview/ConsoleRegistrationSection.tsx',
  ]) {
    const file = src(path);
    for(const name of ['FormField', 'TextField', 'SelectControl', 'TextAreaControl']) assert.ok(file.includes('<' + name), path + ' no adoptó ' + name);
    assert.ok(!file.includes('className={inputClass}'), path + ' conserva implementación duplicada');
  }
});
