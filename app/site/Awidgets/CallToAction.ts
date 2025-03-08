import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class CallToAction extends BaseComponent {
  public title = ""
  public description = ""
  public buttonText = ""
  public buttonUrl = ""

  static get observedAttributes() {
    return ["title", "description", "button-text", "button-url"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    switch (name) {
      case "title":
        this.title = newValue
        break
      case "description":
        this.description = newValue
        break
      case "button-text":
        this.buttonText = newValue
        break
      case "button-url":
        this.buttonUrl = newValue
        break
    }
    this.render()
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .cta {
        text-align: center;
        padding: 48px 24px;
        background: ${theme.colors.lightBackground};
        border-radius: 8px;
      }
      .cta-title {
        font-size: 2rem;
        margin-bottom: 16px;
        color: ${theme.colors.text};
      }
      .cta-description {
        margin-bottom: 24px;
        color: ${theme.colors.text};
      }
      .cta-button {
        display: inline-block;
        padding: 12px 24px;
        background: ${theme.colors.text};
        color: ${theme.colors.background};
        text-decoration: none;
        border-radius: 4px;
        transition: opacity 0.2s;
      }
      .cta-button:hover {
        opacity: 0.9;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="cta">
        <h2 class="cta-title">${this.title}</h2>
        <p class="cta-description">${this.description}</p>
        <a href="${this.buttonUrl}" class="cta-button">${this.buttonText}</a>
      </div>
    `
  }
}

customElements.define("w-call-to-action", CallToAction)

