import { BaseComponent } from "../BaseComponent";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void; // Callback for search action
}

class SearchBarAtom extends BaseComponent implements SearchBarProps {
  value: string = '';
  onSearch: (value: string) => void = () => {};

  static get observedAttributes(): string[] {
    return ['value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.createStyles(`
      .search-bar {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this[name as keyof this] = newValue as any;
      this.render();
    }
  }

  public render(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div class="search-bar">
          <ui-input
            type="text"
            placeholder="Search..."
            value="${this.value}"
            label=""
          ></ui-input>
          <ui-button
            variant="primary"
            size="md"
            onclick="this.getRootNode().host.onSearch(this.getRootNode().host.value)"
          >
            Search
          </ui-button>
        </div>
      `;
    } else {
      console.error('Shadow root is not available.');
    }
  }
}

// Register the component
customElements.define('ui-search-bar', SearchBarAtom);

export default SearchBarAtom; 