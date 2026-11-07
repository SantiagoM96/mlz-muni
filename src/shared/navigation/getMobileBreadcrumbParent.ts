/** La navegación institucional no puede asumir rutas de un módulo específico. */
export interface BreadcrumbParent {
  label: string;
  to: string;
}

/** En mobile, mostrar «Volver» solo cuando existe un destino explícito. */
export function getMobileBreadcrumbParent(
  items: readonly { label: string; to?: string }[],
  mobileParentOnly: boolean,
): BreadcrumbParent | null {
  if (!mobileParentOnly || items.length < 2) return null;
  const parent = items[items.length - 2];
  return parent?.to?.trim() ? { label: parent.label, to: parent.to } : null;
}
