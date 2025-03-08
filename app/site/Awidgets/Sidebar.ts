import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Sidebar extends BaseComponent {
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
      .sidebar {
        width: 250px;
        background: ${theme.colors.lightBackground};
        padding: 16px;
      }
      .sidebar-item {
        padding: 8px 0;
      }
      .sidebar-link {
        color: ${theme.colors.text};
        text-decoration: none;
      }
      .sidebar-link:hover {
        text-decoration: underline;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="sidebar">
        ${this.items
          .map(
            (item) => `
          <div class="sidebar-item">
            <a href="${item.url}" class="sidebar-link">${item.label}</a>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-sidebar", Sidebar)

