import type { ComponentPropsWithRef } from 'react';
import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import { SelectControl } from '../../../shared/ui/FormControls';

/** Selector nativo accesible + indicador Material Symbols del Design System.
 * Mantiene name/id/ref/value/onChange y la interacción nativa con teclado.
 */
type Props = ComponentPropsWithRef<typeof SelectControl>;
export function ConsoleSelectControl({className='',...props}:Props){
 return <span className="console-select-wrap">
  <SelectControl {...props} className={'console-select-native '+className}/>
  <MaterialIcon name="expand_more" size={24} className="console-select-chevron"/>
 </span>;
}
