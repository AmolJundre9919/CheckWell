import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Reviews extends BaseComponent {
  private reviews: { author: string; rating: number; content: string }[] = []

  static get observedAttributes() {
    return ["reviews"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "reviews") {
      try {
        this.reviews = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid reviews JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .reviews {
        padding: 16px;
      }
      .review {
        margin-bottom: 16px;
        padding: 16px;
        background: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
      .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .review-author {
        font-weight: bold;
      }
      .review-rating {
        color: gold;
      }
      .review-content {
        color: ${theme.colors.text};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="reviews">
        ${this.reviews
          .map(
            (review) => `
          <div class="review">
            <div class="review-header">
              <span class="review-author">${review.author}</span>
              <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
            </div>
            <div class="review-content">${review.content}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-reviews", Reviews)

