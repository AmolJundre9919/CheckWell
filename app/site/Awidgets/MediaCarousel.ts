import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class MediaCarousel extends BaseComponent {
  private items: { url: string; caption: string }[] = []
  private currentIndex = 0

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
      .carousel {
        position: relative;
        overflow: hidden;
      }
      .carousel-content {
        display: flex;
        transition: transform 0.3s ease;
      }
      .carousel-item {
        flex: 0 0 100%;
      }
      .carousel-image {
        width: 100%;
        height: auto;
      }
      .carousel-caption {
        padding: 8px;
        text-align: center;
        background: ${theme.colors.lightBackground};
      }
      .carousel-nav {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 16px;
      }
      .nav-button {
        padding: 8px 16px;
        background: ${theme.colors.lightBackground};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        cursor: pointer;
      }
      .nav-button:hover {
        background: ${theme.colors.hover};
      }
    `
  }

  private next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length
    this.render()
  }

  private prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.render()
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="carousel">
        <div class="carousel-content" style="transform: translateX(-${this.currentIndex * 100}%)">
          ${this.items
            .map(
              (item) => `
            <div class="carousel-item">
              <img class="carousel-image" src="${item.url}" alt="${item.caption}">
              <div class="carousel-caption">${item.caption}</div>
            </div>
          `,
            )
            .join("")}
        </div>
        <div class="carousel-nav">
          <button class="nav-button prev">Previous</button>
          <button class="nav-button next">Next</button>
        </div>
      </div>
    `

    this.shadowRoot.querySelector(".prev")?.addEventListener("click", () => this.prev())
    this.shadowRoot.querySelector(".next")?.addEventListener("click", () => this.next())
  }
}

customElements.define("w-media-carousel", MediaCarousel)

