import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class MinimalistBio extends BaseComponent {
  private name = ""
  private avatar = ""
  private links: { label: string; url: string }[] = []

  static get observedAttributes() {
    return ["name", "avatar", "links"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "name") {
      this.name = newValue
      this.render()
    }
    if (name === "avatar") {
      this.avatar = newValue
      this.render()
    }
    if (name === "links") {
      try {
        this.links = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid links JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .bio {
        text-align: center;
        padding: 24px;
        max-width: 400px;
        margin: 0 auto;
      }
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-bottom: 16px;
        object-fit: cover;
      }
      .name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 16px;
        color: ${theme.colors.text};
      }
      .links {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .link {
        padding: 8px;
        color: ${theme.colors.text};
        text-decoration: none;
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        transition: background-color 0.2s;
      }
      .link:hover {
        background-color: ${theme.colors.lightBackground};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="bio">
        <img class="avatar" src="${this.avatar}" alt="${this.name}">
        <h2 class="name">${this.name}</h2>
        <div class="links">
          ${this.links
            .map(
              (link) => `
            <a href="${link.url}" class="link" target="_blank" rel="noopener noreferrer">
              ${link.label}
            </a>
          `,
            )
            .join("")}
        </div>
      </div>
    `
  }
}

customElements.define("w-minimalist-bio", MinimalistBio)

