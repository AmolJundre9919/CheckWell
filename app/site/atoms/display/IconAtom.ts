import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

declare global {
  interface Window {
    lucide: {
      createIcons: (config: { attrs: { stroke?: string; 'stroke-width'?: number } }) => void;
    };
  }
}

interface Icon extends BaseComponent {
  type: 'icon';
  name: string;
  size: 'small' | 'medium' | 'large';
  color?: string;
}

interface IconAtomProps {
  name?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export class IconAtom extends BaseComponent implements Icon {
  protected theme: Theme = defaultTheme;
  type: 'icon' = 'icon';
  name: string = 'home';
  size: 'small' | 'medium' | 'large' = 'medium';
  color?: string;

  props: IconAtomProps = {
    name: this.name,
    size: this.size,
    color: this.color
  };

  static get observedAttributes(): string[] {
    return ['name', 'size', 'color'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .icon-container {
        display: inline-flex;
        position: relative;
      }

      .icon {
        stroke: var(--icon-color, #000);
        fill: none;
        transition: all 0.2s ease;
      }

      .icon[data-size="sm"] {
        width: 16px;
        height: 16px;
      }

      .icon[data-size="md"] {
        width: 24px;
        height: 24px;
      }

      .icon[data-size="lg"] {
        width: 32px;
        height: 32px;
      }

      .icon-dimensions {
        position: absolute;
        bottom: -22px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.75rem;
        color: #3B82F6;
        background: #EFF6FF;
        padding: 2px 8px;
        border-radius: 4px;
        border: 1px dashed #93C5FD;
        pointer-events: none;
        font-family: monospace;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        z-index: 10;
        white-space: nowrap;
      }
    `);
  }

  protected render(): void {
    const { name, size, color } = this.props;
    const sizeMap = {
      sm: 16,
      md: 24,
      lg: 32
    };

    const sizeKey = {
      'small': 'sm',
      'medium': 'md',
      'large': 'lg'
    }[size || 'medium'] as 'sm' | 'md' | 'lg';

    this._shadowRoot.innerHTML = `
      <div class="icon-container">
        <i class="icon" 
          data-size="${sizeKey}"
          data-lucide="${name}"
          style="--icon-color: ${color}; stroke-width: ${sizeMap[sizeKey]}px"
        ></i>
        <div class="icon-dimensions">
          ${sizeMap[sizeKey]}px × ${sizeMap[sizeKey]}px
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({
        attrs: {
          stroke: color,
          'stroke-width': sizeMap[sizeKey]
        }
      });
    }
  }
}

customElements.define('ui-icon', IconAtom); 