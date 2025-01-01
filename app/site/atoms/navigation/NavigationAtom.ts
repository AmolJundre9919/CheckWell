import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

interface NavigationProps {
  icon: string;
  label: string;
  badgeText?: string;
}

export class NavigationAtom extends BaseComponent implements NavigationProps {
  icon: string = '';
  label: string = '';
  badgeText?: string;
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['icon', 'label', 'badgeText'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
      }

      .navigation-item {
        display: flex;
        align-items: center;
        gap: ${this.theme.spacing.sm};
        padding: ${this.theme.spacing.sm} ${this.theme.spacing.md};
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .navigation-item:hover {
        background: ${this.theme.colors.background};
      }

      .label {
        color: ${this.theme.colors.text};
        font-size: ${this.theme.typography.sm};
        font-weight: 500;
      }

      .icon {
        color: ${this.theme.colors.text};
        font-size: ${this.theme.typography.base};
      }

      .badge {
        background-color: ${this.theme.colors.primary};
        color: white;
        border-radius: 9999px;
        padding: ${this.theme.spacing.xs} ${this.theme.spacing.sm};
        font-size: ${this.theme.typography.xs};
        font-weight: 500;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="navigation-item">
        <span class="icon">${this.icon}</span>
        <span class="label">${this.label}</span>
        ${this.badgeText ? `<span class="badge">${this.badgeText}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('ui-navigation', NavigationAtom); 