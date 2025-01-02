import React from 'react';
import { ComponentCategory } from '../types/editor.types';
import { defaultTheme } from '../../site/theme/theme';

// Update to create a wrapper that renders the custom element using React
const createUIComponent = (tag: string): React.ComponentType<any> => {
  return React.forwardRef((props: any, ref) => {
    const { children, text, ...rest } = props;

    // Create props object for the custom element
    const elementProps = {
      ref,
      ...rest,
      // Handle children/text content
      children: children || text
    };

    // Return JSX using the custom element tag
    return React.createElement(tag, elementProps);
  });
};

// Update the ComponentDefinition interface
export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: string;
  defaultProps: Record<string, any>;
  editableProps: string[];
}

// Convert imported components into component definitions
const createComponentDefinition = (
  name: string, 
  category: ComponentCategory,
  tagName: string
): ComponentDefinition => ({
  type: category,
  name,
  tagName,  // Store the tag name instead of component
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name)
});

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
    Icon: '🎨',
    Spinner: '🔄',
    Checkbox: '☑️',
    Switch: '🔘',
  };
  return icons[name] || '📦';
};

const getDefaultProps = (name: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    Icon: { name: '🎨', size: 'medium' },
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
    NavigationLink: { href: '#', text: 'Link', active: false },
    Grid: { columns: '12', gap: 'md' },
    Container: { size: 'lg', padding: 'md' },
    Divider: { orientation: 'horizontal', thickness: 1, color: '#E5E7EB' },
    Spinner: { 
      size: 'medium',
      variant: 'circle'
    },
    Checkbox: { 
      label: 'Checkbox',
      checked: false
    },
    Switch: { 
      label: 'Switch',
      checked: false
    },
  };
  return defaults[name] || {};
};

const getEditableProps = (name: string): string[] => {
  const editableProps: Record<string, string[]> = {
    Icon: ['name', 'size', 'color'],
    Button: ['variant', 'text', 'disabled'],
    Input: ['placeholder', 'type', 'disabled', 'label', 'required'],
    Badge: ['variant', 'text'],
    Avatar: ['src', 'alt', 'size', 'initials'],
    Typography: ['variant', 'text', 'color', 'weight', 'align'],
    Logo: ['src', 'alt', 'width', 'height'],
    Card: ['title', 'content', 'variant', 'padding', 'elevation'],
    SearchBar: ['placeholder', 'variant', 'size', 'disabled', 'clearable'],
    Header: ['variant', 'sticky', 'logoSrc', 'logoAlt'],
    Navigation: ['icon', 'label', 'badgeText'],
    NavigationLink: ['href', 'text', 'active'],
    Grid: ['columns', 'gap'],
    Container: ['size', 'padding'],
    Divider: ['color', 'thickness', 'orientation', 'length'],
    Spinner: ['size', 'variant'],
    Checkbox: ['label', 'checked'],
    Switch: ['label', 'checked'],
  };
  return editableProps[name] || [];
};

// Create the registry of all available components
export const componentRegistry: ComponentDefinition[] = [
  // Atoms
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
  createComponentDefinition('Spinner', 'atoms', 'ui-spinner'),
  createComponentDefinition('Icon', 'atoms', 'ui-icon'),

  // Molecules
  createComponentDefinition('Card', 'molecules', 'ui-card'),
  createComponentDefinition('SearchBar', 'molecules', 'ui-search-bar'),
  createComponentDefinition('Header', 'molecules', 'ui-header')
];

export const getComponentsByCategory = (category: 'atoms' | 'molecules' | 'organisms') => {
  return componentRegistry.filter(comp => comp.type === category);
};

export const getComponentByName = (name: string) => {
  return componentRegistry.find(comp => comp.name === name);
}; 