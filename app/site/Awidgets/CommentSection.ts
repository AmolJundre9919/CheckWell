import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class CommentSection extends BaseComponent {
  private comments: { author: string; date: string; content: string }[] = []

  static get observedAttributes() {
    return ["comments"]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return
    if (name === "comments") {
      try {
        this.comments = JSON.parse(newValue)
        this.render()
      } catch {
        console.error("Invalid comments JSON format")
      }
    }
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .comment-section {
        padding: 16px;
      }
      .comment {
        margin-bottom: 16px;
        padding: 16px;
        background: ${theme.colors.lightBackground};
        border-radius: 4px;
      }
      .comment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .comment-author {
        font-weight: bold;
      }
      .comment-date {
        color: ${theme.colors.text};
        font-size: 0.9em;
      }
      .comment-content {
        color: ${theme.colors.text};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="comment-section">
        ${this.comments
          .map(
            (comment) => `
          <div class="comment">
            <div class="comment-header">
              <span class="comment-author">${comment.author}</span>
              <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }
}

customElements.define("w-comment-section", CommentSection)

