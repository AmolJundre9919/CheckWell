import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

type GridColumns = '1' | '2' | '3' | '4' | '6' | '12';
type GridGap = 'none' | 'sm' | 'md' | 'lg';

interface GridProps {
  columns: GridColumns;
  gap: GridGap;
}

export class GridAtom extends BaseComponent implements GridProps {
  columns: GridColumns = '12';
  gap: GridGap = 'md';
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['columns', 'gap'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
        width: 100%;
      }

      .grid {
        display: grid;
        width: 100%;
      }

      /* Gap variants */
      .gap-none { gap: 0; }
      .gap-sm { gap: ${this.theme.spacing.sm}; }
      .gap-md { gap: ${this.theme.spacing.md}; }
      .gap-lg { gap: ${this.theme.spacing.lg}; }

      /* Column variants */
      .cols-1 { grid-template-columns: repeat(1, 1fr); }
      .cols-2 { grid-template-columns: repeat(2, 1fr); }
      .cols-3 { grid-template-columns: repeat(3, 1fr); }
      .cols-4 { grid-template-columns: repeat(4, 1fr); }
      .cols-6 { grid-template-columns: repeat(6, 1fr); }
      .cols-12 { grid-template-columns: repeat(12, 1fr); }

      /* Responsive */
      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="grid gap-${this.gap} cols-${this.columns}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-grid', GridAtom); 