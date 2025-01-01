import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { CollapsiblePanel } from './CollapsiblePanel';

export const SettingsPanel: React.FC = () => {
  const { selectedComponent, placedComponents, setPlacedComponents } = useEditor();

  const selectedComponentData = placedComponents.find(
    (component) => component.id === selectedComponent
  );

  const updateComponentProp = (propName: string, value: any) => {
    if (!selectedComponent) return;

    setPlacedComponents((prev) =>
      prev.map((component) =>
        component.id === selectedComponent
          ? { ...component, props: { ...component.props, [propName]: value } }
          : component
      )
    );
  };

  if (!selectedComponentData) {
    return (
      <div className="w-64 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-64 space-y-4">
      <CollapsiblePanel title="Component Properties">
        {Object.entries(selectedComponentData.props).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">{key}</label>
            <input
              type="text"
              value={value as string}
              onChange={(e) => updateComponentProp(key, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </CollapsiblePanel>

      <CollapsiblePanel title="Layout">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Position X</label>
            <input
              type="number"
              value={selectedComponentData.position.x}
              onChange={(e) =>
                updateComponentProp('position', {
                  ...selectedComponentData.position,
                  x: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position Y</label>
            <input
              type="number"
              value={selectedComponentData.position.y}
              onChange={(e) =>
                updateComponentProp('position', {
                  ...selectedComponentData.position,
                  y: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
}; 