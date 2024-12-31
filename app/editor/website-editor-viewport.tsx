"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Plus, X, ChevronRight, ChevronDown, Square as ButtonIcon, Nut as InputIcon, Badge as BadgeIcon, User as AvatarIcon, Type as TypographyIcon, Image as LogoIcon, Link as NavigationLinkIcon, Layout as HeaderIcon, IdCardIcon, Upload } from 'lucide-react';
import '../site/atoms/inputs/ButtonAtom';
import '../site/atoms/inputs/InputAtom';
import '../site/atoms/display/BadgeAtom';
import '../site/atoms/display/AvatarAtom';
import '../site/molecules/CardMolecule';
import NavigationAtom from '../site/atoms/navigation/NavigationAtom';

// Types
type ComponentCategory = 'atoms' | 'molecules' | 'organisms';
type ViewMode = 'desktop' | 'mobile';

interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  icon: React.ReactNode;
  defaultProps: Record<string, any>;
  editableProps: string[];
}

interface EditableComponentProps {
  type: string;
  index: number;
  componentData: Record<string, any>;
  onUpdate: (index: number, key: string, value: any) => void;
}

interface ComponentPosition {
  x: number;
  y: number;
}

interface ComponentSize {
  width: number;
  height: number;
}

interface PlacedComponent {
  type: string;
  position: ComponentPosition;
  size: ComponentSize;
  id: string;
  props: Record<string, any>;
}

// Add these constants at the top with other interfaces
const GRID_SIZE = 8; // 8px grid
const SNAP_THRESHOLD = 4; // Snap when within 4px of grid line

// Add this helper function after the interfaces
const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

// Add this helper function at the top with other utilities
const createComponentCopy = (component: PlacedComponent, offsetX = GRID_SIZE, offsetY = GRID_SIZE): PlacedComponent => {
  return {
    ...component,
    id: `${component.type}-${Date.now()}`,
    position: {
      x: component.position.x + offsetX,
      y: component.position.y + offsetY
    }
  };
};

// Add this new utility function at the top with other utilities
const generateComponentHTML = (component: PlacedComponent): string => {
  const { type, props, position, size } = component;
  const styles = `position: absolute; left: ${position.x}px; top: ${position.y}px; width: ${size.width}px; height: ${size.height}px;`;

  switch (type) {
    case 'button':
      return `<ui-button variant="${props.variant}" size="${props.size}" style="${styles}">${props.text}</ui-button>`;
    case 'input':
      return `<ui-input type="${props.type}" placeholder="${props.placeholder}" label="${props.label}" ${props.required ? 'required' : ''} style="${styles}"></ui-input>`;
    case 'badge':
      return `<ui-badge variant="${props.variant}" text="${props.text}" style="${styles}"></ui-badge>`;
    case 'avatar':
      return `<ui-avatar size="${props.size}" ${props.src ? `src="${props.src}"` : ''} ${props.initials ? `initials="${props.initials}"` : ''} style="${styles}"></ui-avatar>`;
    case 'typography':
      return `<ui-typography variant="${props.variant}" weight="${props.weight}" align="${props.align}" ${props.color ? `color="${props.color}"` : ''} style="${styles}">${props.text}</ui-typography>`;
    case 'card':
      return `<ui-card variant="${props.variant}" padding="${props.padding}" elevation="${props.elevation}" style="${styles}">
        ${props.header ? `<h3 slot="header">${props.header}</h3>` : ''}
        ${props.content}
      </ui-card>`;
    default:
      return '';
  }
};

// Add this function to generate the complete website code
const generateWebsiteCode = (components: PlacedComponent[]): { html: string, css: string, js: string } => {
  const componentsHTML = components.map(generateComponentHTML).join('\n    ');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="website-container">
    ${componentsHTML}
    </div>
    <script src="components.js"></script>
</body>
</html>`;

  const css = `
.website-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .website-container {
        width: 100%;
        padding: 0 1rem;
    }
}`;

  // Import statements for the components
  const js = `
import './site/atoms/inputs/ButtonAtom';
import './site/atoms/inputs/InputAtom';
import './site/atoms/display/BadgeAtom';
import './site/atoms/display/AvatarAtom';
import './site/molecules/CardMolecule';
import './site/atoms/display/TypographyAtom';`;

  return { html, css, js };
};

// Add a publish function
const handlePublish = async (components: PlacedComponent[]) => {
  try {
    const { html, css, js } = generateWebsiteCode(components);
    
    // Send the generated code to your backend
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

    const { url } = await response.json();
    console.log(url);
    // showToast(`Website published successfully! URL: ${url}`);
  } catch (error) {
    console.error('Error publishing website:', error);
    // showToast('Failed to publish website');
  }
};

// Component Registry
const componentRegistry: Record<string, ComponentDefinition> = {
  button: {
    type: 'atoms',
    name: 'Button',
    icon: <ButtonIcon className="w-4 h-4" />,
    defaultProps: {
      variant: 'primary',
      size: 'md',
      
      text: 'Click me',
      icon: '',
      iconPosition: 'left'
    },
    editableProps: ['variant', 'size', 'text', 'icon', 'iconPosition']
  },
  input: {
    type: 'atoms',
    name: 'Input',
    icon: <InputIcon className="w-4 h-4" />,
    defaultProps: {
      type: 'text',
      placeholder: 'Enter text...',
      label: 'Label',
      required: false,
      error: ''
    },
    editableProps: ['type', 'placeholder', 'label', 'required', 'error']
  },
  badge: {
    type: 'atoms',
    name: 'Badge',
    icon: <BadgeIcon className="w-4 h-4" />,
    defaultProps: {
      variant: 'default',
      text: 'Badge'
    },
    editableProps: ['variant', 'text']
  },
  avatar: {
    type: 'atoms',
    name: 'Avatar',
    icon: <AvatarIcon className="w-4 h-4" />,
    defaultProps: {
      size: 'md',
      initials: 'JD',
      src: '',
      alt: ''
    },
    editableProps: ['size', 'initials', 'src', 'alt']
  },
  card: {
    type: 'molecules',
    name: 'Card',
    icon: <IdCardIcon className="w-4 h-4" />,
    defaultProps: {
      variant: 'default',
      padding: 'md',
      elevation: 1,
      header: 'Card Title',
      content: 'Card content goes here',
      imageUrl: ''
    },
    editableProps: ['variant', 'padding', 'elevation', 'header', 'content', 'imageUrl']
  },
  NavigationAtom: {
    type: 'molecules',
    name: 'Navigation',
    defaultProps: {
      icon: '',
      label: 'Navigation Label',
      badgeText: ''
    },
    editableProps: ['icon', 'label', 'badgeText']
  },
  typography: {
    type: 'atoms',
    name: 'Typography',
    icon: <TypographyIcon className="w-4 h-4" />,
    defaultProps: {
      variant: 'p',
      weight: 'normal',
      align: 'left',
      text: 'Sample text',
      truncate: false,
      italic: false
    },
    editableProps: ['variant', 'weight', 'align', 'text', 'truncate', 'italic', 'color']
  },
<<<<<<< HEAD
  
=======
  logo: {
    type: 'atoms',
    name: 'Logo',
    icon: <LogoIcon className="w-4 h-4" />,
    defaultProps: {
      src: '/placeholder-logo.svg',
      alt: 'Logo',
      width: 'auto',
      height: '40px'
    },
    editableProps: ['src', 'alt', 'width', 'height']
  },
  navigationLink: {
    type: 'atoms',
    name: 'Navigation Link',
    icon: <NavigationLinkIcon className="w-4 h-4" />,
    defaultProps: {
      href: '#',
      text: 'Link',
      active: false
    },
    editableProps: ['href', 'text', 'active']
  },
  header: {
    type: 'molecules',
    name: 'Header',
    icon: <HeaderIcon className="w-4 h-4" />,
    defaultProps: {
      variant: 'default',
      sticky: false,
      logoSrc: '/placeholder-logo.svg',
      logoAlt: 'Site Logo'
    },
    editableProps: ['variant', 'sticky', 'logoSrc', 'logoAlt']
  }
>>>>>>> e982dcf5990352b79cf65cd1f5ea2b9a0209dfdf
};

// Components
const ViewportControl: React.FC<{
  view: ViewMode;
  setView: (view: ViewMode) => void;
}> = ({ view, setView }) => {
  return (
    <div className="flex gap-2 mb-4">
      <Button 
        variant={view === 'desktop' ? 'default' : 'outline'}
        onClick={() => setView('desktop')}
      >
        <Monitor className="mr-2 h-4 w-4" />
        Desktop
      </Button>
      <Button 
        variant={view === 'mobile' ? 'default' : 'outline'}
        onClick={() => setView('mobile')}
      >
        <Smartphone className="mr-2 h-4 w-4" />
        Mobile
      </Button>
    </div>
  );
};

const ComponentList: React.FC<{
  onDragStart: (type: string) => void;
}> = ({ onDragStart }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<ComponentCategory, boolean>>({
    atoms: true,
    molecules: true,
    organisms: true
  });

  const groupedComponents = useMemo(() => {
    const groups: Record<ComponentCategory, ComponentDefinition[]> = {
      atoms: [],
      molecules: [],
      organisms: []
    };

    Object.entries(componentRegistry).forEach(([key, component]) => {
      groups[component.type].push({
        ...component,
        name: key
      });
    });

    return groups;
  }, []);

  const toggleCategory = (category: ComponentCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="w-64 space-y-2 bg-gray-50 p-4 rounded-lg">
      {(Object.entries(groupedComponents) as [ComponentCategory, ComponentDefinition[]][]).map(
        ([category, components]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium capitalize">{category}</span>
              {expandedCategories[category] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {expandedCategories[category] && (
              <div className="p-2 grid grid-cols-2 gap-2 bg-gray-50">
                {components.map((component) => (
                  <Card
                    key={component.name}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', component.name);
                      onDragStart(component.name);
                    }}
                    className="p-2 cursor-move hover:bg-white transition-colors flex flex-col items-center gap-1"
                  >
                    {component.icon}
                    <span className="text-xs text-center">{component.name}</span>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

const EditableComponent: React.FC<EditableComponentProps> = ({
  type,
  index,
  componentData,
  onUpdate
}) => {
  const component = componentRegistry[type];
  if (!component) return null;

  const props = {
    ...component.defaultProps,
    ...componentData
  };

  return (
    <>
      {type === 'button' && (
        <ui-button 
          variant={props.variant} 
          size={props.size} 
          disabled={props.disabled}
          icon={props.icon}
          iconPosition={props.iconPosition}
        >
          {props.text}
        </ui-button>
      )}
      
      {type === 'input' && (
        <ui-input
          type={props.type}
          placeholder={props.placeholder}
          label={props.label}
          required={props.required}
          error={props.error}
          value={props.value}
        />
      )}
      
      {type === 'badge' && (
        <ui-badge
          variant={props.variant}
          text={props.text}
        />
      )}
      
      {type === 'avatar' && (
        <ui-avatar
          size={props.size}
          src={props.src}
          alt={props.alt}
          initials={props.initials}
        />
      )}
      
      {type === 'card' && (
        <ui-card
          variant={props.variant}
          padding={props.padding}
          elevation={props.elevation}
          header={props.header}
          content={props.content}
          imageUrl={props.imageUrl}
        >
          {props.content}
          <div slot="actions">
            <ui-button variant="primary" size="sm">Action</ui-button>
          </div>
        </ui-card>
      )}
      
      {type === 'typography' && (
        <ui-typography
          variant={props.variant}
          weight={props.weight}
          align={props.align}
          color={props.color}
          truncate={props.truncate}
          italic={props.italic}
        >
          {props.text}
        </ui-typography>
      )}
    </>
  );
};

// Add this new component for resize handles
const ResizeHandles: React.FC<{
  onResizeStart: (direction: string) => void;
}> = ({ onResizeStart }) => {
  return (
    <>
      <div 
        className="absolute w-2 h-2 bg-blue-500 right-0 bottom-0 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart('se');
        }}
      />
      <div 
        className="absolute w-2 h-2 bg-blue-500 right-0 top-1/2 -translate-y-1/2 cursor-e-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart('e');
        }}
      />
      <div 
        className="absolute w-2 h-2 bg-blue-500 bottom-0 left-1/2 -translate-x-1/2 cursor-s-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          onResizeStart('s');
        }}
      />
    </>
  );
};

// Add this new component for the delete button
const DeleteButton: React.FC<{
  onDelete: () => void;
}> = ({ onDelete }) => {
  return (
    <button
      className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 hover:bg-red-600 
        text-white rounded-full flex items-center justify-center shadow-md 
        transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <X className="w-4 h-4" />
    </button>
  );
};

// Add this new wrapper component for editable components
const ResizableComponent: React.FC<{
  component: PlacedComponent;
  onUpdate: (id: string, updates: Partial<PlacedComponent>) => void;
  onDelete: (id: string) => void;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}> = ({ component, onUpdate, onDelete, selected, onSelect }) => {
  const [resizing, setResizing] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [initialSize, setInitialSize] = useState<ComponentSize | null>(null);
  const [initialMousePos, setInitialMousePos] = useState<ComponentPosition | null>(null);
  const [initialPosition, setInitialPosition] = useState<ComponentPosition | null>(null);

  // Handle dragging
  useEffect(() => {
    if (!dragging || !initialMousePos || !initialPosition) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;

      onUpdate(component.id, {
        position: {
          x: snapToGrid(initialPosition.x + deltaX),
          y: snapToGrid(initialPosition.y + deltaY)
        }
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
      setInitialMousePos(null);
      setInitialPosition(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, initialMousePos, initialPosition, component.id, onUpdate]);

  // Handle resizing (existing effect)
  useEffect(() => {
    if (!resizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!initialSize || !initialMousePos) return;

      let newWidth = initialSize.width;
      let newHeight = initialSize.height;

      if (resizing.includes('e')) {
        const deltaX = e.clientX - initialMousePos.x;
        newWidth = snapToGrid(initialSize.width + deltaX);
      }
      
      if (resizing.includes('s')) {
        const deltaY = e.clientY - initialMousePos.y;
        newHeight = snapToGrid(initialSize.height + deltaY);
      }

      onUpdate(component.id, {
        size: {
          width: Math.max(GRID_SIZE, newWidth),
          height: Math.max(GRID_SIZE, newHeight)
        }
      });
    };

    const handleMouseUp = () => {
      setResizing(null);
      setInitialSize(null);
      setInitialMousePos(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, initialSize, initialMousePos, component.id, onUpdate]);

  const handleResizeStart = (direction: string) => {
    setResizing(direction);
    setInitialSize(component.size);
    const mouseEvent = window.event as MouseEvent;
    setInitialMousePos({ x: mouseEvent?.clientX || 0, y: mouseEvent?.clientY || 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate drag if not clicking a resize handle
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      setDragging(true);
      setInitialMousePos({ x: e.clientX, y: e.clientY });
      setInitialPosition(component.position);
      onSelect(e);
    }
  };

  return (
    <div
      className={`absolute ${selected ? 'ring-2 ring-blue-500' : ''} ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: `${component.position.x}px`,
        top: `${component.position.y}px`,
        width: `${component.size.width}px`,
        height: `${component.size.height}px`,
        touchAction: 'none', // Prevents scrolling while dragging on touch devices
      }}
      onMouseDown={handleMouseDown}
      onClick={onSelect}
    >
      <div className={`w-full h-full ${dragging ? 'pointer-events-none' : ''}`}>
        <EditableComponent
          type={component.type}
          index={0}
          componentData={component.props}
          onUpdate={(_, key, value) => onUpdate(component.id, { props: { ...component.props, [key]: value } })}
        />
      </div>
      {selected && (
        <>
          <ResizeHandles onResizeStart={handleResizeStart} />
          <DeleteButton onDelete={() => onDelete(component.id)} />
        </>
      )}
    </div>
  );
};

// Add this new component for the grid overlay
const GridOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full">
        {/* Vertical lines */}
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,8px)]">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="h-full w-px bg-gray-200/50"
            />
          ))}
        </div>
        {/* Horizontal lines */}
        <div className="absolute inset-0 grid grid-rows-[repeat(auto-fill,8px)]">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="w-full h-px bg-gray-200/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PreviewContainer: React.FC<{
  view: ViewMode;
  children: React.ReactNode;
  showGrid?: boolean;
}> = ({ view, children, showGrid = true }) => {
  return (
    <div 
      className={`transition-all duration-300 mx-auto relative ${
        view === 'mobile' ? 'w-[375px] border-x border-gray-200' : 'w-full'
      }`}
    >
      {showGrid && <GridOverlay />}
      {children}
    </div>
  );
};

// Add a new collapsible panel component
const CollapsiblePanel: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <span className="font-medium">{title}</span>
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      <div className={`transition-all duration-300 ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto p-4'}`}>
        {children}
      </div>
    </div>
  );
};

const WebsiteEditor: React.FC = () => {
  const [view, setView] = useState<ViewMode>('desktop');
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [copiedComponent, setCopiedComponent] = useState<PlacedComponent | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    const rect = e.currentTarget.getBoundingClientRect();
    
    const position = {
      x: snapToGrid(e.clientX - rect.left),
      y: snapToGrid(e.clientY - rect.top)
    };

    const newComponent: PlacedComponent = {
      type,
      position,
      size: { width: GRID_SIZE * 16, height: GRID_SIZE * 8 }, // Default size
      id: `${type}-${Date.now()}`,
      props: { ...componentRegistry[type]?.defaultProps }
    };

    setPlacedComponents(prev => [...prev, newComponent]);
  }, []);

  const handleComponentUpdate = useCallback((id: string, updates: Partial<PlacedComponent>) => {
    setPlacedComponents(prev => prev.map(component => 
      component.id === id 
        ? { ...component, ...updates }
        : component
    ));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleComponentSelect = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedComponent(id);
    
    // Move the selected component to the front
    setPlacedComponents(prev => {
      const component = prev.find(c => c.id === id);
      if (!component) return prev;
      
      return [
        ...prev.filter(c => c.id !== id),
        component
      ];
    });
  }, []);

  // Update keyboard event handler to include copy/paste
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete/Backspace handling
      if (selectedComponent && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        handleDeleteComponent(selectedComponent);
        return;
      }

      // Copy handling (Ctrl+C)
      if (e.key === 'c' && (e.ctrlKey || e.metaKey) && selectedComponent) {
        const componentToCopy = placedComponents.find(c => c.id === selectedComponent);
        if (componentToCopy) {
          setCopiedComponent(componentToCopy);
          // Show feedback toast
          showToast('Component copied');
        }
        return;
      }

      // Paste handling (Ctrl+V)
      if (e.key === 'v' && (e.ctrlKey || e.metaKey) && copiedComponent) {
        const newComponent = createComponentCopy(copiedComponent);
        setPlacedComponents(prev => [...prev, newComponent]);
        setSelectedComponent(newComponent.id);
        // Show feedback toast
        showToast('Component pasted');
        return;
      }

      // Duplicate handling (Ctrl+D)
      if (e.key === 'd' && (e.ctrlKey || e.metaKey) && selectedComponent) {
        e.preventDefault(); // Prevent browser bookmark shortcut
        const componentToDuplicate = placedComponents.find(c => c.id === selectedComponent);
        if (componentToDuplicate) {
          const newComponent = createComponentCopy(componentToDuplicate);
          setPlacedComponents(prev => [...prev, newComponent]);
          setSelectedComponent(newComponent.id);
          // Show feedback toast
          showToast('Component duplicated');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, copiedComponent, placedComponents]);

  // Add toast notification system
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2000);
  };

  const handleDeleteComponent = useCallback((id: string) => {
    setPlacedComponents(prev => prev.filter(component => component.id !== id));
    setSelectedComponent(null);
  }, []);

  // Update the click handler to deselect when clicking outside
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedComponent(null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <CollapsiblePanel title="Components">
          <ComponentList onDragStart={() => setIsDragging(true)} />
        </CollapsiblePanel>
        
        <div className="flex-1">
          <ViewportControl view={view} setView={setView} />
          <PreviewContainer view={view} showGrid={showGrid}>
            <div 
              className={`min-h-screen border-2 border-dashed relative ${
                isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300'
              } p-4`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleCanvasClick}
            >
              {placedComponents.map((component) => (
                <ResizableComponent
                  key={component.id}
                  component={component}
                  onUpdate={handleComponentUpdate}
                  onDelete={handleDeleteComponent}
                  selected={selectedComponent === component.id}
                  onSelect={(e) => handleComponentSelect(e, component.id)}
                />
              ))}
            </div>
          </PreviewContainer>
        </div>

        <CollapsiblePanel title="Settings">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              Show Grid
            </label>
            {/* Add more settings here */}
          </div>
        </CollapsiblePanel>
      </div>

      {/* Update keyboard shortcut hint */}
      {selectedComponent && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg space-y-1">
          <div>Press Delete to remove component</div>
          <div>Ctrl+C to copy</div>
          <div>Ctrl+V to paste</div>
          <div>Ctrl+D to duplicate</div>
        </div>
      )}

      {/* Add toast notification */}
      <div
        className={`fixed bottom-20 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-200 ${
          toast.visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {toast.message}
      </div>

      {/* Add copy/paste buttons to toolbar */}
      <div className="fixed top-4 right-4 space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (selectedComponent) {
              const componentToCopy = placedComponents.find(c => c.id === selectedComponent);
              if (componentToCopy) {
                setCopiedComponent(componentToCopy);
                showToast('Component copied');
              }
            }
          }}
          disabled={!selectedComponent}
        >
          Copy
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (copiedComponent) {
              const newComponent = createComponentCopy(copiedComponent);
              setPlacedComponents(prev => [...prev, newComponent]);
              setSelectedComponent(newComponent.id);
              showToast('Component pasted');
            }
          }}
          disabled={!copiedComponent}
        >
          Paste
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (selectedComponent) {
              const componentToDuplicate = placedComponents.find(c => c.id === selectedComponent);
              if (componentToDuplicate) {
                const newComponent = createComponentCopy(componentToDuplicate);
                setPlacedComponents(prev => [...prev, newComponent]);
                setSelectedComponent(newComponent.id);
                showToast('Component duplicated');
              }
            }
          }}
          disabled={!selectedComponent}
        >
          Duplicate
        </Button>
      </div>

      <Button 
        onClick={() => {/* Handle export */}}
        className="mt-4"
        disabled={placedComponents.length === 0}
      >
        Export HTML
      </Button>

      {/* Add publish button */}
      <div className="fixed bottom-4 left-4">
        <Button
          size="lg"
          onClick={() => handlePublish(placedComponents)}
          disabled={placedComponents.length === 0}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Upload className="w-4 h-4 mr-2" />
          Publish Website
        </Button>
      </div>
    </div>
  );
};

export default WebsiteEditor;