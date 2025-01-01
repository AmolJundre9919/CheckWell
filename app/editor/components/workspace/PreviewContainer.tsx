import React from 'react';
import { ViewMode } from '../../types/editor.types';
import { GridOverlay } from '../controls/GridOverlay';
import { useEditor } from '../../context/EditorContext';

interface PreviewContainerProps {
  children: React.ReactNode;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({ children }) => {
  const { view, showGrid } = useEditor();

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