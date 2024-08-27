import { Copy, CopyCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function Response(p: {
  streamedResponse: string;
  isLoading: boolean;
  isStreamingFinished: boolean;
  question: string;
}) {
  const [hasCopiedRecently, setHasCopiedRecently] = useState(false);

  const handleClickCopyContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHasCopiedRecently(true);
    setTimeout(() => {
      setHasCopiedRecently(false);
    }, 3000);
    window.electron.ipcRenderer.sendMessage(
      'copy-text-to-clipboard-request',
      p.streamedResponse,
    );
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="interactive mt-4 p-4 rounded-md bg-white animate-in flex justify-between items-start relative w-full "
    >
      {p.isLoading ? (
        <div className="w-full flex flex-col gap-1 mt-5">
          <Skeleton className="w-full h-6 " />
        </div>
      ) : (
        <div className=" flex">
          {p.isStreamingFinished && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-2 top-1 cursor-pointer ml-2 p-2 rounded-full hover:bg-gray-200"
                    onClick={handleClickCopyContent}
                  >
                    {hasCopiedRecently ? (
                      <CopyCheck size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-black text-white">
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="mt-5 flex flex-col gap-2  max-h-[500px] overflow-y-auto">
            <div>
              <span className="text-sm text-black font-bold">Question : </span>
              <span>"{p.question}"</span>
            </div>
            <span className="">
              <span className="text-sm text-black font-bold ">Answer : </span>
              {p.streamedResponse}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
