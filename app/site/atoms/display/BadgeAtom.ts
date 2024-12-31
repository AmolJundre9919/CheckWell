import { Theme, defaultTheme } from "../../theme/theme";
import { BaseComponent } from "../../BaseComponent";

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
}

export class BadgeAtom extends BaseComponent implements BadgeProps {
  variant: BadgeVariant = 'default';
  text: string = '';
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['variant', 'text'];
  }

  constructor() {
    super();
    this.createStyles(`
      .badge {
        display: inline-block;
        padding: ${this.theme.spacing.xs} ${this.theme.spacing.sm};
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .default {
        background: ${this.theme.colors.surface};
        color: ${this.theme.colors.text};
      }

      .primary {
        background: ${this.theme.colors.primary};
        color: white;
      }

      .success {
        background: ${this.theme.colors.success};
        color: white;
      }

      .warning {
        background: ${this.theme.colors.warning};
        color: ${this.theme.colors.text};
      }

      .error {
        background: ${this.theme.colors.error};
        color: white;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <span class="badge ${this.variant}">
        ${this.text}
      </span>
    `;
  }
}

customElements.define('ui-badge', BadgeAtom); 