import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Countdown extends BaseComponent {
  private targetDate = new Date()
  private interval: number | null = null

  static get observedAttributes() {
    return ["target-date"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "target-date") {
      this.targetDate = new Date(newValue)
      this.startCountdown()
    }
  }

  private startCountdown() {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
    this.render()
    this.interval = window.setInterval(() => this.render(), 1000)
  }

  disconnectedCallback() {
    if (this.interval) {
      window.clearInterval(this.interval)
    }
  }

  private getTimeRemaining() {
    const total = this.targetDate.getTime() - new Date().getTime()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)
    return { total, days, hours, minutes, seconds }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .countdown {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 20px;
      }
      .countdown-item {
        text-align: center;
      }
      .countdown-value {
        font-size: 2rem;
        font-weight: bold;
        color: ${theme.colors.text};
      }
      .countdown-label {
        font-size: 0.875rem;
        color: ${theme.colors.text};
        text-transform: uppercase;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    const time = this.getTimeRemaining()

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="countdown">
        <div class="countdown-item">
          <div class="countdown-value">${time.days}</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">${time.hours}</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">${time.minutes}</div>
          <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-value">${time.seconds}</div>
          <div class="countdown-label">Seconds</div>
        </div>
      </div>
    `
  }
}

customElements.define("w-countdown", Countdown)

