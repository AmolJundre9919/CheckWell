import { BaseComponent } from '../atoms/BaseComponent';
import { defaultTheme } from '../theme/theme';

export class Video extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'src',
      'type',
      'width',
      'height',
      'autoplay',
      'controls',
      'loop',
      'muted',
      'poster',
      'preload'
    ];
  }

  private getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  private isYouTubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const src = this.getAttribute('src') || '';
    const type = this.getAttribute('type') || 'video/mp4';
    const width = this.getAttribute('width') || '100%';
    const height = this.getAttribute('height') || 'auto';
    const autoplay = this.hasAttribute('autoplay');
    const controls = this.hasAttribute('controls');
    const loop = this.hasAttribute('loop');
    const muted = this.hasAttribute('muted');
    const poster = this.getAttribute('poster') || '';
    const preload = this.getAttribute('preload') || 'metadata';

    let videoContent = '';

    if (this.isYouTubeUrl(src)) {
      const youtubeId = this.getYouTubeId(src);
      videoContent = `
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
    } else {
      videoContent = `
        <video
          ${controls ? 'controls' : ''}
          ${autoplay ? 'autoplay' : ''}
          ${loop ? 'loop' : ''}
          ${muted ? 'muted' : ''}
          preload="${preload}"
          ${poster ? `poster="${poster}"` : ''}
        >
          <source src="${src}" type="${type}">
          Your browser does not support the video tag.
        </video>
      `;
    }

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .video-container {
          position: relative;
          width: ${width};
          height: ${height === 'auto' ? '0' : height};
          padding-bottom: ${height === 'auto' ? '56.25%' : '0'}; /* 16:9 aspect ratio */
          background: ${defaultTheme.colors.primary.main}11;
          border-radius: 8px;
          overflow: hidden;
        }
        video, iframe {
          position: ${height === 'auto' ? 'absolute' : 'relative'};
          top: 0;
          left: 0;
          width: 100%;
          height: ${height === 'auto' ? '100%' : height};
          border-radius: 8px;
        }
        video::-webkit-media-controls-panel {
          background: rgba(0, 0, 0, 0.5);
        }
      </style>
      <div class="video-container">
        ${videoContent}
      </div>
    `;
  }
}

customElements.define('ui-video', Video); 