import React from 'react';
//import { EditorContext } from '.@/app/editor/components/workspace/EditorContext';
import { ViewMode } from '@/app/editor/types/editor.types';
import { EditorProvider } from '../../context/EditorContext';

const Editor: React.FC = () => {
  return (
    <EditorProvider>
      <div>
        <h1>Editor Component</h1>
        <ui-google-map></ui-google-map>
      </div>
    </EditorProvider>
  );
};

export default Editor;
