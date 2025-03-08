import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class TagCloud extends BaseComponent {
  private tags: { name: string; count: number }[] = []

  static get observedAttributes() {
    return ["tags"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "tags") {
      try {
        this.tags = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid tags JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .tag-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 16px;
      }
      .tag {
        padding: 4px 8px;
        background: ${theme.colors.lightBackground};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        font-size: calc(0.8em + var(--size, 0) * 0.2em);
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    const maxCount = Math.max(...this.tags.map((t) => t.count))

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="tag-cloud">
        ${this.tags
          .map(
            (tag) => `
          <span class="tag" style="--size: ${(tag.count / maxCount) * 5}">
            ${tag.name} (${tag.count})
          </span>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-tag-cloud", TagCloud)

