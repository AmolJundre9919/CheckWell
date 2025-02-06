import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class PostGrid extends BaseComponent {
  private posts: { title: string; excerpt: string; image: string; url: string }[] = []

  static get observedAttributes() {
    return ["posts"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "posts") {
      try {
        this.posts = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid posts JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .post-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }
      .post-card {
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        overflow: hidden;
      }
      .post-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }
      .post-content {
        padding: 16px;
      }
      .post-title {
        margin: 0 0 8px;
        font-size: 18px;
      }
      .post-excerpt {
        margin: 0;
        font-size: 14px;
        color: ${theme.colors.text};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="post-grid">
        ${this.posts
          .map(
            (post) => `
          <div class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
              <h3 class="post-title">${post.title}</h3>
              <p class="post-excerpt">${post.excerpt}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-post-grid", PostGrid)

