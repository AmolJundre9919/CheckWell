import { Theme, defaultTheme } from "../../theme/theme";
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
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['src', 'alt', 'size', 'border', 'width', 'height'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
      }

      .image-container {
        display: inline-block;
        overflow: hidden;
      }

      .image {
        max-width: 100%;
        height: auto;
        display: block;
      }

      /* Sizes */
      .small { max-width: 200px; }
      .medium { max-width: 400px; }
      .large { max-width: 800px; }

      /* Borders */
      .rounded { border-radius: ${this.theme.borderRadius.md}; }
      .circle { border-radius: 50%; }

      /* Loading and Error States */
      .image.loading {
        background-color: ${this.theme.colors.muted};
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
    `);
  }

  protected render(): void {
    const style = `
      ${this.width ? `width: ${this.width}px;` : ''}
      ${this.height ? `height: ${this.height}px;` : ''}
    `;

    this._shadowRoot.innerHTML = `
      <div class="image-container ${this.border}">
        <img 
          class="image ${this.size}"
          src="${this.src}"
          alt="${this.alt}"
          style="${style}"
          loading="lazy"
        />
      </div>
    `;
  }
}

customElements.define('ui-image', ImageAtom); 