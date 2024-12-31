import { BaseComponent } from "../atoms/BaseComponent";
import { InputAtom } from "../atoms/inputs/InputAtom";
import { ButtonAtom } from "../atoms/inputs/ButtonAtom";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void; // Callback for search action
}

export class SearchBarMolecule extends BaseComponent implements SearchBarProps {
  value: string = '';
  onSearch: (value: string) => void = () => {};

  static get observedAttributes(): string[] {
    return ['value'];
  }

  constructor() {
    super();
    this.createStyles(`
      .search-bar {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
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
  }
}

// Register the component
customElements.define('ui-search-bar', SearchBarMolecule); 