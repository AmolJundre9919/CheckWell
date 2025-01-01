import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  size: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}

export class AvatarAtom extends BaseComponent implements AvatarProps {
  size: AvatarSize = 'md';
  src?: string;
  alt: string = '';
  initials?: string;
  protected theme: Theme = defaultTheme;

  static get observedAttributes(): string[] {
    return ['size', 'src', 'alt', 'initials'];
  }

  constructor() {
    super();
    this.createStyles(`
      .avatar {
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${this.theme.colors.surface};
        color: ${this.theme.colors.text};
      }

      .sm {
        width: 32px;
        height: 32px;
        font-size: 0.75rem;
      }

      .md {
        width: 40px;
        height: 40px;
        font-size: 1rem;
      }

      .lg {
        width: 48px;
        height: 48px;
        font-size: 1.25rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `);
  }

  private getPlaceholderSVG(): string {
    return `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="${this.theme.colors.primary}"/>
        <path d="M50 45C54.1421 45 57.5 41.6421 57.5 37.5C57.5 33.3579 54.1421 30 50 30C45.8579 30 42.5 33.3579 42.5 37.5C42.5 41.6421 45.8579 45 50 45Z" fill="white"/>
        <path d="M65 70C65 61.7157 58.2843 55 50 55C41.7157 55 35 61.7157 35 70" stroke="white" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `;
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="avatar ${this.size}">
        ${this.src 
          ? `<img src="${this.src}" alt="${this.alt}" />`
          : this.initials || this.getPlaceholderSVG()
        }
      </div>
    `;
  }
}

customElements.define('ui-avatar', AvatarAtom); 