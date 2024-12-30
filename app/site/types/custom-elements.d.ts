/// <reference lib="dom" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
        disabled?: boolean;
        icon?: string;
        iconPosition?: 'left' | 'right';
      }, HTMLElement>;

      'ui-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        type?: 'text' | 'email' | 'password' | 'number' | 'tel';
        placeholder?: string;
        value?: string;
        label?: string;
        error?: string;
        required?: boolean;
      }, HTMLElement>;

      'ui-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
        text?: string;
      }, HTMLElement>;

      'ui-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        size?: 'sm' | 'md' | 'lg';
        src?: string;
        alt?: string;
        initials?: string;
      }, HTMLElement>;

      'ui-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'default' | 'outlined' | 'elevated';
        padding?: 'sm' | 'md' | 'lg';
        elevation?: number;
        header?: string;
        content?: string;
        imageUrl?: string;
      }, HTMLElement>;

      'ui-typography': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
        weight?: 'normal' | 'medium' | 'semibold' | 'bold';
        align?: 'left' | 'center' | 'right' | 'justify';
        color?: string;
        truncate?: boolean;
        italic?: boolean;
      }, HTMLElement>;
    }
  }
}

declare module 'app/site/Components' {
  export * from './atoms/inputs/ButtonAtom';
  export * from './atoms/inputs/InputAtom';
  export * from './atoms/display/BadgeAtom';
  export * from './atoms/display/AvatarAtom';
  export * from './atoms/display/TypographyAtom';
  export * from './molecules/CardMolecule';
}

export {}; 