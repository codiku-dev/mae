import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useConversations } from '@/renderer/hooks/use-conversations';

export const DevTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [storeContent, setStoreContent] = useState<string>('');
  const { clearAllHistory } = useConversations();

  useEffect(() => {
    const updateStoreContent = () => {
      const content = JSON.stringify(useAppStore.getState(), null, 2);
      setStoreContent(content);
    };

    updateStoreContent();
    const unsubscribe = useAppStore.subscribe(updateStoreContent);

    return () => unsubscribe();
  }, [useAppStore]);

  return (
    <>
      <div
        id="ai-dev-tools-button"
        className="interactive fixed bottom-4 right-4 z-50 cursor-pointer rounded-full bg-blue-500 p-3 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        🛠️
      </div>
      {isOpen && (
        <div
          id="ai-dev-tools-store-content"
          className="interactive fixed bottom-16 right-4 z-50 max-h-[80vh] w-96 overflow-auto rounded-lg bg-white p-4 shadow-xl"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Zustand Store Content</h2>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
              onClick={clearAllHistory}
            >
              Clear History
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-xs">{storeContent}</pre>
        </div>
      )}
    </>
  );
};
