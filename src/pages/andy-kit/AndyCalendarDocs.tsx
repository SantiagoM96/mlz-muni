import type { ReactNode } from 'react';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { AndyCalendarShowcase } from './AndyCalendarShowcase';
import { SportsCalendarPicker } from './SportsCalendarPicker';
import './andy-calendar-docs.css';

export function AndyCalendarDocs({fieldStates}:{fieldStates?:ReactNode}){
 return <>
  <DocSection title="Descripción" description="Calendar permite elegir un día o un rango de fechas. Es la grilla reutilizable de días, independiente del campo que la abre. Date Picker combina ese calendario con el campo y un popover en escritorio o drawer en mobile.">{null}</DocSection>

  <DocSection title="Básico" description="Calendario abierto con selección individual. Elegí una fecha y utilizá los controles Borrar y Confirmar. La demostración mantiene los valores históricos para evaluar los estados.">
   <AndyCalendarShowcase only="single"/>
  </DocSection>

  <DocSection title="Selección de rango" description="Seleccioná un día de inicio y uno de fin. Los extremos se resaltan y los días intermedios forman una banda continua. Si empezás un nuevo rango, se restablecen los extremos.">
   <AndyCalendarShowcase only="range"/>
  </DocSection>

  <DocSection title="Navegación por mes y año" description="Los controles superiores permiten desplazarse mes a mes o elegir directamente otro mes y año. La grilla conserva el formato semanal de lunes a domingo y responde a las flechas del teclado.">
   <AndyCalendarShowcase only="single"/>
  </DocSection>

  <DocSection title="Fechas restringidas" description="El calendario puede recibir fechas mínimas y máximas, así como días específicos que no se pueden seleccionar. En este ejemplo están deshabilitados los días 19 y 20 de noviembre y las fechas fuera del 6 al 25 de noviembre de 2008.">
   <AndyCalendarShowcase only="single" restricted/>
  </DocSection>

  <DocSection title="Date Picker" description="El campo utiliza el calendario compartido. En desktop abre un popover; en mobile conserva el drawer de Deportes con gesto de cierre y los botones institucionales Borrar fecha y Confirmar.">
   <DocPreview>
    <div className="andy-matrix-calendar-sample andy-calendar-dropdown-sample">
     <SportsCalendarPicker/>
    </div>
   </DocPreview>
  </DocSection>

  {fieldStates}

  <DocSection title="Anatomía" description="Estructura del calendario y responsabilidades de cada pieza. Los estilos son institucionales; la composición sigue el criterio de separar Calendar de Date Picker.">
   <GuidelineTable rows={[
    ['CalendarMonthGrid','Grilla compartida de días; recibe mes visible, selección, restricciones y callback de cambio.'],
    ['Weekday header','Encabezados de lunes a domingo con nombres completos accesibles.'],
    ['CalendarDay','Celda por día, con estados Default, Hover, Focus, Today, Selected y Disabled.'],
    ['Range Start / End','Extremos del período seleccionado; los días intermedios tienen un fondo continuo.'],
    ['Period controls','Selectores de mes y año y botones para navegar al período anterior o siguiente.'],
    ['Date Picker trigger','Campo que muestra la fecha elegida y abre el calendario.'],
    ['Popover / Drawer','Superficie desktop o mobile; contiene Calendar, confirmación y borrado.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Medidas y tokens compartidos por las demostraciones y el Date Picker de MLZ.">
   <GuidelineTable rows={[
    ['Tipografía','Geometria; encabezados del calendario en Bold y fechas en Regular.'],
    ['Color de acciones','Primario 600 #236999; botón seleccionado y dropdown activo en Info 500 #006EFF.'],
    ['Selección de rango','Extremos en Info 500; fondo intermedio azul suave #E5F0FF.'],
    ['Focus','Anillo Info 500 de 2 px, visible durante la navegación con teclado.'],
    ['Radio de día','4 px, incluido el comienzo y el final del rango.'],
    ['Botones de acción','Borrar como Terciario y Confirmar como Primario; Small 32 px desktop y Medium 40 px mobile.'],
    ['Contenedor','Popover de 348 px en desktop; drawer inferior en mobile, con límite de altura y gesto de cierre.'],
    ['Restricciones','minDate, maxDate y disabledDates; días bloqueados sin clic ni foco.'],
    ['Datos','Fecha ISO local YYYY-MM-DD, sin conversiones horarias al calcular días.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Reglas de selección, navegación y foco compartidas entre el ejemplo abierto y el campo Date Picker.">
   <GuidelineTable rows={[
    ['Semántica','La grilla tiene role="grid", filas y celdas; informa fecha completa mediante aria-label.'],
    ['Foco','Tab ingresa a un día habilitado; solo una celda de la grilla participa del orden natural de tabulación.'],
    ['Flechas','Izquierda y Derecha recorren días; Arriba y Abajo recorren semanas. El mes cambia cuando corresponde.'],
    ['Home / End','Avanzan al comienzo o al final de la semana, respetando las restricciones.'],
    ['Page Up / Down','Cambian de mes; junto con Shift cambian de año, conservando el día cuando sea posible.'],
    ['Selección','Enter, Espacio o clic seleccionan el día; en rango se eligen inicio y fin.'],
    ['Fechas deshabilitadas','No se pueden activar; el foco evita fechas bloqueadas o fuera de los límites.'],
    ['Date Picker mobile','Escape y gesto de arrastre cierran el drawer; los controles devuelven el foco al campo.'],
    ['Confirmación','La elección pendiente se hace definitiva con Confirmar; Borrar fecha limpia el valor.'],
    ['Separación','Date Picker gestiona campo, popover y drawer; CalendarMonthGrid gestiona la grilla y los días.'],
   ]}/>
  </DocSection>
 </>;
}
