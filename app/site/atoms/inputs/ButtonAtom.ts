import { BaseComponent } from "../BaseComponent";

// Types for button properties
type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
}

class ButtonAtom extends BaseComponent implements ButtonProps {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'disabled'];
  }

  variant: ButtonVariant = 'primary';
  size: ButtonSize = 'medium';
  disabled: boolean = false;

  constructor() {
    super();

    // Define component styles
    this.createStyles(`
      :host {
        display: inline-block;
      }
      
      button {
        font-family: system-ui, sans-serif;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        background: red;
      }

      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Variants */
      button.primary {
        background: #0066cc;
        color: white;
      }

      button.secondary {
        background: #ffffff;
        color: #0066cc;
        border: 1px solid #0066cc;
      }

      /* Sizes */
      button.small {
        padding: 4px 8px;
        font-size: 12px;
      }

      button.medium {
        padding: 8px 16px;
        font-size: 14px;
      }

      button.large {
        padding: 12px 24px;
        font-size: 16px;
      }
    `);
  }

  // Handle attribute changes
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      if (name === 'disabled') {
        this[name] = newValue !== null;
      } else {
        (this[name as keyof this] as any) = newValue;
      }
      this.render();
    }
  }

  public render(): void {
    this._shadowRoot.innerHTML = `
      <button 
        class="${this.variant} ${this.size}"
        ?disabled="${this.disabled}"
      >
        <slot></slot>
      </button>
    `;
  }
}

// Register components
customElements.define('ui-button', ButtonAtom);