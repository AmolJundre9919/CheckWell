import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class SearchForm extends BaseComponent {
  private placeholder = "Search..."

  static get observedAttributes() {
    return ["placeholder"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "placeholder") {
      this.placeholder = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .search-form {
        display: flex;
        gap: 8px;
        padding: 16px;
      }
      .search-input {
        flex: 1;
        padding: 8px;
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
      .search-button {
        padding: 8px 16px;
        background: ${theme.colors.lightBackground};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        cursor: pointer;
      }
      .search-button:hover {
        background: ${theme.colors.hover};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <form class="search-form">
        <input type="search" class="search-input" placeholder="${this.placeholder}">
        <button type="submit" class="search-button">Search</button>
      </form>
    `
  }
}

customElements.define("w-search-form", SearchForm)

