import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Portfolio extends BaseComponent {
  private items: { title: string; image: string; category: string }[] = []

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
      .portfolio {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
        padding: 16px;
      }
      .portfolio-item {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .portfolio-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .portfolio-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        background: rgba(255,255,255,0.9);
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      .portfolio-item:hover .portfolio-overlay {
        transform: translateY(0);
      }
      .portfolio-title {
        margin: 0 0 8px;
        font-size: 1.25rem;
        color: ${theme.colors.text};
      }
      .portfolio-category {
        font-size: 0.875rem;
        color: ${theme.colors.text};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="portfolio">
        ${this.items
          .map(
            (item) => `
          <div class="portfolio-item">
            <img class="portfolio-image" src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
              <h3 class="portfolio-title">${item.title}</h3>
              <div class="portfolio-category">${item.category}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-portfolio", Portfolio)

