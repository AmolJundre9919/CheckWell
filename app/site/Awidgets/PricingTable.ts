import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class PricingTable extends BaseComponent {
  private plans: { name: string; price: string; features: string[] }[] = []

  static get observedAttributes() {
    return ["plans"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "plans") {
      try {
        this.plans = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid plans JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .pricing-table {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
        padding: 16px;
      }
      .plan {
        text-align: center;
        padding: 24px;
        border: 1px solid ${theme.colors.border};
        border-radius: 8px;
        background: ${theme.colors.background};
        transition: transform 0.3s ease;
      }
      .plan:hover {
        transform: translateY(-4px);
      }
      .plan-name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 16px;
        color: ${theme.colors.text};
      }
      .plan-price {
        font-size: 2rem;
        margin-bottom: 24px;
        color: ${theme.colors.text};
      }
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0 0 24px;
        text-align: left;
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
      .select-button {
        display: inline-block;
        padding: 12px 24px;
        background: ${theme.colors.text};
        color: ${theme.colors.background};
        text-decoration: none;
        border-radius: 4px;
        transition: opacity 0.2s;
      }
      .select-button:hover {
        opacity: 0.9;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="pricing-table">
        ${this.plans
          .map(
            (plan) => `
          <div class="plan">
            <h3 class="plan-name">${plan.name}</h3>
            <div class="plan-price">${plan.price}</div>
            <ul class="features-list">
              ${plan.features
                .map(
                  (feature) => `
                <li class="feature-item">${feature}</li>
              `,
                )
                .join("")}
            </ul>
            <a href="#" class="select-button">Select Plan</a>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-pricing-table", PricingTable)

