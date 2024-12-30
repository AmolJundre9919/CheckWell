import { Theme, defaultTheme } from "../../theme/theme";
import { BaseComponent } from "../BaseComponent";

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps {
  variant: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: string;
  truncate?: boolean;
  italic?: boolean;
}

export class TypographyAtom extends BaseComponent implements TypographyProps {
  variant: TypographyVariant = 'p';
  weight: TypographyWeight = 'normal';
  align: TypographyAlign = 'left';
  color?: string;
  truncate: boolean = false;
  italic: boolean = false;
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['variant', 'weight', 'align', 'color', 'truncate', 'italic'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
      }

      .typography {
        margin: 0;
        font-family: system-ui, sans-serif;
        color: ${this.theme.colors.text};
        text-align: var(--align);
        font-style: var(--font-style);
      }

      /* Variants */
      .h1 {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 1rem;
      }

      .h2 {
        font-size: 2rem;
        line-height: 1.3;
        margin-bottom: 0.875rem;
      }

      .h3 {
        font-size: 1.75rem;
        line-height: 1.4;
        margin-bottom: 0.75rem;
      }

      .h4 {
        font-size: 1.5rem;
        line-height: 1.4;
        margin-bottom: 0.625rem;
      }

      .h5 {
        font-size: 1.25rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .h6 {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      .p {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .span {
        display: inline;
        font-size: inherit;
        line-height: inherit;
      }

      /* Weights */
      .normal { font-weight: 400; }
      .medium { font-weight: 500; }
      .semibold { font-weight: 600; }
      .bold { font-weight: 700; }

      /* Truncate */
      .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `);
  }

  protected render(): void {
    const Tag = this.variant;
    const style = `
      --align: ${this.align};
      --font-style: ${this.italic ? 'italic' : 'normal'};
      ${this.color ? `color: ${this.color};` : ''}
    `;

    this._shadowRoot.innerHTML = `
      <${Tag} 
        class="typography ${this.variant} ${this.weight} ${this.truncate ? 'truncate' : ''}"
        style="${style}"
      >
        <slot></slot>
      </${Tag}>
    `;
  }
}

customElements.define('ui-typography', TypographyAtom); 