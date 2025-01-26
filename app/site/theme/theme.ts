// export interface ThemeColors {
//   primary: string;
//   secondary: string;
//   accent: string;
//   background: string;
//   surface: string;
//   text: string;
//   error: string;
//   warning: string;
//   success: string;
//   border: string;
//   muted: string;
// }

// export interface ThemeSpacing {
//   xs: string;
//   sm: string;
//   md: string;
//   lg: string;
//   xl: string;
// }

// export interface ThemeTypography {
//   xs: string;
//   sm: string;
//   base: string;
//   lg: string;
//   xl: string;
// }

// export interface Theme {
//   colors: ThemeColors;
//   spacing: ThemeSpacing;
//   typography: ThemeTypography;
//   borderRadius: {
//     sm: string;
//     md: string;
//     lg: string;
//   };
// }

// export const defaultTheme: Theme = {
//   colors: {
//     primary: '#0066ff',
//     secondary: '#e5e7eb',
//     accent: '#6366f1',
//     background: '#ffffff',
//     surface: '#ffffff',
//     text: '#000000',
//     error: '#ef4444',
//     warning: '#fbbf24',
//     success: '#10b981',
//     border: '#e2e8f0',
//     muted: '#f0f0f0'
//   },
//   spacing: {
//     xs: '0.5rem',
//     sm: '0.75rem',
//     md: '1rem',
//     lg: '1.5rem',
//     xl: '2rem'
//   },
//   typography: {
//     xs: '0.75rem',
//     sm: '0.875rem',
//     base: '1rem',
//     lg: '1.125rem',
//     xl: '1.25rem'
//   },
//   borderRadius: {
//     sm: '4px',
//     md: '8px',
//     lg: '16px'
//   }
// }; 






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
  border: string;
  muted: string;
  hover: string; // Added hover color to match with accordion styles
  lightBackground: string; // Added lightBackground color to match with accordion styles
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTypography {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
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
    success: '#10b981',
    border: '#e2e8f0',
    muted: '#f0f0f0',
    hover: '#f1f1f1', // Added hover color for interactive elements
    lightBackground: '#f8f9fa' // Added lightBackground color for content areas like accordion
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  }
};
