import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

export interface Spinner extends BaseComponent {
  type: 'spinner';
  size: 'small' | 'medium' | 'large';
  color?: string;
  speed: 'slow' | 'normal' | 'fast';
  variant: 'circle' | 'dots' | 'pulse';
}

export class SpinnerAtom extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'speed', 'variant'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute('size') || 'medium';
    const color = this.getAttribute('color') || defaultTheme.colors.primary;
    const speed = this.getAttribute('speed') || 'normal';
    const variant = this.getAttribute('variant') || 'circle';

    const sizeMap = {
      small: '16px',
      medium: '24px',
      large: '32px'
    };

    const speedMap = {
      slow: '1.5s',
      normal: '1s',
      fast: '0.5s'
    };

    const spinnerVariants = {
      circle: `
        .spinner {
          border: 2px solid ${color}20;
          border-top: 2px solid ${color};
          border-radius: 50%;
          animation: spin ${speedMap[speed as keyof typeof speedMap]} linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `,
      dots: `
        .spinner {
          display: flex;
          gap: 4px;
        }
        .dot {
          width: calc(${sizeMap[size as keyof typeof sizeMap]} / 3);
          height: calc(${sizeMap[size as keyof typeof sizeMap]} / 3);
          background-color: ${color};
          border-radius: 50%;
          animation: bounce ${speedMap[speed as keyof typeof speedMap]} infinite ease-in-out;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `,
      pulse: `
        .spinner {
          background-color: ${color};
          border-radius: 50%;
          animation: pulse ${speedMap[speed as keyof typeof speedMap]} infinite ease-in-out;
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .spinner {
          width: ${sizeMap[size as keyof typeof sizeMap]};
          height: ${sizeMap[size as keyof typeof sizeMap]};
        }
        ${spinnerVariants[variant as keyof typeof spinnerVariants]}
      </style>
      <div class="spinner">
        ${variant === 'dots' ? '<div class="dot"></div><div class="dot"></div><div class="dot"></div>' : ''}
      </div>
    `;
  }
}

customElements.define('ui-spinner', SpinnerAtom); 