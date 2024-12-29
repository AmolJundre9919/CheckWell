import { BaseComponent } from '../BaseComponent';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

interface InputProps {
  type: InputType;
  placeholder?: string;
  value?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export class InputAtom extends BaseComponent implements InputProps {
  type: InputType = 'text';
  placeholder: string = '';
  value: string = '';
  label: string = '';
  error: string = '';
  required: boolean = false;

  static get observedAttributes(): string[] {
    return ['type', 'placeholder', 'value', 'label', 'error', 'required'];
  }

  constructor() {
    super();
    this.createStyles(`
      .input-container {
        display: flex;
        flex-direction: column;
        gap: ${this.theme.spacing.xs};
      }

      label {
        font-size: 0.875rem;
        color: ${this.theme.colors.text};
      }

      input {
        padding: ${this.theme.spacing.sm};
        border: 1px solid ${this.theme.colors.secondary};
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
      }

      input:focus {
        outline: none;
        border-color: ${this.theme.colors.primary};
      }

      .error {
        color: ${this.theme.colors.error};
        font-size: 0.75rem;
      }

      input.error {
        border-color: ${this.theme.colors.error};
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="input-container">
        ${this.label ? `<label>${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <input
          type="${this.type}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          class="${this.error ? 'error' : ''}"
          ?required="${this.required}"
        />
        ${this.error ? `<span class="error">${this.error}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('ui-input', InputAtom); 