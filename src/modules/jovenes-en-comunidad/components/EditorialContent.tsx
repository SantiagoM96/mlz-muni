import type { ContentBlock } from '../data/jovenes';
import { instagramUrl } from '../data/links';

/** Conserva texto, énfasis y enlace editorial; ninguna decisión de layout. */
function LinkedParagraph({ text }: { text: string }) {
  const handle = '@jovenesencomunidad';
  const index = text.indexOf(handle);
  if (index === -1) return <p>{text}</p>;

  return (
    <p>
      {text.slice(0, index)}
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
        {handle}
      </a>
      {text.slice(index + handle.length)}
    </p>
  );
}

/** Contenido polimórfico editorial: párrafos o listas, sin depender de la página. */
export function EditorialContent({ blocks }: { blocks: readonly ContentBlock[] }) {
  return (
    <div className="article-copy">
      {blocks.map((block, index) =>
        block.kind === 'paragraph' ? (
          <LinkedParagraph key={index} text={block.text} />
        ) : (
          <ul key={index}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
