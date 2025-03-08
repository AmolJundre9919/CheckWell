import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Block extends BaseComponent {
  private content = ""

  static get observedAttributes() {
    return ["content"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "content") {
      this.content = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .block {
        padding: 16px;
        background: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="block">
        ${this.content}
      </div>
    `
  }
}

customElements.define("w-block", Block)

