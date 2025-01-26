import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { CollapsiblePanel } from './CollapsiblePanel';
import { ComponentCategory } from '../../types/editor.types';
import { getComponentsByCategory, ComponentDefinition } from '../../utils/component-registry';

export const ComponentList: React.FC = () => {
  const { setPlacedComponents } = useEditor();

  const atoms = getComponentsByCategory('atoms' as ComponentCategory);
  const molecules = getComponentsByCategory('molecules' as ComponentCategory);
  const organisms = getComponentsByCategory('organisms' as ComponentCategory);

  const handleDragStart = (component: ComponentDefinition) => (e: React.DragEvent) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  const renderComponentGroup = (components: ComponentDefinition[], title: string) => (
    <CollapsiblePanel key={title} title={title}>
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <div
            key={component.name}
            draggable
            onDragStart={handleDragStart(component)}
            className="flex flex-col items-center p-2 border rounded cursor-move hover:bg-gray-50"
          >
            <span className="text-2xl">{component.icon}</span>
            <span className="text-sm mt-1">{component.name}</span>
          </div>
        ))}
      </div>
    </CollapsiblePanel>
  );

  return (
    <div className="w-64 space-y-4">
      {atoms.length > 0 && renderComponentGroup(atoms, 'Atoms')}
      {molecules.length > 0 && renderComponentGroup(molecules, 'Molecules')}
      {organisms.length > 0 && renderComponentGroup(organisms, 'Organisms')}
    </div>
  );
};

