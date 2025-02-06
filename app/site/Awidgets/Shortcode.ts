import { BaseComponent } from "../base/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Shortcode extends BaseComponent {
  private code = ""

  static get observedAttributes() {
    return ["code"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "code") {
      this.code = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .shortcode {
        padding: 8px;
        background: ${theme.colors.lightBackground};
        border-radius: 4px;
        font-family: monospace;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="shortcode">[${this.code}]</div>
    `
  }
}

customElements.define("w-shortcode", Shortcode)

