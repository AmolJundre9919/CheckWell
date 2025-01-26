// /// <reference lib="dom" />
// /// <reference lib="dom.iterable" />

// import { Theme, defaultTheme } from './theme/theme';

// interface ComponentProps {
//   [key: string]: any;
// }

// interface StyleSheet extends CSSStyleSheet {
//   replaceSync(cssText: string): void;
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'ui-button': HTMLElement;
//     'ui-input': HTMLElement;
//     'ui-badge': HTMLElement;
//     'ui-avatar': HTMLElement;
//     'ui-card': HTMLElement;
//     'ui-typography': HTMLElement;
//     'ui-search-bar': HTMLElement;
//   }
// }

// // Base class for all components
// export abstract class BaseComponent extends HTMLElement {
//   protected _shadowRoot: ShadowRoot;
//   protected theme: Theme = defaultTheme;

//   constructor() {
//     super();
//     this._shadowRoot = this.attachShadow({ mode: 'open' });
//   }

//   // Utility method to set component properties
//   protected setProps(props: ComponentProps): void {
//     Object.entries(props).forEach(([key, value]) => {
//       if (this[key as keyof this] !== value) {
//         this[key as keyof this] = value;
//         this.render();
//       }
//     });
//   }

//   // Abstract method to be implemented by child classes
//   protected abstract render(): void;

//   // Lifecycle method when component is added to DOM
//   connectedCallback(): void {
//     this.render();
//   }

//   // Helper method to create styles
//   protected createStyles(styles: string): void {
//     const styleSheet = new CSSStyleSheet() as StyleSheet;
//     styleSheet.replaceSync(styles);
//     this._shadowRoot.adoptedStyleSheets = [styleSheet];
//   }

//   // Method to handle attribute changes
//   attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
//     if (oldValue !== newValue) {
//       const propName = name as keyof this;
//       if (typeof this[propName] === 'boolean') {
//         (this[propName] as boolean) = newValue !== null;
//       } else {
//         (this[propName] as string) = newValue || '';
//       }
//       this.render();
//     }
//   }

//   generatePreviewHTML(): string {
//     return this._shadowRoot.innerHTML;
//   }
// }




















/// <reference lib="dom" />
/// <reference lib="dom.iterable" />




/////////////////////////////////////////////2. Changed(optional) ///////////////////////////////////////////////////////







// import { Theme, defaultTheme } from './theme/theme';

// interface ComponentProps {
//   [key: string]: any;
// }

// interface StyleSheet extends CSSStyleSheet {
//   replaceSync(cssText: string): void;
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'ui-button': HTMLElement;
//     'ui-input': HTMLElement;
//     'ui-badge': HTMLElement;
//     'ui-avatar': HTMLElement;
//     'ui-card': HTMLElement;
//     'ui-typography': HTMLElement;
//     'ui-search-bar': HTMLElement;
//   }
// }

// // Base class for all components
// export abstract class BaseComponent extends HTMLElement {
//   protected _shadowRoot: ShadowRoot;
//   protected theme: Theme = defaultTheme;

//   constructor() {
//     super();
//     this._shadowRoot = this.attachShadow({ mode: 'open' });
//   }

//   // Utility method to set component properties
//   protected setProps(props: ComponentProps): void {
//     Object.entries(props).forEach(([key, value]) => {
//       if (this[key as keyof this] !== value) {
//         this[key as keyof this] = value;
//         this.render();
//       }
//     });
//   }

//   // Abstract method to be implemented by child classes
//   protected abstract render(): void;

//   // Lifecycle method when component is added to DOM
//   connectedCallback(): void {
//     this.render();
//   }

//   // Helper method to create styles
//   protected createStyles(styles: string): void {
//     const styleSheet = new CSSStyleSheet() as StyleSheet;
//     styleSheet.replaceSync(styles);
//     this._shadowRoot.adoptedStyleSheets = [styleSheet];
//   }

//   // Method to handle attribute changes
//   attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
//     if (oldValue !== newValue) {
//       const propName = name as keyof this;
//       if (typeof this[propName] === 'boolean') {
//         (this[propName] as boolean) = newValue !== null;
//       } else {
//         (this[propName] as string) = newValue || '';
//       }
//       this.render();
//     }
//   }

//   generatePreviewHTML(): string {
//     return this._shadowRoot.innerHTML;
//   }
// }






























////////////////////////////////////////////// Main Code Here (FinalCode) ///////////////////////////////////////////////////////





import { Theme, defaultTheme } from './theme/theme';

interface ComponentProps {
  [key: string]: any;
}

interface StyleSheet extends CSSStyleSheet {
  replaceSync(cssText: string): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': HTMLElement;
    'ui-input': HTMLElement;
    'ui-badge': HTMLElement;
    'ui-avatar': HTMLElement;
    'ui-card': HTMLElement;
    'ui-typography': HTMLElement;
    'ui-search-bar': HTMLElement;
  }
}

// Base class for all components
export abstract class BaseComponent extends HTMLElement {
  protected _shadowRoot: ShadowRoot;
  protected theme: Theme = defaultTheme;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  // Utility method to set component properties
  protected setProps(props: ComponentProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (this[key as keyof this] !== value) {
        this[key as keyof this] = value;
        this.render();
      }
    });
  }

  // Abstract method to be implemented by child classes
  protected abstract render(): void;

  // Lifecycle method when component is added to DOM
  connectedCallback(): void {
    this.render();
  }

  // Helper method to create styles
  protected createStyles(styles: string): void {
    const styleSheet = new CSSStyleSheet() as StyleSheet;
    styleSheet.replaceSync(styles);
    this._shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  // Method to handle attribute changes
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue) {
      const propName = name as keyof this;
      if (typeof this[propName] === 'boolean') {
        (this[propName] as boolean) = newValue !== null;
      } else {
        (this[propName] as string) = newValue || '';
      }
      this.render();
    }
  }

  generatePreviewHTML(): string {
    return this._shadowRoot.innerHTML;
  }
}
