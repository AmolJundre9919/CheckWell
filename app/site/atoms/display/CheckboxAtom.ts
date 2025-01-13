import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

export interface Checkbox extends BaseComponent {
  type: 'checkbox';
  size: 'small' | 'medium' | 'large';
  label?: string;
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  color?: string;
}

export class CheckboxAtom extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'label', 'checked', 'disabled', 'indeterminate', 'color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  private addEventListeners() {
    const checkbox = this.shadowRoot?.querySelector('input');
    checkbox?.addEventListener('change', this.handleChange.bind(this));
  }

  private removeEventListeners() {
    const checkbox = this.shadowRoot?.querySelector('input');
    checkbox?.removeEventListener('change', this.handleChange.bind(this));
  }

  private handleChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.setAttribute('checked', checkbox.checked.toString());
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: checkbox.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const size = this.getAttribute('size') || 'medium';
    const label = this.getAttribute('label') || '';
    const checked = this.getAttribute('checked') === 'true';
    const disabled = this.getAttribute('disabled') === 'true';
    const indeterminate = this.getAttribute('indeterminate') === 'true';
    const color = this.getAttribute('color') || defaultTheme.colors.primary;

    const sizeMap = {
      small: {
        checkbox: '16px',
        label: '14px',
        border: '2px'
      },
      medium: {
        checkbox: '20px',
        label: '16px',
        border: '2px'
      },
      large: {
        checkbox: '24px',
        label: '18px',
        border: '3px'
      }
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? '0.5' : '1'};
        }

        .checkbox-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        input[type="checkbox"] {
          appearance: none;
          -webkit-appearance: none;
          width: ${sizeMap[size as keyof typeof sizeMap].checkbox};
          height: ${sizeMap[size as keyof typeof sizeMap].checkbox};
          border: ${sizeMap[size as keyof typeof sizeMap].border} solid ${color};
          border-radius: 4px;
          margin: 0;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          transition: all 0.2s ease;
        }

        input[type="checkbox"]:checked {
          background-color: ${color};
        }

        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 25%;
          height: 50%;
          border-right: ${sizeMap[size as keyof typeof sizeMap].border} solid white;
          border-bottom: ${sizeMap[size as keyof typeof sizeMap].border} solid white;
        }

        input[type="checkbox"].indeterminate::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: ${sizeMap[size as keyof typeof sizeMap].border};
          background-color: ${checked ? 'white' : color};
        }

        label {
          font-size: ${sizeMap[size as keyof typeof sizeMap].label};
          color: ${disabled ? '#666' : '#000'};
          user-select: none;
        }
      </style>
      <div class="checkbox-wrapper">
        <input 
          type="checkbox" 
          class="${indeterminate ? 'indeterminate' : ''}"
          ?checked="${checked}"
          ?disabled="${disabled}"
        />
      </div>
      ${label ? `<label>${label}</label>` : ''}
    `;

    // Set indeterminate state (can't be done through HTML)
    if (indeterminate) {
      const checkbox = this.shadowRoot?.querySelector('input');
      if (checkbox) {
        (checkbox as HTMLInputElement).indeterminate = true;
      }
    }
  }
}

customElements.define('ui-checkbox', CheckboxAtom); 