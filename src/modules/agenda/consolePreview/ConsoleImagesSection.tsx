import type { ConsoleDraft } from './model';
import { ConsoleImageUpload } from './ConsoleImageUpload';
import { SectionTitle } from './ConsoleFormPrimitives';
import { CheckboxField } from '../../../shared/ui/CheckboxField';

function readLocalImage(file: File | undefined, onReady: (dataUrl: string) => void) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') onReady(reader.result);
  };
  reader.readAsDataURL(file);
}

interface Props {
  draft: ConsoleDraft;
  onDraftChange: (changes: Partial<ConsoleDraft>) => void;
  onGalleryFile: (index: number, url: string) => void;
  onGalleryRemove: (index: number) => void;
}

/** Portada y galería de demostración, conservando el FileReader local. */
export function ConsoleImagesSection({ draft, onDraftChange, onGalleryFile, onGalleryRemove }: Props) {
  return (
            <section aria-labelledby="console-images">
              <div id="console-images">
                <SectionTitle number={4} title="Imágenes y portada"
                  subtitle="Agregá una portada opcional y fotos adicionales para la galería." />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <ConsoleImageUpload id="cover-image" label="Portada" source={draft.coverDataUrl}
                  onFile={file => readLocalImage(file, url => onDraftChange({ coverDataUrl: url }))}
                  onRemove={() => onDraftChange({ coverDataUrl: '' })}/>
                {[0, 1].map(index => (
                  <ConsoleImageUpload key={index} id={'gallery-' + index}
                    label={'Foto adicional ' + (index + 1)} source={draft.galleryDataUrls[index] ?? ''}
                    onFile={file => readLocalImage(file, url => onGalleryFile(index, url))}
                    onRemove={() => onGalleryRemove(index)}/>
                ))}
              </div>
              <CheckboxField className="mt-4" checked={draft.featured}
                onChange={event => onDraftChange({ featured: event.target.checked })}>
                Destacar actividad
              </CheckboxField>
            </section>
  );
}
