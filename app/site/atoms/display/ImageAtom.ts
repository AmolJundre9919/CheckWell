import { BaseComponent } from "../../BaseComponent";

type ImageSize = 'small' | 'medium' | 'large';
type ImageBorder = 'none' | 'rounded' | 'circle';

interface ImageProps {
  src: string;
  alt: string;
  size?: ImageSize;
  border?: ImageBorder;
  width?: number;
  height?: number;
}

export class ImageAtom extends BaseComponent implements ImageProps {
  src: string = '';
  alt: string = '';
  size: ImageSize = 'medium';
  border: ImageBorder = 'none';
  width?: number;
  height?: number;

  static get observedAttributes(): string[] {
    return ['src', 'alt', 'size', 'border', 'width', 'height'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
      }
    `);
  }

  protected render(): void {
    const sizeClass = this.size === 'small' ? 'max-w-xs' : this.size === 'large' ? 'max-w-lg' : 'max-w-md';
    const borderClass = this.border === 'rounded' ? 'rounded-lg' : this.border === 'circle' ? 'rounded-full' : '';

    this._shadowRoot.innerHTML = `
      <div class="image-container ${borderClass} overflow-hidden">
        <img 
          class="image ${sizeClass} w-full h-auto"
          src="${this.src}"
          alt="${this.alt}"
          loading="lazy"
        />
      </div>
    `;
  }
}

customElements.define('ui-image', ImageAtom); 