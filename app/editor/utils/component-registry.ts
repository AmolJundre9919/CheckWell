import React from 'react';
import { ComponentCategory, PropertyDefinition } from '../types/editor.types';
import { Image } from 'lucide-react';
import { PlacedComponent } from '../types/editor.types';
import {GoogleMapAtom} from '@/app/site/atoms/display/GoogleMapAtom';
import { defaultTheme } from '../../site/theme/theme';

// Update to create a wrapper that renders the custom element using React
const createUIComponent = (tag: string): React.ComponentType<any> => {
  return React.forwardRef((props: any, ref) => {
    const { children, text, ...rest } = props;
    return React.createElement(tag, { ...rest, ref }, children || text);
  });
};

// Update the ComponentDefinition interface
export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: React.ReactNode;
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
  tagName,
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name)
});

const getComponentIcon = (name: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
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
    Image: React.createElement(Image)
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
    Image: {
      src: 'https://via.placeholder.com/300x200',
      alt: 'Placeholder image',
      size: 'medium',
      border: 'none',
      width: 300,
      height: 200
    }
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
    Image: ['src', 'alt', 'size', 'border', 'width', 'height']
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
  createComponentDefinition('Image', 'atoms', 'ui-image'),
  createComponentDefinition('GoogleMap', 'atoms', 'ui-google-map'),
  createComponentDefinition('Spinner', 'atoms', 'ui-spinner'),
  createComponentDefinition('Icon', 'atoms', 'ui-icon'),

  // Molecules
  createComponentDefinition('Card', 'molecules', 'ui-card'),
  createComponentDefinition('SearchBar', 'molecules', 'ui-search-bar'),
  createComponentDefinition('Header', 'molecules', 'ui-header')
];

export const getComponentsByCategory = (category: ComponentCategory) => {
  return componentRegistry.filter(comp => comp.type === category);
};

export const getComponentByName = (name: string) => {
  return componentRegistry.find(comp => comp.name === name);
};

// Add property definitions for the settings panel
export const getPropertyDefinitions = (componentName: string): PropertyDefinition[] => {
  const definitions: Record<string, PropertyDefinition[]> = {
    Image: [
      {
        name: 'src',
        type: 'string',
        label: 'Image URL',
        defaultValue: 'https://via.placeholder.com/300x200',
        required: true,
        control: 'text'
      },
      {
        name: 'alt',
        type: 'string',
        label: 'Alt Text',
        defaultValue: 'Placeholder image',
        required: true,
        control: 'text'
      },
      {
        name: 'size',
        type: 'string',
        label: 'Size',
        defaultValue: 'medium',
        control: 'select',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      },
      {
        name: 'border',
        type: 'string',
        label: 'Border Style',
        defaultValue: 'none',
        control: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Rounded', value: 'rounded' },
          { label: 'Circle', value: 'circle' }
        ]
      },
      {
        name: 'width',
        type: 'number',
        label: 'Width (px)',
        defaultValue: 300,
        control: 'number',
        min: 0,
        max: 1920
      },
      {
        name: 'height',
        type: 'number',
        label: 'Height (px)',
        defaultValue: 200,
        control: 'number',
        min: 0,
        max: 1080
      }
    ],
    GoogleMap: [
      {
        name: 'lat',
        type: 'number',
        label: 'Latitude',
        defaultValue: 0,
        required: true,
        control: 'number',
        min: -90,
        max: 90,
      },
      {
        name: 'lng',
        type: 'number',
        label: 'Longitude',
        defaultValue: 0,
        required: true,
        control: 'number',
        min: -180,
        max: 180,
      },
      {
        name: 'zoom',
        type: 'number',
        label: 'Zoom Level',
        defaultValue: 1,
        required: true,
        control: 'number',
        min: 1,
        max: 20,
      },
    ]
  };

  return definitions[componentName] || [];
}; 