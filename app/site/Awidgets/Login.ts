import { BaseComponent } from "app/site/BaseComponent"
import { type Theme, defaultTheme } from "../theme/theme"

export class Login extends BaseComponent {
  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }
      .login-form {
        padding: 16px;
        background: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        margin-bottom: 8px;
      }
      .form-input {
        width: 100%;
        padding: 8px;
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
      .login-button {
        width: 100%;
        padding: 8px 16px;
        background: ${theme.colors.lightBackground};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        cursor: pointer;
      }
      .login-button:hover {
        background: ${theme.colors.hover};
      }
    `
  }

  protected render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <form class="login-form">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" required>
        </div>
        <button type="submit" class="login-button">Log In</button>
      </form>
    `
  }
}

customElements.define("w-login", Login)

