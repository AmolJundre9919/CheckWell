import { BaseComponent } from "../BaseComponent";
import "../atoms/inputs/InputAtom";
import "../atoms/inputs/ButtonAtom";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  clearable?: boolean;
}

export class SearchBarMolecule extends BaseComponent implements SearchBarProps {
  value: string = '';
  onSearch: (value: string) => void = () => {};
  variant: SearchBarProps['variant'] = 'default';
  size: SearchBarProps['size'] = 'md';
  disabled: boolean = false;
  clearable: boolean = true;

  static get observedAttributes(): string[] {
    return ['value', 'variant', 'size', 'disabled', 'clearable'];
  }

  constructor() {
    super();
    this.createStyles(`
      .search-bar {
        display: flex;
        align-items: center;
        gap: ${this.theme.spacing.sm};
        width: 100%;
      }

      .search-bar ui-input {
        flex: 1;
      }

      /* Size Variants */
      .size-sm ui-input {
        --input-padding: ${this.theme.spacing.sm};
        --input-font-size: ${this.theme.typography.sm};
      }

      .size-md ui-input {
        --input-padding: ${this.theme.spacing.md};
        --input-font-size: ${this.theme.typography.base};
      }

      .size-lg ui-input {
        --input-padding: ${this.theme.spacing.lg};
        --input-font-size: ${this.theme.typography.lg};
      }

      /* Variant Styles */
      .variant-default ui-input {
        --input-background: ${this.theme.colors.surface};
        --input-border-color: ${this.theme.colors.border};
      }

      .variant-outlined ui-input {
        --input-background: transparent;
        --input-border-color: ${this.theme.colors.primary};
      }

      /* Disabled State */
      .search-bar[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .search-bar[disabled] ui-input,
      .search-bar[disabled] ui-button {
        pointer-events: none;
      }
    `);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      switch (name) {
        case 'disabled':
        case 'clearable':
          (this[name as keyof this] as boolean) = newValue !== null;
          break;
        default:
          (this[name as keyof this] as string) = newValue || '';
      }
      this.render();
    }
  }

  private handleClear = () => {
    this.value = '';
    this.render();
  };

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="search-bar size-${this.size} variant-${this.variant}" ${this.disabled ? 'disabled' : ''}>
        <ui-input
          type="text"
          placeholder="Search..."
          value="${this.value}"
          label=""
          variant="${this.variant}"
          size="${this.size}"
          ${this.disabled ? 'disabled' : ''}
        ></ui-input>
        ${this.clearable && this.value ? `
          <ui-button
            variant="ghost"
            size="${this.size}"
            onclick="this.getRootNode().host.handleClear()"
          >
            ✕
          </ui-button>
        ` : ''}
        <ui-button
          variant="primary"
          size="${this.size}"
          onclick="this.getRootNode().host.onSearch(this.getRootNode().host.value)"
          ${this.disabled ? 'disabled' : ''}
        >
          Search
        </ui-button>
      </div>
    `;
  }
}

// Register the component
customElements.define('ui-search-bar', SearchBarMolecule);

export default SearchBarMolecule; 