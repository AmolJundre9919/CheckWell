import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class CustomHTML extends BaseComponent {
  private html = ""

  static get observedAttributes() {
    return ["html"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "html") {
      this.html = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .custom-html {
        padding: 16px;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="custom-html">
        ${this.html}
      </div>
    `
  }
}

customElements.define("w-custom-html", CustomHTML)

