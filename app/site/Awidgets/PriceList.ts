import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class PriceList extends BaseComponent {
  private items: { name: string; price: string; features: string[] }[] = []

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
      .price-list {
        padding: 16px;
      }
      .price-item {
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid ${theme.colors.border};
        border-radius: 8px;
      }
      .price-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${theme.colors.border};
      }
      .price-name {
        font-size: 1.25rem;
        font-weight: bold;
        color: ${theme.colors.text};
      }
      .price-amount {
        font-size: 1.5rem;
        color: ${theme.colors.text};
      }
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .feature-item {
        padding: 8px 0;
        color: ${theme.colors.text};
      }
      .feature-item:before {
        content: "✓";
        margin-right: 8px;
        color: green;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="price-list">
        ${this.items
          .map(
            (item) => `
          <div class="price-item">
            <div class="price-header">
              <div class="price-name">${item.name}</div>
              <div class="price-amount">${item.price}</div>
            </div>
            <ul class="features-list">
              ${item.features
                .map(
                  (feature) => `
                <li class="feature-item">${feature}</li>
              `,
                )
                .join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-price-list", PriceList)

