import { PlacedComponent } from '../types/editor.types';

/**
 * Creates a deep copy of a component with a new ID
 */
export const createComponentCopy = (component: PlacedComponent): PlacedComponent => {
  const newId = `component-${Date.now()}`;
  
  // Create slightly offset position for better UX
  const newPosition = {
    x: component.position.x + 20,
    y: component.position.y + 20,
  };

  return {
    ...component,
    id: newId,
    position: newPosition,
    props: { ...component.props },
    children: component.children 
      ? component.children.map(child => createComponentCopy(child))
      : undefined,
  };
};

/**
 * Checks if a component's position is within the workspace bounds
 */
export const isWithinBounds = (
  position: { x: number; y: number },
  size: { width: number; height: number },
  containerBounds: { width: number; height: number }
): boolean => {
  return (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x + size.width <= containerBounds.width &&
    position.y + size.height <= containerBounds.height
  );
};

/**
 * Snaps a value to the nearest grid point
 */
export const snapToGrid = (value: number, gridSize: number = 20): number => {
  return Math.round(value / gridSize) * gridSize;
};

/**
 * Generates a component tree from flat array of components
 */
export const buildComponentTree = (components: PlacedComponent[]): PlacedComponent[] => {
  const componentMap = new Map<string, PlacedComponent>();
  const rootComponents: PlacedComponent[] = [];

  // First pass: create map of all components
  components.forEach(component => {
    componentMap.set(component.id, { ...component, children: [] });
  });

  // Second pass: build parent-child relationships
  components.forEach(component => {
    if (component.parentId) {
      const parent = componentMap.get(component.parentId);
      if (parent && parent.children) {
        parent.children.push(componentMap.get(component.id)!);
      }
    } else {
      rootComponents.push(componentMap.get(component.id)!);
    }
  });

  return rootComponents;
};

/**
 * Flattens a component tree into an array
 */
export const flattenComponentTree = (components: PlacedComponent[]): PlacedComponent[] => {
  const flattened: PlacedComponent[] = [];
  
  const flatten = (component: PlacedComponent) => {
    flattened.push(component);
    component.children?.forEach(child => flatten(child));
  };

  components.forEach(component => flatten(component));
  return flattened;
};

/**
 * Calculates the bounding box for a group of components
 */
export const calculateBoundingBox = (components: PlacedComponent[]) => {
  if (components.length === 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  components.forEach(component => {
    minX = Math.min(minX, component.position.x);
    minY = Math.min(minY, component.position.y);
    maxX = Math.max(maxX, component.position.x + component.size.width);
    maxY = Math.max(maxY, component.position.y + component.size.height);
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

/**
 * Validates component properties against their definitions
 */
export const validateComponentProps = (
  props: Record<string, any>,
  propDefinitions: Record<string, { type: string; required?: boolean }>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  Object.entries(propDefinitions).forEach(([key, definition]) => {
    if (definition.required && !props[key]) {
      errors.push(`Missing required prop: ${key}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 