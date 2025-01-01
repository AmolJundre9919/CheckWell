// This file will be compiled to plain JavaScript
import { Theme, defaultTheme } from './theme/theme';

declare global {
  interface Window {
    defaultTheme: Theme;
  }
}

// Import all components
import './atoms/inputs/ButtonAtom';
import './atoms/inputs/InputAtom';
import './atoms/display/BadgeAtom';
import './atoms/display/AvatarAtom';
import './atoms/display/TypographyAtom';
import './atoms/display/LogoAtom';
import './atoms/navigation/NavigationAtom';
import './atoms/navigation/NavigationLinkAtom';
import './atoms/layout/GridAtom';
import './atoms/layout/ContainerAtom';
import './molecules/CardMolecule';
import './molecules/SearchBarMolecule';
import './molecules/HeaderMolecule';

// Export theme for global use
window.defaultTheme = defaultTheme; 