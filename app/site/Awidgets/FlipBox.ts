import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class FlipBox extends BaseComponent {
  private frontContent = ""
  private backContent = ""

  static get observedAttributes() {
    return ["front-content", "back-content"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "front-content") {
      this.frontContent = newValue
      this.render()
    }
    if (name === "back-content") {
      this.backContent = newValue
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .flip-box {
        perspective: 1000px;
        height: 300px;
      }
      .flip-box-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      .flip-box:hover .flip-box-inner {
        transform: rotateY(180deg);
      }
      .flip-box-front, .flip-box-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: 8px;
      }
      .flip-box-back {
        transform: rotateY(180deg);
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="flip-box">
        <div class="flip-box-inner">
          <div class="flip-box-front">
            ${this.frontContent}
          </div>
          <div class="flip-box-back">
            ${this.backContent}
          </div>
        </div>
      </div>
    `
  }
}

customElements.define("w-flip-box", FlipBox)

