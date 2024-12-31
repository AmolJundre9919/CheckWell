import { BaseComponent } from "../BaseComponent";

interface CardProps {
  variant: 'default' | 'outlined' | 'elevated';
  padding: 'sm' | 'md' | 'lg';
  elevation?: number;
  header?: string;
  content?: string;
  imageUrl?: string;
}

export class CardMolecule extends BaseComponent implements CardProps {
  variant: CardProps['variant'] = 'default';
  padding: CardProps['padding'] = 'md';
  elevation: number = 1;
  header?: string;
  content?: string;
  imageUrl?: string;

  static get observedAttributes(): string[] {
    return ['variant', 'padding', 'elevation', 'header', 'content', 'imageUrl'];
  }

  constructor() {
    super();
    this.createStyles(`
      .card {
        border-radius: 8px;
        overflow: hidden;
      }

      .default {
        background: ${this.theme.colors.surface};
      }

      .outlined {
        border: 1px solid ${this.theme.colors.secondary};
      }

      .elevated {
        background: ${this.theme.colors.surface};
        box-shadow: 0 ${this.elevation}px ${this.elevation * 2}px rgba(0, 0, 0, 0.1);
      }

      .padding-sm { padding: ${this.theme.spacing.sm}; }
      .padding-md { padding: ${this.theme.spacing.md}; }
      .padding-lg { padding: ${this.theme.spacing.lg}; }

      .card-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .card-header {
        margin-bottom: ${this.theme.spacing.sm};
        font-size: 1.25rem;
        font-weight: bold;
        color: ${this.theme.colors.text};
      }

      .card-content {
        color: ${this.theme.colors.text};
      }

      .card-actions {
        margin-top: ${this.theme.spacing.md};
        display: flex;
        justify-content: flex-end;
        gap: ${this.theme.spacing.sm};
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="card ${this.variant}">
        ${this.imageUrl ? `
          <img 
            src="${this.imageUrl}" 
            alt="${this.header || 'Card image'}"
            class="card-image"
          />
        ` : ''}
        <div class="padding-${this.padding}">
          ${this.header ? `
            <div class="card-header">
              ${this.header}
            </div>
          ` : ''}
          <div class="card-content">
            ${this.content || '<slot></slot>'}
          </div>
          <div class="card-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-card', CardMolecule); 