import { BaseComponent } from "../base/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class SoundCloud extends BaseComponent {
  private url = ""
  private color = "#FF5500"
  private autoPlay = false

  static get observedAttributes() {
    return ["url", "color", "autoplay"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "url") {
      this.url = newValue
      this.render()
    }
    if (name === "color") {
      this.color = newValue
      this.render()
    }
    if (name === "autoplay") {
      this.autoPlay = newValue === "true"
      this.render()
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .soundcloud-widget {
        width: 100%;
        height: 166px;
        border: none;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <iframe
        class="soundcloud-widget"
        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(this.url)}&color=${encodeURIComponent(this.color)}&auto_play=${this.autoPlay}"
        allow="autoplay"
      ></iframe>
    `
  }
}

customElements.define("w-soundcloud", SoundCloud)

