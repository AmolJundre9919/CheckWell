import { EditorProvider } from './context/EditorContext';
import { ToastProvider } from './hooks/useToast';
import WebsiteEditor from './website-editor-viewport';

export default function EditorPage() {
  return (
    <EditorProvider>
      <ToastProvider>
        <WebsiteEditor />
      </ToastProvider>
    </EditorProvider>
  );
} 