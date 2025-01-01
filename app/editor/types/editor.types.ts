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
  type: string;
  name: string;
  position: ComponentPosition;
  size: ComponentSize;
  id: string;
  props: Record<string, any>;
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