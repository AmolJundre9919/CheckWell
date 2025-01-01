import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

interface LogoProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export class LogoAtom extends BaseComponent implements LogoProps {
  src: string = '/placeholder-logo.svg';
  alt: string = 'Logo';
  width: string = 'auto';
  height: string = '40px';
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

      .placeholder-logo {
        width: 100%;
        height: 100%;
        min-width: 40px;
        min-height: 40px;
      }
    `);
  }

  private getPlaceholderSVG(): string {
    return `
      <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="8" fill="${this.theme.colors.primary}"/>
        <path d="M15 30C15 21.7157 21.7157 15 30 15C38.2843 15 45 21.7157 45 30C45 38.2843 38.2843 45 30 45C21.7157 45 15 38.2843 15 30Z" fill="white"/>
        <path d="M30 20C25.5817 20 22 23.5817 22 28C22 32.4183 25.5817 36 30 36C34.4183 36 38 32.4183 38 28C38 23.5817 34.4183 20 30 20ZM27 31V25L34 28L27 31Z" fill="${this.theme.colors.primary}"/>
        <text x="75" y="38" font-family="system-ui" font-size="24" font-weight="600" fill="${this.theme.colors.text}">LOGO</text>
      </svg>
    `;
  }

  protected render(): void {
    const isPlaceholder = !this.src || this.src === '/placeholder-logo.svg';
    
    this._shadowRoot.innerHTML = `
      ${isPlaceholder 
        ? this.getPlaceholderSVG()
        : `<img 
            src="${this.src}"
            alt="${this.alt}"
            style="width: ${this.width}; height: ${this.height};"
          />`
      }
    `;
  }
}

customElements.define('ui-logo', LogoAtom); 