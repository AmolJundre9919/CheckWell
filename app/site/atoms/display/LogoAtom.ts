import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

interface LogoProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export class LogoAtom extends BaseComponent implements LogoProps {
  src: string = '';
  alt: string = '';
  width: string = 'auto';
  height: string = 'auto';
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['src', 'alt', 'width', 'height'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: inline-block;
      }

      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <img 
        src="${this.src}"
        alt="${this.alt}"
        style="width: ${this.width}; height: ${this.height};"
      />
    `;
  }
}

customElements.define('ui-logo', LogoAtom); 