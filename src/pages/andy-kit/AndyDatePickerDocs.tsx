import type { ReactNode } from 'react';
import { DocSection, DocPreview, GuidelineTable } from './AndyDocsPrimitives';
import { SportsCalendarPicker } from './SportsCalendarPicker';
import { AndyDatePickerVariants } from './AndyDatePickerVariants';
import './andy-calendar-docs.css';

export function AndyDatePickerDocs({fieldStates}:{fieldStates?:ReactNode}){
 return <>
  <DocSection title="Descripción" description="Date Picker combina un campo de formulario con Calendar dentro de un popover en desktop o un drawer en mobile. Esta página presenta los ejemplos de shadcn/ui adaptados a las reglas visuales de MLZ. La grilla y la selección de fechas se documentan aparte en Calendar.">{null}</DocSection>

  <DocSection title="Básico" description="Seleccioná una fecha desde el campo. En escritorio se abre un popover y en mobile se utiliza el drawer inferior. Borrar y Confirmar respetan nuestros botones Terciario y Primario.">
   <DocPreview><AndyDatePickerVariants variant="basic"/></DocPreview>
  </DocSection>

  <DocSection title="Selección de rango" description="Elegí dos fechas para definir un período. La selección conserva extremos destacados y días intermedios unidos visualmente, reutilizando Calendar.">
   <DocPreview><AndyDatePickerVariants variant="range"/></DocPreview>
  </DocSection>

  <DocSection title="Fecha de nacimiento" description="Variante utilizada en Deportes. Permite seleccionar el mes y el año de forma directa y deshabilita las fechas futuras. Conserva el comportamiento productivo actual.">
   <DocPreview><div className="andy-matrix-calendar-sample andy-calendar-dropdown-sample"><SportsCalendarPicker/></div></DocPreview>
  </DocSection>

  <DocSection title="Campo editable" description="Combinación de escritura manual con apertura del calendario. Acepta el formato DD/MM/AAAA y valida fechas reales antes de utilizarlas.">
   <DocPreview><AndyDatePickerVariants variant="input"/></DocPreview>
  </DocSection>

  <DocSection title="Fecha y hora" description="Seleccioná la fecha desde Calendar y elegí hora y minutos con dos dropdowns MLZ independientes, en formato de 24 horas. El calendario y la hora permanecen visibles para verificar la combinación.">
   <DocPreview><AndyDatePickerVariants variant="time"/></DocPreview>
  </DocSection>

  <DocSection title="Lenguaje natural" description="Escribí expresiones como «mañana», «próximo lunes» o «en 7 días». El ejemplo interpreta expresiones reconocidas en español, ofrece confirmación visual y mantiene el calendario como alternativa.">
   <DocPreview><AndyDatePickerVariants variant="natural"/></DocPreview>
  </DocSection>

  {fieldStates}

  <DocSection title="Anatomía" description="Estructura del control que combina entrada de datos y calendario, diferenciada de la grilla independiente.">
   <GuidelineTable rows={[
    ['Etiqueta','Identifica el dato requerido y se asocia al campo o disparador.'],
    ['Campo / disparador','Presenta el valor, el placeholder o permite escribirlo, según la variante.'],
    ['Ícono de calendario','Material Symbols Outlined para abrir el selector en las variantes editables.'],
    ['Popover / drawer','Superficie de selección de fechas en desktop y mobile respectivamente.'],
    ['CalendarMonthGrid','Grilla compartida por Date Picker y Calendar, con navegación y restricciones.'],
    ['Acciones','Borrar limpia el valor y Confirmar aplica la fecha o el rango pendiente.'],
    ['Hora / minutos','Dos dropdowns independientes con el estilo institucional; cada uno muestra el valor y un listado de opciones.'],
    ['Texto libre','Entrada editable solo para las variantes que la necesitan.'],
   ]}/>
  </DocSection>

  <DocSection title="Especificaciones" description="Escalas y colores institucionales compartidos por las variantes, sin importar su composición.">
   <GuidelineTable rows={[
    ['Campo','48 px de alto, tipografía Geometria 16/24, borde y radio de 4 px.'],
    ['Botones de acción','Primario 600 (#236999) y Terciario con borde #94C6E5.'],
    ['Seleccionado','Día activo en Info 500 (#006EFF), texto blanco; rango intermedio azul suave.'],
    ['Focus','2 px en Info 500, con diferencia visible respecto del borde en reposo.'],
    ['Popover','348 px de ancho en desktop, ajustado al viewport.'],
    ['Drawer mobile','Superficie inferior con overlay y controles de 40 px, conservando el gesto de cierre.'],
    ['Formato de fecha','DD/MM/AAAA en campos; estado interno en ISO local YYYY-MM-DD.'],
    ['Hora y minutos','Dos selectores de 48 px, menú MLZ con opción activa en Info 500 y lista desplazable; formato de 24 horas.'],
    ['Texto natural','Interpretación acotada a expresiones reconocidas; no se interpretan frases ambiguas automáticamente.'],
   ]}/>
  </DocSection>

  <DocSection title="Comportamiento y accesibilidad" description="El campo y su calendario deben comunicar la selección y el estado sin depender del color ni generar navegación accidental.">
   <GuidelineTable rows={[
    ['Semántica','El campo está vinculado a su etiqueta; el disparador indica aria-expanded.'],
    ['Seleccionar','Fecha o rango pendientes se aplican únicamente al confirmar.'],
    ['Teclado','La grilla conserva flechas, Home/End, PageUp/Down, Enter y Espacio.'],
    ['Fecha inválida','La entrada manual mantiene el valor visible e informa el error sin cambiar la fecha seleccionada.'],
    ['Lenguaje natural','Únicamente reconoce patrones declarados; muestra la fecha interpretada para verificarla.'],
    ['Responsive','El popover se sustituye por drawer en mobile y devuelve el foco al disparador al cerrar.'],
    ['Producto','Fecha de nacimiento conserva sus límites y estados actuales para Deportes.'],
   ]}/>
  </DocSection>
 </>;
}
