"use client";

import React from 'react';
import { EditorProvider } from './context/EditorContext';
import { ToastProvider } from './contexts/ToastContext';
import { ViewportControl } from './components/controls/ViewportControl';
import { ComponentList } from './components/panels/ComponentList';
import { SettingsPanel } from './components/panels/SettingsPanel';
import { PreviewContainer } from './components/workspace/PreviewContainer';
import { EditorToolbar } from './components/toolbar/EditorToolbar';
import { PublishButton } from './components/toolbar/PublishButton';
import { WorkspaceContainer } from './components/workspace/WorkspaceContainer';
import '@/app/site/Components';

// Separate internal component that uses hooks
const EditorContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <ComponentList />
        
        <div className="flex-1">
          <ViewportControl />
          <PreviewContainer>
            <WorkspaceContainer />
          </PreviewContainer>
        </div>

        <SettingsPanel />
      </div>

      <EditorToolbar />
      
    </div>
  );
};

// Main component that provides context
const WebsiteEditor: React.FC = () => {
  return (
    <EditorProvider>
      <ToastProvider>
        <EditorContent />
      </ToastProvider>
    </EditorProvider>
  );
};

export default WebsiteEditor;