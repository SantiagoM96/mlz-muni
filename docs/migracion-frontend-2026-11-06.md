# Migración selectiva MLZ → mlz-muni

**Fecha de referencia:** 06/11/2026  
**Origen:** https://github.com/SantiagoM96/mlz  
**Destino:** https://github.com/SantiagoM96/mlz-muni  
**SHA inmutable de origen:** `adc097b3fd6f129e7994b67b24cce46edc2b608b`  
**Rama de trabajo:** `migration/institutional-frontend-v2`. La primera migración se preparó como Draft y sin despliegue. Posteriormente, por autorización del usuario, se agregó `pages.yml` para publicar un preview de GitHub Pages desde el nuevo repositorio; la modificación del origen sigue prohibida.

## Alcance y método

Se copiaron React, rutas, reglas, fixtures, componentes, fuentes y recursos binarios indispensables para **Jóvenes en Comunidad**, **Agenda pública V2** y **Consola V2 demostrativa**. Los archivos conservados en forma idéntica mantienen su hash Git de contenido. Cada recurso binario transferido se contrastó contra el SHA original.

La primera rama se creó sobre un `main` de arranque con README mínimo, necesario porque el repositorio nuevo no tenía commits. Ese README se reemplaza por la documentación definitiva en esta rama; el bootstrap no tiene publicación.

## Resultado del inventario

- Archivos versionados en el origen: **188**.
- Archivos copiados/adaptados hasta el corte de generación de este inventario: **171**.
- Archivos coincidentes bit a bit: **165**.
- Archivos adaptados del origen (incluye README inicial): **6**.
- Archivos del origen excluidos (sin contar AGENTS y CI reescritos): **15**.
- Nuevos documentos de destino: `AGENTS.md`, `docs/ci-cd.md` y este archivo.

## Exclusiones verificadas

| Archivo | Motivo |
| --- | --- |
| `.github/workflows/pages.yml` | Publicación automática prohibida durante migración |
| `bae/index.html` | Editor BAE ajeno al alcance |
| `public/bae/bae-negocios-logo.svg` | Editor BAE ajeno al alcance |
| `public/bae/halftone-2.svg` | Editor BAE ajeno al alcance |
| `public/bae/halftone-editable.svg` | Editor BAE ajeno al alcance |
| `public/bae/index.html` | Editor BAE ajeno al alcance |
| `public/cronica/index.html` | Crónica ajena al alcance |
| `public/cronica/logos/blanco.svg` | Crónica ajena al alcance |
| `public/cronica/logos/primario.svg` | Crónica ajena al alcance |
| `public/cronica/logos/secundario.svg` | Crónica ajena al alcance |
| `public/prototipos/README.md` | Prototipo/test de Deportes independiente |
| `public/prototipos/deportes_formulario_resumen_compacto.html` | Prototipo/test de Deportes independiente |
| `scripts/validate-prototypes.mjs` | Validador exclusivo de prototipos excluidos |
| `tests/e2e/deportes-prototipo.spec.ts` | Prototipo/test de Deportes independiente |
| `vercel.json` | Configuración de Vercel no solicitada |

No se trasladó ningún fichero de los directorios `public/cronica`, `public/bae`, `bae`, `public/prototipos` ni la configuración de Vercel. `scripts/prepare-pages.mjs` dejó de exigir BAE. El repositorio original permanece intacto.

## Cambios de configuración deliberados

- `vite.config.ts`: base de GitHub Pages `/mlz-muni/`; desarrollo local mantiene `/`.
- `scripts/prepare-pages.mjs`: elimina copias de editor y assets BAE, conserva rutas institucionales y fallback 404.
- `package.json`: se quita `validate:prototypes`, script ligado a artefactos excluidos; no se agregan librerías.
- `.github/workflows/visual-qa.yml`: se eliminan triggers de BAE y prototipos de Deportes.
- `.github/workflows/agenda-console-parity.yml`: el PR de migración usa el SHA original como baseline, no el main recién inicializado; futuros PR comparan contra main.
- `.github/workflows/pages.yml`: añadido posteriormente para publicar el preview institucional autorizado desde `main`, sin afectar el antiguo `/mlz/`.
- `README.md`, `AGENTS.md`, `docs/ci-cd.md`: adaptados al alcance municipal independiente.

## Rutas conservadas

`/`, `/jovenes-en-comunidad`, `/agenda-de-la-comunidad`, `/agenda-de-la-comunidad/actividades`, `/agenda-de-la-comunidad/actividades/:id` y `/agenda-de-la-comunidad/consola-preview`.

## Validación y límites

- Auditoría estática inicial: hashes de blobs compartidos comparados por GitHub.
- Conjunto de pruebas preservado: E2E de Jóvenes, Agenda, Consola y motion; paridad visual de Agenda. Se excluyó únicamente el test del prototipo independiente de Deportes.
- Comandos esperados: `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:e2e`.
- Resoluciones: 390, 432, 768 y 1415 px.
- **Ejecución local no realizada en la migración por ausencia de dependencias descargables en el entorno de trabajo.** Consultar los resultados efectivos de CI del PR antes de aceptar la paridad. La presencia de un workflow no constituye éxito.
- No se consultó Figma ni se conectó Vercel. La publicación de Pages fue autorizada después de la primera etapa; verificar estado del workflow para constatar su ejecución.

## Archivos copiados/adaptados (inventario de corte)

- `.github/workflows/agenda-console-parity.yml` — configuración adaptada (blob `d6696b235f6b`)
- `.github/workflows/motion-smoke.yml` — idéntico al origen (blob `1a84aca87ee1`)
- `.github/workflows/quality.yml` — idéntico al origen (blob `dcc37a0656ef`)
- `.github/workflows/visual-qa.yml` — configuración adaptada (blob `11493fddd80d`)
- `.gitignore` — idéntico al origen (blob `e0a63a6e8ada`)
- `.prettierrc.json` — idéntico al origen (blob `4759606f6d28`)
- `README.md` — configuración adaptada (blob `a66245c7cce0`)
- `docs/agenda-v2-refactor.md` — idéntico al origen (blob `c58ff32c8dde`)
- `eslint.config.js` — idéntico al origen (blob `9ad740a34dfa`)
- `index.html` — idéntico al origen (blob `b02d9fc9b8f0`)
- `package-lock.json` — idéntico al origen (blob `743909ca05e1`)
- `package.json` — configuración adaptada (blob `87d4666b85c7`)
- `playwright.config.ts` — idéntico al origen (blob `e1c40b4b4cf6`)
- `playwright.parity.config.ts` — idéntico al origen (blob `5009709a6a5e`)
- `public/assets/agenda/cafe-logo.jpg` — idéntico al origen (blob `cc80c571e4e6`)
- `public/assets/agenda/cine.jpg` — idéntico al origen (blob `9b97f9446f42`)
- `public/assets/agenda/deportes.jpg` — idéntico al origen (blob `9b97f9446f42`)
- `public/assets/agenda/home-cafe.jpg` — idéntico al origen (blob `87c4f0968ce7`)
- `public/assets/agenda/home-featured.jpg` — idéntico al origen (blob `74979bb12ea7`)
- `public/assets/agenda/home-hero.jpg` — idéntico al origen (blob `d6840a112560`)
- `public/assets/agenda/home-theater.jpg` — idéntico al origen (blob `dcf3737b3d73`)
- `public/assets/agenda/humor.jpg` — idéntico al origen (blob `1b0fb69f8e38`)
- `public/assets/agenda/no-results.png` — idéntico al origen (blob `17d5f36e5383`)
- `public/assets/agenda/social-facebook.svg` — idéntico al origen (blob `b0f2478277a3`)
- `public/assets/agenda/social-instagram.svg` — idéntico al origen (blob `10195af8b931`)
- `public/assets/agenda/social-whatsapp.svg` — idéntico al origen (blob `f49bda6533fc`)
- `public/assets/agenda/types/aerobica.png` — idéntico al origen (blob `1775969347cd`)
- `public/assets/agenda/types/artes-del-movimiento.png` — idéntico al origen (blob `49d080e86afd`)
- `public/assets/agenda/types/charla.png` — idéntico al origen (blob `8b3778515f51`)
- `public/assets/agenda/types/cine.png` — idéntico al origen (blob `4c39c7975714`)
- `public/assets/agenda/types/circo.png` — idéntico al origen (blob `df6febed9175`)
- `public/assets/agenda/types/conversatorio.png` — idéntico al origen (blob `b59974ad431f`)
- `public/assets/agenda/types/cuerpo-mente.png` — idéntico al origen (blob `824f72d7d8b1`)
- `public/assets/agenda/types/danza.png` — idéntico al origen (blob `f70227f931c6`)
- `public/assets/agenda/types/disciplina-inclusiva.png` — idéntico al origen (blob `abb3953cb207`)
- `public/assets/agenda/types/encuentro-literario.png` — idéntico al origen (blob `758ffa69ba41`)
- `public/assets/agenda/types/entrenamiento.png` — idéntico al origen (blob `166a51f0c14c`)
- `public/assets/agenda/types/humor.png` — idéntico al origen (blob `9d260c9b10ef`)
- `public/assets/agenda/types/infantil.png` — idéntico al origen (blob `d814daf8f12f`)
- `public/assets/agenda/types/jornada.png` — idéntico al origen (blob `50adcb138c7d`)
- `public/assets/agenda/types/magia.png` — idéntico al origen (blob `4ad6cc2418f1`)
- `public/assets/agenda/types/muestra.png` — idéntico al origen (blob `e549ccdc45f4`)
- `public/assets/agenda/types/musica.png` — idéntico al origen (blob `08bbf4743149`)
- `public/assets/agenda/types/pileta.png` — idéntico al origen (blob `cf9a438be2ff`)
- `public/assets/agenda/types/postural.png` — idéntico al origen (blob `f724019bd24c`)
- `public/assets/agenda/types/presentacion.png` — idéntico al origen (blob `088cd6bf2c32`)
- `public/assets/agenda/types/taller-ambiental.png` — idéntico al origen (blob `cbc2d1f8f199`)
- `public/assets/agenda/types/taller-artistico.png` — idéntico al origen (blob `3406faf74e36`)
- `public/assets/agenda/types/taller-de-danza.png` — idéntico al origen (blob `28131fd7b991`)
- `public/assets/agenda/types/taller-musical.png` — idéntico al origen (blob `fc9dbb683c57`)
- `public/assets/agenda/types/taller.png` — idéntico al origen (blob `40cf33d4120c`)
- `public/assets/agenda/types/teatro.png` — idéntico al origen (blob `e10192015f85`)
- `public/assets/agenda/types/titeres.png` — idéntico al origen (blob `c7f9f5bd3e9f`)
- `public/assets/agenda/types/torneo.png` — idéntico al origen (blob `302de7eb43db`)
- `public/assets/agenda/types/variete.png` — idéntico al origen (blob `e404b60d0b74`)
- `public/assets/agenda/types/visita-guiada.png` — idéntico al origen (blob `686f946132e3`)
- `public/assets/icons/instagram.svg` — idéntico al origen (blob `cb4e20a42fdb`)
- `public/assets/jovenes-hero-mobile.jpg` — idéntico al origen (blob `d0013dea2d70`)
- `public/assets/jovenes-hero.jpg` — idéntico al origen (blob `71beb3f62dfb`)
- `public/assets/logo-comunidad-blanco.svg` — idéntico al origen (blob `916c9b11004b`)
- `public/assets/logo-municipio-blanco.svg` — idéntico al origen (blob `65b17637a578`)
- `public/assets/social/facebook.svg` — idéntico al origen (blob `fda348a31f74`)
- `public/assets/social/instagram.svg` — idéntico al origen (blob `de4a5f400334`)
- `public/assets/social/tiktok.svg` — idéntico al origen (blob `5d634c0b783a`)
- `public/assets/social/x.svg` — idéntico al origen (blob `ed5cd813b328`)
- `public/assets/social/youtube.svg` — idéntico al origen (blob `5635bd2a06c8`)
- `scripts/prepare-pages.mjs` — configuración adaptada (blob `ec6eeb52da95`)
- `src/app/router.tsx` — idéntico al origen (blob `1dd364e24344`)
- `src/assets/fonts/Geometria-Bold.woff2` — idéntico al origen (blob `3d18ad95e408`)
- `src/assets/fonts/Geometria-Medium.ttf` — idéntico al origen (blob `7b44c81fd31f`)
- `src/assets/fonts/Geometria-Regular.woff2` — idéntico al origen (blob `8a0f6e5e3479`)
- `src/components/agenda/ActivityBadges.tsx` — idéntico al origen (blob `ba8ec0dc93c5`)
- `src/components/agenda/ActivityCard.tsx` — idéntico al origen (blob `c72efd40f202`)
- `src/components/agenda/ActivityCharacteristic.tsx` — idéntico al origen (blob `d6fcce2f3883`)
- `src/components/agenda/ActivityDescription.tsx` — idéntico al origen (blob `a25765cc4d9b`)
- `src/components/agenda/ActivityScheduleDateTime.tsx` — idéntico al origen (blob `9b356dc21bd4`)
- `src/components/agenda/ActivityScheduleParticipants.tsx` — idéntico al origen (blob `d9e4df1297a4`)
- `src/components/agenda/ActivityShare.tsx` — idéntico al origen (blob `1ce077cdbac5`)
- `src/components/agenda/AgendaCircuitCard.tsx` — idéntico al origen (blob `3374e158b52e`)
- `src/components/agenda/AgendaDetailMobileTabs.tsx` — idéntico al origen (blob `c135a2e0df6d`)
- `src/components/agenda/AgendaDropdown.tsx` — idéntico al origen (blob `7f61e7dbb570`)
- `src/components/agenda/AgendaFilterCounter.tsx` — idéntico al origen (blob `7ef8c5c9b880`)
- `src/components/agenda/AgendaFilterPanel.tsx` — idéntico al origen (blob `1ad3a7a0158c`)
- `src/components/agenda/AgendaMobileSheet.tsx` — idéntico al origen (blob `0bf653a38d4d`)
- `src/components/agenda/AgendaPromo.tsx` — idéntico al origen (blob `d465b3195c02`)
- `src/components/agenda/AgendaToolbar.tsx` — idéntico al origen (blob `2814b60f8270`)
- `src/components/agenda/FeaturedActivityCard.tsx` — idéntico al origen (blob `0b92f04d0403`)
- `src/components/agenda/useAgendaMobileScrollLock.ts` — idéntico al origen (blob `350d6ab8a57d`)
- `src/components/agenda/useAgendaSheetDismiss.ts` — idéntico al origen (blob `dc927cdfe258`)
- `src/components/layout/PageContainer.tsx` — idéntico al origen (blob `67e23a3b0c48`)
- `src/components/layout/PageHero.tsx` — idéntico al origen (blob `80e19e90cbaf`)
- `src/components/layout/SiteFooter.tsx` — idéntico al origen (blob `e048fba1812b`)
- `src/components/navigation/Breadcrumbs.tsx` — idéntico al origen (blob `02ea4b450fa0`)
- `src/components/navigation/SiteHeader.tsx` — idéntico al origen (blob `f2c31c0a776d`)
- `src/components/ui/Button.tsx` — idéntico al origen (blob `45a316800091`)
- `src/components/ui/IconLink.tsx` — idéntico al origen (blob `7524b56099db`)
- `src/components/ui/InfoCard.tsx` — idéntico al origen (blob `36c35c604ec4`)
- `src/components/ui/MaterialIcon.tsx` — idéntico al origen (blob `5922bb0ea4b9`)
- `src/components/ui/TableOfContents.tsx` — idéntico al origen (blob `5cf3ec9cb258`)
- `src/data/agenda-descriptions.ts` — idéntico al origen (blob `e9ecbe80c524`)
- `src/data/agenda-featured.ts` — idéntico al origen (blob `1e630f428451`)
- `src/data/agenda-imported.ts` — idéntico al origen (blob `a42876e71ec0`)
- `src/data/agenda-v2-previews.ts` — idéntico al origen (blob `ead29b2af319`)
- `src/data/agenda.ts` — idéntico al origen (blob `ec774042433f`)
- `src/data/jovenes.ts` — idéntico al origen (blob `a3e878c39162`)
- `src/features/agenda/AGENTS.md` — idéntico al origen (blob `61d9d858ee55`)
- `src/features/agenda/components/detail/ActivityInformation.tsx` — idéntico al origen (blob `76e347417666`)
- `src/features/agenda/components/detail/ActivityLocationMap.tsx` — idéntico al origen (blob `db0ba15f4902`)
- `src/features/agenda/components/detail/ActivityRegistrationLink.tsx` — idéntico al origen (blob `ec40c7f3744c`)
- `src/features/agenda/components/detail/ActivitySummary.tsx` — idéntico al origen (blob `c93630908753`)
- `src/features/agenda/components/filters/AgendaSortDropdown.tsx` — idéntico al origen (blob `9ad83dff574c`)
- `src/features/agenda/components/shared/AgendaIntro.tsx` — idéntico al origen (blob `1f4525aab733`)
- `src/features/agenda/consolePreview/ConsoleCardPreview.tsx` — idéntico al origen (blob `8a1c0a5758b6`)
- `src/features/agenda/consolePreview/ConsoleDetailDialog.tsx` — idéntico al origen (blob `6554a341926c`)
- `src/features/agenda/consolePreview/ConsoleDetailScheduleSummary.tsx` — idéntico al origen (blob `e3dc1565e659`)
- `src/features/agenda/consolePreview/ConsoleFormPrimitives.tsx` — idéntico al origen (blob `cbb0adb8f364`)
- `src/features/agenda/consolePreview/ConsoleGeneralInfoSection.tsx` — idéntico al origen (blob `0cd06e515c44`)
- `src/features/agenda/consolePreview/ConsoleImageUpload.tsx` — idéntico al origen (blob `394fadea80c2`)
- `src/features/agenda/consolePreview/ConsoleImagesSection.tsx` — idéntico al origen (blob `2e99756adb6f`)
- `src/features/agenda/consolePreview/ConsoleRegistrationSection.tsx` — idéntico al origen (blob `103fbb4ab639`)
- `src/features/agenda/consolePreview/ConsoleScheduleAdditionalFields.tsx` — idéntico al origen (blob `1b0bd41c5297`)
- `src/features/agenda/consolePreview/ConsoleScheduleDateFields.tsx` — idéntico al origen (blob `f74ed0af4de3`)
- `src/features/agenda/consolePreview/ConsoleScheduleEditorDialog.tsx` — idéntico al origen (blob `06a988997524`)
- `src/features/agenda/consolePreview/ConsoleScheduleFormPrimitives.tsx` — idéntico al origen (blob `5d6718845c2d`)
- `src/features/agenda/consolePreview/ConsoleTypeEditorDialog.tsx` — idéntico al origen (blob `5f411172c851`)
- `src/features/agenda/consolePreview/ConsoleVenueSelector.tsx` — idéntico al origen (blob `a3df1fc85b07`)
- `src/features/agenda/consolePreview/ScheduleTable.tsx` — idéntico al origen (blob `435272b21a8e`)
- `src/features/agenda/consolePreview/demoCasePreset.ts` — idéntico al origen (blob `cb3e442934bf`)
- `src/features/agenda/consolePreview/demoData.ts` — idéntico al origen (blob `87593a1a0da3`)
- `src/features/agenda/consolePreview/model.ts` — idéntico al origen (blob `4f192967931c`)
- `src/features/agenda/consolePreview/previewActivity.ts` — idéntico al origen (blob `53406feeec5a`)
- `src/features/agenda/consolePreview/scheduleEditorRules.ts` — idéntico al origen (blob `fe3dd728fe90`)
- `src/features/agenda/consolePreview/scheduleRules.ts` — idéntico al origen (blob `310d2173cdad`)
- `src/features/agenda/consolePreview/useConsoleDialogFocus.ts` — idéntico al origen (blob `d634f3470c61`)
- `src/features/agenda/consolePreview/useConsoleSchedules.ts` — idéntico al origen (blob `c847ed0961e1`)
- `src/features/agenda/consolePreview/venueRules.ts` — idéntico al origen (blob `594df57a9e24`)
- `src/features/agenda/hooks/useAgendaOutsideDismiss.ts` — idéntico al origen (blob `0af245c9f399`)
- `src/features/agenda/hooks/useAgendaPageSize.ts` — idéntico al origen (blob `e7e270f92ece`)
- `src/features/agenda/hooks/useAgendaViewportPopover.ts` — idéntico al origen (blob `8f4c5bc5aa83`)
- `src/features/agenda/model/filterState.ts` — idéntico al origen (blob `c7ed361f5d23`)
- `src/features/agenda/model/sort.ts` — idéntico al origen (blob `883c33a6f89c`)
- `src/features/agenda/utils/activityMap.ts` — idéntico al origen (blob `0c1f0f8a0537`)
- `src/features/agenda/utils/activitySchedules.ts` — idéntico al origen (blob `d923259476c3`)
- `src/features/agenda/utils/filterAgendaActivities.ts` — idéntico al origen (blob `3dff41a8864e`)
- `src/features/agenda/utils/formatActivityAddress.ts` — idéntico al origen (blob `65e5228d5443`)
- `src/features/agenda/utils/normalizeAgendaText.ts` — idéntico al origen (blob `7dfaab5b1ade`)
- `src/features/agenda/utils/publicActivityViews.ts` — idéntico al origen (blob `a0fddafdb193`)
- `src/layouts/SiteLayout.tsx` — idéntico al origen (blob `4b0f33fd8b19`)
- `src/main.tsx` — idéntico al origen (blob `c0963000c5d3`)
- `src/pages/agenda/AgendaActivityDetailPage.tsx` — idéntico al origen (blob `b5222ee525af`)
- `src/pages/agenda/AgendaConsolePreviewPage.tsx` — idéntico al origen (blob `5029e3d7c962`)
- `src/pages/agenda/AgendaHomePage.tsx` — idéntico al origen (blob `a7c07e4f5d3f`)
- `src/pages/agenda/AgendaPage.tsx` — idéntico al origen (blob `44e4357f4fb8`)
- `src/pages/home/HomePage.tsx` — idéntico al origen (blob `23540dc32ed1`)
- `src/pages/jovenes-en-comunidad/JovenesEnComunidadPage.tsx` — idéntico al origen (blob `3c7d4b2e83b2`)
- `src/pages/not-found/NotFoundPage.tsx` — idéntico al origen (blob `cefbb0b7e7a4`)
- `src/styles/globals.css` — idéntico al origen (blob `058316dd9fe5`)
- `src/vite-env.d.ts` — idéntico al origen (blob `11f02fe2a006`)
- `tests/e2e/agenda-console-preview.spec.ts` — idéntico al origen (blob `d5cb42c2839f`)
- `tests/e2e/agenda-console-rules.spec.ts` — idéntico al origen (blob `51a1f938eca9`)
- `tests/e2e/agenda-detail-mobile-tabs.spec.ts` — idéntico al origen (blob `89ff88f08f8f`)
- `tests/e2e/agenda-figma-examples.spec.ts` — idéntico al origen (blob `6836708a7778`)
- `tests/e2e/agenda.spec.ts` — idéntico al origen (blob `a7f4090758fb`)
- `tests/e2e/motion-smoke.spec.ts` — idéntico al origen (blob `c192c3fb2e72`)
- `tests/e2e/site.spec.ts` — idéntico al origen (blob `388e146cb51d`)
- `tests/e2e/visual.spec.ts` — idéntico al origen (blob `647af49455cd`)
- `tests/visual-parity/agenda-console-parity.spec.ts` — idéntico al origen (blob `de4b02542e33`)
- `tsconfig.app.json` — idéntico al origen (blob `75a769166d68`)
- `tsconfig.json` — idéntico al origen (blob `ff0aea3f15fe`)
- `tsconfig.node.json` — idéntico al origen (blob `b6b36bfd14ad`)
- `vite.config.ts` — configuración adaptada (blob `baee067edc91`)

## Pendientes de aceptación

Revisar el estado de GitHub Actions del SHA final del PR, los artefactos visuales y pruebas E2E por viewport; confirmar derechos de uso/distribución de los archivos de Geometria si fuera necesario antes de publicar; revisión humana de UI y teclado; verificar publicación del preview tras autorización posterior. Cualquier refactorización posterior deberá abrirse en otro PR, sin mezclarla con esta migración.
