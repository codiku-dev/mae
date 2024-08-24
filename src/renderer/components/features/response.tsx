import { Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export function Response(p: { streamedResponse: string; isLoading: boolean; isStreamingFinished: boolean; question: string }) {

  return (
    <div onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }} className="interactive mt-4 p-4 rounded-md bg-white animate-in flex justify-between items-start relative w-full  max-h-[500px] overflow-y-auto">
      {
        p.isLoading ? <div className='w-full flex flex-col gap-1 mt-5'>
          <Skeleton className='w-full h-6 ' /></div> :
          <div className=' flex'>
            {p.isStreamingFinished && <Button
              variant="ghost"
              size="icon"
              type="button"
              className="absolute  right-2 top-1 cursor-pointer ml-2 p-2 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.electron.ipcRenderer.sendMessage(
                  'copy-text-to-clipboard-request',
                  p.streamedResponse,
                );
              }}
            >
              <Copy size={16} />
            </Button>}
            <div className="mt-5 flex flex-col gap-2">
              <div>
                <span className='text-sm text-black font-bold'>Question : </span><span>"{p.question}"</span>
              </div>
              <span><span className='text-sm text-black font-bold'>Answer : </span>{p.streamedResponse}</span>
            </div>

          </div>
      }
    </div >
  );
}