import { MlzFigmaButton, type FigmaButtonSize, type FigmaButtonType } from '../figma/MlzFigmaButton';
import { GallerySection } from './GallerySection';

const kinds: readonly FigmaButtonType[] = ['primario', 'secundario', 'terciario', 'gost', 'link'];

function ButtonSet({ size }: { size: FigmaButtonSize }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {kinds.map(kind => (
        <MlzFigmaButton key={kind} kind={kind} size={size}>
          {kind.charAt(0).toUpperCase() + kind.slice(1)}
        </MlzFigmaButton>
      ))}
    </div>
  );
}

export function ButtonsGallery() {
  return (
    <>
      <GallerySection title="Button/Standar">
        <ButtonSet size="Standar" />
      </GallerySection>
      <GallerySection title="Button/Chico">
        <ButtonSet size="Chico" />
      </GallerySection>
    </>
  );
}
