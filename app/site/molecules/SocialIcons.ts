import { BaseComponent } from '../atoms/BaseComponent';
import { defaultTheme } from '../theme/theme';

interface SocialIcon {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export class SocialIcons extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'icons',
      'size',
      'color',
      'hover-color',
      'spacing',
      'alignment',
      'show-labels'
    ];
  }

  private getDefaultIcons(): SocialIcon[] {
    return [
      { platform: 'facebook', url: '#', icon: '📘', label: 'Facebook' },
      { platform: 'twitter', url: '#', icon: '🐦', label: 'Twitter' },
      { platform: 'instagram', url: '#', icon: '📸', label: 'Instagram' },
      { platform: 'linkedin', url: '#', icon: '💼', label: 'LinkedIn' }
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    let icons: SocialIcon[] = this.getDefaultIcons();
    try {
      const iconsProp = this.getAttribute('icons');
      if (iconsProp) {
        icons = JSON.parse(iconsProp);
      }
    } catch (e) {
      console.error('Invalid icons JSON:', e);
    }

    const size = this.getAttribute('size') || 'medium';
    const color = this.getAttribute('color') || defaultTheme.colors.primary.main;
    const hoverColor = this.getAttribute('hover-color') || defaultTheme.colors.primary.main;
    const spacing = this.getAttribute('spacing') || '1rem';
    const alignment = this.getAttribute('alignment') || 'center';
    const showLabels = this.hasAttribute('show-labels');

    const sizeMap = {
      small: '24px',
      medium: '32px',
      large: '48px'
    };

    const iconSize = sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, sans-serif;
        }
        .social-icons {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing};
          justify-content: ${alignment};
          padding: 1rem;
        }
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: ${color};
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .social-icon:hover {
          color: ${hoverColor};
          transform: translateY(-2px);
        }
        .icon {
          font-size: ${iconSize};
          width: ${iconSize};
          height: ${iconSize};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .label {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          display: ${showLabels ? 'block' : 'none'};
        }
      </style>
      <div class="social-icons">
        ${icons.map(icon => `
          <a 
            href="${icon.url}" 
            class="social-icon" 
            title="${icon.label}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="icon">${icon.icon}</span>
            <span class="label">${icon.label}</span>
          </a>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('ui-social-icons', SocialIcons); 