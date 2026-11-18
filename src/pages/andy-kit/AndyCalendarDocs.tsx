import { DocSection, GuidelineTable } from './AndyDocsPrimitives';
import { AndyCalendarShowcase } from './AndyCalendarShowcase';
import './andy-calendar-docs.css';

export function AndyCalendarDocs(){
 return <>
  <DocSection title="Descripción" description="Calendar presenta la grilla de días para seleccionar una fecha o un rango. Se utiliza sola o dentro de Date Picker. Esta página documenta únicamente las fechas, la navegación, las restricciones y la accesibilidad.">{null}</DocSection>

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

  <DocSection title="Anatomía" description="Partes del calendario abierto y de la grilla reutilizable, independientes del campo que lo contiene.">
   <GuidelineTable rows={[
    ['CalendarMonthGrid','Grilla compartida de días; recibe mes visible, selección, restricciones y callback de cambio.'],
    ['Weekday header','Encabezados de lunes a domingo con nombres completos accesibles.'],
    ['CalendarDay','Celda por día, con estados Default, Hover, Focus, Today, Selected y Disabled.'],
    ['Range Start / End','Extremos del período seleccionado; los días intermedios tienen un fondo continuo.'],
    ['Period controls','Selectores de mes y año y botones para navegar al período anterior o siguiente.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Medidas y tokens del calendario abierto y de sus demostraciones.">
   <GuidelineTable rows={[
    ['Tipografía','Geometria; encabezados del calendario en Bold y fechas en Regular.'],
    ['Color de acciones','Primario 600 #236999; botón seleccionado y dropdown activo en Info 500 #006EFF.'],
    ['Selección de rango','Extremos en Info 500; fondo intermedio azul suave #E5F0FF.'],
    ['Focus','Anillo Info 500 de 2 px, visible durante la navegación con teclado.'],
    ['Radio de día','4 px, incluido el comienzo y el final del rango.'],
    ['Acciones de la muestra','Borrar y Confirmar permiten ensayar la selección; la grilla base no requiere confirmación propia.'],
    ['Presentación','Calendario centrado en una única caja de vista previa, sin tarjetas anidadas.'],
    ['Restricciones','minDate, maxDate y disabledDates; días bloqueados sin clic ni foco.'],
    ['Datos','Fecha ISO local YYYY-MM-DD, sin conversiones horarias al calcular días.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="Reglas de selección, navegación y foco de Calendar reutilizadas por cualquier control contenedor.">
   <GuidelineTable rows={[
    ['Semántica','La grilla tiene role="grid", filas y celdas; informa fecha completa mediante aria-label.'],
    ['Foco','Tab ingresa a un día habilitado; solo una celda de la grilla participa del orden natural de tabulación.'],
    ['Flechas','Izquierda y Derecha recorren días; Arriba y Abajo recorren semanas. El mes cambia cuando corresponde.'],
    ['Home / End','Avanzan al comienzo o al final de la semana, respetando las restricciones.'],
    ['Page Up / Down','Cambian de mes; junto con Shift cambian de año, conservando el día cuando sea posible.'],
    ['Selección','Enter, Espacio o clic seleccionan el día; en rango se eligen inicio y fin.'],
    ['Fechas deshabilitadas','No se pueden activar; el foco evita fechas bloqueadas o fuera de los límites.'],
    ['Composición','CalendarMonthGrid administra la grilla; Date Picker le agrega disparador, popover/drawer y confirmación.'],
   ]}/>
  </DocSection>
 </>;
}
