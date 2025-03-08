import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class MenuAnchor extends BaseComponent {
  public id = ""
  public label = ""

  static get observedAttributes() {
    return ["id", "label"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "id") {
      this.id = newValue
      this.render()
    }
    if (name === "label") {
      this.label = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .menu-anchor {
        padding: 8px 16px;
        color: ${theme.colors.text};
        text-decoration: none;
        display: inline-block;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <a id="${this.id}" class="menu-anchor" href="#${this.id}">
        ${this.label}
      </a>
    `
  }
}

customElements.define("w-menu-anchor", MenuAnchor)

