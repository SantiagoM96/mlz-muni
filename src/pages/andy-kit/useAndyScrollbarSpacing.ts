import { useEffect } from 'react';

/**
 * Las opciones necesitan aire antes de una barra visible, pero no deben
 * reservar lugar cuando el menú no tiene overflow. CSS no permite detectar
 * overflow real; sincronizamos un atributo únicamente en los dropdowns
 * desplazables del catálogo y sus popovers/drawers.
 */
const dropdownScrollSelector = [
 '.andy-dropdown-variant-options',
 '.sports-cal-choices',
 '.andy-dpv-time-options',
 '.kit-sports-options',
 '.kit-sports-more-scroll',
 '.kit-sports-advanced-popover .kit-sports-advanced',
].join(', ');

export function useAndyScrollbarSpacing() {
 useEffect(() => {
  const tracked = new Set<HTMLElement>();
  let frame = 0;
  const resizeObserver = new ResizeObserver(() => schedule());

  function update() {
   frame = 0;
   const lists = document.querySelectorAll<HTMLElement>(dropdownScrollSelector);
   for (const list of lists) {
    if (!tracked.has(list)) {
     tracked.add(list);
     resizeObserver.observe(list);
    }
    const style = getComputedStyle(list);
    const hasScroll = (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
     list.scrollHeight > list.clientHeight + 1;
    const next = hasScroll ? 'true' : 'false';
    if (list.dataset.andyScrollOverflow !== next) list.dataset.andyScrollOverflow = next;
   }
   for (const list of tracked) {
    if (!list.isConnected) {
     resizeObserver.unobserve(list);
     tracked.delete(list);
    }
   }
  }

  function schedule() {
   if (!frame) frame = requestAnimationFrame(update);
  }

  // También cubre popovers que aparecen después de montar el UI Kit.
  // Solo observamos cambios de hijos, no los atributos que establecemos.
  const mutationObserver = new MutationObserver(schedule);
  mutationObserver.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('resize', schedule);
  update();

  return () => {
   mutationObserver.disconnect();
   resizeObserver.disconnect();
   window.removeEventListener('resize', schedule);
   if (frame) cancelAnimationFrame(frame);
   for (const list of tracked) delete list.dataset.andyScrollOverflow;
  };
 }, []);
}
