import { MaterialIcon } from '../../../shared/ui/MaterialIcon';
import { TextField, type TextFieldProps } from '../../../shared/ui/FormControls';

/** Mantiene el input nativo de fecha/hora y su picker accesible;
 * la iconografía visible pertenece a Material Symbols del Design System. */
export function ConsoleTemporalInput({className='',type='date',...props}:TextFieldProps){
 return <span className="console-temporal-wrap">
  <TextField {...props} type={type} className={'console-temporal-native '+className}/>
  <MaterialIcon name={type==='time'?'schedule':'calendar_month'} size={20} className="console-temporal-symbol"/>
 </span>;
}
