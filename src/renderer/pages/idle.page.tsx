import { ROUTES } from "@/routes";

import { WindowAPI } from "@/main/modules/window/window-api";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { ShortcutAPI } from "@/main/modules/shortcuts/shortcut-api";

export function IdlePage() {
    const navigate = useNavigate()

    const handleGoHome = useCallback(() => {
        navigate(ROUTES.aiChat);
        WindowAPI.toggleWindowWithAnimation(true);
    }, [navigate]);

    useEffect(() => {
        const unsubscribe = ShortcutAPI.addGlobalShortcutListener(handleGoHome);
        return unsubscribe
    }, [handleGoHome]);

    return null


}