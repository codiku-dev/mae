import { LLMMessage } from "@/main/services/ollama/ollama-type";
import logo from '../../../../assets/icon.png';
export function AIHistoryMessage(p: { message: LLMMessage }) {


    const avatarAssistant = (
        <div className="flex items-center gap-2 mb-1 justify-end">
            <img src={logo} className="size-8 rounded-full" alt="AI Avatar" />
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Mia</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            {avatarAssistant}
            <div className="relative bg-sky-200/20 p-3 rounded-lg rounded-tr-none min-h-12">

                AI MESSAGE HERE

            </div>
        </div>
    );
}
