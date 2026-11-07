import { expect, test } from '@playwright/test';
import { getMobileBreadcrumbParent } from '../../src/components/navigation/getMobileBreadcrumbParent';

test.describe('Breadcrumbs institucionales — contrato de navegación', () => {
  test('conserva el vínculo móvil a Actividades de Agenda', () => {
    const items = [
      { label: 'Inicio', to: '/' },
      { label: 'Agenda', to: '/agenda-de-la-comunidad' },
      { label: 'Actividades', to: '/agenda-de-la-comunidad/actividades' },
      { label: 'Yoga' },
    ];
    expect(getMobileBreadcrumbParent(items, true)).toEqual({
      label: 'Actividades', to: '/agenda-de-la-comunidad/actividades',
    });
  });

  test('sirve para cualquier nuevo módulo municipal, sin ruta de Agenda implícita', () => {
    const items = [
      { label: 'Inicio', to: '/' },
      { label: 'Trámites', to: '/tramites' },
      { label: 'Detalle' },
    ];
    expect(getMobileBreadcrumbParent(items, true)).toEqual({
      label: 'Trámites', to: '/tramites',
    });
  });

  test('sin destino explícito del padre muestra la ruta completa y no fabrica un enlace', () => {
    expect(getMobileBreadcrumbParent([
      { label: 'Inicio', to: '/' },
      { label: 'Gestión' },
      { label: 'Jóvenes en Comunidad' },
    ], true)).toBeNull();
  });

  test('sin modo móvil o sin padre no genera un enlace de retroceso', () => {
    const items = [{ label: 'Inicio', to: '/' }, { label: 'Detalle' }];
    expect(getMobileBreadcrumbParent(items, false)).toBeNull();
    expect(getMobileBreadcrumbParent([{ label: 'Inicio' }], true)).toBeNull();
    expect(getMobileBreadcrumbParent([], true)).toBeNull();
  });

  test('un destino vacío no se considera una URL de navegación', () => {
    expect(getMobileBreadcrumbParent([
      { label: 'Inicio', to: ' ' }, { label: 'Detalle' },
    ], true)).toBeNull();
  });
});
