// component-registry.ts
import { ComponentCategory } from '../types/editor.types';

export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: string;
  defaultProps: Record<string, any>;
  editableProps: string[];
} 

// Utility function to get the icon for each component by name
const getComponentIcon = (name: string): string => {
  const icons: Record<string, string> = {
    Button: '🔘',
    Input: '📝',
    Badge: '🏷️',
    Avatar: '👤',
    Typography: '📄',
    Logo: '🎨',
    Card: '🗂️',
    SearchBar: '🔍',
    Header: '📑',
    Navigation: '🔗',
    NavigationLink: '🔗',
    Grid: '📏',
    Container: '📦',
    Divider: '➖',
    Image: '🖼️',
    Icon: '🎨',
    Spinner: '🔄',
    Checkbox: '☑️',
    Switch: '🔘',
    GoogleMap: '🗺️',
    ImageBox: '🖼️',
    IconBox: '🔲',
    ImageCarousel: '📸',
    Accordion: '📂', // Icon for Accordion
  };
  return icons[name] || '📦';
};

// Function to get the default properties for each component by name
const getDefaultProps = (name: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    Button: { variant: 'primary', text: 'Button' },
    Input: { placeholder: 'Enter text...' },
    Badge: { variant: 'default', text: 'Badge' },
    Avatar: { alt: 'Avatar' },
    Typography: { variant: 'body', text: 'Text' },
    Logo: { alt: 'Logo' },
    Card: { title: 'Card Title', content: 'Card Content' },
    SearchBar: { placeholder: 'Search...' },
    Header: { title: 'Header' },
    Navigation: { icon: '🔗', label: 'Navigation Item' },
    NavigationLink: { href: '#', text: 'Link' },
    Grid: { columns: '12', gap: 'md' },
    Container: { size: 'lg', padding: 'md' },
    Divider: { orientation: 'horizontal', thickness: 1 },
    Image: { src: 'https://via.placeholder.com/300x200', alt: 'Placeholder image', size: 'medium' },
    ImageBox: { src: 'https://via.placeholder.com/400x300', alt: 'Image Box' },
    IconBox: { icon: '⭐', label: 'Default Label', size: 'medium', shape: 'square', color: '#000', backgroundColor: '#fff', border: 'none', padding: '8px', margin: '0', labelPosition: 'right', labelColor: '#000', labelFontSize: '14px', hoverColor: '#fff', hoverBackgroundColor: '#007bff' },
    ImageCarousel: { images: [{ src: 'https://via.placeholder.com/400x300', alt: 'Slide 1' }, { src: 'https://via.placeholder.com/400x300', alt: 'Slide 2' }], autoplay: true },
    Spinner: { size: 'medium' },
    Checkbox: { label: 'Checkbox' },
    Switch: { label: 'Switch' },
    Accordion: { items: [{ title: 'Section 1', content: 'Content for section 1' }, { title: 'Section 2', content: 'Content for section 2' }], multiExpand: false },
  };
  return defaults[name] || {};
};

// Function to get editable properties for each component by name
const getEditableProps = (name: string): string[] => {
  const editableProps: Record<string, string[]> = {
    Button: ['variant', 'text', 'disabled'],
    Input: ['placeholder', 'type'],
    Badge: ['variant', 'text'],
    Avatar: ['src', 'alt', 'size'],
    Typography: ['variant', 'text', 'color'],
    Logo: ['src', 'alt'],
    Card: ['title', 'content'],
    SearchBar: ['placeholder', 'variant'],
    Header: ['variant'],
    Navigation: ['icon', 'label'],
    NavigationLink: ['href', 'text'],
    Grid: ['columns', 'gap'],
    Container: ['size', 'padding'],
    Divider: ['color', 'thickness'],
    Image: ['src', 'alt'],
    ImageBox: ['src', 'alt'],
    IconBox: ['icon','label','size','shape','color','backgroundColor','border','padding','margin','labelPosition','labelColor','labelFontSize','hoverColor','hoverBackgroundColor'],
    ImageCarousel: ['images', 'autoplay'],
    Spinner: ['size'],
    Checkbox: ['label'],
    Switch: ['label'],
    Accordion: ['items', 'multiExpand'], // Editable properties for Accordion
  };
  return editableProps[name] || [];
};

// Function to create a component definition
const createComponentDefinition = (
  name: string,
  category: ComponentCategory,
  tagName: string
): ComponentDefinition => ({
  type: category,
  name,
  tagName,
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name),
});

// Create a registry for all available components
export const componentRegistry: ComponentDefinition[] = [
  createComponentDefinition('Button', 'atoms', 'ui-button'),
  createComponentDefinition('Input', 'atoms', 'ui-input'),
  createComponentDefinition('Checkbox', 'atoms', 'ui-checkbox'),
  createComponentDefinition('Switch', 'atoms', 'ui-switch'),
  createComponentDefinition('Badge', 'atoms', 'ui-badge'),
  createComponentDefinition('Avatar', 'atoms', 'ui-avatar'),
  createComponentDefinition('Typography', 'atoms', 'ui-typography'),
  createComponentDefinition('Logo', 'atoms', 'ui-logo'),
  createComponentDefinition('Grid', 'atoms', 'ui-grid'),
  createComponentDefinition('Container', 'atoms', 'ui-container'),
  createComponentDefinition('NavigationLink', 'atoms', 'ui-nav-link'),
  createComponentDefinition('Navigation', 'atoms', 'ui-navigation'),
  createComponentDefinition('Divider', 'atoms', 'ui-divider'),
  createComponentDefinition('Image', 'atoms', 'ui-image'),
  createComponentDefinition('ImageBox', 'molecules', 'ui-image-box'),
  createComponentDefinition('IconBox', 'molecules', 'ui-icon-box'), 
  createComponentDefinition('ImageCarousel', 'molecules', 'ui-image-carousel'),
  createComponentDefinition('GoogleMap', 'atoms', 'ui-google-map'),
  createComponentDefinition('Spinner', 'atoms', 'ui-spinner'),
  createComponentDefinition('Icon', 'atoms', 'ui-icon'),
  createComponentDefinition('Accordion', 'molecules', 'ui-accordion'), // Added Accordion
  createComponentDefinition('Card', 'molecules', 'ui-card'),
  createComponentDefinition('SearchBar', 'molecules', 'ui-search-bar'),
  createComponentDefinition('Header', 'molecules', 'ui-header'),
];

// Function to get a component by its name
export const getComponentByName = (name: string): ComponentDefinition | null => {
  return componentRegistry.find((component) => component.name === name) || null;
};

// Function to get components by category
export const getComponentsByCategory = (category: ComponentCategory): ComponentDefinition[] => {
  return componentRegistry.filter((component) => component.type === category);
};
