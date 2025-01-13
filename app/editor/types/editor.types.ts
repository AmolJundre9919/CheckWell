import { BaseComponent } from "@/app/site/BaseComponent";

export type ComponentCategory = 'atoms' | 'molecules' | 'organisms';
export type ViewMode = 'desktop' | 'mobile';

export interface ComponentPosition {
  x: number;
  y: number;
}

export interface ComponentSize {
  width: number;
  height: number;
}

export interface PlacedComponent {
  id: string;
  name: string;
  type: string;
  props: Record<string, any>;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  children?: PlacedComponent[];
}

export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: string;
  defaultProps: Record<string, any>;
  editableProps: string[];
}

export interface PropertyDefinition {
  name: string;
  type: string;
  label: string;
  defaultValue: any;
  required?: boolean;
  control?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
} 