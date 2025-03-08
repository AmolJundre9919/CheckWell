import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Blockquote extends BaseComponent {
  private quote = ""
  private author = ""

  static get observedAttributes() {
    return ["quote", "author"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "quote") {
      this.quote = newValue
      this.render()
    }
    if (name === "author") {
      this.author = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .blockquote {
        padding: 24px;
        margin: 16px 0;
        border-left: 4px solid ${theme.colors.border};
        background: ${theme.colors.lightBackground};
      }
      .quote {
        font-size: 1.25rem;
        font-style: italic;
        margin-bottom: 16px;
        color: ${theme.colors.text};
      }
      .author {
        font-size: 1rem;
        color: ${theme.colors.text};
        font-weight: 500;
      }
      .author:before {
        content: "— ";
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="blockquote">
        <div class="quote">${this.quote}</div>
        ${this.author ? `<div class="author">${this.author}</div>` : ""}
      </div>
    `
  }
}

customElements.define("w-blockquote", Blockquote)

