export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  warning: string;
  success: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#0066ff',
    secondary: '#e5e7eb',
    accent: '#6366f1',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    error: '#ef4444',
    warning: '#fbbf24',
    success: '#10b981'
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
}; 