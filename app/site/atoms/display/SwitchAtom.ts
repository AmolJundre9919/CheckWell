import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

export interface Switch extends BaseComponent {
  type: 'switch';
  size: 'small' | 'medium' | 'large';
  label?: string;
  checked: boolean;
  disabled?: boolean;
  color?: string;
}

export class SwitchAtom extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'label', 'checked', 'disabled', 'color'];
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
    const input = this.shadowRoot?.querySelector('input');
    input?.addEventListener('change', this.handleChange.bind(this));
  }

  private removeEventListeners() {
    const input = this.shadowRoot?.querySelector('input');
    input?.removeEventListener('change', this.handleChange.bind(this));
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setAttribute('checked', input.checked.toString());
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: input.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const size = this.getAttribute('size') || 'medium';
    const label = this.getAttribute('label') || '';
    const checked = this.getAttribute('checked') === 'true';
    const disabled = this.getAttribute('disabled') === 'true';
    const color = this.getAttribute('color') || defaultTheme.colors.primary;

    const sizeMap = {
      small: {
        width: '32px',
        height: '16px',
        circle: '12px',
        label: '14px'
      },
      medium: {
        width: '40px',
        height: '20px',
        circle: '16px',
        label: '16px'
      },
      large: {
        width: '48px',
        height: '24px',
        circle: '20px',
        label: '18px'
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

        .switch-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: ${sizeMap[size as keyof typeof sizeMap].width};
          height: ${sizeMap[size as keyof typeof sizeMap].height};
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: ${sizeMap[size as keyof typeof sizeMap].circle};
          width: ${sizeMap[size as keyof typeof sizeMap].circle};
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: ${color};
        }

        input:checked + .slider:before {
          transform: translateX(calc(${sizeMap[size as keyof typeof sizeMap].width} - ${sizeMap[size as keyof typeof sizeMap].circle} - 4px));
        }

        label {
          font-size: ${sizeMap[size as keyof typeof sizeMap].label};
          color: ${disabled ? '#666' : '#000'};
          user-select: none;
        }
      </style>
      <div class="switch-wrapper">
        <label class="switch">
          <input 
            type="checkbox" 
            ?checked="${checked}"
            ?disabled="${disabled}"
          />
          <span class="slider"></span>
        </label>
      </div>
      ${label ? `<label>${label}</label>` : ''}
    `;
  }
}

customElements.define('ui-switch', SwitchAtom); 