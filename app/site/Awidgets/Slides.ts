import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Slides extends BaseComponent {
  public slides: { image: string; caption: string }[] = []
  private currentIndex = 0

  static get observedAttributes() {
    return ["slides"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "slides") {
      try {
        this.slides = JSON.parse(newValue)
        this.render()
      } catch (error) {
        console.error("Invalid slides JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .slides-container {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
      }
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      .slide.active {
        opacity: 1;
      }
      .slide-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .slide-caption {
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 10px;
        font-size: 18px;
      }
      .navigation {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
      }
      .nav-button {
        background-color: ${theme.colors.background};
        border: none;
        color: ${theme.colors.text};
        cursor: pointer;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 4px;
      }
    `
  }

  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length
    this.render()
  }

  private prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length
    this.render()
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="slides-container">
        ${this.slides
          .map(
            (slide, index) => `
          <div class="slide ${index === this.currentIndex ? "active" : ""}">
            <img class="slide-image" src="${slide.image}" alt="Slide ${index + 1}">
            <div class="slide-caption">${slide.caption}</div>
          </div>
        `,
          )
          .join("")}
        <div class="navigation">
          <button class="nav-button prev">Previous</button>
          <button class="nav-button next">Next</button>
        </div>
      </div>
    `

    this.shadowRoot.querySelector(".prev")?.addEventListener("click", () => this.prevSlide())
    this.shadowRoot.querySelector(".next")?.addEventListener("click", () => this.nextSlide())
  }
}

customElements.define("w-slides", Slides)

