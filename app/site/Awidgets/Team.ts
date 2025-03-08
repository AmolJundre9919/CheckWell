import { BaseComponent } from "../base/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Team extends BaseComponent {
  private members: { name: string; role: string; image: string; bio: string }[] = []

  static get observedAttributes() {
    return ["members"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "members") {
      try {
        this.members = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid members JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
        padding: 16px;
      }
      .team-member {
        text-align: center;
      }
      .member-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 16px;
      }
      .member-name {
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0;
      }
      .member-role {
        color: ${theme.colors.text};
        margin: 8px 0;
      }
      .member-bio {
        font-size: 0.9rem;
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="team-grid">
        ${this.members
          .map(
            (member) => `
          <div class="team-member">
            <img class="member-image" src="${member.image}" alt="${member.name}">
            <h3 class="member-name">${member.name}</h3>
            <div class="member-role">${member.role}</div>
            <p class="member-bio">${member.bio}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-team", Team)

