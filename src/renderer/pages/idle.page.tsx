import { ROUTES } from "@/routes";

import { WindowAPI } from "@/main/modules/window/window-api";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { logToMain } from "../libs/utils";
import { ShortcutAPI } from "@/main/modules/shortcuts/shortcut-api";

export function IdlePage() {
    const navigate = useNavigate()

    const handleGoHome = useCallback(() => {
        logToMain("Go to home page");
        navigate(ROUTES.home);
        WindowAPI.toggleWindowWithAnimation(true);
    }, [navigate]);

    useEffect(() => {
        logToMain("Add shortcut listener on Idle page")
        const unsubscribe = ShortcutAPI.addGlobalShortcutListener(handleGoHome);
        return () => {
            logToMain("Remove shortcut listener on Idle page")
            unsubscribe()
        };
    }, [handleGoHome]);

    return null


}