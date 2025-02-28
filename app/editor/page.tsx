import React from 'react';
import { EditorProvider } from './context/EditorContext';
import { ComponentList } from './components/panels/ComponentList';
import { SettingsPanel } from './components/panels/SettingsPanel';
import { EditorToolbar } from './components/toolbar/EditorToolbar';
import { WorkspaceContainer } from './components/workspace/WorkspaceContainer';

export default function EditorPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col">
        <EditorToolbar />
        
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
            <ComponentList />
          </aside>

          <main className="flex-1 overflow-hidden">
            <WorkspaceContainer />
          </main>

          <aside className="w-64 border-l bg-white p-4 overflow-y-auto">
            <SettingsPanel />
          </aside>
        </div>
      </div>
    </EditorProvider>
  );
} 