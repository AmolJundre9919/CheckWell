import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class AnimatedHeadline extends BaseComponent {
  public headlines: string[] = []
  public animationType: "fade" | "slide" | "zoom" = "fade"
  private currentIndex = 0

  static get observedAttributes() {
    return ["headlines", "animation-type"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "headlines") {
      try {
        this.headlines = JSON.parse(newValue)
        this.render()
      } catch (error) {
        console.error("Invalid headlines JSON format")
      }
    }
    if (name === "animation-type") {
      this.animationType = newValue as "fade" | "slide" | "zoom"
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .animated-headline {
        font-size: 2rem;
        font-weight: bold;
        color: ${theme.colors.text};
        text-align: center;
        min-height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .headline {
        position: absolute;
        opacity: 0;
        transition: all 0.5s ease-in-out;
      }
      .headline.active {
        opacity: 1;
      }
      .fade .headline.active {
        transition: opacity 0.5s ease-in-out;
      }
      .slide .headline {
        transform: translateY(20px);
      }
      .slide .headline.active {
        transform: translateY(0);
      }
      .zoom .headline {
        transform: scale(0.5);
      }
      .zoom .headline.active {
        transform: scale(1);
      }
    `
  }

  private animateHeadlines() {
    this.currentIndex = (this.currentIndex + 1) % this.headlines.length
    this.render()
  }

  connectedCallback() {
    super.connectedCallback()
    setInterval(() => this.animateHeadlines(), 3000)
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="animated-headline ${this.animationType}">
        ${this.headlines
          .map(
            (headline, index) => `
          <div class="headline ${index === this.currentIndex ? "active" : ""}">
            ${headline}
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-animated-headline", AnimatedHeadline)

