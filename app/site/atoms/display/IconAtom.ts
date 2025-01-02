import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

export interface Icon extends BaseComponent {
  type: 'icon';
  name: string;
  size: 'small' | 'medium' | 'large';
  color?: string;
}

export class IconAtom extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size', 'color'];
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
    const name = this.getAttribute('name') || '';
    const size = this.getAttribute('size') || 'medium';
    const color = this.getAttribute('color') || defaultTheme.colors.primary;

    const sizeMap = {
      small: '16px',
      medium: '24px',
      large: '32px'
    };

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon {
          width: ${sizeMap[size as keyof typeof sizeMap]};
          height: ${sizeMap[size as keyof typeof sizeMap]};
          color: ${color};
        }
      </style>
      <span class="icon">${name}</span>
    `;
  }
}

customElements.define('ui-icon', IconAtom); 