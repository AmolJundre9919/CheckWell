import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

interface NavigationLinkProps {
  href: string;
  active?: boolean;
}

export class NavigationLinkAtom extends BaseComponent implements NavigationLinkProps {
  href: string = '#';
  active: boolean = false;
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['href', 'active'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: inline-block;
      }

      a {
        color: ${this.theme.colors.text};
        text-decoration: none;
        padding: ${this.theme.spacing.sm} ${this.theme.spacing.md};
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        font-weight: 500;
      }

      a:hover {
        color: ${this.theme.colors.primary};
        background: ${this.theme.colors.background};
      }

      a.active {
        color: ${this.theme.colors.primary};
        background: ${this.theme.colors.background};
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <a 
        href="${this.href}"
        class="${this.active ? 'active' : ''}"
      >
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('ui-nav-link', NavigationLinkAtom); 