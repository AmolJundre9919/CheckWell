import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";
import "../atoms/display/LogoAtom";
import "../atoms/navigation/NavigationLinkAtom";
import "../atoms/inputs/ButtonAtom";

interface HeaderProps {
  variant?: 'default' | 'transparent';
  sticky?: boolean;
  logoSrc?: string;
  logoAlt?: string;
}

export class HeaderMolecule extends BaseComponent implements HeaderProps {
  variant: 'default' | 'transparent' = 'default';
  sticky: boolean = false;
  logoSrc: string = '';
  logoAlt: string = '';
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['variant', 'sticky', 'logo-src', 'logo-alt'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${this.theme.spacing.md} ${this.theme.spacing.lg};
        background: ${this.theme.colors.background};
        border-bottom: 1px solid ${this.theme.colors.border};
      }

      .header.transparent {
        background: transparent;
        border-bottom: none;
      }

      .header.sticky {
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .logo-container {
        flex-shrink: 0;
      }

      nav {
        display: flex;
        align-items: center;
        gap: ${this.theme.spacing.md};
      }

      .actions {
        display: flex;
        align-items: center;
        gap: ${this.theme.spacing.sm};
      }

      @media (max-width: 768px) {
        nav {
          display: none;
        }
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <header class="header ${this.variant} ${this.sticky ? 'sticky' : ''}">
        <div class="logo-container">
          <ui-logo
            src="${this.logoSrc}"
            alt="${this.logoAlt}"
            height="40px"
          ></ui-logo>
        </div>

        <nav>
          <slot name="navigation"></slot>
        </nav>

        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

customElements.define('ui-header', HeaderMolecule); 