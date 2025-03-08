import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class NavigationMenu extends BaseComponent {
  private items: { label: string; url: string }[] = []

  static get observedAttributes() {
    return ["items"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "items") {
      try {
        this.items = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid items JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .nav-menu {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .nav-item {
        padding: 8px 16px;
        border-bottom: 1px solid ${theme.colors.border};
      }
      .nav-link {
        color: ${theme.colors.text};
        text-decoration: none;
      }
      .nav-link:hover {
        text-decoration: underline;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <ul class="nav-menu">
        ${this.items
          .map(
            (item) => `
          <li class="nav-item">
            <a href="${item.url}" class="nav-link">${item.label}</a>
          </li>
        `,
          )
          .join("")}
      </ul>
    `
  }
}

customElements.define("w-navigation-menu", NavigationMenu)

