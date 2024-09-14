import { AlertTriangle } from "lucide-react";

export function Error(p: { errorMessage: string }) {

    return (
        <div className="mt-4 p-4 rounded-md bg-red-100 animate-in flex justify-between items-start">
            <div className="flex"><AlertTriangle className="mr-2" />{p.errorMessage}</div>
        </div>
    );
}