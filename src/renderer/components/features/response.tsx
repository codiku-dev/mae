import { Skeleton } from '@/renderer/components/ui/skeleton';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';

export function Response(p: { streamedResponse: string; isLoading: boolean }) {
  return (
    <div className="mt-4 p-4 rounded-md bg-white animate-in flex justify-between items-start relative">
      {
        p.isLoading ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> :
          <div className=' flex'>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="absolute  right-2 cursor-pointer ml-2 p-2 rounded-full hover:bg-gray-200"
              onClick={() => {
                window.electron.ipcRenderer.sendMessage(
                  'copy-text-to-clipboard-request',
                  p.streamedResponse,
                );
              }}
            >
              <Copy size={16} />
            </Button>
            <div className="mt-5">{p.streamedResponse}</div>

          </div>
      }
    </div >
  );
}