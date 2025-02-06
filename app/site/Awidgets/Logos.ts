import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Logos extends BaseComponent {
  private items: { name: string; logo: string; url: string }[] = []

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
      .logos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 32px;
        padding: 24px;
        align-items: center;
      }
      .logo-item {
        text-align: center;
      }
      .logo-link {
        display: block;
        transition: opacity 0.2s;
      }
      .logo-link:hover {
        opacity: 0.8;
      }
      .logo-image {
        max-width: 100%;
        height: auto;
        filter: grayscale(100%);
        transition: filter 0.3s ease;
      }
      .logo-image:hover {
        filter: grayscale(0%);
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="logos-grid">
        ${this.items
          .map(
            (item) => `
          <div class="logo-item">
            <a href="${item.url}" class="logo-link" title="${item.name}">
              <img class="logo-image" src="${item.logo}" alt="${item.name} logo">
            </a>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-logos", Logos)

