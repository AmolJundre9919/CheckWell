import React from 'react';
import { Undo, Redo, Grid, Smartphone, Monitor } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { PublishButton } from './PublishButton';

export const EditorToolbar: React.FC = () => {
  const { view, setView, showGrid, setShowGrid } = useEditor();

  return (
    <div className="flex items-center justify-between p-2 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded" title="Undo">
          <Undo size={20} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded" title="Redo">
          <Redo size={20} />
        </button>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <button
          className={`p-2 rounded ${showGrid ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle Grid"
        >
          <Grid size={20} />
        </button>
      </div>
      <div className="flex items-center">
        <PublishButton />
      </div>
      <div className="flex items-center space-x-2">
        <button
          className={`p-2 rounded ${view === 'desktop' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          onClick={() => setView('desktop')}
          title="Desktop View"
        >
          <Monitor size={20} />
        </button>
        <button
          className={`p-2 rounded ${view === 'mobile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          onClick={() => setView('mobile')}
          title="Mobile View"
        >
          <Smartphone size={20} />
        </button>
      </div>
    </div>
  );
}; 