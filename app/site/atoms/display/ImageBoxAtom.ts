import { BaseComponent } from "../../BaseComponent";

interface ImageBoxProps {
  src: string;
  alt: string;
  caption?: string;
  overlayText?: string;
}

export class ImageBoxAtom extends BaseComponent implements ImageBoxProps {
  src: string = '';
  alt: string = '';
  caption?: string;
  overlayText?: string;

  static get observedAttributes(): string[] {
    return ['src', 'alt', 'caption', 'overlayText'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
        position: relative;
        font-family: Arial, sans-serif;
      }
      .image-container {
        position: relative;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        visibility: hidden;
      }
      .image-container:hover .overlay {
        visibility: visible;
      }
      .caption {
        text-align: center;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #555;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="image-container">
        <img src="${this.src}" alt="${this.alt}" class="w-full h-auto" loading="lazy" />
        ${
          this.overlayText
            ? `<div class="overlay">${this.overlayText}</div>`
            : ''
        }
      </div>
      ${
        this.caption
          ? `<div class="caption">${this.caption}</div>`
          : ''
      }
    `;
  }
}

customElements.define('ui-image-box', ImageBoxAtom);
