import { BaseComponent } from '../BaseComponent';

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

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="avatar ${this.size}">
        ${this.src 
          ? `<img src="${this.src}" alt="${this.alt}" />`
          : this.initials || ''
        }
      </div>
    `;
  }
}

customElements.define('ui-avatar', AvatarAtom); 