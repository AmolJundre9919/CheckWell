import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class ShareButton extends BaseComponent {
  private networks: string[] = ["facebook", "twitter", "linkedin"]

  static get observedAttributes() {
    return ["networks"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "networks") {
      try {
        this.networks = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid networks JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .share-buttons {
        display: flex;
        gap: 8px;
        padding: 16px;
      }
      .share-button {
        padding: 8px 16px;
        background: ${theme.colors.lightBackground};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        cursor: pointer;
        text-transform: capitalize;
      }
      .share-button:hover {
        background: ${theme.colors.hover};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="share-buttons">
        ${this.networks
          .map(
            (network) => `
          <button class="share-button" data-network="${network}">
            Share on ${network}
          </button>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-share-button", ShareButton)

