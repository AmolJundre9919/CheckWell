import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { useToast } from '../../contexts/ToastContext';
import { PlacedComponent } from '../../types/editor.types';
import { getComponentByName } from '../../utils/component-registry';

const generateHTML = (components: PlacedComponent[]): string => {
  const generateComponentHTML = (component: PlacedComponent): string => {
    const componentDef = getComponentByName(component.name);
    if (!componentDef) return '';

    const props = {
      ...componentDef.defaultProps,
      ...(component.props || {})
    };

    const attributes = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    const children = component.children
      ?.map(child => generateComponentHTML(child))
      .join('\n') || '';

    return `<${componentDef.tagName} ${attributes}>${children}</${componentDef.tagName}>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    ${components.map(generateComponentHTML).join('\n')}
    <script src="assets/components.js"></script>
</body>
</html>`;
};

const generateCSS = (): string => {
  // Collect all styles from components
  return `
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }

    /* Component styles will be loaded from their respective web components */
  `;
};

const generateJS = (): string => {
  return `
// Define theme
const defaultTheme = {
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
    border: '#e2e8f0'
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
  }
};

window.defaultTheme = defaultTheme;

// Import compiled web components
document.write('<script src="/components/ButtonAtom.js"></script>');
document.write('<script src="/components/InputAtom.js"></script>');
document.write('<script src="/components/BadgeAtom.js"></script>');
document.write('<script src="/components/AvatarAtom.js"></script>');
document.write('<script src="/components/TypographyAtom.js"></script>');
document.write('<script src="/components/LogoAtom.js"></script>');
document.write('<script src="/components/NavigationAtom.js"></script>');
document.write('<script src="/components/NavigationLinkAtom.js"></script>');
document.write('<script src="/components/GridAtom.js"></script>');
document.write('<script src="/components/ContainerAtom.js"></script>');
document.write('<script src="/components/CardMolecule.js"></script>');
document.write('<script src="/components/SearchBarMolecule.js"></script>');
document.write('<script src="/components/HeaderMolecule.js"></script>');
`;
};

export const PublishButton: React.FC = () => {
  const { placedComponents } = useEditor();
  const { showToast } = useToast();

  const handlePublish = async () => {
    try {
      const html = generateHTML(placedComponents);
      const css = generateCSS();
      const js = generateJS();

      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, css, js }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish website');
      }

      const { url, localPath } = await response.json();
      showToast(`Website published successfully! Available at: ${url}`);

      // Open the published site in a new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error publishing website:', error);
      showToast('Failed to publish website');
    }
  };

  return (
    <Button
      onClick={handlePublish}
      disabled={placedComponents.length === 0}
      className={`p-2 rounded bg-blue-50 text-blue-600}`}
    >
      <Upload className="w-4 h-4 mr-2" />
      Publish Website
    </Button>
  );
}; 