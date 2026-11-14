import { useMemo, useState } from 'react';
import { figmaColorVariables } from './figma-color-variables';
import './color-tokens-gallery.css';

const groups = [
  { title: 'Natural', key: 'Natural', description: 'Escala de negros, grises y blanco.' },
  { title: 'Primario', key: 'Primario', description: 'Escala institucional de azules, desde Primario 950 hasta 50.' },
  { title: 'Semántico · Success', key: 'Semantico/Succes', description: 'Estados positivos. Se mantiene el nombre «Succes» que figura en Figma.' },
  { title: 'Semántico · Info', key: 'Semantico/Info', description: 'Interacciones, estados activos y foco.' },
  { title: 'Semántico · Alert', key: 'Semantico/Alert', description: 'Advertencias y avisos importantes.' },
  { title: 'Semántico · Error', key: 'Semantico/Error', description: 'Validaciones, errores y estados destructivos.' },
  { title: 'Marca', key: 'Marca', description: 'Color de marca específico.' },
  { title: 'Link', key: 'Link', description: 'Colores para vínculos.' },
  { title: 'Auxiliares', key: 'Auxiliars', description: 'Paleta auxiliar. Se conservan los nombres originales de Figma.' },
  { title: 'Acento', key: 'Acent', description: 'Colores complementarios para acentos.' },
] as const;

const figmaUrl = 'https://www.figma.com/design/6kG7WrMXleRDigAdRm8phY/MLZ---UI-KIT?node-id=0-1';

function copyHex(hex: string) {
  // La API de portapapeles requiere un contexto seguro (GitHub Pages sí lo tiene).
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(hex).catch(() => undefined);
  }
}

export function ColorTokensGallery() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const visible = useMemo(() => {
    const term = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    if (!term) return figmaColorVariables;
    return figmaColorVariables.filter(color =>
      color.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(term) ||
      color.hex.toLowerCase().includes(term)
    );
  }, [query]);

  return <div className="andy-color-library" data-testid="andy-figma-color-library">
    <div className="andy-color-library-toolbar">
      <div className="andy-color-library-source">
        <strong>{figmaColorVariables.length} variables de color</strong>
        <span>Colección: Color Styles · Modo Light</span>
        <a href={figmaUrl} target="_blank" rel="noopener noreferrer">Documento original en Figma</a>
      </div>
      <label className="andy-color-library-search">
        <span>Buscar color o token</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ej.: Primario 300, Error 600, #006EFF" />
      </label>
    </div>
    <p className="andy-color-library-count" aria-live="polite">
      {visible.length} {visible.length === 1 ? 'variable visible' : 'variables visibles'}
    </p>
    {groups.map(group => {
      const colors = visible.filter(color => color.name.startsWith(group.key + '/'));
      if (!colors.length) return null;
      return <section className="andy-color-family" key={group.key}>
        <header className="andy-color-family-header">
          <h3>{group.title} <span>{colors.length}</span></h3>
          <p>{group.description}</p>
        </header>
        <div className="andy-color-grid">
          {colors.map(color => <button type="button" key={color.name}
            className="andy-color-tile" onClick={() => { copyHex(color.hex); setCopied(color.name); }}
            aria-label={`Copiar ${color.hex} de ${color.name}`}
            title={`Copiar ${color.hex}`}>
            <span className="andy-color-tile-swatch" style={{ backgroundColor: color.hex }} />
            <span className="andy-color-tile-details">
              <span className="andy-color-tile-label">{color.name.split('/').slice(-1)[0]}</span>
              <span className="andy-color-tile-hex">{color.hex}</span>
              <span className="andy-color-tile-name">{color.name}</span>
              <span className="andy-color-tile-action">{copied === color.name ? 'Código seleccionado' : 'Copiar HEX'}</span>
            </span>
          </button>)}
        </div>
      </section>;
    })}
    {visible.length === 0 && <p className="andy-color-library-empty">No encontramos colores con ese nombre o código. Probá otro término.</p>}
    <p className="andy-color-library-footer">Valores exactos de variables locales de Figma, no aproximaciones. Este catálogo documenta los colores; no reemplaza automáticamente los estilos productivos existentes.</p>
  </div>;
}
