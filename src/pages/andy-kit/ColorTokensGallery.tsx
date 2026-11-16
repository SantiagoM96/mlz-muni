import { useState } from 'react';
import { MaterialIcon } from '../../shared/ui/MaterialIcon';
import { figmaColorVariables } from './figma-color-variables';
import './color-tokens-gallery.css';

const groups = [
  { title: 'Natural', key: 'Natural' },
  { title: 'Primario', key: 'Primario' },
  { title: 'Success', key: 'Semantico/Succes' },
  { title: 'Info', key: 'Semantico/Info' },
  { title: 'Alert', key: 'Semantico/Alert' },
  { title: 'Error', key: 'Semantico/Error' },
  { title: 'Marca', key: 'Marca' },
  { title: 'Link', key: 'Link' },
  { title: 'Auxiliares', key: 'Auxiliars' },
  { title: 'Acento', key: 'Acent' },
] as const;

function copyHex(hex: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(hex).catch(() => undefined);
  }
}

const previewCount = 28;

export function ColorTokensGallery() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const colorsToShow = expanded ? figmaColorVariables : figmaColorVariables.slice(0, previewCount);

  return <div className="andy-color-library" data-testid="andy-figma-color-library">
    <div className={"andy-color-library-preview" + (expanded ? " is-expanded" : " is-collapsed")} id="andy-color-library-grid">
    {groups.map(group => {
      const colors = colorsToShow.filter(color => color.name.startsWith(group.key + '/'));
      if (!colors.length) return null;
      return <section className="andy-color-family" key={group.key}>
        <h3 className="andy-color-family-title">{group.title}</h3>
        <div className="andy-color-grid">
          {colors.map(color => <button type="button" key={color.name}
            className="andy-color-tile" onClick={() => { copyHex(color.hex); setCopied(color.name); }}
            aria-label={`Copiar ${color.hex} de ${color.name}`}
            title={copied === color.name ? 'HEX copiado' : `Copiar ${color.hex}`}>
            <span className="andy-color-tile-swatch" style={{ backgroundColor: color.hex }} />
            <span className="andy-color-tile-details">
              <span className="andy-color-tile-label">{color.name.split('/').slice(-1)[0]}</span>
              <span className="andy-color-tile-hex">{color.hex}</span>
            </span>
          </button>)}
        </div>
      </section>;
    })}
    </div>
    {figmaColorVariables.length > previewCount && <button type="button" className="andy-color-library-expand" aria-expanded={expanded} aria-controls="andy-color-library-grid" onClick={() => setExpanded(value => !value)}>
      {expanded ? 'Ver menos' : 'Ver más'} <MaterialIcon name={expanded ? 'expand_less' : 'expand_more'} size={20}/>
    </button>}
  </div>;
}
