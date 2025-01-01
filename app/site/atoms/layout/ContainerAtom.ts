import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

interface ContainerProps {
  size: ContainerSize;
  padding: ContainerPadding;
}

export class ContainerAtom extends BaseComponent implements ContainerProps {
  size: ContainerSize = 'lg';
  padding: ContainerPadding = 'md';
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['size', 'padding'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .container {
        width: 100%;
        margin: 0 auto;
      }

      /* Size variants */
      .size-sm { max-width: 640px; }
      .size-md { max-width: 768px; }
      .size-lg { max-width: 1024px; }
      .size-xl { max-width: 1280px; }
      .size-full { max-width: none; }

      /* Padding variants */
      .padding-none { padding: 0; }
      .padding-sm { padding: ${this.theme.spacing.sm}; }
      .padding-md { padding: ${this.theme.spacing.md}; }
      .padding-lg { padding: ${this.theme.spacing.lg}; }

      /* Responsive */
      @media (max-width: 768px) {
        .container {
          padding-left: ${this.theme.spacing.sm};
          padding-right: ${this.theme.spacing.sm};
        }
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="container size-${this.size} padding-${this.padding}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-container', ContainerAtom); 