import { BaseComponent } from '../atoms/BaseComponent';
import { defaultTheme } from '../theme/theme';

export class Testimonial extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'quote',
      'author',
      'role',
      'avatar',
      'rating',
      'background-color',
      'text-color',
      'alignment'
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const quote = this.getAttribute('quote') || 'This is a great testimonial!';
    const author = this.getAttribute('author') || 'John Doe';
    const role = this.getAttribute('role') || 'Customer';
    const avatar = this.getAttribute('avatar') || 'https://via.placeholder.com/60';
    const rating = parseInt(this.getAttribute('rating') || '5', 10);
    const backgroundColor = this.getAttribute('background-color') || defaultTheme.colors.primary.main;
    const textColor = this.getAttribute('text-color') || '#ffffff';
    const alignment = this.getAttribute('alignment') || 'left';

    const stars = '⭐'.repeat(rating);

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, sans-serif;
        }
        .testimonial {
          background-color: ${backgroundColor};
          color: ${textColor};
          padding: 2rem;
          border-radius: 8px;
          text-align: ${alignment};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .quote {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
          position: relative;
        }
        .quote::before {
          content: '"';
          font-size: 3rem;
          position: absolute;
          left: -1rem;
          top: -1rem;
          opacity: 0.5;
        }
        .author-info {
          display: flex;
          align-items: center;
          justify-content: ${alignment === 'center' ? 'center' : 'flex-start'};
          gap: 1rem;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-details {
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .author-role {
          opacity: 0.8;
          font-size: 0.9rem;
        }
        .rating {
          margin-top: 0.5rem;
        }
      </style>
      <div class="testimonial">
        <div class="quote">${quote}</div>
        <div class="author-info">
          <img class="avatar" src="${avatar}" alt="${author}"/>
          <div class="author-details">
            <div class="author-name">${author}</div>
            <div class="author-role">${role}</div>
            <div class="rating">${stars}</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-testimonial', Testimonial); 