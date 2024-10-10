import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useConversations } from '@/renderer/hooks/use-conversations';
import { useSettings } from '@/renderer/hooks/use-settings';
import { useSearch } from '@/renderer/hooks/use-search';
import { useLocation } from 'react-router-dom';

const stores = {
  appStore: useAppStore,
  conversationStore: useConversations,
  searchStore: useSearch,
  settingsStore: useSettings,
};

export const DevTool: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof stores>('appStore');
  const [storeContents, setStoreContents] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateStoreContents = () => {
      const contents = Object.entries(stores).reduce((acc, [key, store]) => {
        acc[key] = JSON.stringify(store.getState(), null, 2);
        return acc;
      }, {} as Record<string, string>);
      setStoreContents(contents);
    };

    updateStoreContents();
    const unsubscribes = Object.values(stores).map(store =>
      (store.subscribe as (listener: () => void) => () => void)(updateStoreContents)
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, []);

  return (
    <>
      <div
        id="ai-dev-tools-button"
        className="fixed bottom-4 right-4 z-50 cursor-pointer rounded-full bg-blue-500 p-3 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        path: {location.pathname}
      </div>
      {isOpen && (
        <div
          id="ai-dev-tools-store-content"
          className="fixed bottom-16 right-4 z-50 max-h-[80vh] w-[400px] overflow-auto rounded-lg bg-background p-4 shadow-xl"
        >
          <div className="flex justify-between items-center mb-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
              onClick={stores[activeTab].getState().clear}
            >
              Clear store
            </button>
          </div>
          <h2 className="text-lg font-bold">{activeTab}</h2>
          <pre className="whitespace-pre-wrap text-xs">{storeContents[activeTab]}</pre>
          <div className="flex mt-4">
            {Object.keys(stores).map((storeName) => (
              <button
                key={storeName}
                className={`mr-2 px-2 py-1 rounded text-xs ${activeTab === storeName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab(storeName as keyof typeof stores)}
              >
                {storeName}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
